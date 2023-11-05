import time from './time.js';

const body = document.querySelector('body');

const checkbox_1 = document.querySelector('#checkbox_1');
const checkbox_2 = document.querySelector('#checkbox_2');
const checkbox_3 = document.querySelector('#checkbox_3');
const checkbox_4 = document.querySelector('#checkbox_4');
const checkbox_5 = document.querySelector('#checkbox_5');
const checkbox_6 = document.querySelector('#checkbox_6');
const checkbox_7 = document.querySelector('#checkbox_7');
const checkbox_8 = document.querySelector('#checkbox_8');

const checkbox_11 = document.querySelector('#checkbox_11');
const checkbox_12 = document.querySelector('#checkbox_12');
const checkbox_13 = document.querySelector('#checkbox_13');
const checkbox_14 = document.querySelector('#checkbox_14');
const checkbox_15 = document.querySelector('#checkbox_15');
const checkbox_16 = document.querySelector('#checkbox_16');

const constraint_light = () => {
    if (checkbox_2.checked == true) {
        checkbox_1.setAttribute('disabled', true);
    } else {
        checkbox_1.removeAttribute('disabled');
    }
};

const constraint_fan = () => {
    if (checkbox_4.checked == true) {
        checkbox_3.setAttribute('disabled', true);
    } else {
        checkbox_3.removeAttribute('disabled');
    }
};

const constraint_breakin = (socket) => {
    if (checkbox_5.checked == false && checkbox_6.checked == false) {
        socket.emit('Client-sent-data', { id: 'checkbox_11', status: 'off' });
        socket.emit('Client-sent-data', { id: 'checkbox_12', status: 'off' });
        socket.emit('Client-sent-data', { id: 'checkbox_13', status: 'off' });

        checkbox_11.checked = false;
        checkbox_12.checked = false;
        checkbox_13.checked = false;

        checkbox_11.setAttribute('disabled', true);
        checkbox_12.setAttribute('disabled', true);
        checkbox_13.setAttribute('disabled', true);
    } else {
        checkbox_11.removeAttribute('disabled');
        checkbox_12.removeAttribute('disabled');
        checkbox_13.removeAttribute('disabled');
    }
};

const constraint_explosion = (socket) => {
    if (checkbox_7.checked == false) {
        socket.emit('Client-sent-data', { id: 'checkbox_14', status: 'off' });
        socket.emit('Client-sent-data', { id: 'checkbox_15', status: 'off' });
        socket.emit('Client-sent-data', { id: 'checkbox_16', status: 'off' });

        checkbox_14.checked = false;
        checkbox_15.checked = false;
        checkbox_16.checked = false;

        checkbox_14.setAttribute('disabled', true);
        checkbox_15.setAttribute('disabled', true);
        checkbox_16.setAttribute('disabled', true);
    } else {
        checkbox_14.removeAttribute('disabled');
        checkbox_15.removeAttribute('disabled');
        checkbox_16.removeAttribute('disabled');
    }
};

function event(socket) {
    body.onload = () => {
        time();
        constraint_light();
        constraint_fan();
        constraint_breakin(socket);
        constraint_explosion(socket);
    };

    const objs = document.querySelectorAll('[type=checkbox]');

    for (let i = 0; i < objs.length; i++) {
        const obj = objs[i];

        obj.onclick = () => {
            const id = obj.getAttribute('id');

            const status = obj.getAttribute('status') == 'on' ? 'off' : 'on';

            obj.setAttribute('status', status);

            socket.emit('Client-sent-data', { id, status });

            switch (id) {
                case 'checkbox_2': // Automatical Light
                    constraint_light();
                    break;

                case 'checkbox_4': // Automatical Fan
                    constraint_fan();
                    break;

                case 'checkbox_5': // Door Alert

                case 'checkbox_6': // Room Alert
                    constraint_breakin(socket);
                    break;

                case 'checkbox_7': // Explosion Alert
                    constraint_explosion(socket);
                    break;
            }
        };
    }
}

export default event;
