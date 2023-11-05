function ledString(data) {
    const obj = {
        id: '1',
        name: 'LED',
        data: data.toString(),
        unit: '',
    };

    return JSON.stringify(obj);
}

function speakerString(data) {
    const obj = {
        id: '2',
        name: 'SPEAKER',
        data: data.toString(),
        unit: '',
    };

    return JSON.stringify(obj);
}

function drvString(data) {
    const obj = {
        id: '10',
        name: 'DRV_PWM',
        data: data.toString(),
        unit: '',
    };

    return JSON.stringify(obj);
}

function relayString(data) {
    const obj = {
        id: '11',
        name: 'RELAY',
        data: data.toString(),
        unit: '',
    };

    return JSON.stringify(obj);
}

module.exports = { ledString, speakerString, drvString, relayString };
