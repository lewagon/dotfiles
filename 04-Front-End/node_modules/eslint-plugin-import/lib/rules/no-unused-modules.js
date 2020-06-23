'use strict';

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _resolve = require('eslint-module-utils/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

var _path = require('path');

var _readPkgUp = require('read-pkg-up');

var _readPkgUp2 = _interopRequireDefault(_readPkgUp);

var _object = require('object.values');

var _object2 = _interopRequireDefault(_object);

var _arrayIncludes = require('array-includes');

var _arrayIncludes2 = _interopRequireDefault(_arrayIncludes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                 * @fileOverview Ensures that modules contain exports and/or all
                                                                                                                                                                                                 * modules are consumed within other modules.
                                                                                                                                                                                                 * @author René Fermann
                                                                                                                                                                                                 */

// eslint/lib/util/glob-util has been moved to eslint/lib/util/glob-utils with version 5.3
// and has been moved to eslint/lib/cli-engine/file-enumerator in version 6
let listFilesToProcess;
try {
  var FileEnumerator = require('eslint/lib/cli-engine/file-enumerator').FileEnumerator;
  listFilesToProcess = function (src) {
    var e = new FileEnumerator();
    return Array.from(e.iterateFiles(src), (_ref) => {
      let filePath = _ref.filePath,
          ignored = _ref.ignored;
      return {
        ignored,
        filename: filePath
      };
    });
  };
} catch (e1) {
  try {
    listFilesToProcess = require('eslint/lib/util/glob-utils').listFilesToProcess;
  } catch (e2) {
    listFilesToProcess = require('eslint/lib/util/glob-util').listFilesToProcess;
  }
}

const EXPORT_DEFAULT_DECLARATION = 'ExportDefaultDeclaration';
const EXPORT_NAMED_DECLARATION = 'ExportNamedDeclaration';
const EXPORT_ALL_DECLARATION = 'ExportAllDeclaration';
const IMPORT_DECLARATION = 'ImportDeclaration';
const IMPORT_NAMESPACE_SPECIFIER = 'ImportNamespaceSpecifier';
const IMPORT_DEFAULT_SPECIFIER = 'ImportDefaultSpecifier';
const VARIABLE_DECLARATION = 'VariableDeclaration';
const FUNCTION_DECLARATION = 'FunctionDeclaration';
const CLASS_DECLARATION = 'ClassDeclaration';
const DEFAULT = 'default';
const TYPE_ALIAS = 'TypeAlias';

let preparationDone = false;
const importList = new Map();
const exportList = new Map();
const ignoredFiles = new Set();
const filesOutsideSrc = new Set();

const isNodeModule = path => {
  return (/\/(node_modules)\//.test(path)
  );
};

/**
 * read all files matching the patterns in src and ignoreExports
 *
 * return all files matching src pattern, which are not matching the ignoreExports pattern
 */
const resolveFiles = (src, ignoreExports) => {
  const srcFiles = new Set();
  const srcFileList = listFilesToProcess(src);

  // prepare list of ignored files
  const ignoredFilesList = listFilesToProcess(ignoreExports);
  ignoredFilesList.forEach((_ref2) => {
    let filename = _ref2.filename;
    return ignoredFiles.add(filename);
  });

  // prepare list of source files, don't consider files from node_modules
  srcFileList.filter((_ref3) => {
    let filename = _ref3.filename;
    return !isNodeModule(filename);
  }).forEach((_ref4) => {
    let filename = _ref4.filename;

    srcFiles.add(filename);
  });
  return srcFiles;
};

/**
 * parse all source files and build up 2 maps containing the existing imports and exports
 */
const prepareImportsAndExports = (srcFiles, context) => {
  const exportAll = new Map();
  srcFiles.forEach(file => {
    const exports = new Map();
    const imports = new Map();
    const currentExports = _ExportMap2.default.get(file, context);
    if (currentExports) {
      const dependencies = currentExports.dependencies,
            reexports = currentExports.reexports,
            localImportList = currentExports.imports,
            namespace = currentExports.namespace;

      // dependencies === export * from

      const currentExportAll = new Set();
      dependencies.forEach(getDependency => {
        const dependency = getDependency();
        if (dependency === null) {
          return;
        }

        currentExportAll.add(dependency.path);
      });
      exportAll.set(file, currentExportAll);

      reexports.forEach((value, key) => {
        if (key === DEFAULT) {
          exports.set(IMPORT_DEFAULT_SPECIFIER, { whereUsed: new Set() });
        } else {
          exports.set(key, { whereUsed: new Set() });
        }
        const reexport = value.getImport();
        if (!reexport) {
          return;
        }
        let localImport = imports.get(reexport.path);
        let currentValue;
        if (value.local === DEFAULT) {
          currentValue = IMPORT_DEFAULT_SPECIFIER;
        } else {
          currentValue = value.local;
        }
        if (typeof localImport !== 'undefined') {
          localImport = new Set([].concat(_toConsumableArray(localImport), [currentValue]));
        } else {
          localImport = new Set([currentValue]);
        }
        imports.set(reexport.path, localImport);
      });

      localImportList.forEach((value, key) => {
        if (isNodeModule(key)) {
          return;
        }
        imports.set(key, value.importedSpecifiers);
      });
      importList.set(file, imports);

      // build up export list only, if file is not ignored
      if (ignoredFiles.has(file)) {
        return;
      }
      namespace.forEach((value, key) => {
        if (key === DEFAULT) {
          exports.set(IMPORT_DEFAULT_SPECIFIER, { whereUsed: new Set() });
        } else {
          exports.set(key, { whereUsed: new Set() });
        }
      });
    }
    exports.set(EXPORT_ALL_DECLARATION, { whereUsed: new Set() });
    exports.set(IMPORT_NAMESPACE_SPECIFIER, { whereUsed: new Set() });
    exportList.set(file, exports);
  });
  exportAll.forEach((value, key) => {
    value.forEach(val => {
      const currentExports = exportList.get(val);
      const currentExport = currentExports.get(EXPORT_ALL_DECLARATION);
      currentExport.whereUsed.add(key);
    });
  });
};

/**
 * traverse through all imports and add the respective path to the whereUsed-list
 * of the corresponding export
 */
const determineUsage = () => {
  importList.forEach((listValue, listKey) => {
    listValue.forEach((value, key) => {
      const exports = exportList.get(key);
      if (typeof exports !== 'undefined') {
        value.forEach(currentImport => {
          let specifier;
          if (currentImport === IMPORT_NAMESPACE_SPECIFIER) {
            specifier = IMPORT_NAMESPACE_SPECIFIER;
          } else if (currentImport === IMPORT_DEFAULT_SPECIFIER) {
            specifier = IMPORT_DEFAULT_SPECIFIER;
          } else {
            specifier = currentImport;
          }
          if (typeof specifier !== 'undefined') {
            const exportStatement = exports.get(specifier);
            if (typeof exportStatement !== 'undefined') {
              const whereUsed = exportStatement.whereUsed;

              whereUsed.add(listKey);
              exports.set(specifier, { whereUsed });
            }
          }
        });
      }
    });
  });
};

const getSrc = src => {
  if (src) {
    return src;
  }
  return [process.cwd()];
};

/**
 * prepare the lists of existing imports and exports - should only be executed once at
 * the start of a new eslint run
 */
let srcFiles;
const doPreparation = (src, ignoreExports, context) => {
  srcFiles = resolveFiles(getSrc(src), ignoreExports);
  prepareImportsAndExports(srcFiles, context);
  determineUsage();
  preparationDone = true;
};

const newNamespaceImportExists = specifiers => specifiers.some((_ref5) => {
  let type = _ref5.type;
  return type === IMPORT_NAMESPACE_SPECIFIER;
});

const newDefaultImportExists = specifiers => specifiers.some((_ref6) => {
  let type = _ref6.type;
  return type === IMPORT_DEFAULT_SPECIFIER;
});

const fileIsInPkg = file => {
  var _readPkgUp$sync = _readPkgUp2.default.sync({ cwd: file, normalize: false });

  const path = _readPkgUp$sync.path,
        pkg = _readPkgUp$sync.pkg;

  const basePath = (0, _path.dirname)(path);

  const checkPkgFieldString = pkgField => {
    if ((0, _path.join)(basePath, pkgField) === file) {
      return true;
    }
  };

  const checkPkgFieldObject = pkgField => {
    const pkgFieldFiles = (0, _object2.default)(pkgField).map(value => (0, _path.join)(basePath, value));
    if ((0, _arrayIncludes2.default)(pkgFieldFiles, file)) {
      return true;
    }
  };

  const checkPkgField = pkgField => {
    if (typeof pkgField === 'string') {
      return checkPkgFieldString(pkgField);
    }

    if (typeof pkgField === 'object') {
      return checkPkgFieldObject(pkgField);
    }
  };

  if (pkg.private === true) {
    return false;
  }

  if (pkg.bin) {
    if (checkPkgField(pkg.bin)) {
      return true;
    }
  }

  if (pkg.browser) {
    if (checkPkgField(pkg.browser)) {
      return true;
    }
  }

  if (pkg.main) {
    if (checkPkgFieldString(pkg.main)) {
      return true;
    }
  }

  return false;
};

module.exports = {
  meta: {
    docs: { url: (0, _docsUrl2.default)('no-unused-modules') },
    schema: [{
      properties: {
        src: {
          description: 'files/paths to be analyzed (only for unused exports)',
          type: 'array',
          minItems: 1,
          items: {
            type: 'string',
            minLength: 1
          }
        },
        ignoreExports: {
          description: 'files/paths for which unused exports will not be reported (e.g module entry points)',
          type: 'array',
          minItems: 1,
          items: {
            type: 'string',
            minLength: 1
          }
        },
        missingExports: {
          description: 'report modules without any exports',
          type: 'boolean'
        },
        unusedExports: {
          description: 'report exports without any usage',
          type: 'boolean'
        }
      },
      not: {
        properties: {
          unusedExports: { enum: [false] },
          missingExports: { enum: [false] }
        }
      },
      anyOf: [{
        not: {
          properties: {
            unusedExports: { enum: [true] }
          }
        },
        required: ['missingExports']
      }, {
        not: {
          properties: {
            missingExports: { enum: [true] }
          }
        },
        required: ['unusedExports']
      }, {
        properties: {
          unusedExports: { enum: [true] }
        },
        required: ['unusedExports']
      }, {
        properties: {
          missingExports: { enum: [true] }
        },
        required: ['missingExports']
      }]
    }]
  },

  create: context => {
    var _ref7 = context.options[0] || {};

    const src = _ref7.src;
    var _ref7$ignoreExports = _ref7.ignoreExports;
    const ignoreExports = _ref7$ignoreExports === undefined ? [] : _ref7$ignoreExports,
          missingExports = _ref7.missingExports,
          unusedExports = _ref7.unusedExports;


    if (unusedExports && !preparationDone) {
      doPreparation(src, ignoreExports, context);
    }

    const file = context.getFilename();

    const checkExportPresence = node => {
      if (!missingExports) {
        return;
      }

      if (ignoredFiles.has(file)) {
        return;
      }

      const exportCount = exportList.get(file);
      const exportAll = exportCount.get(EXPORT_ALL_DECLARATION);
      const namespaceImports = exportCount.get(IMPORT_NAMESPACE_SPECIFIER);

      exportCount.delete(EXPORT_ALL_DECLARATION);
      exportCount.delete(IMPORT_NAMESPACE_SPECIFIER);
      if (exportCount.size < 1) {
        // node.body[0] === 'undefined' only happens, if everything is commented out in the file
        // being linted
        context.report(node.body[0] ? node.body[0] : node, 'No exports found');
      }
      exportCount.set(EXPORT_ALL_DECLARATION, exportAll);
      exportCount.set(IMPORT_NAMESPACE_SPECIFIER, namespaceImports);
    };

    const checkUsage = (node, exportedValue) => {
      if (!unusedExports) {
        return;
      }

      if (ignoredFiles.has(file)) {
        return;
      }

      if (fileIsInPkg(file)) {
        return;
      }

      if (filesOutsideSrc.has(file)) {
        return;
      }

      // make sure file to be linted is included in source files
      if (!srcFiles.has(file)) {
        srcFiles = resolveFiles(getSrc(src), ignoreExports);
        if (!srcFiles.has(file)) {
          filesOutsideSrc.add(file);
          return;
        }
      }

      exports = exportList.get(file);

      // special case: export * from
      const exportAll = exports.get(EXPORT_ALL_DECLARATION);
      if (typeof exportAll !== 'undefined' && exportedValue !== IMPORT_DEFAULT_SPECIFIER) {
        if (exportAll.whereUsed.size > 0) {
          return;
        }
      }

      // special case: namespace import
      const namespaceImports = exports.get(IMPORT_NAMESPACE_SPECIFIER);
      if (typeof namespaceImports !== 'undefined') {
        if (namespaceImports.whereUsed.size > 0) {
          return;
        }
      }

      const exportStatement = exports.get(exportedValue);

      const value = exportedValue === IMPORT_DEFAULT_SPECIFIER ? DEFAULT : exportedValue;

      if (typeof exportStatement !== 'undefined') {
        if (exportStatement.whereUsed.size < 1) {
          context.report(node, `exported declaration '${value}' not used within other modules`);
        }
      } else {
        context.report(node, `exported declaration '${value}' not used within other modules`);
      }
    };

    /**
     * only useful for tools like vscode-eslint
     *
     * update lists of existing exports during runtime
     */
    const updateExportUsage = node => {
      if (ignoredFiles.has(file)) {
        return;
      }

      let exports = exportList.get(file);

      // new module has been created during runtime
      // include it in further processing
      if (typeof exports === 'undefined') {
        exports = new Map();
      }

      const newExports = new Map();
      const newExportIdentifiers = new Set();

      node.body.forEach((_ref8) => {
        let type = _ref8.type,
            declaration = _ref8.declaration,
            specifiers = _ref8.specifiers;

        if (type === EXPORT_DEFAULT_DECLARATION) {
          newExportIdentifiers.add(IMPORT_DEFAULT_SPECIFIER);
        }
        if (type === EXPORT_NAMED_DECLARATION) {
          if (specifiers.length > 0) {
            specifiers.forEach(specifier => {
              if (specifier.exported) {
                newExportIdentifiers.add(specifier.exported.name);
              }
            });
          }
          if (declaration) {
            if (declaration.type === FUNCTION_DECLARATION || declaration.type === CLASS_DECLARATION || declaration.type === TYPE_ALIAS) {
              newExportIdentifiers.add(declaration.id.name);
            }
            if (declaration.type === VARIABLE_DECLARATION) {
              declaration.declarations.forEach((_ref9) => {
                let id = _ref9.id;

                newExportIdentifiers.add(id.name);
              });
            }
          }
        }
      });

      // old exports exist within list of new exports identifiers: add to map of new exports
      exports.forEach((value, key) => {
        if (newExportIdentifiers.has(key)) {
          newExports.set(key, value);
        }
      });

      // new export identifiers added: add to map of new exports
      newExportIdentifiers.forEach(key => {
        if (!exports.has(key)) {
          newExports.set(key, { whereUsed: new Set() });
        }
      });

      // preserve information about namespace imports
      let exportAll = exports.get(EXPORT_ALL_DECLARATION);
      let namespaceImports = exports.get(IMPORT_NAMESPACE_SPECIFIER);

      if (typeof namespaceImports === 'undefined') {
        namespaceImports = { whereUsed: new Set() };
      }

      newExports.set(EXPORT_ALL_DECLARATION, exportAll);
      newExports.set(IMPORT_NAMESPACE_SPECIFIER, namespaceImports);
      exportList.set(file, newExports);
    };

    /**
     * only useful for tools like vscode-eslint
     *
     * update lists of existing imports during runtime
     */
    const updateImportUsage = node => {
      if (!unusedExports) {
        return;
      }

      let oldImportPaths = importList.get(file);
      if (typeof oldImportPaths === 'undefined') {
        oldImportPaths = new Map();
      }

      const oldNamespaceImports = new Set();
      const newNamespaceImports = new Set();

      const oldExportAll = new Set();
      const newExportAll = new Set();

      const oldDefaultImports = new Set();
      const newDefaultImports = new Set();

      const oldImports = new Map();
      const newImports = new Map();
      oldImportPaths.forEach((value, key) => {
        if (value.has(EXPORT_ALL_DECLARATION)) {
          oldExportAll.add(key);
        }
        if (value.has(IMPORT_NAMESPACE_SPECIFIER)) {
          oldNamespaceImports.add(key);
        }
        if (value.has(IMPORT_DEFAULT_SPECIFIER)) {
          oldDefaultImports.add(key);
        }
        value.forEach(val => {
          if (val !== IMPORT_NAMESPACE_SPECIFIER && val !== IMPORT_DEFAULT_SPECIFIER) {
            oldImports.set(val, key);
          }
        });
      });

      node.body.forEach(astNode => {
        let resolvedPath;

        // support for export { value } from 'module'
        if (astNode.type === EXPORT_NAMED_DECLARATION) {
          if (astNode.source) {
            resolvedPath = (0, _resolve2.default)(astNode.source.raw.replace(/('|")/g, ''), context);
            astNode.specifiers.forEach(specifier => {
              let name;
              if (specifier.exported.name === DEFAULT) {
                name = IMPORT_DEFAULT_SPECIFIER;
              } else {
                name = specifier.local.name;
              }
              newImports.set(name, resolvedPath);
            });
          }
        }

        if (astNode.type === EXPORT_ALL_DECLARATION) {
          resolvedPath = (0, _resolve2.default)(astNode.source.raw.replace(/('|")/g, ''), context);
          newExportAll.add(resolvedPath);
        }

        if (astNode.type === IMPORT_DECLARATION) {
          resolvedPath = (0, _resolve2.default)(astNode.source.raw.replace(/('|")/g, ''), context);
          if (!resolvedPath) {
            return;
          }

          if (isNodeModule(resolvedPath)) {
            return;
          }

          if (newNamespaceImportExists(astNode.specifiers)) {
            newNamespaceImports.add(resolvedPath);
          }

          if (newDefaultImportExists(astNode.specifiers)) {
            newDefaultImports.add(resolvedPath);
          }

          astNode.specifiers.forEach(specifier => {
            if (specifier.type === IMPORT_DEFAULT_SPECIFIER || specifier.type === IMPORT_NAMESPACE_SPECIFIER) {
              return;
            }
            newImports.set(specifier.imported.name, resolvedPath);
          });
        }
      });

      newExportAll.forEach(value => {
        if (!oldExportAll.has(value)) {
          let imports = oldImportPaths.get(value);
          if (typeof imports === 'undefined') {
            imports = new Set();
          }
          imports.add(EXPORT_ALL_DECLARATION);
          oldImportPaths.set(value, imports);

          let exports = exportList.get(value);
          let currentExport;
          if (typeof exports !== 'undefined') {
            currentExport = exports.get(EXPORT_ALL_DECLARATION);
          } else {
            exports = new Map();
            exportList.set(value, exports);
          }

          if (typeof currentExport !== 'undefined') {
            currentExport.whereUsed.add(file);
          } else {
            const whereUsed = new Set();
            whereUsed.add(file);
            exports.set(EXPORT_ALL_DECLARATION, { whereUsed });
          }
        }
      });

      oldExportAll.forEach(value => {
        if (!newExportAll.has(value)) {
          const imports = oldImportPaths.get(value);
          imports.delete(EXPORT_ALL_DECLARATION);

          const exports = exportList.get(value);
          if (typeof exports !== 'undefined') {
            const currentExport = exports.get(EXPORT_ALL_DECLARATION);
            if (typeof currentExport !== 'undefined') {
              currentExport.whereUsed.delete(file);
            }
          }
        }
      });

      newDefaultImports.forEach(value => {
        if (!oldDefaultImports.has(value)) {
          let imports = oldImportPaths.get(value);
          if (typeof imports === 'undefined') {
            imports = new Set();
          }
          imports.add(IMPORT_DEFAULT_SPECIFIER);
          oldImportPaths.set(value, imports);

          let exports = exportList.get(value);
          let currentExport;
          if (typeof exports !== 'undefined') {
            currentExport = exports.get(IMPORT_DEFAULT_SPECIFIER);
          } else {
            exports = new Map();
            exportList.set(value, exports);
          }

          if (typeof currentExport !== 'undefined') {
            currentExport.whereUsed.add(file);
          } else {
            const whereUsed = new Set();
            whereUsed.add(file);
            exports.set(IMPORT_DEFAULT_SPECIFIER, { whereUsed });
          }
        }
      });

      oldDefaultImports.forEach(value => {
        if (!newDefaultImports.has(value)) {
          const imports = oldImportPaths.get(value);
          imports.delete(IMPORT_DEFAULT_SPECIFIER);

          const exports = exportList.get(value);
          if (typeof exports !== 'undefined') {
            const currentExport = exports.get(IMPORT_DEFAULT_SPECIFIER);
            if (typeof currentExport !== 'undefined') {
              currentExport.whereUsed.delete(file);
            }
          }
        }
      });

      newNamespaceImports.forEach(value => {
        if (!oldNamespaceImports.has(value)) {
          let imports = oldImportPaths.get(value);
          if (typeof imports === 'undefined') {
            imports = new Set();
          }
          imports.add(IMPORT_NAMESPACE_SPECIFIER);
          oldImportPaths.set(value, imports);

          let exports = exportList.get(value);
          let currentExport;
          if (typeof exports !== 'undefined') {
            currentExport = exports.get(IMPORT_NAMESPACE_SPECIFIER);
          } else {
            exports = new Map();
            exportList.set(value, exports);
          }

          if (typeof currentExport !== 'undefined') {
            currentExport.whereUsed.add(file);
          } else {
            const whereUsed = new Set();
            whereUsed.add(file);
            exports.set(IMPORT_NAMESPACE_SPECIFIER, { whereUsed });
          }
        }
      });

      oldNamespaceImports.forEach(value => {
        if (!newNamespaceImports.has(value)) {
          const imports = oldImportPaths.get(value);
          imports.delete(IMPORT_NAMESPACE_SPECIFIER);

          const exports = exportList.get(value);
          if (typeof exports !== 'undefined') {
            const currentExport = exports.get(IMPORT_NAMESPACE_SPECIFIER);
            if (typeof currentExport !== 'undefined') {
              currentExport.whereUsed.delete(file);
            }
          }
        }
      });

      newImports.forEach((value, key) => {
        if (!oldImports.has(key)) {
          let imports = oldImportPaths.get(value);
          if (typeof imports === 'undefined') {
            imports = new Set();
          }
          imports.add(key);
          oldImportPaths.set(value, imports);

          let exports = exportList.get(value);
          let currentExport;
          if (typeof exports !== 'undefined') {
            currentExport = exports.get(key);
          } else {
            exports = new Map();
            exportList.set(value, exports);
          }

          if (typeof currentExport !== 'undefined') {
            currentExport.whereUsed.add(file);
          } else {
            const whereUsed = new Set();
            whereUsed.add(file);
            exports.set(key, { whereUsed });
          }
        }
      });

      oldImports.forEach((value, key) => {
        if (!newImports.has(key)) {
          const imports = oldImportPaths.get(value);
          imports.delete(key);

          const exports = exportList.get(value);
          if (typeof exports !== 'undefined') {
            const currentExport = exports.get(key);
            if (typeof currentExport !== 'undefined') {
              currentExport.whereUsed.delete(file);
            }
          }
        }
      });
    };

    return {
      'Program:exit': node => {
        updateExportUsage(node);
        updateImportUsage(node);
        checkExportPresence(node);
      },
      'ExportDefaultDeclaration': node => {
        checkUsage(node, IMPORT_DEFAULT_SPECIFIER);
      },
      'ExportNamedDeclaration': node => {
        node.specifiers.forEach(specifier => {
          checkUsage(node, specifier.exported.name);
        });
        if (node.declaration) {
          if (node.declaration.type === FUNCTION_DECLARATION || node.declaration.type === CLASS_DECLARATION || node.declaration.type === TYPE_ALIAS) {
            checkUsage(node, node.declaration.id.name);
          }
          if (node.declaration.type === VARIABLE_DECLARATION) {
            node.declaration.declarations.forEach(declaration => {
              checkUsage(node, declaration.id.name);
            });
          }
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uby11bnVzZWQtbW9kdWxlcy5qcyJdLCJuYW1lcyI6WyJsaXN0RmlsZXNUb1Byb2Nlc3MiLCJGaWxlRW51bWVyYXRvciIsInJlcXVpcmUiLCJzcmMiLCJlIiwiQXJyYXkiLCJmcm9tIiwiaXRlcmF0ZUZpbGVzIiwiZmlsZVBhdGgiLCJpZ25vcmVkIiwiZmlsZW5hbWUiLCJlMSIsImUyIiwiRVhQT1JUX0RFRkFVTFRfREVDTEFSQVRJT04iLCJFWFBPUlRfTkFNRURfREVDTEFSQVRJT04iLCJFWFBPUlRfQUxMX0RFQ0xBUkFUSU9OIiwiSU1QT1JUX0RFQ0xBUkFUSU9OIiwiSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIiLCJJTVBPUlRfREVGQVVMVF9TUEVDSUZJRVIiLCJWQVJJQUJMRV9ERUNMQVJBVElPTiIsIkZVTkNUSU9OX0RFQ0xBUkFUSU9OIiwiQ0xBU1NfREVDTEFSQVRJT04iLCJERUZBVUxUIiwiVFlQRV9BTElBUyIsInByZXBhcmF0aW9uRG9uZSIsImltcG9ydExpc3QiLCJNYXAiLCJleHBvcnRMaXN0IiwiaWdub3JlZEZpbGVzIiwiU2V0IiwiZmlsZXNPdXRzaWRlU3JjIiwiaXNOb2RlTW9kdWxlIiwicGF0aCIsInRlc3QiLCJyZXNvbHZlRmlsZXMiLCJpZ25vcmVFeHBvcnRzIiwic3JjRmlsZXMiLCJzcmNGaWxlTGlzdCIsImlnbm9yZWRGaWxlc0xpc3QiLCJmb3JFYWNoIiwiYWRkIiwiZmlsdGVyIiwicHJlcGFyZUltcG9ydHNBbmRFeHBvcnRzIiwiY29udGV4dCIsImV4cG9ydEFsbCIsImZpbGUiLCJleHBvcnRzIiwiaW1wb3J0cyIsImN1cnJlbnRFeHBvcnRzIiwiRXhwb3J0cyIsImdldCIsImRlcGVuZGVuY2llcyIsInJlZXhwb3J0cyIsImxvY2FsSW1wb3J0TGlzdCIsIm5hbWVzcGFjZSIsImN1cnJlbnRFeHBvcnRBbGwiLCJnZXREZXBlbmRlbmN5IiwiZGVwZW5kZW5jeSIsInNldCIsInZhbHVlIiwia2V5Iiwid2hlcmVVc2VkIiwicmVleHBvcnQiLCJnZXRJbXBvcnQiLCJsb2NhbEltcG9ydCIsImN1cnJlbnRWYWx1ZSIsImxvY2FsIiwiaW1wb3J0ZWRTcGVjaWZpZXJzIiwiaGFzIiwidmFsIiwiY3VycmVudEV4cG9ydCIsImRldGVybWluZVVzYWdlIiwibGlzdFZhbHVlIiwibGlzdEtleSIsImN1cnJlbnRJbXBvcnQiLCJzcGVjaWZpZXIiLCJleHBvcnRTdGF0ZW1lbnQiLCJnZXRTcmMiLCJwcm9jZXNzIiwiY3dkIiwiZG9QcmVwYXJhdGlvbiIsIm5ld05hbWVzcGFjZUltcG9ydEV4aXN0cyIsInNwZWNpZmllcnMiLCJzb21lIiwidHlwZSIsIm5ld0RlZmF1bHRJbXBvcnRFeGlzdHMiLCJmaWxlSXNJblBrZyIsInJlYWRQa2dVcCIsInN5bmMiLCJub3JtYWxpemUiLCJwa2ciLCJiYXNlUGF0aCIsImNoZWNrUGtnRmllbGRTdHJpbmciLCJwa2dGaWVsZCIsImNoZWNrUGtnRmllbGRPYmplY3QiLCJwa2dGaWVsZEZpbGVzIiwibWFwIiwiY2hlY2tQa2dGaWVsZCIsInByaXZhdGUiLCJiaW4iLCJicm93c2VyIiwibWFpbiIsIm1vZHVsZSIsIm1ldGEiLCJkb2NzIiwidXJsIiwic2NoZW1hIiwicHJvcGVydGllcyIsImRlc2NyaXB0aW9uIiwibWluSXRlbXMiLCJpdGVtcyIsIm1pbkxlbmd0aCIsIm1pc3NpbmdFeHBvcnRzIiwidW51c2VkRXhwb3J0cyIsIm5vdCIsImVudW0iLCJhbnlPZiIsInJlcXVpcmVkIiwiY3JlYXRlIiwib3B0aW9ucyIsImdldEZpbGVuYW1lIiwiY2hlY2tFeHBvcnRQcmVzZW5jZSIsIm5vZGUiLCJleHBvcnRDb3VudCIsIm5hbWVzcGFjZUltcG9ydHMiLCJkZWxldGUiLCJzaXplIiwicmVwb3J0IiwiYm9keSIsImNoZWNrVXNhZ2UiLCJleHBvcnRlZFZhbHVlIiwidXBkYXRlRXhwb3J0VXNhZ2UiLCJuZXdFeHBvcnRzIiwibmV3RXhwb3J0SWRlbnRpZmllcnMiLCJkZWNsYXJhdGlvbiIsImxlbmd0aCIsImV4cG9ydGVkIiwibmFtZSIsImlkIiwiZGVjbGFyYXRpb25zIiwidXBkYXRlSW1wb3J0VXNhZ2UiLCJvbGRJbXBvcnRQYXRocyIsIm9sZE5hbWVzcGFjZUltcG9ydHMiLCJuZXdOYW1lc3BhY2VJbXBvcnRzIiwib2xkRXhwb3J0QWxsIiwibmV3RXhwb3J0QWxsIiwib2xkRGVmYXVsdEltcG9ydHMiLCJuZXdEZWZhdWx0SW1wb3J0cyIsIm9sZEltcG9ydHMiLCJuZXdJbXBvcnRzIiwiYXN0Tm9kZSIsInJlc29sdmVkUGF0aCIsInNvdXJjZSIsInJhdyIsInJlcGxhY2UiLCJpbXBvcnRlZCJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztnTUFaQTs7Ozs7O0FBY0E7QUFDQTtBQUNBLElBQUlBLGtCQUFKO0FBQ0EsSUFBSTtBQUNGLE1BQUlDLGlCQUFpQkMsUUFBUSx1Q0FBUixFQUFpREQsY0FBdEU7QUFDQUQsdUJBQXFCLFVBQVVHLEdBQVYsRUFBZTtBQUNsQyxRQUFJQyxJQUFJLElBQUlILGNBQUosRUFBUjtBQUNBLFdBQU9JLE1BQU1DLElBQU4sQ0FBV0YsRUFBRUcsWUFBRixDQUFlSixHQUFmLENBQVgsRUFBZ0M7QUFBQSxVQUFHSyxRQUFILFFBQUdBLFFBQUg7QUFBQSxVQUFhQyxPQUFiLFFBQWFBLE9BQWI7QUFBQSxhQUE0QjtBQUNqRUEsZUFEaUU7QUFFakVDLGtCQUFVRjtBQUZ1RCxPQUE1QjtBQUFBLEtBQWhDLENBQVA7QUFJRCxHQU5EO0FBT0QsQ0FURCxDQVNFLE9BQU9HLEVBQVAsRUFBVztBQUNYLE1BQUk7QUFDRlgseUJBQXFCRSxRQUFRLDRCQUFSLEVBQXNDRixrQkFBM0Q7QUFDRCxHQUZELENBRUUsT0FBT1ksRUFBUCxFQUFXO0FBQ1haLHlCQUFxQkUsUUFBUSwyQkFBUixFQUFxQ0Ysa0JBQTFEO0FBQ0Q7QUFDRjs7QUFFRCxNQUFNYSw2QkFBNkIsMEJBQW5DO0FBQ0EsTUFBTUMs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QUNGLE9BYkQ7QUFjRCxLQXRRRDs7QUF3UUEsV0FBTztBQUNMLHNCQUFnQjZFLFFBQVE7QUFDdEJTLDBCQUFrQlQsSUFBbEI7QUFDQWtCLDBCQUFrQmxCLElBQWxCO0FBQ0FELDRCQUFvQkMsSUFBcEI7QUFDRCxPQUxJO0FBTUwsa0NBQTRCQSxRQUFRO0FBQ2xDTyxtQkFBV1AsSUFBWCxFQUFpQnhHLHdCQUFqQjtBQUNELE9BUkk7QUFTTCxnQ0FBMEJ3RyxRQUFRO0FBQ2hDQSxhQUFLeEMsVUFBTCxDQUFnQjNDLE9BQWhCLENBQXdCb0MsYUFBYTtBQUNqQ3NELHFCQUFXUCxJQUFYLEVBQWlCL0MsVUFBVTZELFFBQVYsQ0FBbUJDLElBQXBDO0FBQ0gsU0FGRDtBQUdBLFlBQUlmLEtBQUtZLFdBQVQsRUFBc0I7QUFDcEIsY0FDRVosS0FBS1ksV0FBTCxDQUFpQmxELElBQWpCLEtBQTBCaEUsb0JBQTFCLElBQ0FzRyxLQUFLWSxXQUFMLENBQWlCbEQsSUFBakIsS0FBMEIvRCxpQkFEMUIsSUFFQXFHLEtBQUtZLFdBQUwsQ0FBaUJsRCxJQUFqQixLQUEwQjdELFVBSDVCLEVBSUU7QUFDQTBHLHVCQUFXUCxJQUFYLEVBQWlCQSxLQUFLWSxXQUFMLENBQWlCSSxFQUFqQixDQUFvQkQsSUFBckM7QUFDRDtBQUNELGNBQUlmLEtBQUtZLFdBQUwsQ0FBaUJsRCxJQUFqQixLQUEwQmpFLG9CQUE5QixFQUFvRDtBQUNsRHVHLGlCQUFLWSxXQUFMLENBQWlCSyxZQUFqQixDQUE4QnBHLE9BQTlCLENBQXNDK0YsZUFBZTtBQUNuREwseUJBQVdQLElBQVgsRUFBaUJZLFlBQVlJLEVBQVosQ0FBZUQsSUFBaEM7QUFDRCxhQUZEO0FBR0Q7QUFDRjtBQUNGO0FBM0JJLEtBQVA7QUE2QkQ7QUEvaEJjLENBQWpCIiwiZmlsZSI6Im5vLXVudXNlZC1tb2R1bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3IEVuc3VyZXMgdGhhdCBtb2R1bGVzIGNvbnRhaW4gZXhwb3J0cyBhbmQvb3IgYWxsXG4gKiBtb2R1bGVzIGFyZSBjb25zdW1lZCB3aXRoaW4gb3RoZXIgbW9kdWxlcy5cbiAqIEBhdXRob3IgUmVuw6kgRmVybWFublxuICovXG5cbmltcG9ydCBFeHBvcnRzIGZyb20gJy4uL0V4cG9ydE1hcCdcbmltcG9ydCByZXNvbHZlIGZyb20gJ2VzbGludC1tb2R1bGUtdXRpbHMvcmVzb2x2ZSdcbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5pbXBvcnQgeyBkaXJuYW1lLCBqb2luIH0gZnJvbSAncGF0aCdcbmltcG9ydCByZWFkUGtnVXAgZnJvbSAncmVhZC1wa2ctdXAnXG5pbXBvcnQgdmFsdWVzIGZyb20gJ29iamVjdC52YWx1ZXMnXG5pbXBvcnQgaW5jbHVkZXMgZnJvbSAnYXJyYXktaW5jbHVkZXMnXG5cbi8vIGVzbGludC9saWIvdXRpbC9nbG9iLXV0aWwgaGFzIGJlZW4gbW92ZWQgdG8gZXNsaW50L2xpYi91dGlsL2dsb2ItdXRpbHMgd2l0aCB2ZXJzaW9uIDUuM1xuLy8gYW5kIGhhcyBiZWVuIG1vdmVkIHRvIGVzbGludC9saWIvY2xpLWVuZ2luZS9maWxlLWVudW1lcmF0b3IgaW4gdmVyc2lvbiA2XG5sZXQgbGlzdEZpbGVzVG9Qcm9jZXNzXG50cnkge1xuICB2YXIgRmlsZUVudW1lcmF0b3IgPSByZXF1aXJlKCdlc2xpbnQvbGliL2NsaS1lbmdpbmUvZmlsZS1lbnVtZXJhdG9yJykuRmlsZUVudW1lcmF0b3JcbiAgbGlzdEZpbGVzVG9Qcm9jZXNzID0gZnVuY3Rpb24gKHNyYykge1xuICAgIHZhciBlID0gbmV3IEZpbGVFbnVtZXJhdG9yKClcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlLml0ZXJhdGVGaWxlcyhzcmMpLCAoeyBmaWxlUGF0aCwgaWdub3JlZCB9KSA9PiAoe1xuICAgICAgaWdub3JlZCxcbiAgICAgIGZpbGVuYW1lOiBmaWxlUGF0aCxcbiAgICB9KSlcbiAgfVxufSBjYXRjaCAoZTEpIHtcbiAgdHJ5IHtcbiAgICBsaXN0RmlsZXNUb1Byb2Nlc3MgPSByZXF1aXJlKCdlc2xpbnQvbGliL3V0aWwvZ2xvYi11dGlscycpLmxpc3RGaWxlc1RvUHJvY2Vzc1xuICB9IGNhdGNoIChlMikge1xuICAgIGxpc3RGaWxlc1RvUHJvY2VzcyA9IHJlcXVpcmUoJ2VzbGludC9saWIvdXRpbC9nbG9iLXV0aWwnKS5saXN0RmlsZXNUb1Byb2Nlc3NcbiAgfVxufVxuXG5jb25zdCBFWFBPUlRfREVGQVVMVF9ERUNMQVJBVElPTiA9ICdFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24nXG5jb25zdCBFWFBPUlRfTkFNRURfREVDTEFSQVRJT04gPSAnRXhwb3J0TmFtZWREZWNsYXJhdGlvbidcbmNvbnN0IEVYUE9SVF9BTExfREVDTEFSQVRJT04gPSAnRXhwb3J0QWxsRGVjbGFyYXRpb24nXG5jb25zdCBJTVBPUlRfREVDTEFSQVRJT04gPSAnSW1wb3J0RGVjbGFyYXRpb24nXG5jb25zdCBJTVBPUlRfTkFNRVNQQUNFX1NQRUNJRklFUiA9ICdJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXInXG5jb25zdCBJTVBPUlRfREVGQVVMVF9TUEVDSUZJRVIgPSAnSW1wb3J0RGVmYXVsdFNwZWNpZmllcidcbmNvbnN0IFZBUklBQkxFX0RFQ0xBUkFUSU9OID0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nXG5jb25zdCBGVU5DVElPTl9ERUNMQVJBVElPTiA9ICdGdW5jdGlvbkRlY2xhcmF0aW9uJ1xuY29uc3QgQ0xBU1NfREVDTEFSQVRJT04gPSAnQ2xhc3NEZWNsYXJhdGlvbidcbmNvbnN0IERFRkFVTFQgPSAnZGVmYXVsdCdcbmNvbnN0IFRZUEVfQUxJQVMgPSAnVHlwZUFsaWFzJ1xuXG5sZXQgcHJlcGFyYXRpb25Eb25lID0gZmFsc2VcbmNvbnN0IGltcG9ydExpc3QgPSBuZXcgTWFwKClcbmNvbnN0IGV4cG9ydExpc3QgPSBuZXcgTWFwKClcbmNvbnN0IGlnbm9yZWRGaWxlcyA9IG5ldyBTZXQoKVxuY29uc3QgZmlsZXNPdXRzaWRlU3JjID0gbmV3IFNldCgpXG5cbmNvbnN0IGlzTm9kZU1vZHVsZSA9IHBhdGggPT4ge1xuICByZXR1cm4gL1xcLyhub2RlX21vZHVsZXMpXFwvLy50ZXN0KHBhdGgpXG59XG5cbi8qKlxuICogcmVhZCBhbGwgZmlsZXMgbWF0Y2hpbmcgdGhlIHBhdHRlcm5zIGluIHNyYyBhbmQgaWdub3JlRXhwb3J0c1xuICpcbiAqIHJldHVybiBhbGwgZmlsZXMgbWF0Y2hpbmcgc3JjIHBhdHRlcm4sIHdoaWNoIGFyZSBub3QgbWF0Y2hpbmcgdGhlIGlnbm9yZUV4cG9ydHMgcGF0dGVyblxuICovXG5jb25zdCByZXNvbHZlRmlsZXMgPSAoc3JjLCBpZ25vcmVFeHBvcnRzKSA9PiB7XG4gIGNvbnN0IHNyY0ZpbGVzID0gbmV3IFNldCgpXG4gIGNvbnN0IHNyY0ZpbGVMaXN0ID0gbGlzdEZpbGVzVG9Qcm9jZXNzKHNyYylcblxuICAvLyBwcmVwYXJlIGxpc3Qgb2YgaWdub3JlZCBmaWxlc1xuICBjb25zdCBpZ25vcmVkRmlsZXNMaXN0ID0gIGxpc3RGaWxlc1RvUHJvY2VzcyhpZ25vcmVFeHBvcnRzKVxuICBpZ25vcmVkRmlsZXNMaXN0LmZvckVhY2goKHsgZmlsZW5hbWUgfSkgPT4gaWdub3JlZEZpbGVzLmFkZChmaWxlbmFtZSkpXG5cbiAgLy8gcHJlcGFyZSBsaXN0IG9mIHNvdXJjZSBmaWxlcywgZG9uJ3QgY29uc2lkZXIgZmlsZXMgZnJvbSBub2RlX21vZHVsZXNcbiAgc3JjRmlsZUxpc3QuZmlsdGVyKCh7IGZpbGVuYW1lIH0pID0+ICFpc05vZGVNb2R1bGUoZmlsZW5hbWUpKS5mb3JFYWNoKCh7IGZpbGVuYW1lIH0pID0+IHtcbiAgICBzcmNGaWxlcy5hZGQoZmlsZW5hbWUpXG4gIH0pXG4gIHJldHVybiBzcmNGaWxlc1xufVxuXG4vKipcbiAqIHBhcnNlIGFsbCBzb3VyY2UgZmlsZXMgYW5kIGJ1aWxkIHVwIDIgbWFwcyBjb250YWluaW5nIHRoZSBleGlzdGluZyBpbXBvcnRzIGFuZCBleHBvcnRzXG4gKi9cbmNvbnN0IHByZXBhcmVJbXBvcnRzQW5kRXhwb3J0cyA9IChzcmNGaWxlcywgY29udGV4dCkgPT4ge1xuICBjb25zdCBleHBvcnRBbGwgPSBuZXcgTWFwKClcbiAgc3JjRmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICBjb25zdCBleHBvcnRzID0gbmV3IE1hcCgpXG4gICAgY29uc3QgaW1wb3J0cyA9IG5ldyBNYXAoKVxuICAgIGNvbnN0IGN1cnJlbnRFeHBvcnRzID0gRXhwb3J0cy5nZXQoZmlsZSwgY29udGV4dClcbiAgICBpZiAoY3VycmVudEV4cG9ydHMpIHtcbiAgICAgIGNvbnN0IHsgZGVwZW5kZW5jaWVzLCByZWV4cG9ydHMsIGltcG9ydHM6IGxvY2FsSW1wb3J0TGlzdCwgbmFtZXNwYWNlICB9ID0gY3VycmVudEV4cG9ydHNcblxuICAgICAgLy8gZGVwZW5kZW5jaWVzID09PSBleHBvcnQgKiBmcm9tXG4gICAgICBjb25zdCBjdXJyZW50RXhwb3J0QWxsID0gbmV3IFNldCgpXG4gICAgICBkZXBlbmRlbmNpZXMuZm9yRWFjaChnZXREZXBlbmRlbmN5ID0+IHtcbiAgICAgICAgY29uc3QgZGVwZW5kZW5jeSA9IGdldERlcGVuZGVuY3koKVxuICAgICAgICBpZiAoZGVwZW5kZW5jeSA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudEV4cG9ydEFsbC5hZGQoZGVwZW5kZW5jeS5wYXRoKVxuICAgICAgfSlcbiAgICAgIGV4cG9ydEFsbC5zZXQoZmlsZSwgY3VycmVudEV4cG9ydEFsbClcblxuICAgICAgcmVleHBvcnRzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gREVGQVVMVCkge1xuICAgICAgICAgIGV4cG9ydHMuc2V0KElNUE9SVF9ERUZBVUxUX1NQRUNJRklFUiwgeyB3aGVyZVVzZWQ6IG5ldyBTZXQoKSB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cG9ydHMuc2V0KGtleSwgeyB3aGVyZVVzZWQ6IG5ldyBTZXQoKSB9KVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlZXhwb3J0ID0gIHZhbHVlLmdldEltcG9ydCgpXG4gICAgICAgIGlmICghcmVleHBvcnQpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBsZXQgbG9jYWxJbXBvcnQgPSBpbXBvcnRzLmdldChyZWV4cG9ydC5wYXRoKVxuICAgICAgICBsZXQgY3VycmVudFZhbHVlXG4gICAgICAgIGlmICh2YWx1ZS5sb2NhbCA9PT0gREVGQVVMVCkge1xuICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IElNUE9SVF9ERUZBVUxUX1NQRUNJRklFUlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IHZhbHVlLmxvY2FsXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhbEltcG9ydCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBsb2NhbEltcG9ydCA9IG5ldyBTZXQoWy4uLmxvY2FsSW1wb3J0LCBjdXJyZW50VmFsdWVdKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvY2FsSW1wb3J0ID0gbmV3IFNldChbY3VycmVudFZhbHVlXSlcbiAgICAgICAgfVxuICAgICAgICBpbXBvcnRzLnNldChyZWV4cG9ydC5wYXRoLCBsb2NhbEltcG9ydClcbiAgICAgIH0pXG5cbiAgICAgIGxvY2FsSW1wb3J0TGlzdC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIGlmIChpc05vZGVNb2R1bGUoa2V5KSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGltcG9ydHMuc2V0KGtleSwgdmFsdWUuaW1wb3J0ZWRTcGVjaWZpZXJzKVxuICAgICAgfSlcbiAgICAgIGltcG9ydExpc3Quc2V0KGZpbGUsIGltcG9ydHMpXG5cbiAgICAgIC8vIGJ1aWxkIHVwIGV4cG9ydCBsaXN0IG9ubHksIGlmIGZpbGUgaXMgbm90IGlnbm9yZWRcbiAgICAgIGlmIChpZ25vcmVkRmlsZXMuaGFzKGZpbGUpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbmFtZXNwYWNlLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gREVGQVVMVCkge1xuICAgICAgICAgIGV4cG9ydHMuc2V0KElNUE9SVF9ERUZBVUxUX1NQRUNJRklFUiwgeyB3aGVyZVVzZWQ6IG5ldyBTZXQoKSB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cG9ydHMuc2V0KGtleSwgeyB3aGVyZVVzZWQ6IG5ldyBTZXQoKSB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBleHBvcnRzLnNldChFWFBPUlRfQUxMX0RFQ0xBUkFUSU9OLCB7IHdoZXJlVXNlZDogbmV3IFNldCgpIH0pXG4gICAgZXhwb3J0cy5zZXQoSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIsIHsgd2hlcmVVc2VkOiBuZXcgU2V0KCkgfSlcbiAgICBleHBvcnRMaXN0LnNldChmaWxlLCBleHBvcnRzKVxuICB9KVxuICBleHBvcnRBbGwuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgIHZhbHVlLmZvckVhY2godmFsID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRFeHBvcnRzID0gZXhwb3J0TGlzdC5nZXQodmFsKVxuICAgICAgY29uc3QgY3VycmVudEV4cG9ydCA9IGN1cnJlbnRFeHBvcnRzLmdldChFWFBPUlRfQUxMX0RFQ0xBUkFUSU9OKVxuICAgICAgY3VycmVudEV4cG9ydC53aGVyZVVzZWQuYWRkKGtleSlcbiAgICB9KVxuICB9KVxufVxuXG4vKipcbiAqIHRyYXZlcnNlIHRocm91Z2ggYWxsIGltcG9ydHMgYW5kIGFkZCB0aGUgcmVzcGVjdGl2ZSBwYXRoIHRvIHRoZSB3aGVyZVVzZWQtbGlzdFxuICogb2YgdGhlIGNvcnJlc3BvbmRpbmcgZXhwb3J0XG4gKi9cbmNvbnN0IGRldGVybWluZVVzYWdlID0gKCkgPT4ge1xuICBpbXBvcnRMaXN0LmZvckVhY2goKGxpc3RWYWx1ZSwgbGlzdEtleSkgPT4ge1xuICAgIGxpc3RWYWx1ZS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBjb25zdCBleHBvcnRzID0gZXhwb3J0TGlzdC5nZXQoa2V5KVxuICAgICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YWx1ZS5mb3JFYWNoKGN1cnJlbnRJbXBvcnQgPT4ge1xuICAgICAgICAgIGxldCBzcGVjaWZpZXJcbiAgICAgICAgICBpZiAoY3VycmVudEltcG9ydCA9PT0gSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIpIHtcbiAgICAgICAgICAgIHNwZWNpZmllciA9IElNUE9SVF9OQU1FU1BBQ0VfU1BFQ0lGSUVSXG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50SW1wb3J0ID09PSBJTVBPUlRfREVGQVVMVF9TUEVDSUZJRVIpIHtcbiAgICAgICAgICAgIHNwZWNpZmllciA9IElNUE9SVF9ERUZBVUxUX1NQRUNJRklFUlxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzcGVjaWZpZXIgPSBjdXJyZW50SW1wb3J0XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlb2Ygc3BlY2lmaWVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY29uc3QgZXhwb3J0U3RhdGVtZW50ID0gZXhwb3J0cy5nZXQoc3BlY2lmaWVyKVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBleHBvcnRTdGF0ZW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgd2hlcmVVc2VkIH0gPSBleHBvcnRTdGF0ZW1lbnRcbiAgICAgICAgICAgICAgd2hlcmVVc2VkLmFkZChsaXN0S2V5KVxuICAgICAgICAgICAgICBleHBvcnRzLnNldChzcGVjaWZpZXIsIHsgd2hlcmVVc2VkIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cbmNvbnN0IGdldFNyYyA9IHNyYyA9PiB7XG4gIGlmIChzcmMpIHtcbiAgICByZXR1cm4gc3JjXG4gIH1cbiAgcmV0dXJuIFtwcm9jZXNzLmN3ZCgpXVxufVxuXG4vKipcbiAqIHByZXBhcmUgdGhlIGxpc3RzIG9mIGV4aXN0aW5nIGltcG9ydHMgYW5kIGV4cG9ydHMgLSBzaG91bGQgb25seSBiZSBleGVjdXRlZCBvbmNlIGF0XG4gKiB0aGUgc3RhcnQgb2YgYSBuZXcgZXNsaW50IHJ1blxuICovXG5sZXQgc3JjRmlsZXNcbmNvbnN0IGRvUHJlcGFyYXRpb24gPSAoc3JjLCBpZ25vcmVFeHBvcnRzLCBjb250ZXh0KSA9PiB7XG4gIHNyY0ZpbGVzID0gcmVzb2x2ZUZpbGVzKGdldFNyYyhzcmMpLCBpZ25vcmVFeHBvcnRzKVxuICBwcmVwYXJlSW1wb3J0c0FuZEV4cG9ydHMoc3JjRmlsZXMsIGNvbnRleHQpXG4gIGRldGVybWluZVVzYWdlKClcbiAgcHJlcGFyYXRpb25Eb25lID0gdHJ1ZVxufVxuXG5jb25zdCBuZXdOYW1lc3BhY2VJbXBvcnRFeGlzdHMgPSBzcGVjaWZpZXJzID0+XG4gIHNwZWNpZmllcnMuc29tZSgoeyB0eXBlIH0pID0+IHR5cGUgPT09IElNUE9SVF9OQU1FU1BBQ0VfU1BFQ0lGSUVSKVxuXG5jb25zdCBuZXdEZWZhdWx0SW1wb3J0RXhpc3RzID0gc3BlY2lmaWVycyA9PlxuICBzcGVjaWZpZXJzLnNvbWUoKHsgdHlwZSB9KSA9PiB0eXBlID09PSBJTVBPUlRfREVGQVVMVF9TUEVDSUZJRVIpXG5cbmNvbnN0IGZpbGVJc0luUGtnID0gZmlsZSA9PiB7XG4gIGNvbnN0IHsgcGF0aCwgcGtnIH0gPSByZWFkUGtnVXAuc3luYyh7Y3dkOiBmaWxlLCBub3JtYWxpemU6IGZhbHNlfSlcbiAgY29uc3QgYmFzZVBhdGggPSBkaXJuYW1lKHBhdGgpXG5cbiAgY29uc3QgY2hlY2tQa2dGaWVsZFN0cmluZyA9IHBrZ0ZpZWxkID0+IHtcbiAgICBpZiAoam9pbihiYXNlUGF0aCwgcGtnRmllbGQpID09PSBmaWxlKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gIH1cblxuICBjb25zdCBjaGVja1BrZ0ZpZWxkT2JqZWN0ID0gcGtnRmllbGQgPT4ge1xuICAgICAgY29uc3QgcGtnRmllbGRGaWxlcyA9IHZhbHVlcyhwa2dGaWVsZCkubWFwKHZhbHVlID0+IGpvaW4oYmFzZVBhdGgsIHZhbHVlKSlcbiAgICAgIGlmIChpbmNsdWRlcyhwa2dGaWVsZEZpbGVzLCBmaWxlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICB9XG5cbiAgY29uc3QgY2hlY2tQa2dGaWVsZCA9IHBrZ0ZpZWxkID0+IHtcbiAgICBpZiAodHlwZW9mIHBrZ0ZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGNoZWNrUGtnRmllbGRTdHJpbmcocGtnRmllbGQpXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBwa2dGaWVsZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBjaGVja1BrZ0ZpZWxkT2JqZWN0KHBrZ0ZpZWxkKVxuICAgIH1cbiAgfVxuXG4gIGlmIChwa2cucHJpdmF0ZSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgaWYgKHBrZy5iaW4pIHtcbiAgICBpZiAoY2hlY2tQa2dGaWVsZChwa2cuYmluKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICBpZiAocGtnLmJyb3dzZXIpIHtcbiAgICBpZiAoY2hlY2tQa2dGaWVsZChwa2cuYnJvd3NlcikpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgaWYgKHBrZy5tYWluKSB7XG4gICAgaWYgKGNoZWNrUGtnRmllbGRTdHJpbmcocGtnLm1haW4pKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHsgdXJsOiBkb2NzVXJsKCduby11bnVzZWQtbW9kdWxlcycpIH0sXG4gICAgc2NoZW1hOiBbe1xuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBzcmM6IHtcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ2ZpbGVzL3BhdGhzIHRvIGJlIGFuYWx5emVkIChvbmx5IGZvciB1bnVzZWQgZXhwb3J0cyknLFxuICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgICAgbWluSXRlbXM6IDEsXG4gICAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGlnbm9yZUV4cG9ydHM6IHtcbiAgICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICAgICdmaWxlcy9wYXRocyBmb3Igd2hpY2ggdW51c2VkIGV4cG9ydHMgd2lsbCBub3QgYmUgcmVwb3J0ZWQgKGUuZyBtb2R1bGUgZW50cnkgcG9pbnRzKScsXG4gICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICBtaW5JdGVtczogMSxcbiAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbWlzc2luZ0V4cG9ydHM6IHtcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ3JlcG9ydCBtb2R1bGVzIHdpdGhvdXQgYW55IGV4cG9ydHMnLFxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgfSxcbiAgICAgICAgdW51c2VkRXhwb3J0czoge1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAncmVwb3J0IGV4cG9ydHMgd2l0aG91dCBhbnkgdXNhZ2UnLFxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBub3Q6IHtcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIHVudXNlZEV4cG9ydHM6IHsgZW51bTogW2ZhbHNlXSB9LFxuICAgICAgICAgIG1pc3NpbmdFeHBvcnRzOiB7IGVudW06IFtmYWxzZV0gfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBhbnlPZjpbe1xuICAgICAgICBub3Q6IHtcbiAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICB1bnVzZWRFeHBvcnRzOiB7IGVudW06IFt0cnVlXSB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHJlcXVpcmVkOiBbJ21pc3NpbmdFeHBvcnRzJ10sXG4gICAgICB9LCB7XG4gICAgICAgIG5vdDoge1xuICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIG1pc3NpbmdFeHBvcnRzOiB7IGVudW06IFt0cnVlXSB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHJlcXVpcmVkOiBbJ3VudXNlZEV4cG9ydHMnXSxcbiAgICAgIH0sIHtcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIHVudXNlZEV4cG9ydHM6IHsgZW51bTogW3RydWVdIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHJlcXVpcmVkOiBbJ3VudXNlZEV4cG9ydHMnXSxcbiAgICAgIH0sIHtcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIG1pc3NpbmdFeHBvcnRzOiB7IGVudW06IFt0cnVlXSB9LFxuICAgICAgICB9LFxuICAgICAgICByZXF1aXJlZDogWydtaXNzaW5nRXhwb3J0cyddLFxuICAgICAgfV0sXG4gICAgfV0sXG4gIH0sXG5cbiAgY3JlYXRlOiBjb250ZXh0ID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzcmMsXG4gICAgICBpZ25vcmVFeHBvcnRzID0gW10sXG4gICAgICBtaXNzaW5nRXhwb3J0cyxcbiAgICAgIHVudXNlZEV4cG9ydHMsXG4gICAgfSA9IGNvbnRleHQub3B0aW9uc1swXSB8fCB7fVxuXG4gICAgaWYgKHVudXNlZEV4cG9ydHMgJiYgIXByZXBhcmF0aW9uRG9uZSkge1xuICAgICAgZG9QcmVwYXJhdGlvbihzcmMsIGlnbm9yZUV4cG9ydHMsIGNvbnRleHQpXG4gICAgfVxuXG4gICAgY29uc3QgZmlsZSA9IGNvbnRleHQuZ2V0RmlsZW5hbWUoKVxuXG4gICAgY29uc3QgY2hlY2tFeHBvcnRQcmVzZW5jZSA9IG5vZGUgPT4ge1xuICAgICAgaWYgKCFtaXNzaW5nRXhwb3J0cykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGlnbm9yZWRGaWxlcy5oYXMoZmlsZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV4cG9ydENvdW50ID0gZXhwb3J0TGlzdC5nZXQoZmlsZSlcbiAgICAgIGNvbnN0IGV4cG9ydEFsbCA9IGV4cG9ydENvdW50LmdldChFWFBPUlRfQUxMX0RFQ0xBUkFUSU9OKVxuICAgICAgY29uc3QgbmFtZXNwYWNlSW1wb3J0cyA9IGV4cG9ydENvdW50LmdldChJTVBPUlRfTkFNRVNQQUNFX1NQRUNJRklFUilcblxuICAgICAgZXhwb3J0Q291bnQuZGVsZXRlKEVYUE9SVF9BTExfREVDTEFSQVRJT04pXG4gICAgICBleHBvcnRDb3VudC5kZWxldGUoSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIpXG4gICAgICBpZiAoZXhwb3J0Q291bnQuc2l6ZSA8IDEpIHtcbiAgICAgICAgLy8gbm9kZS5ib2R5WzBdID09PSAndW5kZWZpbmVkJyBvbmx5IGhhcHBlbnMsIGlmIGV2ZXJ5dGhpbmcgaXMgY29tbWVudGVkIG91dCBpbiB0aGUgZmlsZVxuICAgICAgICAvLyBiZWluZyBsaW50ZWRcbiAgICAgICAgY29udGV4dC5yZXBvcnQobm9kZS5ib2R5WzBdID8gbm9kZS5ib2R5WzBdIDogbm9kZSwgJ05vIGV4cG9ydHMgZm91bmQnKVxuICAgICAgfVxuICAgICAgZXhwb3J0Q291bnQuc2V0KEVYUE9SVF9BTExfREVDTEFSQVRJT04sIGV4cG9ydEFsbClcbiAgICAgIGV4cG9ydENvdW50LnNldChJTVBPUlRfTkFNRVNQQUNFX1NQRUNJRklFUiwgbmFtZXNwYWNlSW1wb3J0cylcbiAgICB9XG5cbiAgICBjb25zdCBjaGVja1VzYWdlID0gKG5vZGUsIGV4cG9ydGVkVmFsdWUpID0+IHtcbiAgICAgIGlmICghdW51c2VkRXhwb3J0cykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGlnbm9yZWRGaWxlcy5oYXMoZmlsZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChmaWxlSXNJblBrZyhmaWxlKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbGVzT3V0c2lkZVNyYy5oYXMoZmlsZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSBmaWxlIHRvIGJlIGxpbnRlZCBpcyBpbmNsdWRlZCBpbiBzb3VyY2UgZmlsZXNcbiAgICAgIGlmICghc3JjRmlsZXMuaGFzKGZpbGUpKSB7XG4gICAgICAgIHNyY0ZpbGVzID0gcmVzb2x2ZUZpbGVzKGdldFNyYyhzcmMpLCBpZ25vcmVFeHBvcnRzKVxuICAgICAgICBpZiAoIXNyY0ZpbGVzLmhhcyhmaWxlKSkge1xuICAgICAgICAgIGZpbGVzT3V0c2lkZVNyYy5hZGQoZmlsZSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBleHBvcnRzID0gZXhwb3J0TGlzdC5nZXQoZmlsZSlcblxuICAgICAgLy8gc3BlY2lhbCBjYXNlOiBleHBvcnQgKiBmcm9tXG4gICAgICBjb25zdCBleHBvcnRBbGwgPSBleHBvcnRzLmdldChFWFBPUlRfQUxMX0RFQ0xBUkFUSU9OKVxuICAgICAgaWYgKHR5cGVvZiBleHBvcnRBbGwgIT09ICd1bmRlZmluZWQnICYmIGV4cG9ydGVkVmFsdWUgIT09IElNUE9SVF9ERUZBVUxUX1NQRUNJRklFUikge1xuICAgICAgICBpZiAoZXhwb3J0QWxsLndoZXJlVXNlZC5zaXplID4gMCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHNwZWNpYWwgY2FzZTogbmFtZXNwYWNlIGltcG9ydFxuICAgICAgY29uc3QgbmFtZXNwYWNlSW1wb3J0cyA9IGV4cG9ydHMuZ2V0KElNUE9SVF9OQU1FU1BBQ0VfU1BFQ0lGSUVSKVxuICAgICAgaWYgKHR5cGVvZiBuYW1lc3BhY2VJbXBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAobmFtZXNwYWNlSW1wb3J0cy53aGVyZVVzZWQuc2l6ZSA+IDApIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBleHBvcnRTdGF0ZW1lbnQgPSBleHBvcnRzLmdldChleHBvcnRlZFZhbHVlKVxuXG4gICAgICBjb25zdCB2YWx1ZSA9IGV4cG9ydGVkVmFsdWUgPT09IElNUE9SVF9ERUZBVUxUX1NQRUNJRklFUiA/IERFRkFVTFQgOiBleHBvcnRlZFZhbHVlXG5cbiAgICAgIGlmICh0eXBlb2YgZXhwb3J0U3RhdGVtZW50ICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICAgIGlmIChleHBvcnRTdGF0ZW1lbnQud2hlcmVVc2VkLnNpemUgPCAxKSB7XG4gICAgICAgICAgY29udGV4dC5yZXBvcnQoXG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgYGV4cG9ydGVkIGRlY2xhcmF0aW9uICcke3ZhbHVlfScgbm90IHVzZWQgd2l0aGluIG90aGVyIG1vZHVsZXNgXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZXh0LnJlcG9ydChcbiAgICAgICAgICBub2RlLFxuICAgICAgICAgIGBleHBvcnRlZCBkZWNsYXJhdGlvbiAnJHt2YWx1ZX0nIG5vdCB1c2VkIHdpdGhpbiBvdGhlciBtb2R1bGVzYFxuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogb25seSB1c2VmdWwgZm9yIHRvb2xzIGxpa2UgdnNjb2RlLWVzbGludFxuICAgICAqXG4gICAgICogdXBkYXRlIGxpc3RzIG9mIGV4aXN0aW5nIGV4cG9ydHMgZHVyaW5nIHJ1bnRpbWVcbiAgICAgKi9cbiAgICBjb25zdCB1cGRhdGVFeHBvcnRVc2FnZSA9IG5vZGUgPT4ge1xuICAgICAgaWYgKGlnbm9yZWRGaWxlcy5oYXMoZmlsZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGxldCBleHBvcnRzID0gZXhwb3J0TGlzdC5nZXQoZmlsZSlcblxuICAgICAgLy8gbmV3IG1vZHVsZSBoYXMgYmVlbiBjcmVhdGVkIGR1cmluZyBydW50aW1lXG4gICAgICAvLyBpbmNsdWRlIGl0IGluIGZ1cnRoZXIgcHJvY2Vzc2luZ1xuICAgICAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBleHBvcnRzID0gbmV3IE1hcCgpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5ld0V4cG9ydHMgPSBuZXcgTWFwKClcbiAgICAgIGNvbnN0IG5ld0V4cG9ydElkZW50aWZpZXJzID0gbmV3IFNldCgpXG5cbiAgICAgIG5vZGUuYm9keS5mb3JFYWNoKCh7IHR5cGUsIGRlY2xhcmF0aW9uLCBzcGVjaWZpZXJzIH0pID0+IHtcbiAgICAgICAgaWYgKHR5cGUgPT09IEVYUE9SVF9ERUZBVUxUX0RFQ0xBUkFUSU9OKSB7XG4gICAgICAgICAgbmV3RXhwb3J0SWRlbnRpZmllcnMuYWRkKElNUE9SVF9ERUZBVUxUX1NQRUNJRklFUilcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gRVhQT1JUX05BTUVEX0RFQ0xBUkFUSU9OKSB7XG4gICAgICAgICAgaWYgKHNwZWNpZmllcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc3BlY2lmaWVycy5mb3JFYWNoKHNwZWNpZmllciA9PiB7XG4gICAgICAgICAgICAgIGlmIChzcGVjaWZpZXIuZXhwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICBuZXdFeHBvcnRJZGVudGlmaWVycy5hZGQoc3BlY2lmaWVyLmV4cG9ydGVkLm5hbWUpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkZWNsYXJhdGlvbikge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBkZWNsYXJhdGlvbi50eXBlID09PSBGVU5DVElPTl9ERUNMQVJBVElPTiB8fFxuICAgICAgICAgICAgICBkZWNsYXJhdGlvbi50eXBlID09PSBDTEFTU19ERUNMQVJBVElPTiB8fFxuICAgICAgICAgICAgICBkZWNsYXJhdGlvbi50eXBlID09PSBUWVBFX0FMSUFTXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgbmV3RXhwb3J0SWRlbnRpZmllcnMuYWRkKGRlY2xhcmF0aW9uLmlkLm5hbWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVjbGFyYXRpb24udHlwZSA9PT0gVkFSSUFCTEVfREVDTEFSQVRJT04pIHtcbiAgICAgICAgICAgICAgZGVjbGFyYXRpb24uZGVjbGFyYXRpb25zLmZvckVhY2goKHsgaWQgfSkgPT4ge1xuICAgICAgICAgICAgICAgIG5ld0V4cG9ydElkZW50aWZpZXJzLmFkZChpZC5uYW1lKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gb2xkIGV4cG9ydHMgZXhpc3Qgd2l0aGluIGxpc3Qgb2YgbmV3IGV4cG9ydHMgaWRlbnRpZmllcnM6IGFkZCB0byBtYXAgb2YgbmV3IGV4cG9ydHNcbiAgICAgIGV4cG9ydHMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBpZiAobmV3RXhwb3J0SWRlbnRpZmllcnMuaGFzKGtleSkpIHtcbiAgICAgICAgICBuZXdFeHBvcnRzLnNldChrZXksIHZhbHVlKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAvLyBuZXcgZXhwb3J0IGlkZW50aWZpZXJzIGFkZGVkOiBhZGQgdG8gbWFwIG9mIG5ldyBleHBvcnRzXG4gICAgICBuZXdFeHBvcnRJZGVudGlmaWVycy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmICghZXhwb3J0cy5oYXMoa2V5KSkge1xuICAgICAgICAgIG5ld0V4cG9ydHMuc2V0KGtleSwgeyB3aGVyZVVzZWQ6IG5ldyBTZXQoKSB9KVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAvLyBwcmVzZXJ2ZSBpbmZvcm1hdGlvbiBhYm91dCBuYW1lc3BhY2UgaW1wb3J0c1xuICAgICAgbGV0IGV4cG9ydEFsbCA9IGV4cG9ydHMuZ2V0KEVYUE9SVF9BTExfREVDTEFSQVRJT04pXG4gICAgICBsZXQgbmFtZXNwYWNlSW1wb3J0cyA9IGV4cG9ydHMuZ2V0KElNUE9SVF9OQU1FU1BBQ0VfU1BFQ0lGSUVSKVxuXG4gICAgICBpZiAodHlwZW9mIG5hbWVzcGFjZUltcG9ydHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG5hbWVzcGFjZUltcG9ydHMgPSB7IHdoZXJlVXNlZDogbmV3IFNldCgpIH1cbiAgICAgIH1cblxuICAgICAgbmV3RXhwb3J0cy5zZXQoRVhQT1JUX0FMTF9ERUNMQVJBVElPTiwgZXhwb3J0QWxsKVxuICAgICAgbmV3RXhwb3J0cy5zZXQoSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIsIG5hbWVzcGFjZUltcG9ydHMpXG4gICAgICBleHBvcnRMaXN0LnNldChmaWxlLCBuZXdFeHBvcnRzKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG9ubHkgdXNlZnVsIGZvciB0b29scyBsaWtlIHZzY29kZS1lc2xpbnRcbiAgICAgKlxuICAgICAqIHVwZGF0ZSBsaXN0cyBvZiBleGlzdGluZyBpbXBvcnRzIGR1cmluZyBydW50aW1lXG4gICAgICovXG4gICAgY29uc3QgdXBkYXRlSW1wb3J0VXNhZ2UgPSBub2RlID0+IHtcbiAgICAgIGlmICghdW51c2VkRXhwb3J0cykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbGV0IG9sZEltcG9ydFBhdGhzID0gaW1wb3J0TGlzdC5nZXQoZmlsZSlcbiAgICAgIGlmICh0eXBlb2Ygb2xkSW1wb3J0UGF0aHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG9sZEltcG9ydFBhdGhzID0gbmV3IE1hcCgpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9sZE5hbWVzcGFjZUltcG9ydHMgPSBuZXcgU2V0KClcbiAgICAgIGNvbnN0IG5ld05hbWVzcGFjZUltcG9ydHMgPSBuZXcgU2V0KClcblxuICAgICAgY29uc3Qgb2xkRXhwb3J0QWxsID0gbmV3IFNldCgpXG4gICAgICBjb25zdCBuZXdFeHBvcnRBbGwgPSBuZXcgU2V0KClcblxuICAgICAgY29uc3Qgb2xkRGVmYXVsdEltcG9ydHMgPSBuZXcgU2V0KClcbiAgICAgIGNvbnN0IG5ld0RlZmF1bHRJbXBvcnRzID0gbmV3IFNldCgpXG5cbiAgICAgIGNvbnN0IG9sZEltcG9ydHMgPSBuZXcgTWFwKClcbiAgICAgIGNvbnN0IG5ld0ltcG9ydHMgPSBuZXcgTWFwKClcbiAgICAgIG9sZEltcG9ydFBhdGhzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlLmhhcyhFWFBPUlRfQUxMX0RFQ0xBUkFUSU9OKSkge1xuICAgICAgICAgIG9sZEV4cG9ydEFsbC5hZGQoa2V5KVxuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS5oYXMoSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIpKSB7XG4gICAgICAgICAgb2xkTmFtZXNwYWNlSW1wb3J0cy5hZGQoa2V5KVxuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS5oYXMoSU1QT1JUX0RFRkFVTFRfU1BFQ0lGSUVSKSkge1xuICAgICAgICAgIG9sZERlZmF1bHRJbXBvcnRzLmFkZChrZXkpXG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUuZm9yRWFjaCh2YWwgPT4ge1xuICAgICAgICAgIGlmICh2YWwgIT09IElNUE9SVF9OQU1FU1BBQ0VfU1BFQ0lGSUVSICYmXG4gICAgICAgICAgICAgIHZhbCAhPT0gSU1QT1JUX0RFRkFVTFRfU1BFQ0lGSUVSKSB7XG4gICAgICAgICAgICAgICBvbGRJbXBvcnRzLnNldCh2YWwsIGtleSlcbiAgICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBub2RlLmJvZHkuZm9yRWFjaChhc3ROb2RlID0+IHtcbiAgICAgICAgbGV0IHJlc29sdmVkUGF0aFxuXG4gICAgICAgIC8vIHN1cHBvcnQgZm9yIGV4cG9ydCB7IHZhbHVlIH0gZnJvbSAnbW9kdWxlJ1xuICAgICAgICBpZiAoYXN0Tm9kZS50eXBlID09PSBFWFBPUlRfTkFNRURfREVDTEFSQVRJT04pIHtcbiAgICAgICAgICBpZiAoYXN0Tm9kZS5zb3VyY2UpIHtcbiAgICAgICAgICAgIHJlc29sdmVkUGF0aCA9IHJlc29sdmUoYXN0Tm9kZS5zb3VyY2UucmF3LnJlcGxhY2UoLygnfFwiKS9nLCAnJyksIGNvbnRleHQpXG4gICAgICAgICAgICBhc3ROb2RlLnNwZWNpZmllcnMuZm9yRWFjaChzcGVjaWZpZXIgPT4ge1xuICAgICAgICAgICAgICBsZXQgbmFtZVxuICAgICAgICAgICAgICBpZiAoc3BlY2lmaWVyLmV4cG9ydGVkLm5hbWUgPT09IERFRkFVTFQpIHtcbiAgICAgICAgICAgICAgICBuYW1lID0gSU1QT1JUX0RFRkFVTFRfU1BFQ0lGSUVSXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IHNwZWNpZmllci5sb2NhbC5uYW1lXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbmV3SW1wb3J0cy5zZXQobmFtZSwgcmVzb2x2ZWRQYXRoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXN0Tm9kZS50eXBlID09PSBFWFBPUlRfQUxMX0RFQ0xBUkFUSU9OKSB7XG4gICAgICAgICAgcmVzb2x2ZWRQYXRoID0gcmVzb2x2ZShhc3ROb2RlLnNvdXJjZS5yYXcucmVwbGFjZSgvKCd8XCIpL2csICcnKSwgY29udGV4dClcbiAgICAgICAgICBuZXdFeHBvcnRBbGwuYWRkKHJlc29sdmVkUGF0aClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhc3ROb2RlLnR5cGUgPT09IElNUE9SVF9ERUNMQVJBVElPTikge1xuICAgICAgICAgIHJlc29sdmVkUGF0aCA9IHJlc29sdmUoYXN0Tm9kZS5zb3VyY2UucmF3LnJlcGxhY2UoLygnfFwiKS9nLCAnJyksIGNvbnRleHQpXG4gICAgICAgICAgaWYgKCFyZXNvbHZlZFBhdGgpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpc05vZGVNb2R1bGUocmVzb2x2ZWRQYXRoKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5ld05hbWVzcGFjZUltcG9ydEV4aXN0cyhhc3ROb2RlLnNwZWNpZmllcnMpKSB7XG4gICAgICAgICAgICBuZXdOYW1lc3BhY2VJbXBvcnRzLmFkZChyZXNvbHZlZFBhdGgpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5ld0RlZmF1bHRJbXBvcnRFeGlzdHMoYXN0Tm9kZS5zcGVjaWZpZXJzKSkge1xuICAgICAgICAgICAgbmV3RGVmYXVsdEltcG9ydHMuYWRkKHJlc29sdmVkUGF0aClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhc3ROb2RlLnNwZWNpZmllcnMuZm9yRWFjaChzcGVjaWZpZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHNwZWNpZmllci50eXBlID09PSBJTVBPUlRfREVGQVVMVF9TUEVDSUZJRVIgfHxcbiAgICAgICAgICAgICAgICBzcGVjaWZpZXIudHlwZSA9PT0gSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdJbXBvcnRzLnNldChzcGVjaWZpZXIuaW1wb3J0ZWQubmFtZSwgcmVzb2x2ZWRQYXRoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIG5ld0V4cG9ydEFsbC5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgaWYgKCFvbGRFeHBvcnRBbGwuaGFzKHZhbHVlKSkge1xuICAgICAgICAgIGxldCBpbXBvcnRzID0gb2xkSW1wb3J0UGF0aHMuZ2V0KHZhbHVlKVxuICAgICAgICAgIGlmICh0eXBlb2YgaW1wb3J0cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGltcG9ydHMgPSBuZXcgU2V0KClcbiAgICAgICAgICB9XG4gICAgICAgICAgaW1wb3J0cy5hZGQoRVhQT1JUX0FMTF9ERUNMQVJBVElPTilcbiAgICAgICAgICBvbGRJbXBvcnRQYXRocy5zZXQodmFsdWUsIGltcG9ydHMpXG5cbiAgICAgICAgICBsZXQgZXhwb3J0cyA9IGV4cG9ydExpc3QuZ2V0KHZhbHVlKVxuICAgICAgICAgIGxldCBjdXJyZW50RXhwb3J0XG4gICAgICAgICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY3VycmVudEV4cG9ydCA9IGV4cG9ydHMuZ2V0KEVYUE9SVF9BTExfREVDTEFSQVRJT04pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4cG9ydHMgPSBuZXcgTWFwKClcbiAgICAgICAgICAgIGV4cG9ydExpc3Quc2V0KHZhbHVlLCBleHBvcnRzKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgY3VycmVudEV4cG9ydCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGN1cnJlbnRFeHBvcnQud2hlcmVVc2VkLmFkZChmaWxlKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB3aGVyZVVzZWQgPSBuZXcgU2V0KClcbiAgICAgICAgICAgIHdoZXJlVXNlZC5hZGQoZmlsZSlcbiAgICAgICAgICAgIGV4cG9ydHMuc2V0KEVYUE9SVF9BTExfREVDTEFSQVRJT04sIHsgd2hlcmVVc2VkIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBvbGRFeHBvcnRBbGwuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgIGlmICghbmV3RXhwb3J0QWxsLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICBjb25zdCBpbXBvcnRzID0gb2xkSW1wb3J0UGF0aHMuZ2V0KHZhbHVlKVxuICAgICAgICAgIGltcG9ydHMuZGVsZXRlKEVYUE9SVF9BTExfREVDTEFSQVRJT04pXG5cbiAgICAgICAgICBjb25zdCBleHBvcnRzID0gZXhwb3J0TGlzdC5nZXQodmFsdWUpXG4gICAgICAgICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEV4cG9ydCA9IGV4cG9ydHMuZ2V0KEVYUE9SVF9BTExfREVDTEFSQVRJT04pXG4gICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRFeHBvcnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRFeHBvcnQud2hlcmVVc2VkLmRlbGV0ZShmaWxlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgbmV3RGVmYXVsdEltcG9ydHMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgIGlmICghb2xkRGVmYXVsdEltcG9ydHMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgIGxldCBpbXBvcnRzID0gb2xkSW1wb3J0UGF0aHMuZ2V0KHZhbHVlKVxuICAgICAgICAgIGlmICh0eXBlb2YgaW1wb3J0cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGltcG9ydHMgPSBuZXcgU2V0KClcbiAgICAgICAgICB9XG4gICAgICAgICAgaW1wb3J0cy5hZGQoSU1QT1JUX0RFRkFVTFRfU1BFQ0lGSUVSKVxuICAgICAgICAgIG9sZEltcG9ydFBhdGhzLnNldCh2YWx1ZSwgaW1wb3J0cylcblxuICAgICAgICAgIGxldCBleHBvcnRzID0gZXhwb3J0TGlzdC5nZXQodmFsdWUpXG4gICAgICAgICAgbGV0IGN1cnJlbnRFeHBvcnRcbiAgICAgICAgICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjdXJyZW50RXhwb3J0ID0gZXhwb3J0cy5nZXQoSU1QT1JUX0RFRkFVTFRfU1BFQ0lGSUVSKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBleHBvcnRzID0gbmV3IE1hcCgpXG4gICAgICAgICAgICBleHBvcnRMaXN0LnNldCh2YWx1ZSwgZXhwb3J0cylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRFeHBvcnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjdXJyZW50RXhwb3J0LndoZXJlVXNlZC5hZGQoZmlsZSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgd2hlcmVVc2VkID0gbmV3IFNldCgpXG4gICAgICAgICAgICB3aGVyZVVzZWQuYWRkKGZpbGUpXG4gICAgICAgICAgICBleHBvcnRzLnNldChJTVBPUlRfREVGQVVMVF9TUEVDSUZJRVIsIHsgd2hlcmVVc2VkIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBvbGREZWZhdWx0SW1wb3J0cy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgaWYgKCFuZXdEZWZhdWx0SW1wb3J0cy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgY29uc3QgaW1wb3J0cyA9IG9sZEltcG9ydFBhdGhzLmdldCh2YWx1ZSlcbiAgICAgICAgICBpbXBvcnRzLmRlbGV0ZShJTVBPUlRfREVGQVVMVF9TUEVDSUZJRVIpXG5cbiAgICAgICAgICBjb25zdCBleHBvcnRzID0gZXhwb3J0TGlzdC5nZXQodmFsdWUpXG4gICAgICAgICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEV4cG9ydCA9IGV4cG9ydHMuZ2V0KElNUE9SVF9ERUZBVUxUX1NQRUNJRklFUilcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY3VycmVudEV4cG9ydCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgY3VycmVudEV4cG9ydC53aGVyZVVzZWQuZGVsZXRlKGZpbGUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBuZXdOYW1lc3BhY2VJbXBvcnRzLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICBpZiAoIW9sZE5hbWVzcGFjZUltcG9ydHMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgIGxldCBpbXBvcnRzID0gb2xkSW1wb3J0UGF0aHMuZ2V0KHZhbHVlKVxuICAgICAgICAgIGlmICh0eXBlb2YgaW1wb3J0cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGltcG9ydHMgPSBuZXcgU2V0KClcbiAgICAgICAgICB9XG4gICAgICAgICAgaW1wb3J0cy5hZGQoSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIpXG4gICAgICAgICAgb2xkSW1wb3J0UGF0aHMuc2V0KHZhbHVlLCBpbXBvcnRzKVxuXG4gICAgICAgICAgbGV0IGV4cG9ydHMgPSBleHBvcnRMaXN0LmdldCh2YWx1ZSlcbiAgICAgICAgICBsZXQgY3VycmVudEV4cG9ydFxuICAgICAgICAgIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGN1cnJlbnRFeHBvcnQgPSBleHBvcnRzLmdldChJTVBPUlRfTkFNRVNQQUNFX1NQRUNJRklFUilcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXhwb3J0cyA9IG5ldyBNYXAoKVxuICAgICAgICAgICAgZXhwb3J0TGlzdC5zZXQodmFsdWUsIGV4cG9ydHMpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50RXhwb3J0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY3VycmVudEV4cG9ydC53aGVyZVVzZWQuYWRkKGZpbGUpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHdoZXJlVXNlZCA9IG5ldyBTZXQoKVxuICAgICAgICAgICAgd2hlcmVVc2VkLmFkZChmaWxlKVxuICAgICAgICAgICAgZXhwb3J0cy5zZXQoSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIsIHsgd2hlcmVVc2VkIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBvbGROYW1lc3BhY2VJbXBvcnRzLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICBpZiAoIW5ld05hbWVzcGFjZUltcG9ydHMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgIGNvbnN0IGltcG9ydHMgPSBvbGRJbXBvcnRQYXRocy5nZXQodmFsdWUpXG4gICAgICAgICAgaW1wb3J0cy5kZWxldGUoSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIpXG5cbiAgICAgICAgICBjb25zdCBleHBvcnRzID0gZXhwb3J0TGlzdC5nZXQodmFsdWUpXG4gICAgICAgICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEV4cG9ydCA9IGV4cG9ydHMuZ2V0KElNUE9SVF9OQU1FU1BBQ0VfU1BFQ0lGSUVSKVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50RXhwb3J0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICBjdXJyZW50RXhwb3J0LndoZXJlVXNlZC5kZWxldGUoZmlsZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIG5ld0ltcG9ydHMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBpZiAoIW9sZEltcG9ydHMuaGFzKGtleSkpIHtcbiAgICAgICAgICBsZXQgaW1wb3J0cyA9IG9sZEltcG9ydFBhdGhzLmdldCh2YWx1ZSlcbiAgICAgICAgICBpZiAodHlwZW9mIGltcG9ydHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpbXBvcnRzID0gbmV3IFNldCgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGltcG9ydHMuYWRkKGtleSlcbiAgICAgICAgICBvbGRJbXBvcnRQYXRocy5zZXQodmFsdWUsIGltcG9ydHMpXG5cbiAgICAgICAgICBsZXQgZXhwb3J0cyA9IGV4cG9ydExpc3QuZ2V0KHZhbHVlKVxuICAgICAgICAgIGxldCBjdXJyZW50RXhwb3J0XG4gICAgICAgICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY3VycmVudEV4cG9ydCA9IGV4cG9ydHMuZ2V0KGtleSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXhwb3J0cyA9IG5ldyBNYXAoKVxuICAgICAgICAgICAgZXhwb3J0TGlzdC5zZXQodmFsdWUsIGV4cG9ydHMpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50RXhwb3J0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY3VycmVudEV4cG9ydC53aGVyZVVzZWQuYWRkKGZpbGUpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHdoZXJlVXNlZCA9IG5ldyBTZXQoKVxuICAgICAgICAgICAgd2hlcmVVc2VkLmFkZChmaWxlKVxuICAgICAgICAgICAgZXhwb3J0cy5zZXQoa2V5LCB7IHdoZXJlVXNlZCB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgb2xkSW1wb3J0cy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIGlmICghbmV3SW1wb3J0cy5oYXMoa2V5KSkge1xuICAgICAgICAgIGNvbnN0IGltcG9ydHMgPSBvbGRJbXBvcnRQYXRocy5nZXQodmFsdWUpXG4gICAgICAgICAgaW1wb3J0cy5kZWxldGUoa2V5KVxuXG4gICAgICAgICAgY29uc3QgZXhwb3J0cyA9IGV4cG9ydExpc3QuZ2V0KHZhbHVlKVxuICAgICAgICAgIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRFeHBvcnQgPSBleHBvcnRzLmdldChrZXkpXG4gICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRFeHBvcnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRFeHBvcnQud2hlcmVVc2VkLmRlbGV0ZShmaWxlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgJ1Byb2dyYW06ZXhpdCc6IG5vZGUgPT4ge1xuICAgICAgICB1cGRhdGVFeHBvcnRVc2FnZShub2RlKVxuICAgICAgICB1cGRhdGVJbXBvcnRVc2FnZShub2RlKVxuICAgICAgICBjaGVja0V4cG9ydFByZXNlbmNlKG5vZGUpXG4gICAgICB9LFxuICAgICAgJ0V4cG9ydERlZmF1bHREZWNsYXJhdGlvbic6IG5vZGUgPT4ge1xuICAgICAgICBjaGVja1VzYWdlKG5vZGUsIElNUE9SVF9ERUZBVUxUX1NQRUNJRklFUilcbiAgICAgIH0sXG4gICAgICAnRXhwb3J0TmFtZWREZWNsYXJhdGlvbic6IG5vZGUgPT4ge1xuICAgICAgICBub2RlLnNwZWNpZmllcnMuZm9yRWFjaChzcGVjaWZpZXIgPT4ge1xuICAgICAgICAgICAgY2hlY2tVc2FnZShub2RlLCBzcGVjaWZpZXIuZXhwb3J0ZWQubmFtZSlcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKG5vZGUuZGVjbGFyYXRpb24pIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBub2RlLmRlY2xhcmF0aW9uLnR5cGUgPT09IEZVTkNUSU9OX0RFQ0xBUkFUSU9OIHx8XG4gICAgICAgICAgICBub2RlLmRlY2xhcmF0aW9uLnR5cGUgPT09IENMQVNTX0RFQ0xBUkFUSU9OIHx8XG4gICAgICAgICAgICBub2RlLmRlY2xhcmF0aW9uLnR5cGUgPT09IFRZUEVfQUxJQVNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNoZWNrVXNhZ2Uobm9kZSwgbm9kZS5kZWNsYXJhdGlvbi5pZC5uYW1lKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobm9kZS5kZWNsYXJhdGlvbi50eXBlID09PSBWQVJJQUJMRV9ERUNMQVJBVElPTikge1xuICAgICAgICAgICAgbm9kZS5kZWNsYXJhdGlvbi5kZWNsYXJhdGlvbnMuZm9yRWFjaChkZWNsYXJhdGlvbiA9PiB7XG4gICAgICAgICAgICAgIGNoZWNrVXNhZ2Uobm9kZSwgZGVjbGFyYXRpb24uaWQubmFtZSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH1cbiAgfSxcbn1cbiJdfQ==