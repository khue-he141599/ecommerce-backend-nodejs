const JWT = require("jsonwebtoken");
const asyncHandler = require("../helpers/asyncHandler");
const KeyTokenService = require("../services/keyToken.service");

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, publicKey, { expiresIn: "2 days" });
        const refreshToken = await JWT.sign(payload, privateKey, { expiresIn: "7 days" });

        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error(err);
            } else {
                console.log("decoded: ", decode);
            }
        });
        return { accessToken, refreshToken };
    } catch (e) {

    }
};

const authentication = asyncHandler(async (req, res, next) => {
    const userId = req.headers['x-client-id'];
    if (!userId) {
        throw new Error('Invalid request');
    }

    const keyStore = await KeyTokenService.findByUserId(userId);
    if (!keyStore) {
        throw new Error('Not found keyStore');
    }

    const accessToken = req.headers['authentication'];
    if (!accessToken) {
        throw new Error('Invalid request');
    }

    try {
        const decodeUser = JWT.decode(accessToken, keyStore.publicKey);
        if (userId != decodeUser.userId) {
            throw new Error('Invalid user');
        }
        req.keyStore = keyStore;
        return next();
    } catch (err) {
        next(err);
    }
})

const verifyJWT = async (token, keySecret) => {
    return await JWT.verify(token, keySecret);
}

module.exports = { createTokenPair, authentication, verifyJWT };
