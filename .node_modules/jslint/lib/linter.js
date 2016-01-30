function merge(source, add) {
    'use strict';

    var result = source || {};

    if (!add) {
        return result;
    }

    Object.keys(add).forEach(function (prop) {
        if (!result.hasOwnProperty(prop)) {
            result[prop] = add[prop];
        }
    });

    return result;
}
exports.merge = merge;

function preprocessScript(script) {
    'use strict';

    // Fix UTF8 with BOM
    if (script.charCodeAt(0) === 0xFEFF) {
        script = script.slice(1);
    }

    // remove shebang: replace it with empty line
    script = script.replace(/^#!.*/, "");

    return script;
}
exports.preprocessScript = preprocessScript;

exports.doLint = function (jslint, script, options) {
    'use strict';
    var ok,
        result;

    script = preprocessScript(script);

    ok = jslint(script, options);

    result = jslint.data();
    if (result.ok === undefined) {
        result.ok = ok;
    }
    result.options = options;

    // es6
    result.errors = result.errors || result.warnings;

    return result;
};
