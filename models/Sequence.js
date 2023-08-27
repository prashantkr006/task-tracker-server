const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
    collectionName: { type: String, required: true },
    value: { type: Number, required: true }
});

const Sequence = mongoose.model('Sequence', sequenceSchema);

module.exports = Sequence;
