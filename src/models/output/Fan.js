const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Fan = new Schema({
    status: { type: Number, default: 0 }, // 0 -> 255
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Fan', Fan);
