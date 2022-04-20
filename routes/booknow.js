const express = require("express");
const { verifyToken } = require("../Middlewares/authverify");
const router = express.Router();
const { bookNow } = require("../controllers/booknow");
const { seatdata } = require("../Middlewares/seatinfo");
const { showseat ,sendseat} = require("../controllers/booknow");

router.post("/book", verifyToken,seatdata ,bookNow);
// router.post("/book", verifyToken ,bookNow);

// router.get("/showbook", verifyToken, showseat);

router.get("/blackpanther", sendseat);

router.post("/showbook", showseat);


// router.post("/book", verifyToken,seatdata );
module.exports = router;