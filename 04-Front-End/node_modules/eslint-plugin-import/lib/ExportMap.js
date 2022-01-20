'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recursivePatternCapture = recursivePatternCapture;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _doctrine = require('doctrine');

var _doctrine2 = _interopRequireDefault(_doctrine);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _eslint = require('eslint');

var _parse = require('eslint-module-utils/parse');

var _parse2 = _interopRequireDefault(_parse);

var _resolve = require('eslint-module-utils/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _ignore = require('eslint-module-utils/ignore');

var _ignore2 = _interopRequireDefault(_ignore);

var _hash = require('eslint-module-utils/hash');

var _unambiguous = require('eslint-module-utils/unambiguous');

var unambiguous = _interopRequireWildcard(_unambiguous);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _debug2.default)('eslint-plugin-import:ExportMap');

const exportCache = new Map();

class ExportMap {
  constructor(path) {
    this.path = path;
    this.namespace = new Map();
    // todo: restructure to key on path, value is resolver + map of names
    this.reexports = new Map();
    /**
     * star-exports
     * @type {Set} of () => ExportMap
     */
    this.dependencies = new Set();
    /**
     * dependencies of this module that are not explicitly re-exported
     * @type {Map} from path = () => ExportMap
     */
    this.imports = new Map();
    this.errors = [];
  }

  get hasDefault() {
    return this.get('default') != null;
  } // stronger than this.has

  get size() {
    let size = this.namespace.size + this.reexports.size;
    this.dependencies.forEach(dep => {
      const d = dep();
      // CJS / ignored dependencies won't exist (#717)
      if (d == null) return;
      size += d.size;
    });
    return size;
  }

  /**
   * Note that this does not check explicitly re-exported names for existence
   * in the base namespace, but it will expand all `export * from '...'` exports
   * if not found in the explicit namespace.
   * @param  {string}  name
   * @return {Boolean} true if `name` is exported by this module.
   */
  has(name) {
    if (this.namespace.has(name)) return true;
    if (this.reexports.has(name)) return true;

    // default exports must be explicitly re-exported (#328)
    if (name !== 'default') {
      for (let dep of this.dependencies) {
        let innerMap = dep();

        // todo: report as unresolved?
        if (!innerMap) continue;

        if (innerMap.has(name)) return true;
      }
    }

    return false;
  }

  /**
   * ensure that imported name fully resolves.
   * @param  {[type]}  name [description]
   * @return {Boolean}      [description]
   */
  hasDeep(name) {
    if (this.namespace.has(name)) return { found: true, path: [this] };

    if (this.reexports.has(name)) {
      const reexports = this.reexports.get(name),
            imported = reexports.getImport();

      // if import is ignored, return explicit 'null'
      if (imported == null) return { found: true, path: [this]

        // safeguard against cycles, only if name matches
      };if (imported.path === this.path && reexports.local === name) {
        return { found: false, path: [this] };
      }

      const deep = imported.hasDeep(reexports.local);
      deep.path.unshift(this);

      return deep;
    }

    // default exports must be explicitly re-exported (#328)
    if (name !== 'default') {
      for (let dep of this.dependencies) {
        let innerMap = dep();
        // todo: report as unresolved?
        if (!innerMap) continue;

        // safeguard against cycles
        if (innerMap.path === this.path) continue;

        let innerValue = innerMap.hasDeep(name);
        if (innerValue.found) {
          innerValue.path.unshift(this);
          return innerValue;
        }
      }
    }

    return { found: false, path: [this] };
  }

  get(name) {
    if (this.namespace.has(name)) return this.namespace.get(name);

    if (this.reexports.has(name)) {
      const reexports = this.reexports.get(name),
            imported = reexports.getImport();

      // if import is ignored, return explicit 'null'
      if (imported == null) return null;

      // safeguard against cycles, only if name matches
      if (imported.path === this.path && reexports.local === name) return undefined;

      return imported.get(reexports.local);
    }

    // default exports must be explicitly re-exported (#328)
    if (name !== 'default') {
      for (let dep of this.dependencies) {
        let innerMap = dep();
        // todo: report as unresolved?
        if (!innerMap) continue;

        // safeguard against cycles
        if (innerMap.path === this.path) continue;

        let innerValue = innerMap.get(name);
        if (innerValue !== undefined) return innerValue;
      }
    }

    return undefined;
  }

  forEach(callback, thisArg) {
    this.namespace.forEach((v, n) => callback.call(thisArg, v, n, this));

    this.reexports.forEach((reexports, name) => {
      const reexported = reexports.getImport();
      // can't look up meta for ignored re-exports (#348)
      callback.call(thisArg, reexported && reexported.get(reexports.local), name, this);
    });

    this.dependencies.forEach(dep => {
      const d = dep();
      // CJS / ignored dependencies won't exist (#717)
      if (d == null) return;

      d.forEach((v, n) => n !== 'default' && callback.call(thisArg, v, n, this));
    });
  }

  // todo: keys, values, entries?

  reportErrors(context, declaration) {
    context.report({
      node: declaration.source,
      message: `Parse errors in imported module '${declaration.source.value}': ` + `${this.errors.map(e => `${e.message} (${e.lineNumber}:${e.column})`).join(', ')}`
    });
  }
}

exports.default = ExportMap; /**
                              * parse docs from the first node that has leading comments
                              */

function captureDoc(source, docStyleParsers) {
  const metadata = {};

  // 'some' short-circuits on first 'true'

  for (var _len = arguments.length, nodes = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    nodes[_key - 2] = arguments[_key];
  }

  nodes.some(n => {
    try {

      let leadingComments;

      // n.leadingComments is legacy `attachComments` behavior
      if ('leadingComments' in n) {
        leadingComments = n.leadingComments;
      } else if (n.range) {
        leadingComments = source.getCommentsBefore(n);
      }

      if (!leadingComments || leadingComments.length === 0) return false;

      for (let name in docStyleParsers) {
        const doc = docStyleParsers[name](leadingComments);
        if (doc) {
          metadata.doc = doc;
        }
      }

      return true;
    } catch (err) {
      return false;
    }
  });

  return metadata;
}

const availableDocStyleParsers = {
  jsdoc: captureJsDoc,
  tomdoc: captureTomDoc

  /**
   * parse JSDoc from leading comments
   * @param  {...[type]} comments [description]
   * @return {{doc: object}}
   */
};function captureJsDoc(comments) {
  let doc;

  // capture XSDoc
  comments.forEach(comment => {
    // skip non-block comments
    if (comment.type !== 'Block') return;
    try {
      doc = _doctrine2.default.parse(comment.value, { unwrap: true });
    } catch (err) {
      /* don't care, for now? maybe add to `errors?` */
    }
  });

  return doc;
}

/**
  * parse TomDoc section from comments
  */
function captureTomDoc(comments) {
  // collect lines up to first paragraph break
  const lines = [];
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    if (comment.value.match(/^\s*$/)) break;
    lines.push(comment.value.trim());
  }

  // return doctrine-like object
  const statusMatch = lines.join(' ').match(/^(Public|Internal|Deprecated):\s*(.+)/);
  if (statusMatch) {
    return {
      description: statusMatch[2],
      tags: [{
        title: statusMatch[1].toLowerCase(),
        description: statusMatch[2]
      }]
    };
  }
}

ExportMap.get = function (source, context) {
  const path = (0, _resolve2.default)(source, context);
  if (path == null) return null;

  return ExportMap.for(childContext(path, context));
};

ExportMap.for = function (context) {
  const path = context.path;


  const cacheKey = (0, _hash.hashObject)(context).digest('hex');
  let exportMap = exportCache.get(cacheKey);

  // return cached ignore
  if (exportMap === null) return null;

  const stats = _fs2.default.statSync(path);
  if (exportMap != null) {
    // date equality check
    if (exportMap.mtime - stats.mtime === 0) {
      return exportMap;
    }
    // future: check content equality?
  }

  // check valid extensions first
  if (!(0, _ignore.hasValidExtension)(path, context)) {
    exportCache.set(cacheKey, null);
    return null;
  }

  // check for and cache ignore
  if ((0, _ignore2.default)(path, context)) {
    log('ignored path due to ignore settings:', path);
    exportCache.set(cacheKey, null);
    return null;
  }

  const content = _fs2.default.readFileSync(path, { encoding: 'utf8' });

  // check for and cache unambigious modules
  if (!unambiguous.test(content)) {
    log('ignored path due to unambiguous regex:', path);
    exportCache.set(cacheKey, null);
    return null;
  }

  log('cache miss', cacheKey, 'for path', path);
  exportMap = ExportMap.parse(path, content, context);

  // ambiguous modules return null
  if (exportMap == null) return null;

  exportMap.mtime = stats.mtime;

  exportCache.set(cacheKey, exportMap);
  return exportMap;
};

ExportMap.parse = function (path, content, context) {
  var m = new ExportMap(path);

  try {
    var ast = (0, _parse2.default)(path, content, context);
  } catch (err) {
    log('parse error:', path, err);
    m.errors.push(err);
    return m; // can't continue
  }

  if (!unambiguous.isModule(ast)) return null;

  const docstyle = context.settings && context.settings['import/docstyle'] || ['jsdoc'];
  const docStyleParsers = {};
  docstyle.forEach(style => {
    docStyleParsers[style] = availableDocStyleParsers[style];
  });

  // attempt to collect module doc
  if (ast.comments) {
    ast.comments.some(c => {
      if (c.type !== 'Block') return false;
      try {
        const doc = _doctrine2.default.parse(c.value, { unwrap: true });
        if (doc.tags.some(t => t.title === 'module')) {
          m.doc = doc;
          return true;
        }
      } catch (err) {/* ignore */}
      return false;
    });
  }

  const namespaces = new Map();

  function remotePath(value) {
    return _resolve2.default.relative(value, path, context.settings);
  }

  function resolveImport(value) {
    const rp = remotePath(value);
    if (rp == null) return null;
    return ExportMap.for(childContext(rp, context));
  }

  function getNamespace(identifier) {
    if (!namespaces.has(identifier.name)) return;

    return function () {
      return resolveImport(namespaces.get(identifier.name));
    };
  }

  function addNamespace(object, identifier) {
    const nsfn = getNamespace(identifier);
    if (nsfn) {
      Object.defineProperty(object, 'namespace', { get: nsfn });
    }

    return object;
  }

  function captureDependency(declaration) {
    if (declaration.source == null) return null;
    if (declaration.importKind === 'type') return null; // skip Flow type imports
    const importedSpecifiers = new Set();
    const supportedTypes = new Set(['ImportDefaultSpecifier', 'ImportNamespaceSpecifier']);
    let hasImportedType = false;
    if (declaration.specifiers) {
      declaration.specifiers.forEach(specifier => {
        const isType = specifier.importKind === 'type';
        hasImportedType = hasImportedType || isType;

        if (supportedTypes.has(specifier.type) && !isType) {
          importedSpecifiers.add(specifier.type);
        }
        if (specifier.type === 'ImportSpecifier' && !isType) {
          importedSpecifiers.add(specifier.imported.name);
        }
      });
    }

    // only Flow types were imported
    if (hasImportedType && importedSpecifiers.size === 0) return null;

    const p = remotePath(declaration.source.value);
    if (p == null) return null;
    const existing = m.imports.get(p);
    if (existing != null) return existing.getter;

    const getter = thunkFor(p, context);
    m.imports.set(p, {
      getter,
      source: { // capturing actual node reference holds full AST in memory!
        value: declaration.source.value,
        loc: declaration.source.loc
      },
      importedSpecifiers
    });
    return getter;
  }

  const source = makeSourceCode(content, ast);

  ast.body.forEach(function (n) {

    if (n.type === 'ExportDefaultDeclaration') {
      const exportMeta = captureDoc(source, docStyleParsers, n);
      if (n.declaration.type === 'Identifier') {
        addNamespace(exportMeta, n.declaration);
      }
      m.namespace.set('default', exportMeta);
      return;
    }

    if (n.type === 'ExportAllDeclaration') {
      const getter = captureDependency(n);
      if (getter) m.dependencies.add(getter);
      return;
    }

    // capture namespaces in case of later export
    if (n.type === 'ImportDeclaration') {
      captureDependency(n);
      let ns;
      if (n.specifiers.some(s => s.type === 'ImportNamespaceSpecifier' && (ns = s))) {
        namespaces.set(ns.local.name, n.source.value);
      }
      return;
    }

    if (n.type === 'ExportNamedDeclaration') {
      // capture declaration
      if (n.declaration != null) {
        switch (n.declaration.type) {
          case 'FunctionDeclaration':
          case 'ClassDeclaration':
          case 'TypeAlias': // flowtype with babel-eslint parser
          case 'InterfaceDeclaration':
          case 'DeclareFunction':
          case 'TSDeclareFunction':
          case 'TSEnumDeclaration':
          case 'TSTypeAliasDeclaration':
          case 'TSInterfaceDeclaration':
          case 'TSAbstractClassDeclaration':
          case 'TSModuleDeclaration':
            m.namespace.set(n.declaration.id.name, captureDoc(source, docStyleParsers, n));
            break;
          case 'VariableDeclaration':
            n.declaration.declarations.forEach(d => recursivePatternCapture(d.id, id => m.namespace.set(id.name, captureDoc(source, docStyleParsers, d, n))));
            break;
        }
      }

      const nsource = n.source && n.source.value;
      n.specifiers.forEach(s => {
        const exportMeta = {};
        let local;

        switch (s.type) {
          case 'ExportDefaultSpecifier':
            if (!n.source) return;
            local = 'default';
            break;
          case 'ExportNamespaceSpecifier':
            m.namespace.set(s.exported.name, Object.defineProperty(exportMeta, 'namespace', {
              get() {
                return resolveImport(nsource);
              }
            }));
            return;
          case 'ExportSpecifier':
            if (!n.source) {
              m.namespace.set(s.exported.name, addNamespace(exportMeta, s.local));
              return;
            }
          // else falls through
          default:
            local = s.local.name;
            break;
        }

        // todo: JSDoc
        m.reexports.set(s.exported.name, { local, getImport: () => resolveImport(nsource) });
      });
    }

    // This doesn't declare anything, but changes what's being exported.
    if (n.type === 'TSExportAssignment') {
      const moduleDecls = ast.body.filter(bodyNode => bodyNode.type === 'TSModuleDeclaration' && bodyNode.id.name === n.expression.name);
      moduleDecls.forEach(moduleDecl => {
        if (moduleDecl && moduleDecl.body && moduleDecl.body.body) {
          moduleDecl.body.body.forEach(moduleBlockNode => {
            // Export-assignment exports all members in the namespace, explicitly exported or not.
            const exportedDecl = moduleBlockNode.type === 'ExportNamedDeclaration' ? moduleBlockNode.declaration : moduleBlockNode;

            if (exportedDecl.type === 'VariableDeclaration') {
              exportedDecl.declarations.forEach(decl => recursivePatternCapture(decl.id, id => m.namespace.set(id.name, captureDoc(source, docStyleParsers, decl, exportedDecl, moduleBlockNode))));
            } else {
              m.namespace.set(exportedDecl.id.name, captureDoc(source, docStyleParsers, moduleBlockNode));
            }
          });
        }
      });
    }
  });

  return m;
};

/**
 * The creation of this closure is isolated from other scopes
 * to avoid over-retention of unrelated variables, which has
 * caused memory leaks. See #1266.
 */
function thunkFor(p, context) {
  return () => ExportMap.for(childContext(p, context));
}

/**
 * Traverse a pattern/identifier node, calling 'callback'
 * for each leaf identifier.
 * @param  {node}   pattern
 * @param  {Function} callback
 * @return {void}
 */
function recursivePatternCapture(pattern, callback) {
  switch (pattern.type) {
    case 'Identifier':
      // base case
      callback(pattern);
      break;

    case 'ObjectPattern':
      pattern.properties.forEach(p => {
        recursivePatternCapture(p.value, callback);
      });
      break;

    case 'ArrayPattern':
      pattern.elements.forEach(element => {
        if (element == null) return;
        recursivePatternCapture(element, callback);
      });
      break;

    case 'AssignmentPattern':
      callback(pattern.left);
      break;
  }
}

/**
 * don't hold full context object in memory, just grab what we need.
 */
function childContext(path, context) {
  const settings = context.settings,
        parserOptions = context.parserOptions,
        parserPath = context.parserPath;

  return {
    settings,
    parserOptions,
    parserPath,
    path
  };
}

/**
 * sometimes legacy support isn't _that_ hard... right?
 */
function makeSourceCode(text, ast) {
  if (_eslint.SourceCode.length > 1) {
    // ESLint 3
    return new _eslint.SourceCode(text, ast);
  } else {
    // ESLint 4, 5
    return new _eslint.SourceCode({ text, ast });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9FeHBvcnRNYXAuanMiXSwibmFtZXMiOlsicmVjdXJzaXZlUGF0dGVybkNhcHR1cmUiLCJ1bmFtYmlndW91cyIsImxvZyIsImV4cG9ydENhY2hlIiwiTWFwIiwiRXhwb3J0TWFwIiwiY29uc3RydWN0b3IiLCJwYXRoIiwibmFtZXNwYWNlIiwicmVleHBvcnRzIiwiZGVwZW5kZW5jaWVzIiwiU2V0IiwiaW1wb3J0cyIsImVycm9ycyIsImhhc0RlZmF1bHQiLCJnZXQiLCJzaXplIiwiZm9yRWFjaCIsImRlcCIsImQiLCJoYXMiLCJuYW1lIiwiaW5uZXJNYXAiLCJoYXNEZWVwIiwiZm91bmQiLCJpbXBvcnRlZCIsImdldEltcG9ydCIsImxvY2FsIiwiZGVlcCIsInVuc2hpZnQiLCJpbm5lclZhbHVlIiwidW5kZWZpbmVkIiwiY2FsbGJhY2siLCJ0aGlzQXJnIiwidiIsIm4iLCJjYWxsIiwicmVleHBvcnRlZCIsInJlcG9ydEVycm9ycyIsImNvbnRleHQiLCJkZWNsYXJhdGlvbiIsInJlcG9ydCIsIm5vZGUiLCJzb3VyY2UiLCJtZXNzYWdlIiwidmFsdWUiLCJtYXAiLCJlIiwibGluZU51bWJlciIsImNvbHVtbiIsImpvaW4iLCJjYXB0dXJlRG9jIiwiZG9jU3R5bGVQYXJzZXJzIiwibWV0YWRhdGEiLCJub2RlcyIsInNvbWUiLCJsZWFkaW5nQ29tbWVudHMiLCJyYW5nZSIsImdldENvbW1lbnRzQmVmb3JlIiwibGVuZ3RoIiwiZG9jIiwiZXJyIiwiYXZhaWxhYmxlRG9jU3R5bGVQYXJzZXJzIiwianNkb2MiLCJjYXB0dXJlSnNEb2MiLCJ0b21kb2MiLCJjYXB0dXJlVG9tRG9jIiwiY29tbWVudHMiLCJjb21tZW50IiwidHlwZSIsImRvY3RyaW5lIiwicGFyc2UiLCJ1bndyYXAiLCJsaW5lcyIsImkiLCJtYXRjaCIsInB1c2giLCJ0cmltIiwic3RhdHVzTWF0Y2giLCJkZXNjcmlwdGlvbiIsInRhZ3MiLCJ0aXRsZSIsInRvTG93ZXJDYXNlIiwiZm9yIiwiY2hpbGRDb250ZXh0IiwiY2FjaGVLZXkiLCJkaWdlc3QiLCJleHBvcnRNYXAiLCJzdGF0cyIsImZzIiwic3RhdFN5bmMiLCJtdGltZSIsInNldCIsImNvbnRlbnQiLCJyZWFkRmlsZVN5bmMiLCJlbmNvZGluZyIsInRlc3QiLCJtIiwiYXN0IiwiaXNNb2R1bGUiLCJkb2NzdHlsZSIsInNldHRpbmdzIiwic3R5bGUiLCJjIiwidCIsIm5hbWVzcGFjZXMiLCJyZW1vdGVQYXRoIiwicmVzb2x2ZSIsInJlbGF0aXZlIiwicmVzb2x2ZUltcG9ydCIsInJwIiwiZ2V0TmFtZXNwYWNlIiwiaWRlbnRpZmllciIsImFkZE5hbWVzcGFjZSIsIm9iamVjdCIsIm5zZm4iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImNhcHR1cmVEZXBlbmRlbmN5IiwiaW1wb3J0S2luZCIsImltcG9ydGVkU3BlY2lmaWVycyIsInN1cHBvcnRlZFR5cGVzIiwiaGFzSW1wb3J0ZWRUeXBlIiwic3BlY2lmaWVycyIsInNwZWNpZmllciIsImlzVHlwZSIsImFkZCIsInAiLCJleGlzdGluZyIsImdldHRlciIsInRodW5rRm9yIiwibG9jIiwibWFrZVNvdXJjZUNvZGUiLCJib2R5IiwiZXhwb3J0TWV0YSIsIm5zIiwicyIsImlkIiwiZGVjbGFyYXRpb25zIiwibnNvdXJjZSIsImV4cG9ydGVkIiwibW9kdWxlRGVjbHMiLCJmaWx0ZXIiLCJib2R5Tm9kZSIsImV4cHJlc3Npb24iLCJtb2R1bGVEZWNsIiwibW9kdWxlQmxvY2tOb2RlIiwiZXhwb3J0ZWREZWNsIiwiZGVjbCIsInBhdHRlcm4iLCJwcm9wZXJ0aWVzIiwiZWxlbWVudHMiLCJlbGVtZW50IiwibGVmdCIsInBhcnNlck9wdGlvbnMiLCJwYXJzZXJQYXRoIiwidGV4dCIsIlNvdXJjZUNvZGUiXSwibWFwcGluZ3MiOiI7Ozs7O1FBb2tCZ0JBLHVCLEdBQUFBLHVCOztBQXBrQmhCOzs7O0FBRUE7Ozs7QUFFQTs7OztBQUVBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVB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QWpDO0FBQ0QsT0FGRDtBQUdBOztBQUVGLFNBQUssY0FBTDtBQUNFcUgsY0FBUUUsUUFBUixDQUFpQnRJLE9BQWpCLENBQTBCdUksT0FBRCxJQUFhO0FBQ3BDLFlBQUlBLFdBQVcsSUFBZixFQUFxQjtBQUNyQnhKLGdDQUF3QndKLE9BQXhCLEVBQWlDeEgsUUFBakM7QUFDRCxPQUhEO0FBSUE7O0FBRUYsU0FBSyxtQkFBTDtBQUNFQSxlQUFTcUgsUUFBUUksSUFBakI7QUFDQTtBQXBCSjtBQXNCRDs7QUFFRDs7O0FBR0EsU0FBU3JFLFlBQVQsQ0FBc0I3RSxJQUF0QixFQUE0QmdDLE9BQTVCLEVBQXFDO0FBQUEsUUFDM0I4RCxRQUQyQixHQUNhOUQsT0FEYixDQUMzQjhELFFBRDJCO0FBQUEsUUFDakJxRCxhQURpQixHQUNhbkgsT0FEYixDQUNqQm1ILGFBRGlCO0FBQUEsUUFDRkMsVUFERSxHQUNhcEgsT0FEYixDQUNGb0gsVUFERTs7QUFFbkMsU0FBTztBQUNMdEQsWUFESztBQUVMcUQsaUJBRks7QUFHTEMsY0FISztBQUlMcEo7QUFKSyxHQUFQO0FBTUQ7O0FBR0Q7OztBQUdBLFNBQVM2SCxjQUFULENBQXdCd0IsSUFBeEIsRUFBOEIxRCxHQUE5QixFQUFtQztBQUNqQyxNQUFJMkQsbUJBQVdsRyxNQUFYLEdBQW9CLENBQXhCLEVBQTJCO0FBQ3pCO0FBQ0EsV0FBTyxJQUFJa0csa0JBQUosQ0FBZUQsSUFBZixFQUFxQjFELEdBQXJCLENBQVA7QUFDRCxHQUhELE1BR087QUFDTDtBQUNBLFdBQU8sSUFBSTJELGtCQUFKLENBQWUsRUFBRUQsSUFBRixFQUFRMUQsR0FBUixFQUFmLENBQVA7QUFDRDtBQUNGIiwiZmlsZSI6IkV4cG9ydE1hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcydcblxuaW1wb3J0IGRvY3RyaW5lIGZyb20gJ2RvY3RyaW5lJ1xuXG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnXG5cbmltcG9ydCB7IFNvdXJjZUNvZGUgfSBmcm9tICdlc2xpbnQnXG5cbmltcG9ydCBwYXJzZSBmcm9tICdlc2xpbnQtbW9kdWxlLXV0aWxzL3BhcnNlJ1xuaW1wb3J0IHJlc29sdmUgZnJvbSAnZXNsaW50LW1vZHVsZS11dGlscy9yZXNvbHZlJ1xuaW1wb3J0IGlzSWdub3JlZCwgeyBoYXNWYWxpZEV4dGVuc2lvbiB9IGZyb20gJ2VzbGludC1tb2R1bGUtdXRpbHMvaWdub3JlJ1xuXG5pbXBvcnQgeyBoYXNoT2JqZWN0IH0gZnJvbSAnZXNsaW50LW1vZHVsZS11dGlscy9oYXNoJ1xuaW1wb3J0ICogYXMgdW5hbWJpZ3VvdXMgZnJvbSAnZXNsaW50LW1vZHVsZS11dGlscy91bmFtYmlndW91cydcblxuY29uc3QgbG9nID0gZGVidWcoJ2VzbGludC1wbHVnaW4taW1wb3J0OkV4cG9ydE1hcCcpXG5cbmNvbnN0IGV4cG9ydENhY2hlID0gbmV3IE1hcCgpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cG9ydE1hcCB7XG4gIGNvbnN0cnVjdG9yKHBhdGgpIHtcbiAgICB0aGlzLnBhdGggPSBwYXRoXG4gICAgdGhpcy5uYW1lc3BhY2UgPSBuZXcgTWFwKClcbiAgICAvLyB0b2RvOiByZXN0cnVjdHVyZSB0byBrZXkgb24gcGF0aCwgdmFsdWUgaXMgcmVzb2x2ZXIgKyBtYXAgb2YgbmFtZXNcbiAgICB0aGlzLnJlZXhwb3J0cyA9IG5ldyBNYXAoKVxuICAgIC8qKlxuICAgICAqIHN0YXItZXhwb3J0c1xuICAgICAqIEB0eXBlIHtTZXR9IG9mICgpID0+IEV4cG9ydE1hcFxuICAgICAqL1xuICAgIHRoaXMuZGVwZW5kZW5jaWVzID0gbmV3IFNldCgpXG4gICAgLyoqXG4gICAgICogZGVwZW5kZW5jaWVzIG9mIHRoaXMgbW9kdWxlIHRoYXQgYXJlIG5vdCBleHBsaWNpdGx5IHJlLWV4cG9ydGVkXG4gICAgICogQHR5cGUge01hcH0gZnJvbSBwYXRoID0gKCkgPT4gRXhwb3J0TWFwXG4gICAgICovXG4gICAgdGhpcy5pbXBvcnRzID0gbmV3IE1hcCgpXG4gICAgdGhpcy5lcnJvcnMgPSBbXVxuICB9XG5cbiAgZ2V0IGhhc0RlZmF1bHQoKSB7IHJldHVybiB0aGlzLmdldCgnZGVmYXVsdCcpICE9IG51bGwgfSAvLyBzdHJvbmdlciB0aGFuIHRoaXMuaGFzXG5cbiAgZ2V0IHNpemUoKSB7XG4gICAgbGV0IHNpemUgPSB0aGlzLm5hbWVzcGFjZS5zaXplICsgdGhpcy5yZWV4cG9ydHMuc2l6ZVxuICAgIHRoaXMuZGVwZW5kZW5jaWVzLmZvckVhY2goZGVwID0+IHtcbiAgICAgIGNvbnN0IGQgPSBkZXAoKVxuICAgICAgLy8gQ0pTIC8gaWdub3JlZCBkZXBlbmRlbmNpZXMgd29uJ3QgZXhpc3QgKCM3MTcpXG4gICAgICBpZiAoZCA9PSBudWxsKSByZXR1cm5cbiAgICAgIHNpemUgKz0gZC5zaXplXG4gICAgfSlcbiAgICByZXR1cm4gc2l6ZVxuICB9XG5cbiAgLyoqXG4gICAqIE5vdGUgdGhhdCB0aGlzIGRvZXMgbm90IGNoZWNrIGV4cGxpY2l0bHkgcmUtZXhwb3J0ZWQgbmFtZXMgZm9yIGV4aXN0ZW5jZVxuICAgKiBpbiB0aGUgYmFzZSBuYW1lc3BhY2UsIGJ1dCBpdCB3aWxsIGV4cGFuZCBhbGwgYGV4cG9ydCAqIGZyb20gJy4uLidgIGV4cG9ydHNcbiAgICogaWYgbm90IGZvdW5kIGluIHRoZSBleHBsaWNpdCBuYW1lc3BhY2UuXG4gICAqIEBwYXJhbSAge3N0cmluZ30gIG5hbWVcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBgbmFtZWAgaXMgZXhwb3J0ZWQgYnkgdGhpcyBtb2R1bGUuXG4gICAqL1xuICBoYXMobmFtZSkge1xuICAgIGlmICh0aGlzLm5hbWVzcGFjZS5oYXMobmFtZSkpIHJldHVybiB0cnVlXG4gICAgaWYgKHRoaXMucmVleHBvcnRzLmhhcyhuYW1lKSkgcmV0dXJuIHRydWVcblxuICAgIC8vIGRlZmF1bHQgZXhwb3J0cyBtdXN0IGJlIGV4cGxpY2l0bHkgcmUtZXhwb3J0ZWQgKCMzMjgpXG4gICAgaWYgKG5hbWUgIT09ICdkZWZhdWx0Jykge1xuICAgICAgZm9yIChsZXQgZGVwIG9mIHRoaXMuZGVwZW5kZW5jaWVzKSB7XG4gICAgICAgIGxldCBpbm5lck1hcCA9IGRlcCgpXG5cbiAgICAgICAgLy8gdG9kbzogcmVwb3J0IGFzIHVucmVzb2x2ZWQ/XG4gICAgICAgIGlmICghaW5uZXJNYXApIGNvbnRpbnVlXG5cbiAgICAgICAgaWYgKGlubmVyTWFwLmhhcyhuYW1lKSkgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBlbnN1cmUgdGhhdCBpbXBvcnRlZCBuYW1lIGZ1bGx5IHJlc29sdmVzLlxuICAgKiBAcGFyYW0gIHtbdHlwZV19ICBuYW1lIFtkZXNjcmlwdGlvbl1cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgICBbZGVzY3JpcHRpb25dXG4gICAqL1xuICBoYXNEZWVwKG5hbWUpIHtcbiAgICBpZiAodGhpcy5uYW1lc3BhY2UuaGFzKG5hbWUpKSByZXR1cm4geyBmb3VuZDogdHJ1ZSwgcGF0aDogW3RoaXNdIH1cblxuICAgIGlmICh0aGlzLnJlZXhwb3J0cy5oYXMobmFtZSkpIHtcbiAgICAgIGNvbnN0IHJlZXhwb3J0cyA9IHRoaXMucmVleHBvcnRzLmdldChuYW1lKVxuICAgICAgICAgICwgaW1wb3J0ZWQgPSByZWV4cG9ydHMuZ2V0SW1wb3J0KClcblxuICAgICAgLy8gaWYgaW1wb3J0IGlzIGlnbm9yZWQsIHJldHVybiBleHBsaWNpdCAnbnVsbCdcbiAgICAgIGlmIChpbXBvcnRlZCA9PSBudWxsKSByZXR1cm4geyBmb3VuZDogdHJ1ZSwgcGF0aDogW3RoaXNdIH1cblxuICAgICAgLy8gc2FmZWd1YXJkIGFnYWluc3QgY3ljbGVzLCBvbmx5IGlmIG5hbWUgbWF0Y2hlc1xuICAgICAgaWYgKGltcG9ydGVkLnBhdGggPT09IHRoaXMucGF0aCAmJiByZWV4cG9ydHMubG9jYWwgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHsgZm91bmQ6IGZhbHNlLCBwYXRoOiBbdGhpc10gfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWVwID0gaW1wb3J0ZWQuaGFzRGVlcChyZWV4cG9ydHMubG9jYWwpXG4gICAgICBkZWVwLnBhdGgudW5zaGlmdCh0aGlzKVxuXG4gICAgICByZXR1cm4gZGVlcFxuICAgIH1cblxuXG4gICAgLy8gZGVmYXVsdCBleHBvcnRzIG11c3QgYmUgZXhwbGljaXRseSByZS1leHBvcnRlZCAoIzMyOClcbiAgICBpZiAobmFtZSAhPT0gJ2RlZmF1bHQnKSB7XG4gICAgICBmb3IgKGxldCBkZXAgb2YgdGhpcy5kZXBlbmRlbmNpZXMpIHtcbiAgICAgICAgbGV0IGlubmVyTWFwID0gZGVwKClcbiAgICAgICAgLy8gdG9kbzogcmVwb3J0IGFzIHVucmVzb2x2ZWQ/XG4gICAgICAgIGlmICghaW5uZXJNYXApIGNvbnRpbnVlXG5cbiAgICAgICAgLy8gc2FmZWd1YXJkIGFnYWluc3QgY3ljbGVzXG4gICAgICAgIGlmIChpbm5lck1hcC5wYXRoID09PSB0aGlzLnBhdGgpIGNvbnRpbnVlXG5cbiAgICAgICAgbGV0IGlubmVyVmFsdWUgPSBpbm5lck1hcC5oYXNEZWVwKG5hbWUpXG4gICAgICAgIGlmIChpbm5lclZhbHVlLmZvdW5kKSB7XG4gICAgICAgICAgaW5uZXJWYWx1ZS5wYXRoLnVuc2hpZnQodGhpcylcbiAgICAgICAgICByZXR1cm4gaW5uZXJWYWx1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgZm91bmQ6IGZhbHNlLCBwYXRoOiBbdGhpc10gfVxuICB9XG5cbiAgZ2V0KG5hbWUpIHtcbiAgICBpZiAodGhpcy5uYW1lc3BhY2UuaGFzKG5hbWUpKSByZXR1cm4gdGhpcy5uYW1lc3BhY2UuZ2V0KG5hbWUpXG5cbiAgICBpZiAodGhpcy5yZWV4cG9ydHMuaGFzKG5hbWUpKSB7XG4gICAgICBjb25zdCByZWV4cG9ydHMgPSB0aGlzLnJlZXhwb3J0cy5nZXQobmFtZSlcbiAgICAgICAgICAsIGltcG9ydGVkID0gcmVleHBvcnRzLmdldEltcG9ydCgpXG5cbiAgICAgIC8vIGlmIGltcG9ydCBpcyBpZ25vcmVkLCByZXR1cm4gZXhwbGljaXQgJ251bGwnXG4gICAgICBpZiAoaW1wb3J0ZWQgPT0gbnVsbCkgcmV0dXJuIG51bGxcblxuICAgICAgLy8gc2FmZWd1YXJkIGFnYWluc3QgY3ljbGVzLCBvbmx5IGlmIG5hbWUgbWF0Y2hlc1xuICAgICAgaWYgKGltcG9ydGVkLnBhdGggPT09IHRoaXMucGF0aCAmJiByZWV4cG9ydHMubG9jYWwgPT09IG5hbWUpIHJldHVybiB1bmRlZmluZWRcblxuICAgICAgcmV0dXJuIGltcG9ydGVkLmdldChyZWV4cG9ydHMubG9jYWwpXG4gICAgfVxuXG4gICAgLy8gZGVmYXVsdCBleHBvcnRzIG11c3QgYmUgZXhwbGljaXRseSByZS1leHBvcnRlZCAoIzMyOClcbiAgICBpZiAobmFtZSAhPT0gJ2RlZmF1bHQnKSB7XG4gICAgICBmb3IgKGxldCBkZXAgb2YgdGhpcy5kZXBlbmRlbmNpZXMpIHtcbiAgICAgICAgbGV0IGlubmVyTWFwID0gZGVwKClcbiAgICAgICAgLy8gdG9kbzogcmVwb3J0IGFzIHVucmVzb2x2ZWQ/XG4gICAgICAgIGlmICghaW5uZXJNYXApIGNvbnRpbnVlXG5cbiAgICAgICAgLy8gc2FmZWd1YXJkIGFnYWluc3QgY3ljbGVzXG4gICAgICAgIGlmIChpbm5lck1hcC5wYXRoID09PSB0aGlzLnBhdGgpIGNvbnRpbnVlXG5cbiAgICAgICAgbGV0IGlubmVyVmFsdWUgPSBpbm5lck1hcC5nZXQobmFtZSlcbiAgICAgICAgaWYgKGlubmVyVmFsdWUgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGlubmVyVmFsdWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICBmb3JFYWNoKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdGhpcy5uYW1lc3BhY2UuZm9yRWFjaCgodiwgbikgPT5cbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdiwgbiwgdGhpcykpXG5cbiAgICB0aGlzLnJlZXhwb3J0cy5mb3JFYWNoKChyZWV4cG9ydHMsIG5hbWUpID0+IHtcbiAgICAgIGNvbnN0IHJlZXhwb3J0ZWQgPSByZWV4cG9ydHMuZ2V0SW1wb3J0KClcbiAgICAgIC8vIGNhbid0IGxvb2sgdXAgbWV0YSBmb3IgaWdub3JlZCByZS1leHBvcnRzICgjMzQ4KVxuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCByZWV4cG9ydGVkICYmIHJlZXhwb3J0ZWQuZ2V0KHJlZXhwb3J0cy5sb2NhbCksIG5hbWUsIHRoaXMpXG4gICAgfSlcblxuICAgIHRoaXMuZGVwZW5kZW5jaWVzLmZvckVhY2goZGVwID0+IHtcbiAgICAgIGNvbnN0IGQgPSBkZXAoKVxuICAgICAgLy8gQ0pTIC8gaWdub3JlZCBkZXBlbmRlbmNpZXMgd29uJ3QgZXhpc3QgKCM3MTcpXG4gICAgICBpZiAoZCA9PSBudWxsKSByZXR1cm5cblxuICAgICAgZC5mb3JFYWNoKCh2LCBuKSA9PlxuICAgICAgICBuICE9PSAnZGVmYXVsdCcgJiYgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2LCBuLCB0aGlzKSlcbiAgICB9KVxuICB9XG5cbiAgLy8gdG9kbzoga2V5cywgdmFsdWVzLCBlbnRyaWVzP1xuXG4gIHJlcG9ydEVycm9ycyhjb250ZXh0LCBkZWNsYXJhdGlvbikge1xuICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgIG5vZGU6IGRlY2xhcmF0aW9uLnNvdXJjZSxcbiAgICAgIG1lc3NhZ2U6IGBQYXJzZSBlcnJvcnMgaW4gaW1wb3J0ZWQgbW9kdWxlICcke2RlY2xhcmF0aW9uLnNvdXJjZS52YWx1ZX0nOiBgICtcbiAgICAgICAgICAgICAgICAgIGAke3RoaXMuZXJyb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKGUgPT4gYCR7ZS5tZXNzYWdlfSAoJHtlLmxpbmVOdW1iZXJ9OiR7ZS5jb2x1bW59KWApXG4gICAgICAgICAgICAgICAgICAgICAgICAuam9pbignLCAnKX1gLFxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBwYXJzZSBkb2NzIGZyb20gdGhlIGZpcnN0IG5vZGUgdGhhdCBoYXMgbGVhZGluZyBjb21tZW50c1xuICovXG5mdW5jdGlvbiBjYXB0dXJlRG9jKHNvdXJjZSwgZG9jU3R5bGVQYXJzZXJzLCAuLi5ub2Rlcykge1xuICBjb25zdCBtZXRhZGF0YSA9IHt9XG5cbiAgLy8gJ3NvbWUnIHNob3J0LWNpcmN1aXRzIG9uIGZpcnN0ICd0cnVlJ1xuICBub2Rlcy5zb21lKG4gPT4ge1xuICAgIHRyeSB7XG5cbiAgICAgIGxldCBsZWFkaW5nQ29tbWVudHNcblxuICAgICAgLy8gbi5sZWFkaW5nQ29tbWVudHMgaXMgbGVnYWN5IGBhdHRhY2hDb21tZW50c2AgYmVoYXZpb3JcbiAgICAgIGlmICgnbGVhZGluZ0NvbW1lbnRzJyBpbiBuKSB7XG4gICAgICAgIGxlYWRpbmdDb21tZW50cyA9IG4ubGVhZGluZ0NvbW1lbnRzXG4gICAgICB9IGVsc2UgaWYgKG4ucmFuZ2UpIHtcbiAgICAgICAgbGVhZGluZ0NvbW1lbnRzID0gc291cmNlLmdldENvbW1lbnRzQmVmb3JlKG4pXG4gICAgICB9XG5cbiAgICAgIGlmICghbGVhZGluZ0NvbW1lbnRzIHx8IGxlYWRpbmdDb21tZW50cy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZVxuXG4gICAgICBmb3IgKGxldCBuYW1lIGluIGRvY1N0eWxlUGFyc2Vycykge1xuICAgICAgICBjb25zdCBkb2MgPSBkb2NTdHlsZVBhcnNlcnNbbmFtZV0obGVhZGluZ0NvbW1lbnRzKVxuICAgICAgICBpZiAoZG9jKSB7XG4gICAgICAgICAgbWV0YWRhdGEuZG9jID0gZG9jXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gbWV0YWRhdGFcbn1cblxuY29uc3QgYXZhaWxhYmxlRG9jU3R5bGVQYXJzZXJzID0ge1xuICBqc2RvYzogY2FwdHVyZUpzRG9jLFxuICB0b21kb2M6IGNhcHR1cmVUb21Eb2MsXG59XG5cbi8qKlxuICogcGFyc2UgSlNEb2MgZnJvbSBsZWFkaW5nIGNvbW1lbnRzXG4gKiBAcGFyYW0gIHsuLi5bdHlwZV19IGNvbW1lbnRzIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3tkb2M6IG9iamVjdH19XG4gKi9cbmZ1bmN0aW9uIGNhcHR1cmVKc0RvYyhjb21tZW50cykge1xuICBsZXQgZG9jXG5cbiAgLy8gY2FwdHVyZSBYU0RvY1xuICBjb21tZW50cy5mb3JFYWNoKGNvbW1lbnQgPT4ge1xuICAgIC8vIHNraXAgbm9uLWJsb2NrIGNvbW1lbnRzXG4gICAgaWYgKGNvbW1lbnQudHlwZSAhPT0gJ0Jsb2NrJykgcmV0dXJuXG4gICAgdHJ5IHtcbiAgICAgIGRvYyA9IGRvY3RyaW5lLnBhcnNlKGNvbW1lbnQudmFsdWUsIHsgdW53cmFwOiB0cnVlIH0pXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvKiBkb24ndCBjYXJlLCBmb3Igbm93PyBtYXliZSBhZGQgdG8gYGVycm9ycz9gICovXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBkb2Ncbn1cblxuLyoqXG4gICogcGFyc2UgVG9tRG9jIHNlY3Rpb24gZnJvbSBjb21tZW50c1xuICAqL1xuZnVuY3Rpb24gY2FwdHVyZVRvbURvYyhjb21tZW50cykge1xuICAvLyBjb2xsZWN0IGxpbmVzIHVwIHRvIGZpcnN0IHBhcmFncmFwaCBicmVha1xuICBjb25zdCBsaW5lcyA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29tbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjb21tZW50ID0gY29tbWVudHNbaV1cbiAgICBpZiAoY29tbWVudC52YWx1ZS5tYXRjaCgvXlxccyokLykpIGJyZWFrXG4gICAgbGluZXMucHVzaChjb21tZW50LnZhbHVlLnRyaW0oKSlcbiAgfVxuXG4gIC8vIHJldHVybiBkb2N0cmluZS1saWtlIG9iamVjdFxuICBjb25zdCBzdGF0dXNNYXRjaCA9IGxpbmVzLmpvaW4oJyAnKS5tYXRjaCgvXihQdWJsaWN8SW50ZXJuYWx8RGVwcmVjYXRlZCk6XFxzKiguKykvKVxuICBpZiAoc3RhdHVzTWF0Y2gpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGVzY3JpcHRpb246IHN0YXR1c01hdGNoWzJdLFxuICAgICAgdGFnczogW3tcbiAgICAgICAgdGl0bGU6IHN0YXR1c01hdGNoWzFdLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdGF0dXNNYXRjaFsyXSxcbiAgICAgIH1dLFxuICAgIH1cbiAgfVxufVxuXG5FeHBvcnRNYXAuZ2V0ID0gZnVuY3Rpb24gKHNvdXJjZSwgY29udGV4dCkge1xuICBjb25zdCBwYXRoID0gcmVzb2x2ZShzb3VyY2UsIGNvbnRleHQpXG4gIGlmIChwYXRoID09IG51bGwpIHJldHVybiBudWxsXG5cbiAgcmV0dXJuIEV4cG9ydE1hcC5mb3IoY2hpbGRDb250ZXh0KHBhdGgsIGNvbnRleHQpKVxufVxuXG5FeHBvcnRNYXAuZm9yID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgY29uc3QgeyBwYXRoIH0gPSBjb250ZXh0XG5cbiAgY29uc3QgY2FjaGVLZXkgPSBoYXNoT2JqZWN0KGNvbnRleHQpLmRpZ2VzdCgnaGV4JylcbiAgbGV0IGV4cG9ydE1hcCA9IGV4cG9ydENhY2hlLmdldChjYWNoZUtleSlcblxuICAvLyByZXR1cm4gY2FjaGVkIGlnbm9yZVxuICBpZiAoZXhwb3J0TWFwID09PSBudWxsKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IHN0YXRzID0gZnMuc3RhdFN5bmMocGF0aClcbiAgaWYgKGV4cG9ydE1hcCAhPSBudWxsKSB7XG4gICAgLy8gZGF0ZSBlcXVhbGl0eSBjaGVja1xuICAgIGlmIChleHBvcnRNYXAubXRpbWUgLSBzdGF0cy5tdGltZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIGV4cG9ydE1hcFxuICAgIH1cbiAgICAvLyBmdXR1cmU6IGNoZWNrIGNvbnRlbnQgZXF1YWxpdHk/XG4gIH1cblxuICAvLyBjaGVjayB2YWxpZCBleHRlbnNpb25zIGZpcnN0XG4gIGlmICghaGFzVmFsaWRFeHRlbnNpb24ocGF0aCwgY29udGV4dCkpIHtcbiAgICBleHBvcnRDYWNoZS5zZXQoY2FjaGVLZXksIG51bGwpXG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIC8vIGNoZWNrIGZvciBhbmQgY2FjaGUgaWdub3JlXG4gIGlmIChpc0lnbm9yZWQocGF0aCwgY29udGV4dCkpIHtcbiAgICBsb2coJ2lnbm9yZWQgcGF0aCBkdWUgdG8gaWdub3JlIHNldHRpbmdzOicsIHBhdGgpXG4gICAgZXhwb3J0Q2FjaGUuc2V0KGNhY2hlS2V5LCBudWxsKVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBjb25zdCBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKHBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KVxuXG4gIC8vIGNoZWNrIGZvciBhbmQgY2FjaGUgdW5hbWJpZ2lvdXMgbW9kdWxlc1xuICBpZiAoIXVuYW1iaWd1b3VzLnRlc3QoY29udGVudCkpIHtcbiAgICBsb2coJ2lnbm9yZWQgcGF0aCBkdWUgdG8gdW5hbWJpZ3VvdXMgcmVnZXg6JywgcGF0aClcbiAgICBleHBvcnRDYWNoZS5zZXQoY2FjaGVLZXksIG51bGwpXG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGxvZygnY2FjaGUgbWlzcycsIGNhY2hlS2V5LCAnZm9yIHBhdGgnLCBwYXRoKVxuICBleHBvcnRNYXAgPSBFeHBvcnRNYXAucGFyc2UocGF0aCwgY29udGVudCwgY29udGV4dClcblxuICAvLyBhbWJpZ3VvdXMgbW9kdWxlcyByZXR1cm4gbnVsbFxuICBpZiAoZXhwb3J0TWFwID09IG51bGwpIHJldHVybiBudWxsXG5cbiAgZXhwb3J0TWFwLm10aW1lID0gc3RhdHMubXRpbWVcblxuICBleHBvcnRDYWNoZS5zZXQoY2FjaGVLZXksIGV4cG9ydE1hcClcbiAgcmV0dXJuIGV4cG9ydE1hcFxufVxuXG5cbkV4cG9ydE1hcC5wYXJzZSA9IGZ1bmN0aW9uIChwYXRoLCBjb250ZW50LCBjb250ZXh0KSB7XG4gIHZhciBtID0gbmV3IEV4cG9ydE1hcChwYXRoKVxuXG4gIHRyeSB7XG4gICAgdmFyIGFzdCA9IHBhcnNlKHBhdGgsIGNvbnRlbnQsIGNvbnRleHQpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZygncGFyc2UgZXJyb3I6JywgcGF0aCwgZXJyKVxuICAgIG0uZXJyb3JzLnB1c2goZXJyKVxuICAgIHJldHVybiBtIC8vIGNhbid0IGNvbnRpbnVlXG4gIH1cblxuICBpZiAoIXVuYW1iaWd1b3VzLmlzTW9kdWxlKGFzdCkpIHJldHVybiBudWxsXG5cbiAgY29uc3QgZG9jc3R5bGUgPSAoY29udGV4dC5zZXR0aW5ncyAmJiBjb250ZXh0LnNldHRpbmdzWydpbXBvcnQvZG9jc3R5bGUnXSkgfHwgWydqc2RvYyddXG4gIGNvbnN0IGRvY1N0eWxlUGFyc2VycyA9IHt9XG4gIGRvY3N0eWxlLmZvckVhY2goc3R5bGUgPT4ge1xuICAgIGRvY1N0eWxlUGFyc2Vyc1tzdHlsZV0gPSBhdmFpbGFibGVEb2NTdHlsZVBhcnNlcnNbc3R5bGVdXG4gIH0pXG5cbiAgLy8gYXR0ZW1wdCB0byBjb2xsZWN0IG1vZHVsZSBkb2NcbiAgaWYgKGFzdC5jb21tZW50cykge1xuICAgIGFzdC5jb21tZW50cy5zb21lKGMgPT4ge1xuICAgICAgaWYgKGMudHlwZSAhPT0gJ0Jsb2NrJykgcmV0dXJuIGZhbHNlXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBkb2MgPSBkb2N0cmluZS5wYXJzZShjLnZhbHVlLCB7IHVud3JhcDogdHJ1ZSB9KVxuICAgICAgICBpZiAoZG9jLnRhZ3Muc29tZSh0ID0+IHQudGl0bGUgPT09ICdtb2R1bGUnKSkge1xuICAgICAgICAgIG0uZG9jID0gZG9jXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7IC8qIGlnbm9yZSAqLyB9XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9KVxuICB9XG5cbiAgY29uc3QgbmFtZXNwYWNlcyA9IG5ldyBNYXAoKVxuXG4gIGZ1bmN0aW9uIHJlbW90ZVBhdGgodmFsdWUpIHtcbiAgICByZXR1cm4gcmVzb2x2ZS5yZWxhdGl2ZSh2YWx1ZSwgcGF0aCwgY29udGV4dC5zZXR0aW5ncylcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc29sdmVJbXBvcnQodmFsdWUpIHtcbiAgICBjb25zdCBycCA9IHJlbW90ZVBhdGgodmFsdWUpXG4gICAgaWYgKHJwID09IG51bGwpIHJldHVybiBudWxsXG4gICAgcmV0dXJuIEV4cG9ydE1hcC5mb3IoY2hpbGRDb250ZXh0KHJwLCBjb250ZXh0KSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE5hbWVzcGFjZShpZGVudGlmaWVyKSB7XG4gICAgaWYgKCFuYW1lc3BhY2VzLmhhcyhpZGVudGlmaWVyLm5hbWUpKSByZXR1cm5cblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZUltcG9ydChuYW1lc3BhY2VzLmdldChpZGVudGlmaWVyLm5hbWUpKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZE5hbWVzcGFjZShvYmplY3QsIGlkZW50aWZpZXIpIHtcbiAgICBjb25zdCBuc2ZuID0gZ2V0TmFtZXNwYWNlKGlkZW50aWZpZXIpXG4gICAgaWYgKG5zZm4pIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsICduYW1lc3BhY2UnLCB7IGdldDogbnNmbiB9KVxuICAgIH1cblxuICAgIHJldHVybiBvYmplY3RcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhcHR1cmVEZXBlbmRlbmN5KGRlY2xhcmF0aW9uKSB7XG4gICAgaWYgKGRlY2xhcmF0aW9uLnNvdXJjZSA9PSBudWxsKSByZXR1cm4gbnVsbFxuICAgIGlmIChkZWNsYXJhdGlvbi5pbXBvcnRLaW5kID09PSAndHlwZScpIHJldHVybiBudWxsIC8vIHNraXAgRmxvdyB0eXBlIGltcG9ydHNcbiAgICBjb25zdCBpbXBvcnRlZFNwZWNpZmllcnMgPSBuZXcgU2V0KClcbiAgICBjb25zdCBzdXBwb3J0ZWRUeXBlcyA9IG5ldyBTZXQoWydJbXBvcnREZWZhdWx0U3BlY2lmaWVyJywgJ0ltcG9ydE5hbWVzcGFjZVNwZWNpZmllciddKVxuICAgIGxldCBoYXNJbXBvcnRlZFR5cGUgPSBmYWxzZVxuICAgIGlmIChkZWNsYXJhdGlvbi5zcGVjaWZpZXJzKSB7XG4gICAgICBkZWNsYXJhdGlvbi5zcGVjaWZpZXJzLmZvckVhY2goc3BlY2lmaWVyID0+IHtcbiAgICAgICAgY29uc3QgaXNUeXBlID0gc3BlY2lmaWVyLmltcG9ydEtpbmQgPT09ICd0eXBlJ1xuICAgICAgICBoYXNJbXBvcnRlZFR5cGUgPSBoYXNJbXBvcnRlZFR5cGUgfHwgaXNUeXBlXG5cbiAgICAgICAgaWYgKHN1cHBvcnRlZFR5cGVzLmhhcyhzcGVjaWZpZXIudHlwZSkgJiYgIWlzVHlwZSkge1xuICAgICAgICAgIGltcG9ydGVkU3BlY2lmaWVycy5hZGQoc3BlY2lmaWVyLnR5cGUpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNwZWNpZmllci50eXBlID09PSAnSW1wb3J0U3BlY2lmaWVyJyAmJiAhaXNUeXBlKSB7XG4gICAgICAgICAgaW1wb3J0ZWRTcGVjaWZpZXJzLmFkZChzcGVjaWZpZXIuaW1wb3J0ZWQubmFtZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyBvbmx5IEZsb3cgdHlwZXMgd2VyZSBpbXBvcnRlZFxuICAgIGlmIChoYXNJbXBvcnRlZFR5cGUgJiYgaW1wb3J0ZWRTcGVjaWZpZXJzLnNpemUgPT09IDApIHJldHVybiBudWxsXG5cbiAgICBjb25zdCBwID0gcmVtb3RlUGF0aChkZWNsYXJhdGlvbi5zb3VyY2UudmFsdWUpXG4gICAgaWYgKHAgPT0gbnVsbCkgcmV0dXJuIG51bGxcbiAgICBjb25zdCBleGlzdGluZyA9IG0uaW1wb3J0cy5nZXQocClcbiAgICBpZiAoZXhpc3RpbmcgIT0gbnVsbCkgcmV0dXJuIGV4aXN0aW5nLmdldHRlclxuXG4gICAgY29uc3QgZ2V0dGVyID0gdGh1bmtGb3IocCwgY29udGV4dClcbiAgICBtLmltcG9ydHMuc2V0KHAsIHtcbiAgICAgIGdldHRlcixcbiAgICAgIHNvdXJjZTogeyAgLy8gY2FwdHVyaW5nIGFjdHVhbCBub2RlIHJlZmVyZW5jZSBob2xkcyBmdWxsIEFTVCBpbiBtZW1vcnkhXG4gICAgICAgIHZhbHVlOiBkZWNsYXJhdGlvbi5zb3VyY2UudmFsdWUsXG4gICAgICAgIGxvYzogZGVjbGFyYXRpb24uc291cmNlLmxvYyxcbiAgICAgIH0sXG4gICAgICBpbXBvcnRlZFNwZWNpZmllcnMsXG4gICAgfSlcbiAgICByZXR1cm4gZ2V0dGVyXG4gIH1cblxuICBjb25zdCBzb3VyY2UgPSBtYWtlU291cmNlQ29kZShjb250ZW50LCBhc3QpXG5cbiAgYXN0LmJvZHkuZm9yRWFjaChmdW5jdGlvbiAobikge1xuXG4gICAgaWYgKG4udHlwZSA9PT0gJ0V4cG9ydERlZmF1bHREZWNsYXJhdGlvbicpIHtcbiAgICAgIGNvbnN0IGV4cG9ydE1ldGEgPSBjYXB0dXJlRG9jKHNvdXJjZSwgZG9jU3R5bGVQYXJzZXJzLCBuKVxuICAgICAgaWYgKG4uZGVjbGFyYXRpb24udHlwZSA9PT0gJ0lkZW50aWZpZXInKSB7XG4gICAgICAgIGFkZE5hbWVzcGFjZShleHBvcnRNZXRhLCBuLmRlY2xhcmF0aW9uKVxuICAgICAgfVxuICAgICAgbS5uYW1lc3BhY2Uuc2V0KCdkZWZhdWx0JywgZXhwb3J0TWV0YSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChuLnR5cGUgPT09ICdFeHBvcnRBbGxEZWNsYXJhdGlvbicpIHtcbiAgICAgIGNvbnN0IGdldHRlciA9IGNhcHR1cmVEZXBlbmRlbmN5KG4pXG4gICAgICBpZiAoZ2V0dGVyKSBtLmRlcGVuZGVuY2llcy5hZGQoZ2V0dGVyKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gY2FwdHVyZSBuYW1lc3BhY2VzIGluIGNhc2Ugb2YgbGF0ZXIgZXhwb3J0XG4gICAgaWYgKG4udHlwZSA9PT0gJ0ltcG9ydERlY2xhcmF0aW9uJykge1xuICAgICAgY2FwdHVyZURlcGVuZGVuY3kobilcbiAgICAgIGxldCBuc1xuICAgICAgaWYgKG4uc3BlY2lmaWVycy5zb21lKHMgPT4gcy50eXBlID09PSAnSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyJyAmJiAobnMgPSBzKSkpIHtcbiAgICAgICAgbmFtZXNwYWNlcy5zZXQobnMubG9jYWwubmFtZSwgbi5zb3VyY2UudmFsdWUpXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAobi50eXBlID09PSAnRXhwb3J0TmFtZWREZWNsYXJhdGlvbicpIHtcbiAgICAgIC8vIGNhcHR1cmUgZGVjbGFyYXRpb25cbiAgICAgIGlmIChuLmRlY2xhcmF0aW9uICE9IG51bGwpIHtcbiAgICAgICAgc3dpdGNoIChuLmRlY2xhcmF0aW9uLnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdGdW5jdGlvbkRlY2xhcmF0aW9uJzpcbiAgICAgICAgICBjYXNlICdDbGFzc0RlY2xhcmF0aW9uJzpcbiAgICAgICAgICBjYXNlICdUeXBlQWxpYXMnOiAvLyBmbG93dHlwZSB3aXRoIGJhYmVsLWVzbGludCBwYXJzZXJcbiAgICAgICAgICBjYXNlICdJbnRlcmZhY2VEZWNsYXJhdGlvbic6XG4gICAgICAgICAgY2FzZSAnRGVjbGFyZUZ1bmN0aW9uJzpcbiAgICAgICAgICBjYXNlICdUU0RlY2xhcmVGdW5jdGlvbic6XG4gICAgICAgICAgY2FzZSAnVFNFbnVtRGVjbGFyYXRpb24nOlxuICAgICAgICAgIGNhc2UgJ1RTVHlwZUFsaWFzRGVjbGFyYXRpb24nOlxuICAgICAgICAgIGNhc2UgJ1RTSW50ZXJmYWNlRGVjbGFyYXRpb24nOlxuICAgICAgICAgIGNhc2UgJ1RTQWJzdHJhY3RDbGFzc0RlY2xhcmF0aW9uJzpcbiAgICAgICAgICBjYXNlICdUU01vZHVsZURlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgIG0ubmFtZXNwYWNlLnNldChuLmRlY2xhcmF0aW9uLmlkLm5hbWUsIGNhcHR1cmVEb2Moc291cmNlLCBkb2NTdHlsZVBhcnNlcnMsIG4pKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgIG4uZGVjbGFyYXRpb24uZGVjbGFyYXRpb25zLmZvckVhY2goKGQpID0+XG4gICAgICAgICAgICAgIHJlY3Vyc2l2ZVBhdHRlcm5DYXB0dXJlKGQuaWQsXG4gICAgICAgICAgICAgICAgaWQgPT4gbS5uYW1lc3BhY2Uuc2V0KGlkLm5hbWUsIGNhcHR1cmVEb2Moc291cmNlLCBkb2NTdHlsZVBhcnNlcnMsIGQsIG4pKSkpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5zb3VyY2UgPSBuLnNvdXJjZSAmJiBuLnNvdXJjZS52YWx1ZVxuICAgICAgbi5zcGVjaWZpZXJzLmZvckVhY2goKHMpID0+IHtcbiAgICAgICAgY29uc3QgZXhwb3J0TWV0YSA9IHt9XG4gICAgICAgIGxldCBsb2NhbFxuXG4gICAgICAgIHN3aXRjaCAocy50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnRXhwb3J0RGVmYXVsdFNwZWNpZmllcic6XG4gICAgICAgICAgICBpZiAoIW4uc291cmNlKSByZXR1cm5cbiAgICAgICAgICAgIGxvY2FsID0gJ2RlZmF1bHQnXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ0V4cG9ydE5hbWVzcGFjZVNwZWNpZmllcic6XG4gICAgICAgICAgICBtLm5hbWVzcGFjZS5zZXQocy5leHBvcnRlZC5uYW1lLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0TWV0YSwgJ25hbWVzcGFjZScsIHtcbiAgICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gcmVzb2x2ZUltcG9ydChuc291cmNlKSB9LFxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICBjYXNlICdFeHBvcnRTcGVjaWZpZXInOlxuICAgICAgICAgICAgaWYgKCFuLnNvdXJjZSkge1xuICAgICAgICAgICAgICBtLm5hbWVzcGFjZS5zZXQocy5leHBvcnRlZC5uYW1lLCBhZGROYW1lc3BhY2UoZXhwb3J0TWV0YSwgcy5sb2NhbCkpXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZWxzZSBmYWxscyB0aHJvdWdoXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGxvY2FsID0gcy5sb2NhbC5uYW1lXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9kbzogSlNEb2NcbiAgICAgICAgbS5yZWV4cG9ydHMuc2V0KHMuZXhwb3J0ZWQubmFtZSwgeyBsb2NhbCwgZ2V0SW1wb3J0OiAoKSA9PiByZXNvbHZlSW1wb3J0KG5zb3VyY2UpIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIFRoaXMgZG9lc24ndCBkZWNsYXJlIGFueXRoaW5nLCBidXQgY2hhbmdlcyB3aGF0J3MgYmVpbmcgZXhwb3J0ZWQuXG4gICAgaWYgKG4udHlwZSA9PT0gJ1RTRXhwb3J0QXNzaWdubWVudCcpIHtcbiAgICAgIGNvbnN0IG1vZHVsZURlY2xzID0gYXN0LmJvZHkuZmlsdGVyKChib2R5Tm9kZSkgPT5cbiAgICAgICAgYm9keU5vZGUudHlwZSA9PT0gJ1RTTW9kdWxlRGVjbGFyYXRpb24nICYmIGJvZHlOb2RlLmlkLm5hbWUgPT09IG4uZXhwcmVzc2lvbi5uYW1lXG4gICAgICApXG4gICAgICBtb2R1bGVEZWNscy5mb3JFYWNoKChtb2R1bGVEZWNsKSA9PiB7XG4gICAgICAgIGlmIChtb2R1bGVEZWNsICYmIG1vZHVsZURlY2wuYm9keSAmJiBtb2R1bGVEZWNsLmJvZHkuYm9keSkge1xuICAgICAgICAgIG1vZHVsZURlY2wuYm9keS5ib2R5LmZvckVhY2goKG1vZHVsZUJsb2NrTm9kZSkgPT4ge1xuICAgICAgICAgICAgLy8gRXhwb3J0LWFzc2lnbm1lbnQgZXhwb3J0cyBhbGwgbWVtYmVycyBpbiB0aGUgbmFtZXNwYWNlLCBleHBsaWNpdGx5IGV4cG9ydGVkIG9yIG5vdC5cbiAgICAgICAgICAgIGNvbnN0IGV4cG9ydGVkRGVjbCA9IG1vZHVsZUJsb2NrTm9kZS50eXBlID09PSAnRXhwb3J0TmFtZWREZWNsYXJhdGlvbicgP1xuICAgICAgICAgICAgICBtb2R1bGVCbG9ja05vZGUuZGVjbGFyYXRpb24gOlxuICAgICAgICAgICAgICBtb2R1bGVCbG9ja05vZGVcblxuICAgICAgICAgICAgaWYgKGV4cG9ydGVkRGVjbC50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICAgICAgZXhwb3J0ZWREZWNsLmRlY2xhcmF0aW9ucy5mb3JFYWNoKChkZWNsKSA9PlxuICAgICAgICAgICAgICAgIHJlY3Vyc2l2ZVBhdHRlcm5DYXB0dXJlKGRlY2wuaWQsKGlkKSA9PiBtLm5hbWVzcGFjZS5zZXQoXG4gICAgICAgICAgICAgICAgICBpZC5uYW1lLFxuICAgICAgICAgICAgICAgICAgY2FwdHVyZURvYyhzb3VyY2UsIGRvY1N0eWxlUGFyc2VycywgZGVjbCwgZXhwb3J0ZWREZWNsLCBtb2R1bGVCbG9ja05vZGUpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbS5uYW1lc3BhY2Uuc2V0KFxuICAgICAgICAgICAgICAgIGV4cG9ydGVkRGVjbC5pZC5uYW1lLFxuICAgICAgICAgICAgICAgIGNhcHR1cmVEb2Moc291cmNlLCBkb2NTdHlsZVBhcnNlcnMsIG1vZHVsZUJsb2NrTm9kZSkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIG1cbn1cblxuLyoqXG4gKiBUaGUgY3JlYXRpb24gb2YgdGhpcyBjbG9zdXJlIGlzIGlzb2xhdGVkIGZyb20gb3RoZXIgc2NvcGVzXG4gKiB0byBhdm9pZCBvdmVyLXJldGVudGlvbiBvZiB1bnJlbGF0ZWQgdmFyaWFibGVzLCB3aGljaCBoYXNcbiAqIGNhdXNlZCBtZW1vcnkgbGVha3MuIFNlZSAjMTI2Ni5cbiAqL1xuZnVuY3Rpb24gdGh1bmtGb3IocCwgY29udGV4dCkge1xuICByZXR1cm4gKCkgPT4gRXhwb3J0TWFwLmZvcihjaGlsZENvbnRleHQocCwgY29udGV4dCkpXG59XG5cblxuLyoqXG4gKiBUcmF2ZXJzZSBhIHBhdHRlcm4vaWRlbnRpZmllciBub2RlLCBjYWxsaW5nICdjYWxsYmFjaydcbiAqIGZvciBlYWNoIGxlYWYgaWRlbnRpZmllci5cbiAqIEBwYXJhbSAge25vZGV9ICAgcGF0dGVyblxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVjdXJzaXZlUGF0dGVybkNhcHR1cmUocGF0dGVybiwgY2FsbGJhY2spIHtcbiAgc3dpdGNoIChwYXR0ZXJuLnR5cGUpIHtcbiAgICBjYXNlICdJZGVudGlmaWVyJzogLy8gYmFzZSBjYXNlXG4gICAgICBjYWxsYmFjayhwYXR0ZXJuKVxuICAgICAgYnJlYWtcblxuICAgIGNhc2UgJ09iamVjdFBhdHRlcm4nOlxuICAgICAgcGF0dGVybi5wcm9wZXJ0aWVzLmZvckVhY2gocCA9PiB7XG4gICAgICAgIHJlY3Vyc2l2ZVBhdHRlcm5DYXB0dXJlKHAudmFsdWUsIGNhbGxiYWNrKVxuICAgICAgfSlcbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdBcnJheVBhdHRlcm4nOlxuICAgICAgcGF0dGVybi5lbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChlbGVtZW50ID09IG51bGwpIHJldHVyblxuICAgICAgICByZWN1cnNpdmVQYXR0ZXJuQ2FwdHVyZShlbGVtZW50LCBjYWxsYmFjaylcbiAgICAgIH0pXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAnQXNzaWdubWVudFBhdHRlcm4nOlxuICAgICAgY2FsbGJhY2socGF0dGVybi5sZWZ0KVxuICAgICAgYnJlYWtcbiAgfVxufVxuXG4vKipcbiAqIGRvbid0IGhvbGQgZnVsbCBjb250ZXh0IG9iamVjdCBpbiBtZW1vcnksIGp1c3QgZ3JhYiB3aGF0IHdlIG5lZWQuXG4gKi9cbmZ1bmN0aW9uIGNoaWxkQ29udGV4dChwYXRoLCBjb250ZXh0KSB7XG4gIGNvbnN0IHsgc2V0dGluZ3MsIHBhcnNlck9wdGlvbnMsIHBhcnNlclBhdGggfSA9IGNvbnRleHRcbiAgcmV0dXJuIHtcbiAgICBzZXR0aW5ncyxcbiAgICBwYXJzZXJPcHRpb25zLFxuICAgIHBhcnNlclBhdGgsXG4gICAgcGF0aCxcbiAgfVxufVxuXG5cbi8qKlxuICogc29tZXRpbWVzIGxlZ2FjeSBzdXBwb3J0IGlzbid0IF90aGF0XyBoYXJkLi4uIHJpZ2h0P1xuICovXG5mdW5jdGlvbiBtYWtlU291cmNlQ29kZSh0ZXh0LCBhc3QpIHtcbiAgaWYgKFNvdXJjZUNvZGUubGVuZ3RoID4gMSkge1xuICAgIC8vIEVTTGludCAzXG4gICAgcmV0dXJuIG5ldyBTb3VyY2VDb2RlKHRleHQsIGFzdClcbiAgfSBlbHNlIHtcbiAgICAvLyBFU0xpbnQgNCwgNVxuICAgIHJldHVybiBuZXcgU291cmNlQ29kZSh7IHRleHQsIGFzdCB9KVxuICB9XG59XG4iXX0=