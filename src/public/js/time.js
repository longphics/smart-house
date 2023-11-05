function checkTime(time) {
    if (time < 10) {
        time = '0' + time;
    }
    return time;
}

function _stamp(
    hour,
    minute,
    second,
    date,
    month,
    year,
    ho,
    mi,
    se,
    da,
    mo,
    ye,
) {
    if (year - ye > 0) {
        return year - ye + ' years ago';
    } else if (month - mo > 0) {
        return month - mo + ' months ago';
    } else if (date - da > 0) {
        return date - da + ' days ago';
    } else if (hour - ho > 0) {
        return hour - ho + ' hours ago';
    } else if (minute - mi > 0) {
        return minute - mi + ' minutes ago';
    } else {
        return second - se + ' seconds ago';
    }
}

function time() {
    const today = new Date();

    let hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();
    let date = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    // Greeting
    const greet = document.querySelector('#greeting');
    
    if (hour >= 0 && hour <= 11) {
        greet.setAttribute('session', 'morning');
    } else if (hour >= 12 && hour <= 18) {
        greet.setAttribute('session', 'afternoon');
    } else {
        greet.setAttribute('session', 'evening');
    }

    //

    // Dropdown time

    const notify_times = document.querySelectorAll('.notify_time');

    for (let i = 0; i < notify_times.length; i++) {
        const notify_time = notify_times[i];

        const ho = notify_time.getAttribute('ho');
        const mi = notify_time.getAttribute('mi');
        const se = notify_time.getAttribute('se');
        const da = notify_time.getAttribute('da');
        const mo = notify_time.getAttribute('mo');
        const ye = notify_time.getAttribute('ye');

        const stamp = _stamp(
            hour,
            minute,
            second,
            date,
            month,
            year,
            ho,
            mi,
            se,
            da,
            mo,
            ye,
        );
        notify_time.setAttribute('stamp', stamp);
    }

    //

    hour = checkTime(hour);
    minute = checkTime(minute);
    second = checkTime(second);
    date = checkTime(date);
    month = checkTime(month);

    document
        .querySelector('[time]')
        .setAttribute('time', hour + ':' + minute + ':' + second);
    document
        .querySelector('[date]')
        .setAttribute('date', date + '/' + month + '/' + year);

    setTimeout(() => {
        time();
    }, 500);
}

export default time;
