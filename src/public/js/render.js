function render() {
    const light = document.getElementById('light');
    const fan = document.getElementById('fan');
    const breakin = document.getElementById('breakin');
    const explosion = document.getElementById('explosion');

    const light_slide = document.getElementById('light_slide');
    const fan_slide = document.getElementById('fan_slide');
    const breakin_slide = document.getElementById('breakin_slide');
    const explosion_slide = document.getElementById('explosion_slide');

    const ovals = document.querySelectorAll('.oval');

    light.onclick = () => {
        light_slide.style.display = 'block';
        fan_slide.style.display = 'none';
        breakin_slide.style.display = 'none';
        explosion_slide.style.display = 'none';

        light.setAttribute('active', 'true');
        fan.setAttribute('active', 'false');
        breakin.setAttribute('active', 'false');
        explosion.setAttribute('active', 'false');

        for (let i = 0; i < ovals.length; i++) {
            ovals[i].setAttribute('active', 'false');
        }
    };

    fan.onclick = () => {
        light_slide.style.display = 'none';
        fan_slide.style.display = 'block';
        breakin_slide.style.display = 'none';
        explosion_slide.style.display = 'none';

        light.setAttribute('active', 'false');
        fan.setAttribute('active', 'true');
        breakin.setAttribute('active', 'false');
        explosion.setAttribute('active', 'false');

        for (let i = 0; i < ovals.length; i++) {
            ovals[i].setAttribute('active', 'false');
        }
    };

    breakin.onclick = () => {
        light_slide.style.display = 'none';
        fan_slide.style.display = 'none';
        breakin_slide.style.display = 'block';
        explosion_slide.style.display = 'none';

        light.setAttribute('active', 'false');
        fan.setAttribute('active', 'false');
        breakin.setAttribute('active', 'true');
        explosion.setAttribute('active', 'false');

        for (let i = 0; i < ovals.length; i++) {
            ovals[i].setAttribute('active', 'false');
        }
    };

    explosion.onclick = () => {
        light_slide.style.display = 'none';
        fan_slide.style.display = 'none';
        breakin_slide.style.display = 'none';
        explosion_slide.style.display = 'block';

        light.setAttribute('active', 'false');
        fan.setAttribute('active', 'false');
        breakin.setAttribute('active', 'false');
        explosion.setAttribute('active', 'true');

        for (let i = 0; i < ovals.length; i++) {
            ovals[i].setAttribute('active', 'false');
        }
    };
}

export default render;
