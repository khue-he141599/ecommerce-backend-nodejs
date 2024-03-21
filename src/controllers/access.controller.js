class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log("signUp", req.body);
            return res.status(200).json({
                code: "success",
                metadata: { id: 1 },
            });
        } catch (e) {
            next(e);
        }
    };
}

module.exports = new AccessController();
