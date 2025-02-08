const mongoose = require('mongoose');

const EnquiriesSchema = new mongoose.Schema({
    email:String,
    propertyId:String,
    fullName:String,
    phone:String,
    description: String,
    propertyImage:String,
    date: Date,
    dateString: String,
    readStatus: Boolean,
    propertyTitle:String
  });

Enquiries = mongoose.model('Enquiry', EnquiriesSchema);

module.exports = Enquiries