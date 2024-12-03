const nodemailer = require("nodemailer");

//Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: 'mxslurp.click',
  port: '2525',
  secure: false, // // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async ({ from, to, subject, text}) => {
  try {
    await transporter.sendMail({ from, to, subject, text});
    return {success: true, message: "Email sent successfully" };
  } catch (error) {
    return { success: false, message: "Failed to send email", error};
  }
};

module.exports = { sendEmail };