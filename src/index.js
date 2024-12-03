const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const emailRoutes = require("./routes/email.routes");

// const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json({ limit: '30mb' })); 

// const subject = "Test email";
// const text = "This is my first mail";
// const from = "4858e6ea-7c81-4a95-9128-7c9f24ee9150@mailslurp.net"
// const to = "rasindu0823@gmail.com"

// const transporter = nodemailer.createTransport({
//   host: 'mxslurp.click',
//   port: '2525',
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: '4858e6ea-7c81-4a95-9128-7c9f24ee9150@mailslurp.net',
//     pass: '3uUGXyv1tBDRZu0c1LFLZgdzRmuZUFUl',
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// transporter.sendMail({
//   subject, text, from, to
// }).then(() => {
//   console.log("Email sent")
// }).catch( err => {
//   console.error(err);
// })

app.use("/api/v1", emailRoutes);

app.listen(PORT, () => {
  console.log(`service is running on PORT ${PORT}`);
});
