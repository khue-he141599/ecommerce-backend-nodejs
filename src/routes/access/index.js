const express = require("express");
const router = express.Router();
const AccessController = require("../../controllers/access.controller");
const { authentication } = require("../../auth/authUtils");

router.post("/shop/signup", AccessController.signUp);
router.post("/shop/login", AccessController.login);

router.use(authentication)

router.post("/shop/logout", AccessController.logout);


module.exports = router;
