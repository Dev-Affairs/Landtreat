const nodemailer = require('nodemailer');
const serverConfig = require('../config/serverConfig.json')
const smtpConfig = serverConfig.smtp

let transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: {
      user: smtpConfig.defaultMail,
      pass: smtpConfig.passKey
    },
    tls: {
      rejectUnauthorized: false,
    },
    logger: smtpConfig.logger,
    debug: smtpConfig.debug
  });
  
  
  const sendEmail = async (to,subject,text,html) => {
    try {
      let mailOptions = {
        from: smtpConfig.defaultMail,
        to,
        subject,
        text,
        html
      };
  
      console.log('Sending email:', mailOptions);
  
      let info = await transporter.sendMail(mailOptions);
  
      console.log('Email sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  
module.exports = {
    sendEmail
    };
    