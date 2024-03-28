const { findById } = require("../services/apiKey.service");

const HEADER = {
    API_KEY: "x-api-key",
    AUTHORIZATION: "athorization",
};

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                code: 403,
                message: "Forbidden Request",
            });
        }
        const objKey = await findById(key);
        if (!objKey) {
            return res.status(403).json({
                code: 403,
                message: "Forbidden Request",
            });
        }
        req.objKey = objKey;
        return next();
    } catch (err) {}
};

const permissions = (permission) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: "Permissions denied",
            });
        }

        if (!req.objKey.permissions.includes(permission)) {
            return res.status(403).json({
                message: "Permissions denied",
            });
        }
        return next();
    };
};

module.exports = { apiKey, permissions };
