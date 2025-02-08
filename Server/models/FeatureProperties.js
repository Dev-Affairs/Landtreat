const mongoose = require('mongoose');

const featurePropertiesSchema = new mongoose.Schema({
    propertyIdList: Array,
    lastUpdated: Date
  });

FeatureProperties = mongoose.model('featureProperties', featurePropertiesSchema);

module.exports = FeatureProperties