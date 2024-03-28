const express = require("express");
const router = express.Router();
const AccessController = require("../../controllers/access.controller");

router.post("/shop/signup", AccessController.signUp);
router.post("/shop/login", AccessController.login);


module.exports = router;
