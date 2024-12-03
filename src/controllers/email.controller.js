const { sendEmail } = require("../services/nodemailer.service");

const sendEmailController = async (req, res) => {
  const { from, to, subject, text } = req.body;

  if(!from || !to || !subject || !text ) {
    return res.status(400).json({ message: "All fields are required (from, to, subject, text)."});
  }

  const deliveredReport = await sendEmail ({ from, to, subject, text});

  if(deliveredReport.success) {
    res.status(200).json({ message: deliveredReport.message });
  } else {
    res.status(500).json({ message: deliveredReport.message, error: deliveredReport.error});
  }
}

module.exports = { sendEmailController };