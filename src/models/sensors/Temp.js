const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Temp = new Schema({
    data: { type: Number, default: 25 }, // 29 -> 55
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Temp', Temp);
