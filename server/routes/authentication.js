const express = require("express")
const router = express.Router()
const controller = require("../controllers/authenticationControllers")


//The route to post credentials for login
router.post("/log-in", controller.postForLogin )

//The route to post credentials for signing up
router.post("/sign-up", controller.postForSignUp )

module.exports = router