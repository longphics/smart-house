const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mqtt = require('mqtt');

const route = require('./routes');
const config = require('./config/index');
const database = require('./config/database');

const Speaker = require('./models/output/Speaker');
const Fan = require('./models/output/Fan');
const Led = require('./models/output/Led');
const Message = require('./models/output/Message');
const Relay = require('./models/output/Relay');
const Gas = require('./models/sensors/Gas');
const Infrared = require('./models/sensors/Infrared');
const Light = require('./models/sensors/Light');
const Magnetic = require('./models/sensors/Magnetic');
const Temp = require('./models/sensors/Temp');
const Auto = require('./models/switch/Auto');
const Breakin = require('./models/switch/Breakin');
const Explosion = require('./models/switch/Explosion');

database.connect();
config(app);
route(app);

server.listen(3000, () => {
    console.log('Server is running!');
});

//////////////////////////////////////////////////////////////////////////
const {
    ledString,
    speakerString,
    drvString,
    relayString,
} = require('./util/adafruit');

// Connect
const username_1 = 'longphi'; // Can change
const username_2 = 'longphi1'; // Can change
// const username_1 = 'CSE_BBC';
// const username_2 = 'CSE_BBC1';

const key_1 = 'aio_hSyr82msWVfYvjPwohMseQUltY3f'; // Can change
const key_2 = 'aio_WExV18RS3GtOo76An2tM4f9mAXoZ'; // Can change

// const key_1 = 'aio_eIzx84QrfGct3jkJM5aW02aKAIbB';
// const key_2 = 'aio_GOii70J59sAf8pkCYFQzT9q6SIXk';

const client_1 = mqtt.connect(
    'mqtt://' + username_1 + ':' + key_1 + '@io.adafruit.com',
);

const client_2 = mqtt.connect(
    'mqtt://' + username_2 + ':' + key_2 + '@io.adafruit.com',
);

// Subscribe
const drv = username_1 + '/feeds/bk-iot-drv';
const led = username_1 + '/feeds/bk-iot-led';
const magnetic = username_1 + '/feeds/bk-iot-magnetic';
const speaker = username_1 + '/feeds/bk-iot-speaker';
const temp = username_1 + '/feeds/bk-iot-temp-humid';
const gas = username_2 + '/feeds/bk-iot-gas';
const infrared = username_2 + '/feeds/bk-iot-infrared';
const light = username_2 + '/feeds/bk-iot-light';
const relay = username_2 + '/feeds/bk-iot-relay';

client_1.on('connect', () => {
    console.log('Connected to ' + username_1);

    client_1.subscribe(drv, function (err) {
        if (err) {
            console.log('Error when subscribe topic: ' + drv);
        } else {
            console.log('Subscribed to: ' + drv);
        }
    });

    client_1.subscribe(led, function (err) {
        if (err) {
            console.log('Error when subscribe topic: ' + led);
        } else {
            console.log('Subscribed to: ' + led);
        }
    });

    client_1.subscribe(magnetic, function (err) {
        if (err) {
            console.log('Error when subscribe topic: ' + magnetic);
        } else {
            console.log('Subscribed to: ' + magnetic);
        }
    });

    client_1.subscribe(speaker, function (err) {
        if (err) {
            console.log('Error when subscribe topic: ' + speaker);
        } else {
            console.log('Subscribed to: ' + speaker);
        }
    });

    client_1.subscribe(temp, function (err) {
        if (err) {
            console.log('Error when subscribe topic: ' + temp);
        } else {
            console.log('Subscribed to: ' + temp);
        }
    });
});

client_2.on('connect', () => {
    console.log('Connected to ' + username_2);

    client_2.subscribe(gas, function (err) {
        if (err) {
            console.log('Error when subscribe topic: ' + gas);
        } else {
            console.log('Subscribed to: ' + gas);
        }
    });

    client_2.subscribe(infrared, function (err) {
        if (err) {
            console.log('Error when subscribe topic: topic: ' + infrared);
        } else {
            console.log('Subscribed to: ' + infrared);
        }
    });

    client_2.subscribe(light, function (err) {
        if (err) {
            console.log('Error when subscribe topic: ' + light);
        } else {
            console.log('Subscribed to: ' + light);
        }
    });

    client_2.subscribe(relay, function (err) {
        if (err) {
            console.log('Error when subscribe topic:' + relay);
        } else {
            console.log('Subscribed to: ' + relay);
        }
    });
});

// Receive message
client_1.on('message', function (topic, message) {
    var message_str = message.toString();
    const message_obj = JSON.parse(message_str);

    switch (topic) {
        case drv: // done
            const drv_data = message_obj.data; // String

            const drv_doc = new Fan({ status: drv_data });
            drv_doc.save();

            io.sockets.emit('Server-sent-data', {
                id: 'checkbox_3',
                status: drv_data == 0 ? 'off' : 'on',
            });

            break;

        case led: // done
            const led_data = message_obj.data; // String

            const led_doc = new Led({ status: led_data });
            led_doc.save();

            io.sockets.emit('Server-sent-data', {
                id: 'checkbox_1',
                status: led_data == 0 ? 'off' : 'on',
            });

            break;

        case magnetic:
            const magnetic_data = message_obj.data; // String

            const magnetic_doc = new Magnetic({ data: magnetic_data });
            magnetic_doc.save();

            Auto.findOne({}).then((doc) => {
                if (magnetic_data != 0 && doc.door == 'on') {
                    Breakin.findOne({}).then((doc) => {
                        if (doc.speaker == 'on') {
                            const speaker_str = speakerString(1023);
                            client_1.publish(speaker, speaker_str);

                            setTimeout(() => {
                                client_1.publish(speaker, speakerString(0));
                            }, 10000);
                        }

                        if (doc.message == 'on') {
                            const message_doc = new Message({
                                content: 'There is a door break-in',
                                img: './img/breakin.png',
                            });

                            message_doc.save(() => {
                                const today = new Date();

                                io.sockets.emit('Server-sent-message', {
                                    content: 'There is a door break-in',
                                    img: './img/breakin.png',
                                    ho: today.getHours(),
                                    mi: today.getMinutes(),
                                    se: today.getSeconds(),
                                    da: today.getDate(),
                                    mo: today.getMonth() + 1,
                                    ye: today.getFullYear(),
                                });
                            });
                        }

                        if (doc.blinking == 'on') {
                            Auto.findOne({}).then((doc) => {
                                if (doc.light == 'on') {
                                    Auto.updateOne(
                                        {},
                                        { light: 'off' },
                                        () => {},
                                    );
                                    io.sockets.emit('Server-sent-data', {
                                        id: 'checkbox_2',
                                        status: 'off',
                                    });
                                }
                            });

                            let i = 0;

                            const loop = setInterval(() => {
                                const led_str = ledString(i % 2 == 0 ? 0 : 1);
                                client_1.publish(led, led_str);
                                i++;
                            }, 2000);

                            setTimeout(() => {
                                clearInterval(loop);
                            }, 10000);
                        }
                    });
                }
            });

            break;

        case speaker: // done
            const speaker_data = message_obj.data; // String

            const speaker_doc = new Speaker({ status: speaker_data });
            speaker_doc.save();

            break;

        case temp: // done
            const temp_data = message_obj.data; // String

            const temp_doc = new Temp({ data: temp_data });
            temp_doc.save();

            io.sockets.emit('Server-sent-temp', temp_data);

            // IF ELSE HEAR
            Auto.findOne({}).then((doc) => {
                if (doc.fan == 'on') {
                    if (parseInt(temp_data) < 27) {
                        Fan.find({}, null, { sort: { date: -1 } }).then(
                            (docs) => {
                                if (docs[0].status == 0) {
                                    // nothing
                                } else {
                                    const drv_str = drvString(0);
                                    client_1.publish(drv, drv_str);
                                }
                            },
                        );
                    } else if (parseInt(temp_data) >= 27 && parseInt(temp_data) < 40) {
                        Infrared.find({}, null, { sort: { date: -1 } }).then(
                            (docs) => {
                                if (docs[0].data == '00') {
                                    // nothing
                                } else {
                                    Fan.find({}, null, {
                                        sort: { date: -1 },
                                    }).then((docs) => {
                                        if (docs[0].status == 0) {
                                            const drv_str = drvString(255);
                                            client_1.publish(drv, drv_str);
                                        } else {
                                            // nothing
                                        }
                                    });
                                }
                            },
                        );
                    }
                }
            });

            //

            if (parseInt(temp_data) >= 40) {
                Explosion.findOne({}).then((doc) => {
                    if (doc.speaker == 'on') {
                        const speaker_str = speakerString(1023);
                        client_1.publish(speaker, speaker_str);

                        setTimeout(() => {
                            client_1.publish(speaker, speakerString(0));
                        }, 10000);
                    }

                    if (doc.message == 'on') {
                        const message_doc = new Message({
                            content: 'There is a risk of explosion',
                            img: './img/explosion.png',
                        });

                        message_doc.save(() => {
                            const today = new Date();

                            io.sockets.emit('Server-sent-message', {
                                content: 'There is a risk of explosion',
                                img: './img/explosion.png',
                                ho: today.getHours(),
                                mi: today.getMinutes(),
                                se: today.getSeconds(),
                                da: today.getDate(),
                                mo: today.getMonth() + 1,
                                ye: today.getFullYear(),
                            });
                        });
                    }

                    if (doc.powerdown == 'on') {
                        const relay_str = relayString(0);
                        client_2.publish(relay, relay_str);
                    }
                });
            }
            break;

        default:
            console.log('Error when receive message from ' + username_1);
            break;
    }
});

client_2.on('message', function (topic, message) {
    var message_str = message.toString();
    const message_obj = JSON.parse(message_str);

    switch (topic) {
        case gas: // done
            const gas_data = message_obj.data; // String

            const gas_doc = new Gas({ data: gas_data });
            gas_doc.save();

            if (parseInt(gas_data) == 0) {
                break;
            }

            Explosion.findOne({}).then((doc) => {
                if (doc.speaker == 'on') {
                    const speaker_str = speakerString(1023);
                    client_1.publish(speaker, speaker_str);

                    setTimeout(() => {
                        client_1.publish(speaker, speakerString(0));
                    }, 10000);
                }

                if (doc.message == 'on') {
                    const message_doc = new Message({
                        content: 'There is a risk of explosion',
                        img: './img/explosion.png',
                    });

                    message_doc.save(() => {
                        const today = new Date();

                        io.sockets.emit('Server-sent-message', {
                            content: 'There is a risk of explosion',
                            img: './img/explosion.png',
                            ho: today.getHours(),
                            mi: today.getMinutes(),
                            se: today.getSeconds(),
                            da: today.getDate(),
                            mo: today.getMonth() + 1,
                            ye: today.getFullYear(),
                        });
                    });
                }

                if (doc.powerdown == 'on') {
                    const relay_str = relayString(0);
                    client_2.publish(relay, relay_str);
                }
            });

            break;

        case infrared:
            const infrared_data = message_obj.data; // String

            const infrared_doc = new Infrared({ data: infrared_data });
            infrared_doc.save();

            Auto.findOne({}).then((doc) => {
                if (infrared_data != '00' && doc.room == 'on') {
                    Breakin.findOne({}).then((doc) => {
                        if (doc.speaker == 'on') {
                            const speaker_str = speakerString(1023);
                            client_1.publish(speaker, speaker_str);

                            setTimeout(() => {
                                client_1.publish(speaker, speakerString(0));
                            }, 10000);
                        }

                        if (doc.message == 'on') {
                            const message_doc = new Message({
                                content: 'There is a room break-in',
                                img: './img/breakin.png',
                            });

                            message_doc.save(() => {
                                const today = new Date();

                                io.sockets.emit('Server-sent-message', {
                                    content: 'There is a room break-in',
                                    img: './img/breakin.png',
                                    ho: today.getHours(),
                                    mi: today.getMinutes(),
                                    se: today.getSeconds(),
                                    da: today.getDate(),
                                    mo: today.getMonth() + 1,
                                    ye: today.getFullYear(),
                                });
                            });
                        }

                        if (doc.blinking == 'on') {
                            Auto.findOne({}).then((doc) => {
                                if (doc.light == 'on') {
                                    Auto.updateOne(
                                        {},
                                        { light: 'off' },
                                        () => {},
                                    );
                                    io.sockets.emit('Server-sent-data', {
                                        id: 'checkbox_2',
                                        status: 'off',
                                    });
                                }
                            });

                            let i = 0;

                            const loop = setInterval(() => {
                                const led_str = ledString(i % 2 == 0 ? 0 : 1);
                                client_1.publish(led, led_str);
                                i++;
                            }, 2000);

                            setTimeout(() => {
                                clearInterval(loop);
                            }, 10000);
                        }
                    });
                }

                if (doc.light == 'on') {
                    if (infrared_data == '00') {
                        Led.find({}, null, { sort: { date: -1 } }).then(
                            (docs) => {
                                if (docs[0].status == 0) {
                                    // nothing
                                } else {
                                    const led_str = ledString(0);
                                    client_1.publish(led, led_str);
                                }
                            },
                        );
                    } else {
                        Light.find({}, null, { sort: { date: -1 } }).then(
                            (docs) => {
                                if (docs[0].data > 100) {
                                    // nothing
                                } else {
                                    Led.find({}, null, {
                                        sort: { date: -1 },
                                    }).then((docs) => {
                                        if (docs[0].status == 0) {
                                            const led_str = ledString(1);
                                            client_1.publish(led, led_str);
                                        } else {
                                            // nothing
                                        }
                                    });
                                }
                            },
                        );
                    }
                }

                if (doc.fan == 'on') {
                    if (infrared_data == '00') {
                        Fan.find({}, null, { sort: { date: -1 } }).then(
                            (docs) => {
                                if (docs[0].status == 0) {
                                    // nothing
                                } else {
                                    const drv_str = drvString(0);
                                    client_1.publish(drv, drv_str);
                                }
                            },
                        );
                    } else {
                        Temp.find({}, null, { sort: { date: -1 } }).then(
                            (docs) => {
                                if (docs[0].data < 26) {
                                    // nothing
                                } else {
                                    Fan.find({}, null, {
                                        sort: { date: -1 },
                                    }).then((docs) => {
                                        if (docs[0].status == 0) {
                                            const drv_str = drvString(255);
                                            client_1.publish(drv, drv_str);
                                        } else {
                                            // nothing
                                        }
                                    });
                                }
                            },
                        );
                    }
                }
            });

            break;

        case light: // done
            const light_data = message_obj.data; // String

            const light_doc = new Light({ data: light_data });
            light_doc.save();

            // IF ELSE HEAR
            Auto.findOne({}).then((doc) => {
                if (doc.light == 'on') {
                    if (parseInt(light_data) > 100) {
                        Led.find({}, null, { sort: { date: -1 } }).then(
                            (docs) => {
                                if (docs[0].status == 0) {
                                    // nothing
                                } else {
                                    const led_str = ledString(0);
                                    client_1.publish(led, led_str);
                                }
                            },
                        );
                    } else {
                        Infrared.find({}, null, { sort: { date: -1 } }).then(
                            (docs) => {
                                if (docs[0].data == '00') {
                                    // nothing
                                } else {
                                    Led.find({}, null, {
                                        sort: { date: -1 },
                                    }).then((docs) => {
                                        if (docs[0].status == 0) {
                                            const led_str = ledString(1);
                                            client_1.publish(led, led_str);
                                        } else {
                                            // nothing
                                        }
                                    });
                                }
                            },
                        );
                    }
                }
            });

            break;

        case relay: // done
            const relay_data = message_obj.data; // String

            const relay_doc = new Relay({ status: relay_data });
            relay_doc.save();

            io.sockets.emit('Server-sent-data', {
                id: 'checkbox_8',
                status: relay_data == 0 ? 'off' : 'on',
            });

            break;

        default:
            console.log('Error when receive message from ' + username_2);
            break;
    }
});

//////////////////////////////////////////////////////////////////////////

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });

    socket.on('Client-sent-data', (obj) => {
        const id = obj.id;
        const status = obj.status; // String

        switch (id) {
            case 'checkbox_1': // done
                const led_str = ledString(status == 'off' ? 0 : 1);
                client_1.publish(led, led_str);
                break;

            case 'checkbox_2': // done
                Auto.updateOne({}, { light: status }, () => {});
                break;

            case 'checkbox_3': // done
                const drv_str = drvString(status == 'off' ? 0 : 255);
                client_1.publish(drv, drv_str);
                break;

            case 'checkbox_4': // done
                Auto.updateOne({}, { fan: status }, () => {});
                break;

            case 'checkbox_5': // done
                Auto.updateOne({}, { door: status }, () => {});
                break;

            case 'checkbox_6': // done
                Auto.updateOne({}, { room: status }, () => {});
                break;

            case 'checkbox_7': // done
                Auto.updateOne({}, { explosion: status }, () => {});
                break;

            case 'checkbox_8': // done
                const relay_str = relayString(status == 'off' ? 0 : 1);
                client_2.publish(relay, relay_str);
                break;

            case 'checkbox_11': // done
                Breakin.updateOne({}, { speaker: status }, () => {});
                break;

            case 'checkbox_12': // done
                Breakin.updateOne({}, { message: status }, () => {});
                break;

            case 'checkbox_13': // done
                Breakin.updateOne({}, { blinking: status }, () => {});
                break;

            case 'checkbox_14': // done
                Explosion.updateOne({}, { speaker: status }, () => {});
                break;

            case 'checkbox_15': // done
                Explosion.updateOne({}, { message: status }, () => {});
                break;

            case 'checkbox_16': // done
                Explosion.updateOne({}, { powerdown: status }, () => {});
                break;
        }
    });
});
