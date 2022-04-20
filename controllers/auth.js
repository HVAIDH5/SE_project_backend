const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../config/db')



exports.signUp = (req, res) => {

    
    
    
    const { username, email, password } = req.body;
    
    //NOTE: check for exeistance of username and email


  client.query(`select * from users where email = '${email}'`)
      .then((data) => {
            // console.log(data);
          const valid = data.rows;
            if (valid.length != 0) {
                res.status(400).json({
                    error: "Email already exist"
                });
          }
            else {
                
                // console.log(token);
                
                    //NOTE: Hash password
                
                    bcrypt.hash(password, 12, (err, hash) => {
                
                        if (err) {
                            res.status(500).json({
                                error: "Internal server error"
                            })
                        }
                        const user = {
                            username,
                            email,
                            password: hash,
                        };
                        client.query(`INSERT INTO USERS (username, email, password) VALUES('${user.username}', '${user.email}', '${user.password}')`)
                            .then((data) => {
                                console.log(data);
                                var token = jwt.sign({
                                    username: username,
                                    email: email,
                                    
                                },
                                    process.env.SECRET_KEY
                                );
                                res.status(200).json({
                                    message: "User added successfully",
                                  token: token,
                                    username: username,
                                })
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(500).json({                                    
                                    error: "Database Error! "
                                })
                            })

                    
                    });
                    //NOTE:Generate token
                 
                    
                    
                
          }
                
            
            
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "Database Error! "
            })
        });

    //NOTE : send response to user along with token .

   
};

// --------------------------------------------------------------------------------------------------------

exports.signIn = (req, res) => {
       const { email, password } = req.body;
  console.log(email);
  console.log(password);
        client.query(`SELECT * FROM users WHERE email = '${email}';`)
      .then((data) => {
        userData = data.rows;
        const username = data.rows[0].username;
        console.log(username);
  
         if (userData.length === 0) {
        
          res.status(400).json({
            error: "User does not exist, signup instead!",
          });
        } else {
          
          bcrypt.compare(password, userData[0].password, (err, result) => {
            if (err) {
              
              res.status(500).json({
                error: "Server error!",
              });
            } else if (result === true) {
              
              const token = jwt.sign(
                {
                  email: email,
                },
                process.env.SECRET_KEY
              );
              res.status(200).json({
                message: "User signed in successfully",
                token: token,
                username: username,
              });
            } else {
             
              res.status(400).json({
                error: "Enter correct password!",
              });
            }
          });
        }
      })
      .catch((err) => {
       
          res.status(500).json({
              error: "Database error occurred!",
          });
        });
    };

