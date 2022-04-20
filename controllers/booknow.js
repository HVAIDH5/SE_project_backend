const client = require('../config/db');
const jwt = require('jsonwebtoken');
//email from token 


exports.bookNow = (req, res) => {
  
    const token = req.headers.authorization;
  console.log(token);
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(decoded) // bar
            const email = decoded.email;
            const {selectedSeats , date  } = req.body;
            const movieName = req.query.movieName;
            
          
        
        
            console.log(movieName, " ", selectedSeats, " ", date);
                
            
        
            client.query(`INSERT INTO BOOKDB (movieName ,email, seats,date ) values('${movieName}' , '${email}' ,  '{${selectedSeats}}' , '${date}') ;`)
                .then(
                    res.status(200).json({
                        message: "Movie booked succesfully"
                    })
                ).catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        message: "Error Submitting Feedback"
                    })
                });
            
            
            
        }
    });
 

};


exports.showseat = (req, res) => {
    
   
    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(decoded) 
            const email = decoded.email;
        
    

            client.query(` SELECT * FROM bookdb WHERE email = '${email}' `)
                .then((data) => {

                    console.log(data);
                    res.status(200).send(data.rows);
          
                })
        }

    });
}



exports.sendseat = (req, res) => {

    client.query(`select * from seatdb where movieName = 'Black Panther';`)
    .then((data) => {

        console.log(data);
        res.status(200).send(data.rows);

    })
}