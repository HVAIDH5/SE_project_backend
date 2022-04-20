const express = require("express");
const { verifyToken } = require("../Middlewares/authverify");
const {addfeedback ,addfeedback2} = require("../controllers/feedBack");
const { feedVerify } = require("../Middlewares/feedback");
const router = express.Router();


router.post("/add", verifyToken, addfeedback);




module.exports = router;