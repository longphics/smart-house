function drop() {
    const drop = document.querySelector('#alert .dropdown');
    const blur = document.querySelector('#blur');
    const ovals = document.querySelectorAll('.oval');

    const light = document.getElementById('light');
    const fan = document.getElementById('fan');
    const breakin = document.getElementById('breakin');
    const explosion = document.getElementById('explosion');

    for (let i = 0; i < ovals.length; i++) {
        const oval = ovals[i];

        oval.onclick = () => {
            for (let j = 0; j < ovals.length; j++) {
                if (j != i) {
                    ovals[j].setAttribute('active', 'false');
                }
            }

            if (oval.getAttribute('active') == 'true') {
                if (oval.getAttribute('id') == 'alert') {
                    blur.setAttribute('active', 'false');
                    drop.setAttribute('active', 'false');
                }
                oval.setAttribute('active', 'false');
            } else {
                if (oval.getAttribute('id') == 'alert') {
                    blur.setAttribute('active', 'true');
                    drop.setAttribute('active', 'true');
                }
                oval.setAttribute('active', 'true');
            }

            light.setAttribute('active', 'false');
            fan.setAttribute('active', 'false');
            breakin.setAttribute('active', 'false');
            explosion.setAttribute('active', 'false');
        };
    }

    blur.onclick = () => {
        blur.setAttribute('active', 'false');
        drop.setAttribute('active', 'false');
        for (let i = 0; i < ovals.length; i++) {
            ovals[i].setAttribute('active', 'false');
        }
    };

    // alert.onclick = () => {
    //     if (drop.getAttribute('active') == 'true') {
    //         blur.setAttribute('active', 'false');
    //         drop.setAttribute('active', 'false');
    //         alert.setAttribute('active', 'false');
    //     } else {
    //         blur.setAttribute('active', 'true');
    //         drop.setAttribute('active', 'true');
    //         alert.setAttribute('active', 'true');
    //     }
    // };
}

export default drop;
