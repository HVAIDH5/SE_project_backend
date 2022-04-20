const nodemailer = require('nodemailer');
const client = require('../config/db');
const bcrypt = require('bcrypt');

exports.mailHandler = (req, res) => {
    const useremail = req.body.email;
    const username = req.body.username;

    // client.query(`SELECT password FROM users WHERE email = '${useremail}' AND username = '${username}';`)
    //     .then((data) => {
    //         // console.log(data);
    //         const password = (data.rows[0].password);
    //         console.log(password);


    //     })
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        return result;
    }
    let newpassword = generateString(8);
    
    // -----------------------------------------------------------------------------------
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'movieplex271@gmail.com',
            pass: 'Movie12345@'
        }
    });
          
    var mailOptions = {
        from: 'movieplex271@gmail.com',
        // to: 'rithvik0732@gmail.com ,imt_2020099@iiitm.ac.in , imt_2020099@iiitm.ac.in',
        to: `${useremail}`,
        subject: 'PASSWORD CHANGE',
        text: `Hello ${username} , Below are your details and your new password .
            Email: ${useremail}
            Username: ${username}
            Your new password is: ${newpassword}`
    };
          
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
        // ----------------------------------------------------------------------------
    bcrypt.hash(newpassword, 12, (err, hash) => {
                
        if (err) {
            res.status(500).json({
                error: "Internal server error"
            })
        }
              
        newpassword = hash;

        client.query(`update users
              SET password = '${newpassword}'
              where email='${useremail}' AND username ='${username}';`)
    });
    
        res.status(200).json({
            message: "Password Changed successfully",
        })
    
};