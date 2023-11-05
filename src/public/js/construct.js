function construct() {
    const objs = document.querySelectorAll('[type=checkbox][status]');

    for (let i = 0; i < objs.length; i++) {
        const obj = objs[i];
        const status = obj.getAttribute('status');

        if (status == 'on') {
            obj.checked = true;
        }
    }
}

export default construct;
