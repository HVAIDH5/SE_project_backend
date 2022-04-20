const jwt = require('jsonwebtoken');
const client = require('../config/db')

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            console.log(err);
        }
        console.log(decoded) // bar
        const userEmail = decoded.email;
        client.query(`select * from users where email = '${userEmail}';`)
            .then((data) => {
                console.log(data);
            if (data.rows.length == 0) {
                res.status(400).json({
                    message: "Invalid token"
                });
            }
            next();
    }) 
      
        .catch((err) => {
        res.status(500).json({
            message: "Databse error"
        });
        });
    })
};