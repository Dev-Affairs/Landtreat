  
const mongoose = require('mongoose');

  
const sequenceSchema = new mongoose.Schema({
    name : String,
    seq: { type: Number, default: 0 }
});


Sequence = mongoose.model('counterSequences', sequenceSchema);

module.exports = Sequence