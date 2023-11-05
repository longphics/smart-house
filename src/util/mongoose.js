function mongooseToObject(mongoose) {
    return mongoose.toObject();
}

function mongoosesToArray(mongooses) {
    return mongooses.map((mongoose) => mongoose.toObject());
}

function ensureStatusToString(obj) {
    if (obj.status == 0) {
        obj.status = 'off';
    } else {
        obj.status = 'on';
    }

    return obj;
}

function ensureDataToString(obj) {
    obj.data = obj.data.toString();

    return obj;
}

function ensureDate(objs) {
    return objs.map((obj) => ({
        checked: obj.checked,
        content: obj.content,
        img: obj.img,
        ho: obj.date.getHours(),
        mi: obj.date.getMinutes(),
        se: obj.date.getSeconds(),
        da: obj.date.getDate(),
        mo: obj.date.getMonth() + 1,
        ye: obj.date.getFullYear(),
    }));
}

module.exports = {
    mongooseToObject,
    mongoosesToArray,
    ensureStatusToString,
    ensureDataToString,
    ensureDate,
};
