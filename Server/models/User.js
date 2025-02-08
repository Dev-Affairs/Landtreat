const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  },
    role: String,
UID:{
    type:String,
    required:true,
    // unique:true
  },
  isVerified:{
    type:Boolean,
    required:true
  },
  verificationLinkTimeStamp:{
     type: Number || null,
     required:false
  },
  profileImg:String
}, { timestamps: true });

User = mongoose.model('User', UserSchema);

module.exports = User
