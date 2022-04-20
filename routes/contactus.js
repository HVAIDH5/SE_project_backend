const express = require("express");
const router = express.Router();
const { sendmail } = require("../controllers/contactus");

router.post("/sendmail", sendmail);

module.exports = router;