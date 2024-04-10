

const { product, clothing, electronic } = require("../models/product.model");

//Factory cho phép chúng ta tạo ra một địa điểm tập trung tất cả các đối tượng đã được tạo ra
// Factory Pattern là quản lý và trả về các đối tượng theo yêu cầu, giúp cho việc khởi tạo đổi tượng một cách linh hoạt hơn.
class ProductFactory {
   static async createProduct(type, payload) {
      switch (type) {
         case 'Electronic': {
            return new Electonics(payload).createProduct();
         }
         case 'Clothing': {
            return new Clothing(payload).createProduct();
         }
         default: {
            throw new Error("Invalid product type: ", type);
         }
      } 
   }
}

class Product {
   constructor(product_name, product_thumb, product_description, product_price, product_quantity, product_type, product_shop, product_attributes) {
      this.product_name = product_name;
      this.product_thumb = product_thumb;
      this.product_description = product_description;
      this.product_price = product_price;
      this.product_quantity = product_quantity;
      this.product_type = product_type;
      this.product_shop = product_shop;
      this.product_attributes = product_attributes;
   }

   async createProduct() {
      return await product.create(this);
   }
}

class Clothing extends Product {
   async createProduct() {
      const newClothing = await clothing.create(this.product_attributes);
      if (!newClothing) throw new Error("Bad Request! Create Clothing Error");

      const newProduct = await super.createProduct();
      if (!newProduct) throw new Error("Bad Request! Create Product Error");

      return newProduct;
   }
}

class Electonics extends Product {
   async createProduct() {
      const newClothing = await electronic.create(this.product_attributes);
      if (!newClothing) throw new Error("Bad Request! Create Electronic Error");

      const newProduct = await super.createProduct();
      if (!newProduct) throw new Error("Bad Request! Create Product Error");

      return newProduct;
   }
}

module.exports = ProductFactory;