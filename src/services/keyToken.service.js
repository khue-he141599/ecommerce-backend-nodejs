const keytokenModel = require("../models/keytoken.model");
const { Types } = require("mongoose");
class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            const filter = { user: userId };
            const update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken };
            const options = { upsert: true, new: true };
            const tokens = await keytokenModel.findOneAndUpdate(filter, update, options);

            return tokens ? tokens.publicKey : null;
        } catch (e) {
            return e;
        }
    };

    static findByUserId = async (userId) => {
        const userIdParseObj = new Types.ObjectId(userId);
        const keyModel = await keytokenModel.findOne({ user: userIdParseObj }).lean();
        return keyModel;
    }

    static removeKeyById = async (id) => {
        return await keytokenModel.deleteOne(id).lean();
    }

    static findByRefreshToken = async (refreshToken) => {
        return await keytokenModel.findOne({ refreshToken: refreshToken });
    }

    static findOneAndUpdate = async (userId, dataUpdate) => {
        const filter = { user: userId };
        const update = dataUpdate;
        const options = { upsert: true, new: true };
        const tokens = await keytokenModel.findOneAndUpdate(filter, update, options);
    }
    
    static findByRefreshTokenUsed = async (refreshToken) => {
        return await keytokenModel.findOne({ refreshTokensUsed: refreshToken });
    }

    static deleteKeyByUserId = async (userId) => {
        const userIdParseObj = new Types.ObjectId(userId);
        return await keytokenModel.deleteOne({ user: userIdParseObj });
    }
}

module.exports = KeyTokenService;
