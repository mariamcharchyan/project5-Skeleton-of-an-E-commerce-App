const nodemailer = require('nodemailer');

function send_Mail(mail, code){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{ 
            user: "mariam.charchyan.96@gmail.com",
            pass: "kslgcjoqkcxkmhqr"
            },
        tls:{
            rejectUnauthorized: false
            }
    });
        
    const mailOptions = {
        from: "mariam.charchyan.96@gmail.com",
        to: mail,
        subject: 'Sending Email using Node.js',
        text: `http://localhost:3000/verify/${code}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){ //sendMail() մեթոդա
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {send_Mail};