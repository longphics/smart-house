function listen(socket) {
    socket.on('Server-sent-data', (data) => {
        const id = data.id;
        const status = data.status;
        const obj = document.querySelector('[type=checkbox][id=' + id + ']');

        if (status == 'on') {
            obj.checked = true;
        } else {
            obj.checked = false;
        }
    });

    socket.on('Server-sent-temp', (data) => {
        const obj = document.querySelector('#temperature h3');
        obj.setAttribute('temp', data);
    });

    socket.on('Server-sent-message', (data) => {
        const obj = document.querySelector('.dropdown');

        const notify_item = document.createElement('DIV');
        const notify_img = document.createElement('DIV');
        const img = document.createElement('IMG');
        const notify_message = document.createElement('DIV');
        const p = document.createElement('P');
        const span = document.createElement('SPAN');

        const p_text = document.createTextNode(data.content);
        p.appendChild(p_text);

        notify_message.insertBefore(span, notify_message.childNodes[0]);
        notify_message.insertBefore(p, notify_message.childNodes[0]);
        notify_img.insertBefore(img, notify_img.childNodes[0]);

        notify_item.insertBefore(notify_message, notify_item.childNodes[0]);
        notify_item.insertBefore(notify_img, notify_item.childNodes[0]);

        notify_item.setAttribute('class', 'notify_item');
        notify_img.setAttribute('class', 'notify_img');
        img.setAttribute('src', data.img);
        notify_message.setAttribute('class', 'notify_message');
        span.setAttribute('class', 'notify_time');
        span.setAttribute('ho', data.ho);
        span.setAttribute('mi', data.mi);
        span.setAttribute('se', data.se);
        span.setAttribute('da', data.da);
        span.setAttribute('mo', data.mo);
        span.setAttribute('ye', data.ye);

        obj.insertBefore(notify_item, obj.childNodes[0]);
    });
}

export default listen;
