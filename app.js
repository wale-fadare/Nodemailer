const http = require('http');
const express = require('express');
const request = require('request');
const path = require("path");
const bodyParser = require('body-parser');
require('dotenv').config();
const nodemailer = require ('nodemailer');
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
  });

  app.post('/', function(req, res) {
    const { name, email, subject, text } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.DESTINATION_EMAIL,
        subject: "New Message From Website",
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${text}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}); 

app.listen(process.env.PORT || 3000, function() {
    console.log('Example app listening on port 3000!');
  });