const User = require("../models/User");
const Notification = require("../models/Notification");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig.json");
const crypto = require("crypto");
// const { sendEmail,generateOTP } = require("./nodeMailerController");
const {sendEmail} = require('../services/mail-service')
const serverConfig = require("../config/serverConfig.json")

module.exports.signUpUser = async (req, res) => {
  console.log("body-", req.body);
  try {
    // Check if user exists
    const { firstName, lastName, email, password , role} = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "This e-mail is already in use" });
    }

    let UID = crypto.randomBytes(16).toString("base64url");
    console.log(UID);
    isVerified = false;
    verificationLinkTimeStamp = Date.now() + 900000;

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      UID,
      isVerified,
      verificationLinkTimeStamp,
      role: role || "user"
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save the new user
    await newUser.save();

    // Send a welcome email after successful signup
     sendEmail(
      email, // recipient's email from req.body
      "Welcome to Landtreat!",
      `Thanks for signing up! please verify your account : ${serverConfig.adminAppUrl}/verifyUser?UID=${UID}`
    );

    res.send({
      success: true,
      message: "Sign Up Successful, email sent",
      data: newUser,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false });
  }
};

module.exports.forgotPassword = async(req,res) => {
try {
  const {email,password} = req.body

  let requestedMail = await User.findOne({email})

   if (requestedMail) {

     // Hash password
     const salt = await bcrypt.genSalt(10);
     requestedMail.password = await bcrypt.hash(password, salt);
 
     // Save the new user
     await requestedMail.save();
 
    res.status(200).json({ message: "User found" ,success:true});
  } else {
    res.status(400).json({ message: "User not registered" });
  }
  console.log(req.body,"testing here --")
} catch (error) {
}
}



module.exports.login = async (req, res) => {
  const { email, password ,loginWithOtp} = req.body;

  console.log(req.body,"finally found the point")

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user){
      return res
        .status(200)
        .json({ msg: "user not found", success: true, authResult: false });
    }

    // Compare password\
    console.log('loginWithOtp--', loginWithOtp)
    console.log('loginWithOtp--', !loginWithOtp)
    if (!loginWithOtp) {      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(200)
          .json({ msg: "Invalid Credentials", success: true, authResult: false });
    }

    let isVerified = user.isVerified;
    // Create JWT
    console.log("user.role--"  , user)
    console.log("user.role--"  , user.role)
    console.log("user.email--"  , user.email)
    const payload = {
      user: {
        id: user.UID,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role || "user"
      },
    };
    jwt.sign(
      payload,
      jwtConfig.JWT_SECRET,
      { expiresIn: jwtConfig.expairationTime },
      (err, token) => {
        if (err) throw err;
        res.json({ token, success: true, authResult: true, isVerified });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: "server error", success: false });
  }
};

module.exports.verifyUser = async (req, res) => {
  try {
    const { UID } = req.body;

    if (UID) {
      console.log("Received UID:", UID);
      // Process the UID as needed
      let user = await User.findOne({ UID });

      if (user) {
        console.log(user, "this is the retrived user");
        if (user.isVerified) {
          user.verificationLinkTimeStamp = null
          await user.save();
          return res.status(400).json({msg:"This link is expired"})
        } else{
          if (user.verificationLinkTimeStamp > Date.now()) {
            user.isVerified = true;
            await user.save();
          } 
        }
      }

      let responseObj = {};
      responseObj["email"] = user.email;
      responseObj["password"] = user.password;
      responseObj["is-verified"] = user.isVerified;
      

      const welcomeNote = new Notification({
        title: "Welcome To Landtreat.",
        content: "Your account has been verified successfully, explore properties with landtreat",
        date: new Date(),
        dateString: new Date().toDateString(),
        readStatus: false,
        notificationTo: [user.email],
        type: "Welcome Notification"
      });
      
      welcomeNote.save();
  
      res.status(200).json(responseObj);
    } else {
      res.status(400).json({ message: "UID not provided" });
    }
  } catch (error) {}
};

module.exports.updateUserRole = async (req, res) => {
  console.log("inside update role--", req.body)
  try {
    const { UID, role } = req.body;
    if(UID){
      let updateData = {
        "$set": {
          "role": role
        }
      }
      let user = await User.findOneAndUpdate(
        { UID}, // Find by 'username' key
        updateData,
        { new: true } // This option returns the updated document
        );
        console.log("user--", user)
        if(user){
          const payload = {
            user: {
              id: user.UID,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role || "user"
            },
          };
          jwt.sign(
            payload,
            jwtConfig.JWT_SECRET,
            { expiresIn: jwtConfig.expairationTime },
            (err, token) => {
              console.log("err---", err)
              if (err) throw err;
              console.log("token--", token)
              res.json({ token, success: true, authResult: true });
            }
          );
        }else{
          res.send({ success: false, message: "Something went wrong"});
        }
    }
    else{
      res.send({ success: false, message: "Invalid request"});
    }
  } catch (error) {
    console.log("eror", error)
    res.status(500).send({ success: false, message: error.message });
  }
};
