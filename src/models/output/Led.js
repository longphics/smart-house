const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Led = new Schema({
    status: { type: Number, default: 0 }, // 0, 1, 2
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Led', Led);
