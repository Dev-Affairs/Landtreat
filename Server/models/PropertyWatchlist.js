const mongoose = require('mongoose');

const propertyWatchlistSchema = new mongoose.Schema({
   userMail:String,
   userId:String,
   savedProperties:Array
  });

PropertyWatchlist = mongoose.model('PropertyWatchlist', propertyWatchlistSchema);

module.exports = PropertyWatchlist