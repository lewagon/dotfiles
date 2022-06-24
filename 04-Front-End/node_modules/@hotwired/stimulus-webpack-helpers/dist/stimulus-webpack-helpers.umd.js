/*
Stimulus Webpack Helpers 1.0.0
Copyright © 2021 Basecamp, LLC
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.StimulusWebpackHelpers = {}));
}(this, (function (exports) { 'use strict';

    function definitionsFromContext(context) {
        return context.keys()
            .map((key) => definitionForModuleWithContextAndKey(context, key))
            .filter((value) => value);
    }
    function definitionForModuleWithContextAndKey(context, key) {
        const identifier = identifierForContextKey(key);
        if (identifier) {
            return definitionForModuleAndIdentifier(context(key), identifier);
        }
    }
    function definitionForModuleAndIdentifier(module, identifier) {
        const controllerConstructor = module.default;
        if (typeof controllerConstructor == "function") {
            return { identifier, controllerConstructor };
        }
    }
    function identifierForContextKey(key) {
        const logicalName = (key.match(/^(?:\.\/)?(.+)(?:[_-]controller\..+?)$/) || [])[1];
        if (logicalName) {
            return logicalName.replace(/_/g, "-").replace(/\//g, "--");
        }
    }

    exports.definitionForModuleAndIdentifier = definitionForModuleAndIdentifier;
    exports.definitionForModuleWithContextAndKey = definitionForModuleWithContextAndKey;
    exports.definitionsFromContext = definitionsFromContext;
    exports.identifierForContextKey = identifierForContextKey;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
