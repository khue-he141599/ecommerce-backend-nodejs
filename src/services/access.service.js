const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair, verifyJWT } = require("../auth/authUtils");
const { getInforData } = require("../utils");
const { findByEmail } = require("./shop.service");

const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

class AccessService {

    static handlerRefreshToken = async (req) => {
        const { refreshTokensUsed, privateKey, publicKey, refreshToken } = req.keyStore;
        const refreshTokeHeader = req.refreshToken;
        const { userId, email } = req.user;

        if (refreshTokensUsed.includes(refreshToken)) {
            await KeyTokenService.deleteKeyByUserId(userId);
            throw new Error('Something went wrong! Please relogin');
        }

        if (refreshToken !== refreshTokeHeader) {
            throw new Error('Refresh token is expired!');
        }

        const foundShop = await findByEmail(email);
        if (!foundShop) throw new Error('Shop is not registered!');

        const token = await createTokenPair({ userId, email }, publicKey, privateKey);
        const dataUpdate = {
            $set: {
                refreshToken: token.refreshToken
            },
            $addToSet: {
                refreshTokensUsed: refreshTokeHeader
            }
        }
        await KeyTokenService.findOneAndUpdate(userId, dataUpdate);

        return {
            user: { userId, email },
            token
        }
    }

    static logout = async (keyStore) => {
        const delKey = await KeyTokenService.removeKeyById(keyStore._id);
        return delKey;
    }

    static login = async ({ email, password, refreshToken }) => {
        const foundShop = await findByEmail(email);
        if (!foundShop) {
            throw new Error("Shop not found");
        }

        const match = bcrypt.compare(password, foundShop.password);

        if (!match) {
            throw new Error("Authentication failed");
        }

        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");
        const { _id: userId } = foundShop._id;
        const tokens = await createTokenPair({ userId: userId, email }, publicKey, privateKey);

        await KeyTokenService.createKeyToken({ userId: userId, publicKey, privateKey, refreshToken: tokens.refreshToken });

        return {
            code: 201,
            metadata: {
                shop: getInforData({ fileds: ["_id", "name", "email"], object: foundShop }),
                tokens
            },
        };
    };

    static signUp = async ({ name, email, password }) => {
        try {
            const shop = await shopModel.findOne({ email }).lean();
            if (shop) {
                return {
                    code: "xxxx",
                    message: "Shop already registered"
                };
            }

            const hashPassword = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({ name, email, password: hashPassword, roles: [RoleShop.SHOP] });

            if (newShop) {
                return {
                    code: 201,
                    metadata: {
                        shop: getInforData({ fileds: ["_id", "name", "email"], object: newShop }),
                    }
                };
            }

            return {
                code: 200,
                metadata: null,
            };
        } catch (e) {
            return {
                code: "500",
                message: e.message,
                status: "error"
            };
        }
    };
}

module.exports = AccessService;
