const AccessService = require("../services/access.service");

class AccessController {

    static handlerRefreshToken = async (req, res) => {
        try {
            return res.status(200).json({
                code: "success",
                metadata: await AccessService.handlerRefreshToken(req)
            });
        } catch (err) {
            return res.status(500).json({
                code: "error",
                metadata: err.message
            });
        }
    }

    static logout = async (req, res) => {
        try {
            const result = await AccessService.logout(req.keyStore);
            return res.status(200).json({
                code: "success",
                metadata: result
            });
        } catch (err) {
            return res.status(500).json({
                code: "error",
                metadata: err.message
            });
        }
    }

    static login = async (req, res) => {
        try {
            const result = await AccessService.login(req.body);
            return res.status(200).json({
                code: "success",
                metadata: result
            });
        } catch (err) {
            return res.status(500).json({
                code: "error",
                metadata: err.message
            });
        }
    }

    static signUp = async (req, res, next) => {
        try {
            console.log("request body signUp", JSON.stringify(req.body));
            const createUser = await AccessService.signUp(req.body);
            return res.status(200).json({
                code: "success",
                metadata: createUser,
            });
        } catch (e) {
            next(e);
        }
    };
}


module.exports = AccessController;
