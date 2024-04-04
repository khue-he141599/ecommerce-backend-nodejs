
"use strict";

const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new Schema({
   product_name: { type: String, require: true },
   product_thumb: { type: String, require: true },
   product_description: { type: String },
   product_price: { type: String, required: true },
   product_quantity: { type: Number, required: true },
   product_type: { type: String, required: true },
   product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
   product_attributes: { type: Schema.Types.Mixed, required: true }
}, { timestamps: true, collection: COLLECTION_NAME });

const clothingSchema = new Schema({
   brand: { type: String, required: true },
   size: { type: String },
   material: { type: String }
}, { collection: 'clothes', timestamps: true });

const electronicSchema = new Schema({
   manufacturer: { type: String, required: true },
   model: { type: String },
   color: { type: String }
}, { collection: 'electronics', timestamps: true });


module.exports = {
   product: model(DOCUMENT_NAME, productSchema),
   clothing: model('Clothes', clothingSchema),
   electronic: model('Electonics', electronicSchema),
}
