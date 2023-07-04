const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getBestsellers,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUpload,
  adminDeleteProductImage,
} = require("../controllers/productController");
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");

//for search bar all categories
router.get("category/:categoryName/search/:searchQuery", getProducts);
//route for user search. :categoryName dynamic part of the query
router.get("/category/:categoryName", getProducts);
//for search bar particular categories
router.get("/search/:searchQuery", getProducts);
router.get("/", getProducts);
router.get("/bestsellers", getBestsellers);
router.get("/get-one/:id", getProductById);

//admin routes

router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.get("/admin", adminGetProducts);
router.delete("/admin/:id", adminDeleteProduct);
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage);
//admin updating product
router.put("/admin/:id", adminUpdateProduct);
//admin upload
router.post("/admin/upload", adminUpload);
//post method to send to the db
router.post("/admin", adminCreateProduct);

module.exports = router;
