'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _resolve = require('eslint-module-utils/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _importType = require('../core/importType');

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const enumValues = { enum: ['always', 'ignorePackages', 'never'] };
const patternProperties = {
  type: 'object',
  patternProperties: { '.*': enumValues }
};
const properties = {
  type: 'object',
  properties: {
    'pattern': patternProperties,
    'ignorePackages': { type: 'boolean' }
  }
};

function buildProperties(context) {

  const result = {
    defaultConfig: 'never',
    pattern: {},
    ignorePackages: false
  };

  context.options.forEach(obj => {

    // If this is a string, set defaultConfig to its value
    if (typeof obj === 'string') {
      result.defaultConfig = obj;
      return;
    }

    // If this is not the new structure, transfer all props to result.pattern
    if (obj.pattern === undefined && obj.ignorePackages === undefined) {
      Object.assign(result.pattern, obj);
      return;
    }

    // If pattern is provided, transfer all props
    if (obj.pattern !== undefined) {
      Object.assign(result.pattern, obj.pattern);
    }

    // If ignorePackages is provided, transfer it to result
    if (obj.ignorePackages !== undefined) {
      result.ignorePackages = obj.ignorePackages;
    }
  });

  if (result.defaultConfig === 'ignorePackages') {
    result.defaultConfig = 'always';
    result.ignorePackages = true;
  }

  return result;
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('extensions')
    },

    schema: {
      anyOf: [{
        type: 'array',
        items: [enumValues],
        additionalItems: false
      }, {
        type: 'array',
        items: [enumValues, properties],
        additionalItems: false
      }, {
        type: 'array',
        items: [properties],
        additionalItems: false
      }, {
        type: 'array',
        items: [patternProperties],
        additionalItems: false
      }, {
        type: 'array',
        items: [enumValues, patternProperties],
        additionalItems: false
      }]
    }
  },

  create: function (context) {

    const props = buildProperties(context);

    function getModifier(extension) {
      return props.pattern[extension] || props.defaultConfig;
    }

    function isUseOfExtensionRequired(extension, isPackageMain) {
      return getModifier(extension) === 'always' && (!props.ignorePackages || !isPackageMain);
    }

    function isUseOfExtensionForbidden(extension) {
      return getModifier(extension) === 'never';
    }

    function isResolvableWithoutExtension(file) {
      const extension = _path2.default.extname(file);
      const fileWithoutExtension = file.slice(0, -extension.length);
      const resolvedFileWithoutExtension = (0, _resolve2.default)(fileWithoutExtension, context);

      return resolvedFileWithoutExtension === (0, _resolve2.default)(file, context);
    }

    function checkFileExtension(node) {
      const source = node.source;

      // bail if the declaration doesn't have a source, e.g. "export { foo };"

      if (!source) return;

      const importPath = source.value;

      // don't enforce anything on builtins
      if ((0, _importType.isBuiltIn)(importPath, context.settings)) return;

      const resolvedPath = (0, _resolve2.default)(importPath, context);

      // get extension from resolved path, if possible.
      // for unresolved, use source value.
      const extension = _path2.default.extname(resolvedPath || importPath).substring(1);

      // determine if this is a module
      const isPackageMain = (0, _importType.isExternalModuleMain)(importPath, context.settings) || (0, _importType.isScopedMain)(importPath);

      if (!extension || !importPath.endsWith(`.${extension}`)) {
        const extensionRequired = isUseOfExtensionRequired(extension, isPackageMain);
        const extensionForbidden = isUseOfExtensionForbidden(extension);
        if (extensionRequired && !extensionForbidden) {
          context.report({
            node: source,
            message: `Missing file extension ${extension ? `"${extension}" ` : ''}for "${importPath}"`
          });
        }
      } else if (extension) {
        if (isUseOfExtensionForbidden(extension) && isResolvableWithoutExtension(importPath)) {
          context.report({
            node: source,
            message: `Unexpected use of file extension "${extension}" for "${importPath}"`
          });
        }
      }
    }

    return {
      ImportDeclaration: checkFileExtension,
      ExportNamedDeclaration: checkFileExtension
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9leHRlbnNpb25zLmpzIl0sIm5hbWVzIjpbImVudW1WYWx1ZXMiLCJlbnVtIiwicGF0dGVyblByb3BlcnRpZXMiLCJ0eXBlIiwicHJvcGVydGllcyIsImJ1aWxkUHJvcGVydGllcyIsImNvbnRleHQiLCJyZXN1bHQiLCJkZWZhdWx0Q29uZmlnIiwicGF0dGVybiIsImlnbm9yZVBhY2thZ2VzIiwib3B0aW9ucyIsImZvckVhY2giLCJvYmoiLCJ1bmRlZmluZWQiLCJPYmplY3QiLCJhc3NpZ24iLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJ1cmwiLCJzY2hlbWEiLCJhbnlPZiIsIml0ZW1zIiwiYWRkaXRpb25hbEl0ZW1zIiwiY3JlYXRlIiwicHJvcHMiLCJnZXRNb2RpZmllciIsImV4dGVuc2lvbiIsImlzVXNlT2ZFeHRlbnNpb25SZXF1aXJlZCIsImlzUGFja2FnZU1haW4iLCJpc1VzZU9mRXh0ZW5zaW9uRm9yYmlkZGVuIiwiaXNSZXNvbHZhYmxlV2l0aG91dEV4dGVuc2lvbiIsImZpbGUiLCJwYXRoIiwiZXh0bmFtZSIsImZpbGVXaXRob3V0RXh0ZW5zaW9uIiwic2xpY2UiLCJsZW5ndGgiLCJyZXNvbHZlZEZpbGVXaXRob3V0RXh0ZW5zaW9uIiwiY2hlY2tGaWxlRXh0ZW5zaW9uIiwibm9kZSIsInNvdXJjZSIsImltcG9ydFBhdGgiLCJ2YWx1ZSIsInNldHRpbmdzIiwicmVzb2x2ZWRQYXRoIiwic3Vic3RyaW5nIiwiZW5kc1dpdGgiLCJleHRlbnNpb25SZXF1aXJlZCIsImV4dGVuc2lvbkZvcmJpZGRlbiIsInJlcG9ydCIsIm1lc3NhZ2UiLCJJbXBvcnREZWNsYXJhdGlvbiIsIkV4cG9ydE5hbWVkRGVjbGFyYXRpb24iXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxhQUFhLEVBQUVDLE1BQU0sQ0FBRSxRQUFGLEVBQVksZ0JBQVosRUFBOEIsT0FB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Q0EsWUFBSXFCLHFCQUFxQixDQUFDQyxrQkFBMUIsRUFBOEM7QUFDNUM3QyxrQkFBUThDLE1BQVIsQ0FBZTtBQUNiVixrQkFBTUMsTUFETztBQUViVSxxQkFDRywwQkFBeUJ4QixZQUFhLElBQUdBLFNBQVUsSUFBMUIsR0FBZ0MsRUFBRyxRQUFPZSxVQUFXO0FBSHBFLFdBQWY7QUFLRDtBQUNGLE9BVkQsTUFVTyxJQUFJZixTQUFKLEVBQWU7QUFDcEIsWUFBSUcsMEJBQTBCSCxTQUExQixLQUF3Q0ksNkJBQTZCVyxVQUE3QixDQUE1QyxFQUFzRjtBQUNwRnRDLGtCQUFROEMsTUFBUixDQUFlO0FBQ2JWLGtCQUFNQyxNQURPO0FBRWJVLHFCQUFVLHFDQUFvQ3hCLFNBQVUsVUFBU2UsVUFBVztBQUYvRCxXQUFmO0FBSUQ7QUFDRjtBQUNGOztBQUVELFdBQU87QUFDTFUseUJBQW1CYixrQkFEZDtBQUVMYyw4QkFBd0JkO0FBRm5CLEtBQVA7QUFJRDtBQWpIYyxDQUFqQiIsImZpbGUiOiJleHRlbnNpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuaW1wb3J0IHJlc29sdmUgZnJvbSAnZXNsaW50LW1vZHVsZS11dGlscy9yZXNvbHZlJ1xuaW1wb3J0IHsgaXNCdWlsdEluLCBpc0V4dGVybmFsTW9kdWxlTWFpbiwgaXNTY29wZWRNYWluIH0gZnJvbSAnLi4vY29yZS9pbXBvcnRUeXBlJ1xuaW1wb3J0IGRvY3NVcmwgZnJvbSAnLi4vZG9jc1VybCdcblxuY29uc3QgZW51bVZhbHVlcyA9IHsgZW51bTogWyAnYWx3YXlzJywgJ2lnbm9yZVBhY2thZ2VzJywgJ25ldmVyJyBdIH1cbmNvbnN0IHBhdHRlcm5Qcm9wZXJ0aWVzID0ge1xuICB0eXBlOiAnb2JqZWN0JyxcbiAgcGF0dGVyblByb3BlcnRpZXM6IHsgJy4qJzogZW51bVZhbHVlcyB9LFxufVxuY29uc3QgcHJvcGVydGllcyA9IHtcbiAgdHlwZTogJ29iamVjdCcsXG4gIHByb3BlcnRpZXM6IHtcbiAgICAncGF0dGVybic6IHBhdHRlcm5Qcm9wZXJ0aWVzLFxuICAgICdpZ25vcmVQYWNrYWdlcyc6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gIH0sXG59XG5cbmZ1bmN0aW9uIGJ1aWxkUHJvcGVydGllcyhjb250ZXh0KSB7XG5cbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBkZWZhdWx0Q29uZmlnOiAnbmV2ZXInLFxuICAgICAgcGF0dGVybjoge30sXG4gICAgICBpZ25vcmVQYWNrYWdlczogZmFsc2UsXG4gICAgfVxuXG4gICAgY29udGV4dC5vcHRpb25zLmZvckVhY2gob2JqID0+IHtcblxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHN0cmluZywgc2V0IGRlZmF1bHRDb25maWcgdG8gaXRzIHZhbHVlXG4gICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmVzdWx0LmRlZmF1bHRDb25maWcgPSBvYmpcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoaXMgaXMgbm90IHRoZSBuZXcgc3RydWN0dXJlLCB0cmFuc2ZlciBhbGwgcHJvcHMgdG8gcmVzdWx0LnBhdHRlcm5cbiAgICAgIGlmIChvYmoucGF0dGVybiA9PT0gdW5kZWZpbmVkICYmIG9iai5pZ25vcmVQYWNrYWdlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LnBhdHRlcm4sIG9iailcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIElmIHBhdHRlcm4gaXMgcHJvdmlkZWQsIHRyYW5zZmVyIGFsbCBwcm9wc1xuICAgICAgaWYgKG9iai5wYXR0ZXJuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHQucGF0dGVybiwgb2JqLnBhdHRlcm4pXG4gICAgICB9XG5cbiAgICAgIC8vIElmIGlnbm9yZVBhY2thZ2VzIGlzIHByb3ZpZGVkLCB0cmFuc2ZlciBpdCB0byByZXN1bHRcbiAgICAgIGlmIChvYmouaWdub3JlUGFja2FnZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQuaWdub3JlUGFja2FnZXMgPSBvYmouaWdub3JlUGFja2FnZXNcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKHJlc3VsdC5kZWZhdWx0Q29uZmlnID09PSAnaWdub3JlUGFja2FnZXMnKSB7XG4gICAgICByZXN1bHQuZGVmYXVsdENvbmZpZyA9ICdhbHdheXMnXG4gICAgICByZXN1bHQuaWdub3JlUGFja2FnZXMgPSB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIHR5cGU6ICdzdWdnZXN0aW9uJyxcbiAgICBkb2NzOiB7XG4gICAgICB1cmw6IGRvY3NVcmwoJ2V4dGVuc2lvbnMnKSxcbiAgICB9LFxuXG4gICAgc2NoZW1hOiB7XG4gICAgICBhbnlPZjogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICBpdGVtczogW2VudW1WYWx1ZXNdLFxuICAgICAgICAgIGFkZGl0aW9uYWxJdGVtczogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICBlbnVtVmFsdWVzLFxuICAgICAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGFkZGl0aW9uYWxJdGVtczogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgIGl0ZW1zOiBbcHJvcGVydGllc10sXG4gICAgICAgICAgYWRkaXRpb25hbEl0ZW1zOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgICAgaXRlbXM6IFtwYXR0ZXJuUHJvcGVydGllc10sXG4gICAgICAgICAgYWRkaXRpb25hbEl0ZW1zOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIGVudW1WYWx1ZXMsXG4gICAgICAgICAgICBwYXR0ZXJuUHJvcGVydGllcyxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGFkZGl0aW9uYWxJdGVtczogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiAoY29udGV4dCkge1xuXG4gICAgY29uc3QgcHJvcHMgPSBidWlsZFByb3BlcnRpZXMoY29udGV4dClcblxuICAgIGZ1bmN0aW9uIGdldE1vZGlmaWVyKGV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIHByb3BzLnBhdHRlcm5bZXh0ZW5zaW9uXSB8fCBwcm9wcy5kZWZhdWx0Q29uZmlnXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNVc2VPZkV4dGVuc2lvblJlcXVpcmVkKGV4dGVuc2lvbiwgaXNQYWNrYWdlTWFpbikge1xuICAgICAgcmV0dXJuIGdldE1vZGlmaWVyKGV4dGVuc2lvbikgPT09ICdhbHdheXMnICYmICghcHJvcHMuaWdub3JlUGFja2FnZXMgfHwgIWlzUGFja2FnZU1haW4pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNVc2VPZkV4dGVuc2lvbkZvcmJpZGRlbihleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBnZXRNb2RpZmllcihleHRlbnNpb24pID09PSAnbmV2ZXInXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNSZXNvbHZhYmxlV2l0aG91dEV4dGVuc2lvbihmaWxlKSB7XG4gICAgICBjb25zdCBleHRlbnNpb24gPSBwYXRoLmV4dG5hbWUoZmlsZSlcbiAgICAgIGNvbnN0IGZpbGVXaXRob3V0RXh0ZW5zaW9uID0gZmlsZS5zbGljZSgwLCAtZXh0ZW5zaW9uLmxlbmd0aClcbiAgICAgIGNvbnN0IHJlc29sdmVkRmlsZVdpdGhvdXRFeHRlbnNpb24gPSByZXNvbHZlKGZpbGVXaXRob3V0RXh0ZW5zaW9uLCBjb250ZXh0KVxuXG4gICAgICByZXR1cm4gcmVzb2x2ZWRGaWxlV2l0aG91dEV4dGVuc2lvbiA9PT0gcmVzb2x2ZShmaWxlLCBjb250ZXh0KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrRmlsZUV4dGVuc2lvbihub2RlKSB7XG4gICAgICBjb25zdCB7IHNvdXJjZSB9ID0gbm9kZVxuXG4gICAgICAvLyBiYWlsIGlmIHRoZSBkZWNsYXJhdGlvbiBkb2Vzbid0IGhhdmUgYSBzb3VyY2UsIGUuZy4gXCJleHBvcnQgeyBmb28gfTtcIlxuICAgICAgaWYgKCFzb3VyY2UpIHJldHVyblxuXG4gICAgICBjb25zdCBpbXBvcnRQYXRoID0gc291cmNlLnZhbHVlXG5cbiAgICAgIC8vIGRvbid0IGVuZm9yY2UgYW55dGhpbmcgb24gYnVpbHRpbnNcbiAgICAgIGlmIChpc0J1aWx0SW4oaW1wb3J0UGF0aCwgY29udGV4dC5zZXR0aW5ncykpIHJldHVyblxuXG4gICAgICBjb25zdCByZXNvbHZlZFBhdGggPSByZXNvbHZlKGltcG9ydFBhdGgsIGNvbnRleHQpXG5cbiAgICAgIC8vIGdldCBleHRlbnNpb24gZnJvbSByZXNvbHZlZCBwYXRoLCBpZiBwb3NzaWJsZS5cbiAgICAgIC8vIGZvciB1bnJlc29sdmVkLCB1c2Ugc291cmNlIHZhbHVlLlxuICAgICAgY29uc3QgZXh0ZW5zaW9uID0gcGF0aC5leHRuYW1lKHJlc29sdmVkUGF0aCB8fCBpbXBvcnRQYXRoKS5zdWJzdHJpbmcoMSlcblxuICAgICAgLy8gZGV0ZXJtaW5lIGlmIHRoaXMgaXMgYSBtb2R1bGVcbiAgICAgIGNvbnN0IGlzUGFja2FnZU1haW4gPSBpc0V4dGVybmFsTW9kdWxlTWFpbihpbXBvcnRQYXRoLCBjb250ZXh0LnNldHRpbmdzKVxuICAgICAgICB8fCBpc1Njb3BlZE1haW4oaW1wb3J0UGF0aClcblxuICAgICAgaWYgKCFleHRlbnNpb24gfHwgIWltcG9ydFBhdGguZW5kc1dpdGgoYC4ke2V4dGVuc2lvbn1gKSkge1xuICAgICAgICBjb25zdCBleHRlbnNpb25SZXF1aXJlZCA9IGlzVXNlT2ZFeHRlbnNpb25SZXF1aXJlZChleHRlbnNpb24sIGlzUGFja2FnZU1haW4pXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbkZvcmJpZGRlbiA9IGlzVXNlT2ZFeHRlbnNpb25Gb3JiaWRkZW4oZXh0ZW5zaW9uKVxuICAgICAgICBpZiAoZXh0ZW5zaW9uUmVxdWlyZWQgJiYgIWV4dGVuc2lvbkZvcmJpZGRlbikge1xuICAgICAgICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgICAgICAgIG5vZGU6IHNvdXJjZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgIGBNaXNzaW5nIGZpbGUgZXh0ZW5zaW9uICR7ZXh0ZW5zaW9uID8gYFwiJHtleHRlbnNpb259XCIgYCA6ICcnfWZvciBcIiR7aW1wb3J0UGF0aH1cImAsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChleHRlbnNpb24pIHtcbiAgICAgICAgaWYgKGlzVXNlT2ZFeHRlbnNpb25Gb3JiaWRkZW4oZXh0ZW5zaW9uKSAmJiBpc1Jlc29sdmFibGVXaXRob3V0RXh0ZW5zaW9uKGltcG9ydFBhdGgpKSB7XG4gICAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgICAgbm9kZTogc291cmNlLFxuICAgICAgICAgICAgbWVzc2FnZTogYFVuZXhwZWN0ZWQgdXNlIG9mIGZpbGUgZXh0ZW5zaW9uIFwiJHtleHRlbnNpb259XCIgZm9yIFwiJHtpbXBvcnRQYXRofVwiYCxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIEltcG9ydERlY2xhcmF0aW9uOiBjaGVja0ZpbGVFeHRlbnNpb24sXG4gICAgICBFeHBvcnROYW1lZERlY2xhcmF0aW9uOiBjaGVja0ZpbGVFeHRlbnNpb24sXG4gICAgfVxuICB9LFxufVxuIl19