const Speaker = require('../models/output/Speaker');
const Fan = require('../models/output/Fan');
const Led = require('../models/output/Led');
const Message = require('../models/output/Message');
const Relay = require('../models/output/Relay');
const Gas = require('../models/sensors/Gas');
const Infrared = require('../models/sensors/Infrared');
const Light = require('../models/sensors/Light');
const Magnetic = require('../models/sensors/Magnetic');
const Temp = require('../models/sensors/Temp');
const Auto = require('../models/switch/Auto');
const Breakin = require('../models/switch/Breakin');
const Explosion = require('../models/switch/Explosion');

const {
    mongooseToObject,
    mongoosesToArray,
    ensureStatusToString,
    ensureDataToString,
    ensureDate,
} = require('../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res) {
        // const fan = new Fan({
        //     status: 100,
        // })

        // fan.save()

        // const led = new Led({
        //     status: 1,
        // })

        // led.save()

        // const message = new Message({
        //     checked: 'no',
        //     content: 'Hello',
        // })

        // message.save()

        // const relay = new Relay({
        //     status: 1,
        // })

        // relay.save()

        // const speaker = new Speaker({
        //     status: 0,
        // })

        // speaker.save()

        // const gas = new Gas({
        //     status: 0,
        // })

        // gas.save()

        // const infrared = new Infrared({
        //     status: '00',
        // })

        // infrared.save()

        // const light = new Light({
        //     data: 100,
        // })

        // light.save()

        // const magnetic = new Magnetic({
        //     data: 1,
        // })

        // magnetic.save()

        // const temp = new Temp({
        //     data: 30,
        // })

        // temp.save()

        // const auto = new Auto({
        //     light: 'on',
        //     fan: 'on',
        //     door: 'on',
        //     room: 'on',
        //     explosion: 'on',
        // })

        // auto.save()

        // const breakin = new Breakin({
        //     speaker: 'on',
        //     message: 'on',
        //     blinking: 'on',
        // })

        // breakin.save()

        // const explosion = new Explosion({
        //     speaker: 'on',
        //     message: 'on',
        //     powerdown: 'on',
        // })

        // explosion.save()

        const findAuto = Auto.findOne({});

        const findBreakin = Breakin.findOne({});

        const findExplosion = Explosion.findOne({});

        const findLed = Led.find({}, null, { sort: { date: -1 } });

        const findFan = Fan.find({}, null, { sort: { date: -1 } });

        const findRelay = Relay.find({}, null, { sort: { date: -1 } });

        const findTemp = Temp.find({}, null, { sort: { date: -1 } });

        const findMessage = Message.find({}, null, { sort: { date: -1 } });

        Promise.all([
            findAuto,
            findBreakin,
            findExplosion,
            findLed,
            findFan,
            findRelay,
            findTemp,
            findMessage,
        ]).then((results) => {
            const auto = mongooseToObject(results[0]);

            const breakin = mongooseToObject(results[1]);

            const explosion = mongooseToObject(results[2]);

            const led = ensureStatusToString(mongooseToObject(results[3][0]));

            const fan = ensureStatusToString(mongooseToObject(results[4][0]));

            const relay = ensureStatusToString(mongooseToObject(results[5][0]));

            const temp = ensureDataToString(mongooseToObject(results[6][0]));

            const messages = ensureDate(mongoosesToArray(results[7]));

            res.render('site', {
                auto,
                breakin,
                explosion,
                led,
                fan,
                relay,
                temp,
                messages,
            });
        });
    }
}

module.exports = new SiteController();
