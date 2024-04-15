const ProductService = require("../services/product.service");

class ProductController {

   static createProduct = async (req, res) => {
      try {
         return res.status(200).json({
            code: "success",
            metadata: await ProductService.createProduct(req.body.product_type, { ...req.body, product_shop: req.user.userId })
         });
      } catch (err) {
         return res.status(500).json({
            code: "error",
            metadata: err.message
         });
      }
   }
}


module.exports = ProductController;
