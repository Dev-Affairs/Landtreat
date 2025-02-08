const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: Date,
    dateString: String,
    readStatus: Boolean,
    notificationTo: Array,
    link: String,
    type: String,
    fromUser: String
  });

Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification