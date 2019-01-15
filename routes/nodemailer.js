const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// email test
router.get('/nodemailer', function (req, res) {
    res.render('nodemailer');
});


//submit form
router.post('/send', (req, res) => {

    //Body-parser data email
    vælgBygning = req.body.vælgBygning;
    udfyldtAf = req.body.udfyldtAf;
    telefon = req.body.telefon;
    besked = req.body.besked;
    vedhæft = req.body.vedhæft;

    //Text in email
    const output = `
    <h3>Besked til beboer i bygning `+ vælgBygning + `</h3>
    <ul>  
    `+ besked + `
    </ul>
    <p>Venlig hilsen Bestyrelsen</p>
    `;

    //Create PDF with pdfkit
    //doc = new PDFDocument({compress:false});





    // Create the transporter with the required configuration for Outlook
    var transporter = nodemailer.createTransport({
        service: 'gmail', // hostname
        auth: {
            user: 'kettebovaskeri@gmail.com',
            pass: 'CLC123456'
        }
    });

    function emailSwitch() {
        vælgHus = req.body.vælgHus
        //var lederEmail = req.body.lederEmail;

        switch (vælgHus) {
            case '22-26':
                return "caspercpl@gmail.com"; //Denne email vil blive lavet om til en function som henter alle email fra bruger i bygning 22-26
            case '26-30':
                return "caspercpl@gmail.com"; //Denne email vil blive lavet om til en function som henter alle email fra bruger i bygning 26-30
                break;
            case '30-32':
                return "caspercpl@gmail.com"; //Denne email vil blive lavet om til en function som henter alle email fra bruger i bygning 30-32
                break;
            default:
                return "caspercpl@gmail.com"
        }
    };


    // setup e-mail data, even with unicode symbols
    var mailOptions = {
        from: 'kettebovaskeri@gmail.com', // sender address (who sends)
        to: emailSwitch(), // list of receivers (who receives)
        subject: 'Besked til beboer i bygning' + vælgBygning, // Subject line
        html: output,// html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }

        console.log('Message sent: ' + info.response);

        res.redirect('/')

        console.log(mailOptions.to)
    });

});

router.post('/Test', (req, res) =>{
    const output = `
    <p>You have a new Message</p>
    <h3>Contact Details</h3>
    <ul> 
    <li> Name:${req.body.name}</li> 
    <li> Address:${req.body.address}</li> 
    <li> Email:${req.body.email}</li> 
    <li> Phone:${req.body.phone}</li> 
   </ul>
   <h3>Message</h3>
   <p>${req.body.message}</p>
    `;  
    
    // Create the transporter with the required configuration for Outlook
    let transporter = nodemailer.createTransport({
        service: 'gmail', // hostname
        auth: {
            user: 'kettebovaskeri@gmail.com',
            pass: 'CLC123456'
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    function emailSwitch() {
        vælgHus = req.body.vælgHus
        //var lederEmail = req.body.lederEmail;

        switch (vælgHus) {
            case '22-26':
                return "caspercpl@gmail.com";
            case '26-30':
                return "caspercpl@gmail.com";
                break;
            case '30-32':
                return "caspercpl@gmail.com";
                break;
            default:
                return "caspercpl@gmail.com"
        }
    };


    // setup e-mail data, even with unicode symbols
    let mailOptions = {
        from: ' "Nodemailer test" <kettebovaskeri@gmail.com>', // sender address (who sends)
        to: 'caspercpl@gmail.com', // list of receivers (who receives)
        subject: 'You suck dude!', // Subject line
        text: req.body.message,
        html: output,// html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }

        console.log('Message sent: ' + info.response);
        res.render('nodemailer', {msg:'Email has been sent.'});

        console.log(mailOptions.to)
    });

});


// Export router to be used in index.js
module.exports = router;
