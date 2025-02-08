const mongoose = require('mongoose');

const SavedItemSchema = new mongoose.Schema({
    isTrash: Boolean,
    SavedItemId: String,
    publishedOn: Date,
    updatedOn: Date,
    publishedBy: String,
    publisherEmailId: String,
    SavedItemDetails: Object
  });

SavedItem = mongoose.model('SavedItem', SavedItemSchema);

module.exports = SavedItem