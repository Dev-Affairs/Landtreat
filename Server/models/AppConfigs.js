const mongoose = require('mongoose');

const AppConfigSchema = new mongoose.Schema({
    id: Number,
    config: Object
  });

AppConfig = mongoose.model('AppConfig', AppConfigSchema);

module.exports = AppConfig