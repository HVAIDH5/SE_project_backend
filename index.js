require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const authRoutes = require("./routes/auth");
const feedbackRoutes = require("./routes/feedBack");
const booknowRoutes = require("./routes/booknow");
const forgotpassRoutes = require("./routes/forgotpass");
const contactusroute = require("./routes/contactus");
const client = require("./config/db");



app.use(express.json());


const port = process.env.PORT || 3000;

client.connect(() => {
    console.log("Databse Connected")
})

// -----------------------------------------------------------------------------------------

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    next();
  });
//-------------------------------------------------------------------------------------------








app.get("/", (req, res) => {
    res.status(200).send("Server is up and running!!");
});

app.use("/forgotpass", forgotpassRoutes);
app.use("/contactus", contactusroute);


app.use("/auth", authRoutes);

app.use("/feedback", feedbackRoutes);

app.use("/booknow", booknowRoutes);


app.listen(port, () => {
    console.log("Server is Running" );
});