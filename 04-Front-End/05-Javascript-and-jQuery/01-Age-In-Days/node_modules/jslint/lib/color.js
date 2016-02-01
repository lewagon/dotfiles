function color(code, string) {
    'use strict';
    return "\u001b[" + code + "m" + string + "\u001b[0m";
}

function factory(code) {
    'use strict';
    return function (string) {
        return color(code, string);
    };
}

module.exports = {
    bold: factory(1),
    red: factory(31),
    green: factory(32),
    yellow: factory(33),
    blue: factory(34),
    grey: factory(90)
};
