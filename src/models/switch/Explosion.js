const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Explosion = new Schema({
    speaker: { type: String, default: 'off' }, // on, off
    message: { type: String, default: 'off' }, // on, off
    powerdown: { type: String, default: 'off' }, // on, off
});

module.exports = mongoose.model('Explosion', Explosion);
