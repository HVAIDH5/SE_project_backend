const express = require("express");
const router = express.Router();
const {mailHandler} = require("../controllers/forgotpass");

router.post("/sendmail", mailHandler);

module.exports = router;