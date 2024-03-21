"use strict";

const { model, Schema } = require("mongoose");

var keyTokenSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Shop",
        },
        publicKey: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true, collection: "Keys" }
);

module.exports = model("Key", keyTokenSchema);
