const nodemailer = require("nodemailer");



exports.sendmail = (req, res) => {
    const email = req.body.email;
    const name = req.body.username;
    const message = req.body.message;


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'movieplex271@gmail.com',
            pass: 'Movie12345@'
        }
    });
          
    var mailOptions = {
        from: 'movieplex271@gmail.com',
        to: 'rithvik0732@gmail.com ,img_2020025@iiitm.ac.in , imt_2020099@iiitm.ac.in',
        // to: 'rithvik0732@gmail.com',
        subject: 'USER FEEDBACK',
        text: ` You have recieved a message from a user on Movieplex.
            Email: ${email}
            Name: ${name}
            Message: ${message}
            Hope You like this mailing service :-) `,
        
    };
          
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.status(200).json({
        message: "Email Sent successfully to developers",
    })
};