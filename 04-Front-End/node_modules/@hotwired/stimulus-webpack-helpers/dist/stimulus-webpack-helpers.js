/*
Stimulus Webpack Helpers 1.0.0
Copyright © 2021 Basecamp, LLC
 */
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

export { definitionForModuleAndIdentifier, definitionForModuleWithContextAndKey, definitionsFromContext, identifierForContextKey };
