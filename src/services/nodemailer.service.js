const nodemailer = require("nodemailer");

//Nodemailer configuration
const transporter = nodemailer.createTransport({
  host:  'smtp.office365.com',
  port: '587',
  secure: false, // // true for 465, false for other ports
  auth: {
    user: 'kumzitseverywhere@kumzits.com',
    pass: 'gV2rw2RE8rAK9Mc',
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