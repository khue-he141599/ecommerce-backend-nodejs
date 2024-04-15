const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/product.controller");
const { authentication, authentication_v2 } = require("../../auth/authUtils");

router.use(authentication_v2)
router.post("", ProductController.createProduct);
router.post("/xxx", ProductController.createProductXXX);


module.exports = router;
