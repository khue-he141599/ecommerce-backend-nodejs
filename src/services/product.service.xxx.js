

const { product, clothing, electronic, furnitures } = require("../models/product.model");
const { productConfig } = require("./product.config");
//Factory cho phép chúng ta tạo ra một địa điểm tập trung tất cả các đối tượng đã được tạo ra
// Factory Pattern là quản lý và trả về các đối tượng theo yêu cầu, giúp cho việc khởi tạo đổi tượng một cách linh hoạt hơn.
class ProductFactory {
   static productRegistry = {};

   static registerProductType(type, classRef) {
      //loop productConfig khi cần khai bao nhiều class
      ProductFactory.productRegistry[type] = classRef;
   }

   static async createProduct(type, payload) {
      const productClass = ProductFactory.productRegistry[type];
      if (!productClass) throw new Error("Product class invalid!");

      return new productClass(payload).createProduct();
   }
}

class Product {
   constructor({ product_name, product_thumb, product_description, product_price, product_quantity, product_type, product_shop, product_attributes }) {
      this.product_name = product_name;
      this.product_thumb = product_thumb;
      this.product_description = product_description;
      this.product_price = product_price;
      this.product_quantity = product_quantity;
      this.product_type = product_type;
      this.product_shop = product_shop;
      this.product_attributes = product_attributes;
   }

   async createProduct(product_id) {
      return await product.create({ ...this, _id: product_id });
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
      const newElectonic = await electronic.create({ ...this.product_attributes, product_shop: this.product_shop });
      if (!newElectonic) throw new Error("Bad Request! Create Electronic Error");

      const newProduct = await super.createProduct(newElectonic._id);
      if (!newProduct) throw new Error("Bad Request! Create Product Error");

      return newProduct;
   }
}

class Furnitures extends Product {
   async createProduct() {
      const newFurniture = await furnitures.create({ ...this.product_attributes, product_shop: this.product_shop });
      if (!newFurniture) throw new Error("Bad Request! Create Electronic Error");

      const newProduct = await super.createProduct(newFurniture._id);
      if (!newProduct) throw new Error("Bad Request! Create Product Error");

      return newProduct;
   }
}

// them 1 attribute mới không cần phải sửa trong Factory partten
ProductFactory.registerProductType("Electonics", Electonics);
ProductFactory.registerProductType("Clothing", Clothing);
ProductFactory.registerProductType("Furnitures", Furnitures);

module.exports = ProductFactory;