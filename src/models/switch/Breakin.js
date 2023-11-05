const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Breakin = new Schema({
    speaker: { type: String, default: 'off' }, //on, off
    message: { type: String, default: 'off' }, //on, off
    blinking: { type: String, default: 'off' }, //on, off
});

module.exports = mongoose.model('Breakin', Breakin);
