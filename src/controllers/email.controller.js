const { addEmailToQueue } = require('../services/emailQueue.service');

const sendEmailController = async (req, res) => {
  const { from, to, subject, text } = req.body;

  if(!from || !to || !subject || !text ) {
    return res.status(400).json({ message: "All fields are required (from, to, subject, text)."});
  }

  try {
    await addEmailToQueue({ from, to, subject, text });
    res.status(200).json({ success: true, message: 'Email job added to the queue' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add job to the queue', error });
  }
}

module.exports = { sendEmailController };