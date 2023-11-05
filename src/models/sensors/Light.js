const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Light = new Schema({
    data: { type: Number, default: 1023 }, // 0 -> 1023
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Light', Light);
