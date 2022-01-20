'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.isAbsolute = isAbsolute;
exports.isBuiltIn = isBuiltIn;
exports.isExternalModuleMain = isExternalModuleMain;
exports.isScopedMain = isScopedMain;
exports.default = resolveImportType;

var _core = require('resolve/lib/core');

var _core2 = _interopRequireDefault(_core);

var _path = require('path');

var _resolve = require('eslint-module-utils/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function baseModule(name) {
  if (isScoped(name)) {
    var _name$split = name.split('/'),
        _name$split2 = _slicedToArray(_name$split, 2);

    const scope = _name$split2[0],
          pkg = _name$split2[1];

    return `${scope}/${pkg}`;
  }

  var _name$split3 = name.split('/'),
      _name$split4 = _slicedToArray(_name$split3, 1);

  const pkg = _name$split4[0];

  return pkg;
}

function isAbsolute(name) {
  return name.indexOf('/') === 0;
}

// path is defined only when a resolver resolves to a non-standard path
function isBuiltIn(name, settings, path) {
  if (path) return false;
  const base = baseModule(name);
  const extras = settings && settings['import/core-modules'] || [];
  return _core2.default[base] || extras.indexOf(base) > -1;
}

function isExternalPath(path, name, settings) {
  const folders = settings && settings['import/external-module-folders'] || ['node_modules'];

  // extract the part before the first / (redux-saga/effects => redux-saga)
  const packageName = name.match(/([^/]+)/)[0];

  return !path || folders.some(folder => -1 < path.indexOf((0, _path.join)(folder, packageName)));
}

const externalModuleRegExp = /^\w/;
function isExternalModule(name, settings, path) {
  return externalModuleRegExp.test(name) && isExternalPath(path, name, settings);
}

const externalModuleMainRegExp = /^[\w]((?!\/).)*$/;
function isExternalModuleMain(name, settings, path) {
  return externalModuleMainRegExp.test(name) && isExternalPath(path, name, settings);
}

const scopedRegExp = /^@[^/]+\/?[^/]+/;
function isScoped(name) {
  return scopedRegExp.test(name);
}

const scopedMainRegExp = /^@[^/]+\/?[^/]+$/;
function isScopedMain(name) {
  return scopedMainRegExp.test(name);
}

function isInternalModule(name, settings, path) {
  const internalScope = settings && settings['import/internal-regex'];
  const matchesScopedOrExternalRegExp = scopedRegExp.test(name) || externalModuleRegExp.test(name);
  return matchesScopedOrExternalRegExp && (internalScope && new RegExp(internalScope).test(name) || !isExternalPath(path, name, settings));
}

function isRelativeToParent(name) {
  return (/^\.\.[\\/]/.test(name)
  );
}

const indexFiles = ['.', './', './index', './index.js'];
function isIndex(name) {
  return indexFiles.indexOf(name) !== -1;
}

function isRelativeToSibling(name) {
  return (/^\.[\\/]/.test(name)
  );
}

function typeTest(name, settings, path) {
  if (isAbsolute(name, settings, path)) {
    return 'absolute';
  }
  if (isBuiltIn(name, settings, path)) {
    return 'builtin';
  }
  if (isInternalModule(name, settings, path)) {
    return 'internal';
  }
  if (isExternalModule(name, settings, path)) {
    return 'external';
  }
  if (isScoped(name, settings, path)) {
    return 'external';
  }
  if (isRelativeToParent(name, settings, path)) {
    return 'parent';
  }
  if (isIndex(name, settings, path)) {
    return 'index';
  }
  if (isRelativeToSibling(name, settings, path)) {
    return 'sibling';
  }
  return 'unknown';
}

function resolveImportType(name, context) {
  return typeTest(name, context.settings, (0, _resolve2.default)(name, context));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL2ltcG9ydFR5cGUuanMiXSwibmFtZXMiOlsiaXNBYnNvbHV0ZSIsImlzQnVpbHRJbiIsImlzRXh0ZXJuYWxNb2R1bGVNYWluIiwiaXNTY29wZWRNYWluIiwicmVzb2x2ZUltcG9ydFR5cGUiLCJiYXNlTW9kdWxlIiwibmFtZSIsImlzU2NvcGVkIiwic3BsaXQiLCJzY29wZSIsInBrZyIsImluZGV4T2YiLCJzZXR0aW5ncyIsInBhdGgiLCJiYXNlIiwiZXh0cmFzIiwiY29yZU1vZHVsZXMiLCJpc0V4dGVybmFsUGF0aCIsImZvbGRlcnMiLCJwYWNrYWdlTmFtZSIsIm1hdGNoIiwic29tZSIsImZvbGRlciIsImV4dGVybmFsTW9kdWxlUmVnRXhwIiwiaXNFeHRlcm5hbE1vZHVsZSIsInRlc3QiLCJleHRlcm5hbE1vZHVsZU1haW5SZWdFeHAiLCJzY29wZWRSZWdFeHAiLCJzY29wZWRNYWluUmVnRXhwIiwiaXNJbnRlcm5hbE1vZHVsZSIsImludGVybmFsU2NvcGUiLCJtYXRjaGVzU2NvcGVkT3JFeHRlcm5hbFJlZ0V4cCIsIlJlZ0V4cCIsImlzUmVsYXRpdmVUb1BhcmVudCIsImluZGV4RmlsZXMiLCJpc0luZGV4IiwiaXNSZWxhdGl2ZVRvU2libGluZyIsInR5cGVUZXN0IiwiY29udGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7UUFjZ0JBLFUsR0FBQUEsVTtRQUtBQyxTLEdBQUFBLFM7UUFzQkFDLG9CLEdBQUFBLG9CO1FBVUFDLFksR0FBQUEsWTtrQkFtQ1FDLGlCOztBQXRGeEI7Ozs7QUFDQTs7QUFFQTs7Ozs7O0FBRUEsU0FBU0MsVUFBVCxDQUFvQkMsSUFBcEIsRUFBMEI7QUFDeEIsTUFBSUMsU0FBU0QsSUFBVCxDQUFKLEVBQW9CO0FBQUEsc0JBQ0dBLEtBQUtFLEtBQUwsQ0FBVyxHQUFYLENBREg7QUFBQTs7QUFBQSxVQUNYQyxLQURXO0FBQUEsVUFDSkMsR0FESTs7QUFFbEIsV0FBUSxHQUFFRCxLQUFNLElBQUdDLEdBQUksRUFBdkI7QUFDRDs7QUFKdUIscUJBS1ZKLEtBQUtFLEtBQUwsQ0FBVyxHQUFYLENBTFU7QUFBQTs7QUFBQSxRQUtqQkUsR0FMaUI7O0FBTXhCLFNBQU9BLEdBQVA7QUFDRDs7QUFFTSxTQUFTVixVQUFULENBQW9CTSxJQUFwQixFQUEwQjtBQUMvQixTQUFPQSxLQUFLSyxPQUFMLENBQWEsR0FBYixNQUFzQixDQUE3QjtBQUNEOztBQUVEO0FBQ08sU0FBU1YsU0FBVCxDQUFtQkssSUFBbkIsRUFBeUJNLFFBQXpCLEVBQW1DQyxJQUFuQyxFQUF5QztBQUM5QyxNQUFJQSxJQUFKLEVBQVUsT0FBTyxLQUFQO0FBQ1YsUUFBTUMsT0FBT1QsV0FBV0MsSUFBWCxDQUFiO0FBQ0EsUUFBTVMsU0FBVUgsWUFBWUEsU0FBUyxxQkFBVCxDQUFiLElBQWlELEVBQWhFO0FBQ0EsU0FBT0ksZUFBWUYsSUFBWixLQUFxQkMsT0FBT0osT0FBUCxDQUFlRyxJQUFmLElBQXVCLENBQUMsQ0FBcEQ7QUFDRDs7QUFFRCxTQUFTRyxjQUFULENBQXdCSixJQUF4QixFQUE4QlAsSUFBOUIsRUFBb0NNLFFBQXBDLEVBQThDO0FBQzVDLFFBQU1NLFVBQVdOLFlBQVlBLFNBQVMsZ0NBQVQsQ0FBYixJQUE0RCxDQUFDLGNBQUQsQ0FBNUU7O0FBRUE7QUFDQSxRQUFNTyxjQUFjYixLQUFLYyxLQUFMLENBQVcsU0FBWCxFQUFzQixDQUF0QixDQUFwQjs7QUFFQSxTQUFPLENBQUNQLElBQUQsSUFBU0ssUUFBUUcsSUFBUixDQUFhQyxVQUFVLENBQUMsQ0FBRCxHQUFLVCxLQUFLRixPQUFMLENBQWEsZ0JBQUtXLE1BQUwsRUFBYUgsV0FBYixDQUFiLENBQTVCLENBQWhCO0FBQ0Q7O0FBRUQsTUFBTUksdUJBQXVCLEtBQTdCO0FBQ0EsU0FBU0MsZ0JBQVQsQ0FBMEJsQixJQUExQixFQUFnQ00sUUFBaEMsRUFBMENDLElBQTFDLEVBQWdEO0FBQzlDLFNBQU9VLHFCQUFxQkUsSUFBckIsQ0FBMEJuQixJQUExQixLQUFtQ1csZUFBZUosSUFBZixFQUFxQlAsSUFBckIsRUFBMkJNLFFBQTNCLENBQTFDO0FBQ0Q7O0FBRUQsTUFBTWMsMkJBQTJCLGtCQUFqQztBQUNPLFNBQVN4QixvQkFBVCxDQUE4QkksSUFBOUIsRUFBb0NNLFFBQXBDLEVBQThDQyxJQUE5QyxFQUFvRDtBQUN6RCxTQUFPYSx5QkFBeUJELElBQXpCLENBQThCbkIsSUFBOUIsS0FBdUNXLGVBQWVKLElBQWYsRUFBcUJQLElBQXJCLEVBQTJCTSxRQUEzQixDQUE5QztBQUNEOztBQUVELE1BQU1lLGVBQWUsaUJBQXJCO0FBQ0EsU0FBU3BCLFFBQVQsQ0FBa0JELElBQWxCLEVBQXdCO0FBQ3RCLFNBQU9xQixhQUFhRixJQUFiLENBQWtCbkIsSUFBbEIsQ0FBUDtBQUNEOztBQUVELE1BQU1zQixtQkFBbUIsa0JBQXpCO0FBQ08sU0FBU3pCLFlBQVQsQ0FBc0JHLElBQXRCLEVBQTRCO0FBQ2pDLFNBQU9zQixpQkFBaUJILElBQWpCLENBQXNCbkIsSUFBdEIsQ0FBUDtBQUNEOztBQUVELFNBQVN1QixnQkFBVCxDQUEwQnZCLElBQTFCLEVBQWdDTSxRQUFoQyxFQUEwQ0MsSUFBMUMsRUFBZ0Q7QUFDOUMsUUFBTWlCLGdCQUFpQmxCLFlBQVlBLFNBQVMsdUJBQVQsQ0FBbkM7QUFDQSxRQUFNbUIsZ0NBQWdDSixhQUFhRixJQUFiLENBQWtCbkIsSUFBbEIsS0FBMkJpQixxQkFBcUJFLElBQXJCLENBQTBCbkIsSUFBMUIsQ0FBakU7QUFDQSxTQUFReUIsa0NBQWtDRCxpQkFBaUIsSUFBSUUsTUFBSixDQUFXRixhQUFYLEVBQTBCTCxJQUExQixDQUErQm5CLElBQS9CLENBQWpCLElBQXlELENBQUNXLGVBQWVKLElBQWYsRUFBcUJQLElBQXJCLEVBQTJCTSxRQUEzQixDQUE1RixDQUFSO0FBQ0Q7O0FBRUQsU0FBU3FCLGtCQUFULENBQTRCM0IsSUFBNUIsRUFBa0M7QUFDaEMsU0FBTyxjQUFhbUIsSUFBYixDQUFrQm5CLElBQWxCO0FBQVA7QUFDRDs7QUFFRCxNQUFNNEIsYUFBYSxDQUFDLEdBQUQsRUFBTSxJQUFOLEVBQVksU0FBWixFQUF1QixZQUF2QixDQUFuQjtBQUNBLFNBQVNDLE9BQVQsQ0FBaUI3QixJQUFqQixFQUF1QjtBQUNyQixTQUFPNEIsV0FBV3ZCLE9BQVgsQ0FBbUJMLElBQW5CLE1BQTZCLENBQUMsQ0FBckM7QUFDRDs7QUFFRCxTQUFTOEIsbUJBQVQsQ0FBNkI5QixJQUE3QixFQUFtQztBQUNqQyxTQUFPLFlBQVdtQixJQUFYLENBQWdCbkIsSUFBaEI7QUFBUDtBQUNEOztBQUVELFNBQVMrQixRQUFULENBQWtCL0IsSUFBbEIsRUFBd0JNLFFBQXhCLEVBQWtDQyxJQUFsQyxFQUF3QztBQUN0QyxNQUFJYixXQUFXTSxJQUFYLEVBQWlCTSxRQUFqQixFQUEyQkMsSUFBM0IsQ0FBSixFQUFzQztBQUFFLFdBQU8sVUFBUDtBQUFtQjtBQUMzRCxNQUFJWixVQUFVSyxJQUFWLEVBQWdCTSxRQUFoQixFQUEwQkMsSUFBMUIsQ0FBSixFQUFxQztBQUFFLFdBQU8sU0FBUDtBQUFrQjtBQUN6RCxNQUFJZ0IsaUJBQWlCdkIsSUFBakIsRUFBdUJNLFFBQXZCLEVBQWlDQyxJQUFqQyxDQUFKLEVBQTRDO0FBQUUsV0FBTyxVQUFQO0FBQW1CO0FBQ2pFLE1BQUlXLGlCQUFpQmxCLElBQWpCLEVBQXVCTSxRQUF2QixFQUFpQ0MsSUFBakMsQ0FBSixFQUE0QztBQUFFLFdBQU8sVUFBUDtBQUFtQjtBQUNqRSxNQUFJTixTQUFTRCxJQUFULEVBQWVNLFFBQWYsRUFBeUJDLElBQXpCLENBQUosRUFBb0M7QUFBRSxXQUFPLFVBQVA7QUFBbUI7QUFDekQsTUFBSW9CLG1CQUFtQjNCLElBQW5CLEVBQXlCTSxRQUF6QixFQUFtQ0MsSUFBbkMsQ0FBSixFQUE4QztBQUFFLFdBQU8sUUFBUDtBQUFpQjtBQUNqRSxNQUFJc0IsUUFBUTdCLElBQVIsRUFBY00sUUFBZCxFQUF3QkMsSUFBeEIsQ0FBSixFQUFtQztBQUFFLFdBQU8sT0FBUDtBQUFnQjtBQUNyRCxNQUFJdUIsb0JBQW9COUIsSUFBcEIsRUFBMEJNLFFBQTFCLEVBQW9DQyxJQUFwQyxDQUFKLEVBQStDO0FBQUUsV0FBTyxTQUFQO0FBQWtCO0FBQ25FLFNBQU8sU0FBUDtBQUNEOztBQUVjLFNBQVNULGlCQUFULENBQTJCRSxJQUEzQixFQUFpQ2dDLE9BQWpDLEVBQTBDO0FBQ3ZELFNBQU9ELFNBQVMvQixJQUFULEVBQWVnQyxRQUFRMUIsUUFBdkIsRUFBaUMsdUJBQVFOLElBQVIsRUFBY2dDLE9BQWQsQ0FBakMsQ0FBUDtBQUNEIiwiZmlsZSI6ImltcG9ydFR5cGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29yZU1vZHVsZXMgZnJvbSAncmVzb2x2ZS9saWIvY29yZSdcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJ1xuXG5pbXBvcnQgcmVzb2x2ZSBmcm9tICdlc2xpbnQtbW9kdWxlLXV0aWxzL3Jlc29sdmUnXG5cbmZ1bmN0aW9uIGJhc2VNb2R1bGUobmFtZSkge1xuICBpZiAoaXNTY29wZWQobmFtZSkpIHtcbiAgICBjb25zdCBbc2NvcGUsIHBrZ10gPSBuYW1lLnNwbGl0KCcvJylcbiAgICByZXR1cm4gYCR7c2NvcGV9LyR7cGtnfWBcbiAgfVxuICBjb25zdCBbcGtnXSA9IG5hbWUuc3BsaXQoJy8nKVxuICByZXR1cm4gcGtnXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Fic29sdXRlKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUuaW5kZXhPZignLycpID09PSAwXG59XG5cbi8vIHBhdGggaXMgZGVmaW5lZCBvbmx5IHdoZW4gYSByZXNvbHZlciByZXNvbHZlcyB0byBhIG5vbi1zdGFuZGFyZCBwYXRoXG5leHBvcnQgZnVuY3Rpb24gaXNCdWlsdEluKG5hbWUsIHNldHRpbmdzLCBwYXRoKSB7XG4gIGlmIChwYXRoKSByZXR1cm4gZmFsc2VcbiAgY29uc3QgYmFzZSA9IGJhc2VNb2R1bGUobmFtZSlcbiAgY29uc3QgZXh0cmFzID0gKHNldHRpbmdzICYmIHNldHRpbmdzWydpbXBvcnQvY29yZS1tb2R1bGVzJ10pIHx8IFtdXG4gIHJldHVybiBjb3JlTW9kdWxlc1tiYXNlXSB8fCBleHRyYXMuaW5kZXhPZihiYXNlKSA+IC0xXG59XG5cbmZ1bmN0aW9uIGlzRXh0ZXJuYWxQYXRoKHBhdGgsIG5hbWUsIHNldHRpbmdzKSB7XG4gIGNvbnN0IGZvbGRlcnMgPSAoc2V0dGluZ3MgJiYgc2V0dGluZ3NbJ2ltcG9ydC9leHRlcm5hbC1tb2R1bGUtZm9sZGVycyddKSB8fCBbJ25vZGVfbW9kdWxlcyddXG5cbiAgLy8gZXh0cmFjdCB0aGUgcGFydCBiZWZvcmUgdGhlIGZpcnN0IC8gKHJlZHV4LXNhZ2EvZWZmZWN0cyA9PiByZWR1eC1zYWdhKVxuICBjb25zdCBwYWNrYWdlTmFtZSA9IG5hbWUubWF0Y2goLyhbXi9dKykvKVswXVxuXG4gIHJldHVybiAhcGF0aCB8fCBmb2xkZXJzLnNvbWUoZm9sZGVyID0+IC0xIDwgcGF0aC5pbmRleE9mKGpvaW4oZm9sZGVyLCBwYWNrYWdlTmFtZSkpKVxufVxuXG5jb25zdCBleHRlcm5hbE1vZHVsZVJlZ0V4cCA9IC9eXFx3L1xuZnVuY3Rpb24gaXNFeHRlcm5hbE1vZHVsZShuYW1lLCBzZXR0aW5ncywgcGF0aCkge1xuICByZXR1cm4gZXh0ZXJuYWxNb2R1bGVSZWdFeHAudGVzdChuYW1lKSAmJiBpc0V4dGVybmFsUGF0aChwYXRoLCBuYW1lLCBzZXR0aW5ncylcbn1cblxuY29uc3QgZXh0ZXJuYWxNb2R1bGVNYWluUmVnRXhwID0gL15bXFx3XSgoPyFcXC8pLikqJC9cbmV4cG9ydCBmdW5jdGlvbiBpc0V4dGVybmFsTW9kdWxlTWFpbihuYW1lLCBzZXR0aW5ncywgcGF0aCkge1xuICByZXR1cm4gZXh0ZXJuYWxNb2R1bGVNYWluUmVnRXhwLnRlc3QobmFtZSkgJiYgaXNFeHRlcm5hbFBhdGgocGF0aCwgbmFtZSwgc2V0dGluZ3MpXG59XG5cbmNvbnN0IHNjb3BlZFJlZ0V4cCA9IC9eQFteL10rXFwvP1teL10rL1xuZnVuY3Rpb24gaXNTY29wZWQobmFtZSkge1xuICByZXR1cm4gc2NvcGVkUmVnRXhwLnRlc3QobmFtZSlcbn1cblxuY29uc3Qgc2NvcGVkTWFpblJlZ0V4cCA9IC9eQFteL10rXFwvP1teL10rJC9cbmV4cG9ydCBmdW5jdGlvbiBpc1Njb3BlZE1haW4obmFtZSkge1xuICByZXR1cm4gc2NvcGVkTWFpblJlZ0V4cC50ZXN0KG5hbWUpXG59XG5cbmZ1bmN0aW9uIGlzSW50ZXJuYWxNb2R1bGUobmFtZSwgc2V0dGluZ3MsIHBhdGgpIHtcbiAgY29uc3QgaW50ZXJuYWxTY29wZSA9IChzZXR0aW5ncyAmJiBzZXR0aW5nc1snaW1wb3J0L2ludGVybmFsLXJlZ2V4J10pXG4gIGNvbnN0IG1hdGNoZXNTY29wZWRPckV4dGVybmFsUmVnRXhwID0gc2NvcGVkUmVnRXhwLnRlc3QobmFtZSkgfHwgZXh0ZXJuYWxNb2R1bGVSZWdFeHAudGVzdChuYW1lKVxuICByZXR1cm4gKG1hdGNoZXNTY29wZWRPckV4dGVybmFsUmVnRXhwICYmIChpbnRlcm5hbFNjb3BlICYmIG5ldyBSZWdFeHAoaW50ZXJuYWxTY29wZSkudGVzdChuYW1lKSB8fCAhaXNFeHRlcm5hbFBhdGgocGF0aCwgbmFtZSwgc2V0dGluZ3MpKSlcbn1cblxuZnVuY3Rpb24gaXNSZWxhdGl2ZVRvUGFyZW50KG5hbWUpIHtcbiAgcmV0dXJuIC9eXFwuXFwuW1xcXFwvXS8udGVzdChuYW1lKVxufVxuXG5jb25zdCBpbmRleEZpbGVzID0gWycuJywgJy4vJywgJy4vaW5kZXgnLCAnLi9pbmRleC5qcyddXG5mdW5jdGlvbiBpc0luZGV4KG5hbWUpIHtcbiAgcmV0dXJuIGluZGV4RmlsZXMuaW5kZXhPZihuYW1lKSAhPT0gLTFcbn1cblxuZnVuY3Rpb24gaXNSZWxhdGl2ZVRvU2libGluZyhuYW1lKSB7XG4gIHJldHVybiAvXlxcLltcXFxcL10vLnRlc3QobmFtZSlcbn1cblxuZnVuY3Rpb24gdHlwZVRlc3QobmFtZSwgc2V0dGluZ3MsIHBhdGgpIHtcbiAgaWYgKGlzQWJzb2x1dGUobmFtZSwgc2V0dGluZ3MsIHBhdGgpKSB7IHJldHVybiAnYWJzb2x1dGUnIH1cbiAgaWYgKGlzQnVpbHRJbihuYW1lLCBzZXR0aW5ncywgcGF0aCkpIHsgcmV0dXJuICdidWlsdGluJyB9XG4gIGlmIChpc0ludGVybmFsTW9kdWxlKG5hbWUsIHNldHRpbmdzLCBwYXRoKSkgeyByZXR1cm4gJ2ludGVybmFsJyB9XG4gIGlmIChpc0V4dGVybmFsTW9kdWxlKG5hbWUsIHNldHRpbmdzLCBwYXRoKSkgeyByZXR1cm4gJ2V4dGVybmFsJyB9XG4gIGlmIChpc1Njb3BlZChuYW1lLCBzZXR0aW5ncywgcGF0aCkpIHsgcmV0dXJuICdleHRlcm5hbCcgfVxuICBpZiAoaXNSZWxhdGl2ZVRvUGFyZW50KG5hbWUsIHNldHRpbmdzLCBwYXRoKSkgeyByZXR1cm4gJ3BhcmVudCcgfVxuICBpZiAoaXNJbmRleChuYW1lLCBzZXR0aW5ncywgcGF0aCkpIHsgcmV0dXJuICdpbmRleCcgfVxuICBpZiAoaXNSZWxhdGl2ZVRvU2libGluZyhuYW1lLCBzZXR0aW5ncywgcGF0aCkpIHsgcmV0dXJuICdzaWJsaW5nJyB9XG4gIHJldHVybiAndW5rbm93bidcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVzb2x2ZUltcG9ydFR5cGUobmFtZSwgY29udGV4dCkge1xuICByZXR1cm4gdHlwZVRlc3QobmFtZSwgY29udGV4dC5zZXR0aW5ncywgcmVzb2x2ZShuYW1lLCBjb250ZXh0KSlcbn1cbiJdfQ==