(function () {
    'use strict';

    var path = require('path'),
        fs = require('fs'),
        con = console;

    exports.setConsole = function (c) {
        con = c;
    };

    function merge(source, add) {
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

    function loadAndParseConfig(filePath) {
        try {
            return JSON.parse(fs.readFileSync(filePath, "utf-8"));
        } catch (err) {
            if (filePath && err.code !== "ENOENT") {
                con.warn('Error reading config file "' + filePath + '": ' + err);
            }
        }
    }
    exports.loadAndParseConfig = loadAndParseConfig;

    function addDefaults(options) {

        options = merge(options, {node: true, es5: true});

        return options;
    }

    function notFalsy(n) {
        return n;
    }

    function splitPredefs(options) {
        if (!options.predef) {
            return options;
        }
        if (Array.isArray(options.predef)) {
            return options;
        }

        options.predef = options.predef.split(',').filter(notFalsy);

        return options;
    }

    function preprocessOptions(options, config) {
        options = merge({}, options);

        options = merge(options, config);

        options = addDefaults(options);

        options = splitPredefs(options);

        return options;
    }

    function mergeConfigs(home, project) {
        var homeConfig,
            cwdConfig,
            config;

        home.some(function (file) {
            homeConfig = loadAndParseConfig(file);
            return homeConfig;
        });

        project.some(function (file) {
            cwdConfig = loadAndParseConfig(file);
            return cwdConfig;
        });

        config = merge(cwdConfig, homeConfig);

        return config;
    }
    exports.mergeConfigs = mergeConfigs;

    function loadConfig(h, configFile) {
        var home = h || '',
            homeConfigs = ['.jslint.conf', '.jslintrc'],
            projectConfigs = ['jslint.conf', '.jslint.conf', 'jslintrc', '.jslintrc'];

        if (configFile) {
            // explicitly specified config file overrides default config file name, path
            homeConfigs = [configFile];
        } else {
            homeConfigs = homeConfigs.map(function (file) {
                return path.join(home, file);
            });
        }

        projectConfigs = projectConfigs.map(function (file) {
            return path.join(process.cwd(), file);
        });

        return mergeConfigs(homeConfigs, projectConfigs);
    }
    exports.loadConfig = loadConfig;

    function options_getOptions(homedir, options) {
        var config = loadConfig(homedir, options.config);

        return preprocessOptions(options, config);
    }

    exports.preprocessOptions = preprocessOptions;
    exports.getOptions = options_getOptions;
    exports.splitPredefs = splitPredefs;
    exports.addDefaults = addDefaults;

}());
