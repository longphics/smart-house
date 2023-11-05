const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Gas = new Schema({
    data: { type: Number, default: 0 }, // 0, 1
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Gas', Gas);
