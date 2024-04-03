const express = require("express");
const router = express.Router();
const AccessController = require("../../controllers/access.controller");
const { authentication, authentication_v2 } = require("../../auth/authUtils");

router.post("/shop/signup", AccessController.signUp);
router.post("/shop/login", AccessController.login);

router.use(authentication_v2)

router.post("/shop/logout", AccessController.logout);
router.post("/shop/refreshToken", AccessController.handlerRefreshToken);


module.exports = router;
