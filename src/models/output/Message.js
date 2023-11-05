const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    checked: { type: String, default: 'no' }, // no, yes
    content: { type: String, default: '' },
    img: { type: String, default: '' }, // img source
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', Message);
