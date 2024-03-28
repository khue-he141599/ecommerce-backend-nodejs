const AccessService = require("../services/access.service");

class AccessController {

    static login = async(req, res, next) => {
        const result = await AccessService.login(req.body);
        return res.status(200).json({
            code: "success",
            metadata: result
        });
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
