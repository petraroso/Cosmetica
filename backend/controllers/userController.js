const User = require("../models/UserModel");
const Review = require("../models/ReviewModel");
const Product = require("../models/ProductModel");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");

const getUsers = async (req, res, next) => {
  try {
    //users contains all the users from db without their passwords
    const users = await User.find({}).select("-password");
    //returning response with data containing users
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  try {
    //extracting data about user from request
    const { name, lastName, email, password } = req.body;
    if (!(name && lastName && email && password)) {
      return res.status(400).send("All inputs are required.");
    }
    //find user with given email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("user exists");
    } else {
      //if user doesn't exist
      //hashPassword function from utils/hashPassword
      const hashedPassword = hashPassword(password);
      const user = await User.create({
        name,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
      });
      res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isAdmin
          ), //called function from utils for generating a token
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", //other websites can't access this cookie
          }
        ) //to make user stay logged in when needed
        .status(201)
        .json({
          //returning user data
          success: "user created",
          userCreated: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        });
    }
  } catch (err) {
    next(err);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required.");
    }

    //if all inputs are entered
    const user = await User.findOne({ email }).orFail();
    //if email exists in db
    if (user && comparePasswords(password, user.password)) {
      //cookies to enable staying logged in
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };
      if (doNotLogout) {
        //creating new object with cookie params and how long user will stay logged in
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 };
      }
      return res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          cookieParams
        )
        .json({
          success: "user logged in",
          userLoggedIn: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            doNotLogout,
          },
        });
    } else {
      return res.status(401).send("wrong credentials");
    }
  } catch (err) {
    next(err);
  }
};

//function for users to update their profiles
const updateUserProfile = async (req, res, next) => {
  try {
    //find the user to update. req.user comes from verifyAuthToken middleware
    const user = await User.findById(req.user._id).orFail();
    //only name, lastName, email and password are required
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    //user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.zipCode = req.body.zipCode;
    user.city = req.body.city;
    user.country = req.body.country;
    //to enable changing password
    if (req.body.password !== user.password) {
      user.password = hashPassword(req.body.password);
    }
    await user.save();

    res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};

//function for fetching data about users profile
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

const writeReview = async (req, res, next) => {
  try {
    //writing a transaction because writing operations into review collection
    //and product collection should either both happen or both fail
    const session = await Review.startSession();
    //get comment, rating from request.body
    const { comment, rating } = req.body;
    //validate request
    if (!(comment && rating)) {
      return res.status(400).send("All inputs are required.");
    }
    //create review id manually because it's needed for saving in Product collection
    const ObjectId = require("mongodb").ObjectId;
    let reviewId = new ObjectId();

    session.startTransaction();
    //review created in the shape of Review model
    await Review.create(
      [
        {
          _id: reviewId,
          comment: comment,
          rating: Number(rating),
          user: {
            _id: req.user._id,
            name: req.user.name + " " + req.user.lastName,
          },
        },
      ],
      { session: session }
    );
    //populate takes all the data from db, not only id numbers
    const product = await Product.findById(req.params.productId)
      .populate("reviews")
      .session(session);
    //find if a product review by logged in user already exists
    //req.user comes from middleware, r.user comes brom db
    const alreadyReviewed = product.reviews.find(
      (r) => r.user._id.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send("product already reviewed");
    }

    //adding the review
    let prc = [...product.reviews];
    prc.push({ rating: rating });
    product.reviews.push(reviewId);
    //if it's the first review added
    if (product.reviews.length === 1) {
      product.rating = Number(rating);
      product.reviewsNumber = 1;
    } else {
      product.reviewsNumber = product.reviews.length;
      //getting average rating of all reviews
      let ratingCalc =
        prc
          .map((item) => Number(item.rating))
          .reduce((sum, item) => sum + item, 0) / product.reviews.length;
      product.rating = Math.round(ratingCalc);
    }
    await product.save();

    await session.commitTransaction();
    session.endSession();
    res.send("review created");
  } catch (err) {
    await session.abortTransaction();
    next(err);
  }
};

//function for fetching data about user by admin
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("name lastName email isAdmin")
      .orFail();
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

//function for updating user data by admin
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    await user.save();
    res.send("user updated");
  } catch (err) {
    next(err);
  }
};

//function for deleting user by admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    await user.deleteOne();
    res.send("user removed");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  writeReview,
  getUser,
  updateUser,
  deleteUser,
};
