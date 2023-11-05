const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Speaker = new Schema({
    status: { type: Number, default: 0 }, // 0 -> 1023
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Speaker', Speaker);
