const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Relay = new Schema({
    status: { type: Number, default: 0 }, // 0, 1
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Relay', Relay);
