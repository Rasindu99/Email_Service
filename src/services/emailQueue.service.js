const emailQueue = require('./bull.service');
const { sendEmail } = require('./nodemailer.service');

// Log job lifecycle events
emailQueue.on('waiting', (jobId) => {
  console.log(`Job ${jobId} is waiting to be processed.`);
});

emailQueue.on('active', (job) => {
  console.log(`Job ${job.id} is now active.`);
});

emailQueue.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

emailQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error:`, err);
});

emailQueue.on('stalled', (job) => {
  console.warn(`Job ${job.id} stalled`);
});

// Add emails to Queue 
const addEmailToQueue = async (emailData) => {
  try {
    await emailQueue.add(emailData, {});
    // console.log("Email Job added to queue .");

    // Pause the queue after adding the job
    await emailQueue.pause();
    //console.log('Queue paused. Waiting for the next step...');
    
    // Simulate waiting for some time 
    // setTimeout(async () => {
    //   console.log('Resuming the queue');
    //   await emailQueue.resume(); // Resume the queue after waiting
    // }, 50); 

  } catch (error) {
    //console.error('Failed to add job to queue: ',error);
    throw error;
  }
}

// Process jobs from the queue
emailQueue.process( async (job) => {
  const { from, to, subject, text } = job.data;
  //console.log(`Processing job ${job.id} ...` );

  try {
    await sendEmail({from, to, subject, text });
    //console.log(`Job ${job.id} completed sucessfully!`);
  } catch (error) {
    console.error(`Job ${job.id} failed:`, error);
    throw error;
  }
});


module.exports = { addEmailToQueue };