const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapasync = require("../utils/wrapasync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userControllers = require("../controllers/users.js")

router
    .route("/signup")
    .get(userControllers.renderSignupForm)
    .post(wrapasync(userControllers.signup));

router
    .route("/login")
    .get(userControllers.renderLoginFrom)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userControllers.login);

    
router.get("/logout", userControllers.logout);

module.exports = router;