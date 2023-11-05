const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Auto = new Schema({
    light: { type: String, default: 'off' }, //on, off
    fan: { type: String, default: 'off' }, //on, off
    door: { type: String, default: 'off' }, //on, off
    room: { type: String, default: 'off' }, //on, off
    explosion: { type: String, default: 'off' }, //on, off
});

module.exports = mongoose.model('Auto', Auto);
