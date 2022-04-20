const client = require('../config/db')

exports.seatdata = (req, res, next) => {
    
    const { selectedSeats } = req.body
    const movieName = req.query.movieName;
    console.log(selectedSeats);
    // con.log(movieName);
    for (let i = 0; i < selectedSeats.length; i++) {
        var seatno = selectedSeats[i];
        console.log(seatno)
        client.query(`INSERT INTO SEATDB (moviename , seat ) values ('${movieName}' , '${seatno}');`);
            
    }
    // console.log("Sahi chala")
    next();
};

