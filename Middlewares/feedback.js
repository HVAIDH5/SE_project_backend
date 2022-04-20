const client = require('../config/db')

let rate=0
const rate1 = rate;
const feedVerify = (req, res, next) => {
    // const { movieName } = req.query.movieName;
    const movieName  = req.query.movieName;
    console.log(movieName);
    client.query(`SELECT * FROM FEEDBACK WHERE movieName = '${movieName}' ;`)
        .then((data) => {
            // console.log(data)
            if (data.rows.length == 0) {
                rate = 0;
                    
            
            }
            else {
                rate = 1; 
            }
            
            console.log(rate);
            
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Database Error"
            });
        });

        next();
       
}
// console.log(rate1)
module.exports = {feedVerify : feedVerify , rate : rate}
