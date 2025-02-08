const nodemailer = require('nodemailer');
const serverConfig = require('../config/serverConfig.json')
const smtpConfig = serverConfig.smtp
const crypto = require('crypto');
const oneTimePass = require("../models/OTPs")
const User = require("../models/User");
const jwtConfig = require("../config/jwtConfig.json")
const jwt = require("jsonwebtoken");
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

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

const sendOTP = async (req, res) => {
  const { email, otpExpiration } = req.body;
  console.log(email, otpExpiration,"inside send otp req.body")

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + otpExpiration); // OTP valid for 5 minutes

  try {
    // let user = User.findOne({email})
    let user = await User.findOne({ email });
    let alreadyRequested = await oneTimePass.findOne({email})

    // console.log()

    if (alreadyRequested) {
      await oneTimePass.findOneAndDelete({email})
    }

    if (!user) { return res.status(200).json({message:"This e-mail is not registered, please sign up.",resTitle:"not-registered",success:true})}

    console.log(user,"This is retrived user")

    if (!user.isVerified) { return res.status(200).json({success:true,message:"Please click on the link sent to your mail to verify your account",resTitle:"not-verified"})}
  
    const generatedOTP = new oneTimePass ({
      email,
      otp,
      expiresAt
    })
    
    if (generatedOTP) {
      await generatedOTP.save()
    }

    // test html template
       // Resolve the path to the Handlebars template
  const templatePath = path.resolve(__dirname, '../mailHtmlTemplates/otpTemplate.hbs');

  // Read the template file
  const source = fs.readFileSync(templatePath, 'utf-8');
  const template = handlebars.compile(source);

  // Use the template to generate HTML content
  const html = template({ otp });
    // test html template ends
    res.status(200).json({ success: true, message: 'OTP sent to email',expiresAt ,email});
    await sendEmail(email,"Sign in with OTP",`Dear, user this OTP is valid for 15 mins :- ${otp}`,html)
  
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

const verifyOTP = async(req,res) => {
try {
const {email,otpInput} = req.body
console.log(email,"inside verify otp req.body")

let retrivedMail = await oneTimePass.findOne({email})

if (retrivedMail) {
  if (retrivedMail.otp === otpInput.trim()) {
    if (retrivedMail.expiresAt > new Date(Date.now())) {
      await oneTimePass.findOneAndDelete({email})
      res.status(200).json({message:"this message is from verify OTP",isMatch:true,isExpired:false})
    } else {
      res.status(200).json({message:"this message is from verify OTP",isMatch:true,isExpired:true})
    }
  }else{
    res.status(200).json({message:"this message is from verify OTP",isMatch:false})
  }
}

} catch (error) {
res.status(500).json({message:"internal server error"})
}
}

// Generate a 6-digit OTP
const generateOTP = () => {
return crypto.randomInt(100000, 999999).toString();
};


module.exports = {
sendEmail,
sendOTP,
verifyOTP,
generateOTP
};
