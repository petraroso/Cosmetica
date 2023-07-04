const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidate");

const getProducts = async (req, res, next) => {
  try {
    let query = {};
    let queryCondition = false;
    //returns only products with price less than set value
    let priceQueryCondition = {};
    if (req.query.price) {
      queryCondition = true;
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
    }
    let ratingQueryCondition = {};
    if (req.query.rating) {
      queryCondition = true;
      ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
    }

    //for user search
    let categoryQueryCondition = {};
    const categoryName = req.params.categoryName || "";
    if (categoryName) {
      queryCondition = true;
      let a = categoryName.replaceAll(",", "/");
      var regEx = new RegExp("^" + a);
      categoryQueryCondition = { category: regEx };
    }
    //category filter
    if (req.query.category) {
      queryCondition = true;
      //array of regular exp values. can contain multiple categories
      let a = req.query.category.split(",").map((item) => {
        if (item) return new RegExp("^" + item);
      });
      //overwriting the category search variable. gives all the products from any of the categories included in the array
      categoryQueryCondition = { category: { $in: a } };
    }

    //filtering by attributes
    let attrsQueryCondition = [];
    if (req.query.attrs) {
      //splits the request to get array of attributes
      //reduce pushes all the attributes into an empty array
      attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
        if (item) {
          let a = item.split("-");
          let values = [...a];
          values.shift(); //removes first item which is the key
          //preparing for the query. matching key with values form query parameter
          let a1 = {
            attrs: { $elemMatch: { key: a[0], value: { $in: values } } },
          };
          acc.push(a1);
          //console.dir(acc, { depth: null });
          return acc;
        } else return acc;
      }, []);
      //console.dir(attrsQueryCondition, { depth: null });
      queryCondition = true;
    }

    //for pagination
    const pageNum = Number(req.query.pageNum) || 1;
    //res.json({pageNum})

    //sort by name, price...
    let sort = {};
    const sortOption = req.query.sort || "";
    //split used because of the names on frontend part of app
    if (sortOption) {
      let sortOpt = sortOption.split("_");
      //[] used to create js object with dynamic key name. sort = key-value pairs
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
    }

    //for search bar
    const searchQuery = req.params.searchQuery || "";
    let searchQueryCondition = {};
    let select = {};
    if (searchQuery) {
      queryCondition = true;
      //created index text in product model file
      //'"'+ can be added for accurate search with spaces
      searchQueryCondition = { $text: { $search: searchQuery } };
      //score adds value of accuracy of the text search for each product
      select = { score: { $meta: "textScore" } };
      //products sorted by accuracy of search if searched
      sort = { score: { $meta: "textScore" } };
    }

    if (queryCondition) {
      //special MongoDB syntax
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
          searchQueryCondition,
          ...attrsQueryCondition,
        ],
      };
    }

    //gives number of all products in db
    //const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      //.select to specify which fields to fetch from db
      .select(select)
      //skipps first n products for pagination
      //.skip(recordsPerPage * (pageNum - 1))
      .sort(sort);
    //.limit(recordsPerPage);
    res.json({
      products,
      //pageNum,
      //how many links are needed for paginated page
      //paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    //populate method gets all the data from reviews, not only id
    const product = await Product.findById(req.params.id)
      .populate("reviews")
      .orFail();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

//getting bestseller products
const getBestsellers = async (req, res, next) => {
  try {
    //aggregate instead of find
    const products = await Product.aggregate([
      { $sort: { category: 1, sales: -1 } }, //sort in asc in each category, and desc by sales in the category
      {
        $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } },
      }, //resoults grouped by category. then takes only the first product in each category
      { $replaceWith: "$doc_with_max_sales" },
      { $match: { sales: { $gt: 0 } } }, //get only products with sales greater than 0
      { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } }, //fields we want shown. 1 == true
      { $limit: 3 }, //get only 3 products from db
    ]);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

//getting products for admin's table of products
const adminGetProducts = async (req, res, next) => {
  try {
    //find all products and sorts ba category ascendand. only name, price and category are shown
    const products = await Product.find({})
      .sort({ category: 1 })
      .select("name price category");
    return res.json(products);
  } catch (err) {
    next(err);
  }
};

//function for deleting products by admin
const adminDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    await product.deleteOne();
    res.json({ message: "product removed" });
  } catch (err) {
    next(err);
  }
};

//function for creating a product by admin
const adminCreateProduct = async (req, res, next) => {
  try {
    const product = new Product();
    const { name, description, count, price, category, attributesTable } =
      req.body;
    product.name = name;
    product.description = description;
    product.count = count;
    product.price = price;
    product.category = category;
    //product doesn't have to have attributes
    if (attributesTable.length > 0) {
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    }
    await product.save();
    res.json({ message: "product created", productId: product._id });
  } catch (err) {
    next(err);
  }
};

//function handling admin update one product
const adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    const { name, description, count, price, category, attributesTable } =
      req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.count = count || product.count;
    product.price = price || product.price;
    product.category = category || product.category;
    if (attributesTable.length > 0) {
      product.attrs = [];
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    } else {
      product.attrs = [];
    }
    await product.save();
    res.json({ message: "product updated" });
  } catch (err) {
    next(err);
  }
};

//function for admin to upload product images
const adminUpload = async (req, res, next) => {
  //if cloudinary is used for image storage, the rest of the code doesn't
  //need to be executed because it saves images to local disc
  //saving cloudinary image url in the db
  //updating db needs to be done
  if (req.query.cloudinary === "true") {
    try {
      let product = await Product.findById(req.query.productId).orFail();
      product.images.push({ path: req.body.url });
      await product.save();
    } catch (err) {
      next(err);
    }
    return;
  }
  try {
    //!! to get boolean value of req.files.images
    if (!req.files || !!req.files.images === false) {
      return res.status(400).send("No files were uploaded");
    }
    //using imageValidate from utils to validate uploaded image
    const validateResult = imageValidate(req.files.images);
    if (validateResult.error) {
      //displaying the type of error that occured
      return res.status(400).send(validateResult.error);
    }

    //for safety: generating random names for images stored on the server
    const path = require("path"); //node.js built-in package for working with file and directory paths
    const { v4: uuidv4 } = require("uuid"); //uuid package for generating random strings
    const uploadDirectory = path.resolve(
      __dirname,
      "../../frontend",
      "public",
      "images",
      "products"
    ); //defining where to upload images

    let product = await Product.findById(req.query.productId).orFail();

    let imagesTable = [];
    if (Array.isArray(req.files.images)) {
      imagesTable = images;
    } else {
      imagesTable.push(req.files.images);
    }
    for (let image of imagesTable) {
      var fileName = uuidv4() + path.extname(image.name);
      var uploadPath = uploadDirectory + "/" + fileName;
      product.images.push({ path: "/images/products/" + fileName });

      //moving files to specified directory
      image.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }
    await product.save();
    return res.send("Files uploaded.");
  } catch (err) {
    next(err);
  }
};

//function for deleting product images by admin
const adminDeleteProductImage = async (req, res, next) => {
  //decoding the path from url address
  const imagePath = decodeURIComponent(req.params.imagePath);
  if (req.query.cloudinary === "true") {
    //only update db
    try {
      await Product.findOneAndUpdate(
        { _id: req.params.productId },
        { $pull: { images: { path: imagePath } } }
      ).orFail();
      return res.end();
    } catch (er) {
      next(er);
    }
    return;
  }
  try {
    const path = require("path");
    //joined to get absolute path
    const finalPath = path.resolve("../frontend/public") + imagePath;
    //not returning any data. without response, request can't be finished

    //deleting from local disc
    const fs = require("fs"); //built-in node.js file system
    fs.unlink(finalPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
    //find by id, pull specified path from images array
    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { $pull: { images: { path: imagePath } } }
    ).orFail();

    return res.end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getBestsellers,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUpload,
  adminDeleteProductImage,
};
