const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");

const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            const shop = await shopModel.findOne({ email }).lean();
            if (shop) {
                return {
                    code: "xxxx",
                    message: "Shop already registered",
                };
            }

            const hashPassword = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({ name, email, password: hashPassword, roles: [RoleShop.SHOP] });

            if (newShop) {
                const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: "pkcs1",
                        format: "pem",
                    },
                    privateKeyEncoding: {
                        type: "pkcs1",
                        format: "pem",
                    },
                });

                const publicKeyString = await KeyTokenService.createKeyToken({ userId: newShop._id, publicKey: publicKey });

                if (!publicKeyString) {
                    return {
                        code: "xxxx",
                        message: "publicKeyString error",
                    };
                }

                //luu va db thi luu dang string => khi su dung chuyen sang dang object de ma hoa
                const publicKeyObject = crypto.createPublicKey(publicKeyString);
                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyObject, privateKey);
                return {
                    code: 201,
                    metadata: {
                        shop: newShop,
                        tokens,
                    },
                };
            }

            return {
                code: 200,
                metadata: null,
            };
        } catch (e) {
            return {
                code: "xxx",
                message: e.message,
                status: "error",
            };
        }
    };
}

module.exports = AccessService;
