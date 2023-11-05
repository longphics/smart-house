const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Infrared = new Schema({
    data: { type: String, default: '00' }, // 00, 01, 10, 11
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Infrared', Infrared);
