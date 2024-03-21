const AccessService = require("../services/access.service");

class AccessController {
    static signUp = async (req, res, next) => {
        try {
            console.log("signUp", req.body);
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
