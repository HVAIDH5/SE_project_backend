const client = require('../config/db');
var { feedVerify, rate } = require('../Middlewares/feedback');
const jwt = require('jsonwebtoken');

exports.addfeedback = (req, res) => {
  // console.log(" run");
  const token = req.headers.authorization;
  console.log(token);
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(decoded) // bar
      const email = decoded.email;
          
      console.log("Inside controllers");

      const movieName = req.query.movieName;
      const {   staring,feedbackText } = req.body;

      if (rate === 0) {
        
    
            client.query(`INSERT INTO userfeedback (movieName , email , stars, feedbackText) values('${movieName}','${email}','${staring}' , '${feedbackText}');`)
           
              .then(() =>  res.status(200).json({
                message: "Feedback successfully Submitted"
              })
              )
           
        .catch((err) => {
            console.log(err);
            res.status(500).json({
              message: "Error Submitting Feedback"
            })
          })
    
        
        
          
      }
      else {
      
        client.query(`INSERT INTO  userfeedback (movieName , email , stars , feedbackText ) values('${movieName}','${email}','${staring}' , '${feedbackText}');`)
     
     
        res.send(data.rows)
     
     
     
        res.status(200).json({
          message: "Feedback successfully Submitted"
          })
      }
    }
    
  });
};


exports.addfeedback2 = (req, res) => {

  console.log(req.query.movieName)
  console.log(querystring.parse(url));
}