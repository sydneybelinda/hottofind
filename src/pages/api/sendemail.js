"use strict";

import {MAILUSER, MAILPASSWORD} from "../../../config"


const nodemailer = require("nodemailer");

export default async (req, res) => {
    if (req.method === "POST") {
    const { to, subject, html } = req.body;

    //   const to = "launerb@gmail.com";
    //   const subject = "Hello ✔";
    //   const html = "<b>Hello world?</b>";


      try {

        let transporter = nodemailer.createTransport({
            host: "mail.smtp2go.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: MAILUSER, // generated ethereal user
              pass: MAILPASSWORD // generated ethereal password
            }
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"HotToFind" <donotreply@hottofind.com>', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
        //    text: "Hello world?", // plain text body
            html: html // html body
          });


          res.status(200).json({status: "email successful"});
    } catch (err) {
        res.status(400).json({error: err});
    }


// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "mail.smtp2go.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "hottofind", // generated ethereal user
//       pass: "YWd3dWRic3Y1bTkw" // generated ethereal password
//     }
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"HotToFind" <donotreply@hottofind.com>', // sender address
//     to: "launerb@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>" // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);
    }

}