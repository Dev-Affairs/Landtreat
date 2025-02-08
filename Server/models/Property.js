const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    propertyId: String,
    postTags: Array,
    publishedOn: Date,
    publishedBy: String,
    publisherEmailId: String,
    postedBy: String,
    hasAdminAttended: Boolean,
    approvalStatus: String,
    propertyDetails: Object,
    formConfig: Object,
    slug: String
  });

Property = mongoose.model('Property', propertySchema);

module.exports = Property