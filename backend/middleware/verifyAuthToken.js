const jwt = require("jsonwebtoken");

//middleware for verifying tokens and rigth to access resources for all users
const verifyIsLoggedIn = (req, res, next) => {
  try {
    //checking the token
    const token = req.cookies.access_token;
    if (!token) {
      //403 means user is trying to access resources that require login
      return res.status(403).send("A token is required for authentication.");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      //call next middleware:verifyIsAdmin
      next();
    } catch (err) {
      return res.status(401).send("Unauthorized. Invalid token.");
    }
  } catch (err) {
    next(err);
  }
};

//middleware for verifying if admin is logged in
const verifyIsAdmin = (req, res, next) => {
  try {
    //req.user is created if verifyIsLoggedIn middleware so it's available here
    if (req.user && req.user.isAdmin) {
      //call next middleware (in userController.js)
      next();
    } else {
      return res.status(401).send("Unauthorized. Admin required.");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { verifyIsLoggedIn, verifyIsAdmin };
