'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

var _importType = require('../core/importType');

var _importType2 = _interopRequireDefault(_importType);

var _staticRequire = require('../core/staticRequire');

var _staticRequire2 = _interopRequireDefault(_staticRequire);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultGroups = ['builtin', 'external', 'parent', 'sibling', 'index'];

// REPORTING AND FIXING

function reverse(array) {
  return array.map(function (v) {
    return {
      name: v.name,
      rank: -v.rank,
      node: v.node
    };
  }).reverse();
}

function getTokensOrCommentsAfter(sourceCode, node, count) {
  let currentNodeOrToken = node;
  const result = [];
  for (let i = 0; i < count; i++) {
    currentNodeOrToken = sourceCode.getTokenOrCommentAfter(currentNodeOrToken);
    if (currentNodeOrToken == null) {
      break;
    }
    result.push(currentNodeOrToken);
  }
  return result;
}

function getTokensOrCommentsBefore(sourceCode, node, count) {
  let currentNodeOrToken = node;
  const result = [];
  for (let i = 0; i < count; i++) {
    currentNodeOrToken = sourceCode.getTokenOrCommentBefore(currentNodeOrToken);
    if (currentNodeOrToken == null) {
      break;
    }
    result.push(currentNodeOrToken);
  }
  return result.reverse();
}

function takeTokensAfterWhile(sourceCode, node, condition) {
  const tokens = getTokensOrCommentsAfter(sourceCode, node, 100);
  const result = [];
  for (let i = 0; i < tokens.length; i++) {
    if (condition(tokens[i])) {
      result.push(tokens[i]);
    } else {
      break;
    }
  }
  return result;
}

function takeTokensBeforeWhile(sourceCode, node, condition) {
  const tokens = getTokensOrCommentsBefore(sourceCode, node, 100);
  const result = [];
  for (let i = tokens.length - 1; i >= 0; i--) {
    if (condition(tokens[i])) {
      result.push(tokens[i]);
    } else {
      break;
    }
  }
  return result.reverse();
}

function findOutOfOrder(imported) {
  if (imported.length === 0) {
    return [];
  }
  let maxSeenRankNode = imported[0];
  return imported.filter(function (importedModule) {
    const res = importedModule.rank < maxSeenRankNode.rank;
    if (maxSeenRankNode.rank < importedModule.rank) {
      maxSeenRankNode = importedModule;
    }
    return res;
  });
}

function findRootNode(node) {
  let parent = node;
  while (parent.parent != null && parent.parent.body == null) {
    parent = parent.parent;
  }
  return parent;
}

function findEndOfLineWithComments(sourceCode, node) {
  const tokensToEndOfLine = takeTokensAfterWhile(sourceCode, node, commentOnSameLineAs(node));
  let endOfTokens = tokensToEndOfLine.length > 0 ? tokensToEndOfLine[tokensToEndOfLine.length - 1].range[1] : node.range[1];
  let result = endOfTokens;
  for (let i = endOfTokens; i < sourceCode.text.length; i++) {
    if (sourceCode.text[i] === '\n') {
      result = i + 1;
      break;
    }
    if (sourceCode.text[i] !== ' ' && sourceCode.text[i] !== '\t' && sourceCode.text[i] !== '\r') {
      break;
    }
    result = i + 1;
  }
  return result;
}

function commentOnSameLineAs(node) {
  return token => (token.type === 'Block' || token.type === 'Line') && token.loc.start.line === token.loc.end.line && token.loc.end.line === node.loc.end.line;
}

function findStartOfLineWithComments(sourceCode, node) {
  const tokensToEndOfLine = takeTokensBeforeWhile(sourceCode, node, commentOnSameLineAs(node));
  let startOfTokens = tokensToEndOfLine.length > 0 ? tokensToEndOfLine[0].range[0] : node.range[0];
  let result = startOfTokens;
  for (let i = startOfTokens - 1; i > 0; i--) {
    if (sourceCode.text[i] !== ' ' && sourceCode.text[i] !== '\t') {
      break;
    }
    result = i;
  }
  return result;
}

function isPlainRequireModule(node) {
  if (node.type !== 'VariableDeclaration') {
    return false;
  }
  if (node.declarations.length !== 1) {
    return false;
  }
  const decl = node.declarations[0];
  const result = decl.id && (decl.id.type === 'Identifier' || decl.id.type === 'ObjectPattern') && decl.init != null && decl.init.type === 'CallExpression' && decl.init.callee != null && decl.init.callee.name === 'require' && decl.init.arguments != null && decl.init.arguments.length === 1 && decl.init.arguments[0].type === 'Literal';
  return result;
}

function isPlainImportModule(node) {
  return node.type === 'ImportDeclaration' && node.specifiers != null && node.specifiers.length > 0;
}

function canCrossNodeWhileReorder(node) {
  return isPlainRequireModule(node) || isPlainImportModule(node);
}

function canReorderItems(firstNode, secondNode) {
  const parent = firstNode.parent;

  var _sort = [parent.body.indexOf(firstNode), parent.body.indexOf(secondNode)].sort(),
      _sort2 = _slicedToArray(_sort, 2);

  const firstIndex = _sort2[0],
        secondIndex = _sort2[1];

  const nodesBetween = parent.body.slice(firstIndex, secondIndex + 1);
  for (var nodeBetween of nodesBetween) {
    if (!canCrossNodeWhileReorder(nodeBetween)) {
      return false;
    }
  }
  return true;
}

function fixOutOfOrder(context, firstNode, secondNode, order) {
  const sourceCode = context.getSourceCode();

  const firstRoot = findRootNode(firstNode.node);
  const firstRootStart = findStartOfLineWithComments(sourceCode, firstRoot);
  const firstRootEnd = findEndOfLineWithComments(sourceCode, firstRoot);

  const secondRoot = findRootNode(secondNode.node);
  const secondRootStart = findStartOfLineWithComments(sourceCode, secondRoot);
  const secondRootEnd = findEndOfLineWithComments(sourceCode, secondRoot);
  const canFix = canReorderItems(firstRoot, secondRoot);

  let newCode = sourceCode.text.substring(secondRootStart, secondRootEnd);
  if (newCode[newCode.length - 1] !== '\n') {
    newCode = newCode + '\n';
  }

  const message = '`' + secondNode.name + '` import should occur ' + order + ' import of `' + firstNode.name + '`';

  if (order === 'before') {
    context.report({
      node: secondNode.node,
      message: message,
      fix: canFix && (fixer => fixer.replaceTextRange([firstRootStart, secondRootEnd], newCode + sourceCode.text.substring(firstRootStart, secondRootStart)))
    });
  } else if (order === 'after') {
    context.report({
      node: secondNode.node,
      message: message,
      fix: canFix && (fixer => fixer.replaceTextRange([secondRootStart, firstRootEnd], sourceCode.text.substring(secondRootEnd, firstRootEnd) + newCode))
    });
  }
}

function reportOutOfOrder(context, imported, outOfOrder, order) {
  outOfOrder.forEach(function (imp) {
    const found = imported.find(function hasHigherRank(importedItem) {
      return importedItem.rank > imp.rank;
    });
    fixOutOfOrder(context, found, imp, order);
  });
}

function makeOutOfOrderReport(context, imported) {
  const outOfOrder = findOutOfOrder(imported);
  if (!outOfOrder.length) {
    return;
  }
  // There are things to report. Try to minimize the number of reported errors.
  const reversedImported = reverse(imported);
  const reversedOrder = findOutOfOrder(reversedImported);
  if (reversedOrder.length < outOfOrder.length) {
    reportOutOfOrder(context, reversedImported, reversedOrder, 'after');
    return;
  }
  reportOutOfOrder(context, imported, outOfOrder, 'before');
}

function importsSorterAsc(importA, importB) {
  if (importA < importB) {
    return -1;
  }

  if (importA > importB) {
    return 1;
  }

  return 0;
}

function importsSorterDesc(importA, importB) {
  if (importA < importB) {
    return 1;
  }

  if (importA > importB) {
    return -1;
  }

  return 0;
}

function mutateRanksToAlphabetize(imported, order) {
  const groupedByRanks = imported.reduce(function (acc, importedItem) {
    if (!Array.isArray(acc[importedItem.rank])) {
      acc[importedItem.rank] = [];
    }
    acc[importedItem.rank].push(importedItem.name);
    return acc;
  }, {});

  const groupRanks = Object.keys(groupedByRanks);

  const sorterFn = order === 'asc' ? importsSorterAsc : importsSorterDesc;
  // sort imports locally within their group
  groupRanks.forEach(function (groupRank) {
    groupedByRanks[groupRank].sort(sorterFn);
  });

  // assign globally unique rank to each import
  let newRank = 0;
  const alphabetizedRanks = groupRanks.sort().reduce(function (acc, groupRank) {
    groupedByRanks[groupRank].forEach(function (importedItemName) {
      acc[importedItemName] = newRank;
      newRank += 1;
    });
    return acc;
  }, {});

  // mutate the original group-rank with alphabetized-rank
  imported.forEach(function (importedItem) {
    importedItem.rank = alphabetizedRanks[importedItem.name];
  });
}

// DETECTING

function computePathRank(ranks, pathGroups, path, maxPosition) {
  for (let i = 0, l = pathGroups.length; i < l; i++) {
    var _pathGroups$i = pathGroups[i];
    const pattern = _pathGroups$i.pattern,
          patternOptions = _pathGroups$i.patternOptions,
          group = _pathGroups$i.group;
    var _pathGroups$i$positio = _pathGroups$i.position;
    const position = _pathGroups$i$positio === undefined ? 1 : _pathGroups$i$positio;

    if ((0, _minimatch2.default)(path, pattern, patternOptions || { nocomment: true })) {
      return ranks[group] + position / maxPosition;
    }
  }
}

function computeRank(context, ranks, name, type) {
  const impType = (0, _importType2.default)(name, context);
  let rank;
  if (impType !== 'builtin' && impType !== 'external') {
    rank = computePathRank(ranks.groups, ranks.pathGroups, name, ranks.maxPosition);
  }
  if (!rank) {
    rank = ranks.groups[impType];
  }
  if (type !== 'import') {
    rank += 100;
  }

  return rank;
}

function registerNode(context, node, name, type, ranks, imported) {
  const rank = computeRank(context, ranks, name, type);
  if (rank !== -1) {
    imported.push({ name, rank, node });
  }
}

function isInVariableDeclarator(node) {
  return node && (node.type === 'VariableDeclarator' || isInVariableDeclarator(node.parent));
}

const types = ['builtin', 'external', 'internal', 'unknown', 'parent', 'sibling', 'index'];

// Creates an object with type-rank pairs.
// Example: { index: 0, sibling: 1, parent: 1, external: 1, builtin: 2, internal: 2 }
// Will throw an error if it contains a type that does not exist, or has a duplicate
function convertGroupsToRanks(groups) {
  const rankObject = groups.reduce(function (res, group, index) {
    if (typeof group === 'string') {
      group = [group];
    }
    group.forEach(function (groupItem) {
      if (types.indexOf(groupItem) === -1) {
        throw new Error('Incorrect configuration of the rule: Unknown type `' + JSON.stringify(groupItem) + '`');
      }
      if (res[groupItem] !== undefined) {
        throw new Error('Incorrect configuration of the rule: `' + groupItem + '` is duplicated');
      }
      res[groupItem] = index;
    });
    return res;
  }, {});

  const omittedTypes = types.filter(function (type) {
    return rankObject[type] === undefined;
  });

  return omittedTypes.reduce(function (res, type) {
    res[type] = groups.length;
    return res;
  }, rankObject);
}

function convertPathGroupsForRanks(pathGroups) {
  const after = {};
  const before = {};

  const transformed = pathGroups.map((pathGroup, index) => {
    const group = pathGroup.group,
          positionString = pathGroup.position;

    let position = 0;
    if (positionString === 'after') {
      if (!after[group]) {
        after[group] = 1;
      }
      position = after[group]++;
    } else if (positionString === 'before') {
      if (!before[group]) {
        before[group] = [];
      }
      before[group].push(index);
    }

    return Object.assign({}, pathGroup, { position });
  });

  let maxPosition = 1;

  Object.keys(before).forEach(group => {
    const groupLength = before[group].length;
    before[group].forEach((groupIndex, index) => {
      transformed[groupIndex].position = -1 * (groupLength - index);
    });
    maxPosition = Math.max(maxPosition, groupLength);
  });

  Object.keys(after).forEach(key => {
    const groupNextPosition = after[key];
    maxPosition = Math.max(maxPosition, groupNextPosition - 1);
  });

  return {
    pathGroups: transformed,
    maxPosition: maxPosition > 10 ? Math.pow(10, Math.ceil(Math.log10(maxPosition))) : 10
  };
}

function fixNewLineAfterImport(context, previousImport) {
  const prevRoot = findRootNode(previousImport.node);
  const tokensToEndOfLine = takeTokensAfterWhile(context.getSourceCode(), prevRoot, commentOnSameLineAs(prevRoot));

  let endOfLine = prevRoot.range[1];
  if (tokensToEndOfLine.length > 0) {
    endOfLine = tokensToEndOfLine[tokensToEndOfLine.length - 1].range[1];
  }
  return fixer => fixer.insertTextAfterRange([prevRoot.range[0], endOfLine], '\n');
}

function removeNewLineAfterImport(context, currentImport, previousImport) {
  const sourceCode = context.getSourceCode();
  const prevRoot = findRootNode(previousImport.node);
  const currRoot = findRootNode(currentImport.node);
  const rangeToRemove = [findEndOfLineWithComments(sourceCode, prevRoot), findStartOfLineWithComments(sourceCode, currRoot)];
  if (/^\s*$/.test(sourceCode.text.substring(rangeToRemove[0], rangeToRemove[1]))) {
    return fixer => fixer.removeRange(rangeToRemove);
  }
  return undefined;
}

function makeNewlinesBetweenReport(context, imported, newlinesBetweenImports) {
  const getNumberOfEmptyLinesBetween = (currentImport, previousImport) => {
    const linesBetweenImports = context.getSourceCode().lines.slice(previousImport.node.loc.end.line, currentImport.node.loc.start.line - 1);

    return linesBetweenImports.filter(line => !line.trim().length).length;
  };
  let previousImport = imported[0];

  imported.slice(1).forEach(function (currentImport) {
    const emptyLinesBetween = getNumberOfEmptyLinesBetween(currentImport, previousImport);

    if (newlinesBetweenImports === 'always' || newlinesBetweenImports === 'always-and-inside-groups') {
      if (currentImport.rank !== previousImport.rank && emptyLinesBetween === 0) {
        context.report({
          node: previousImport.node,
          message: 'There should be at least one empty line between import groups',
          fix: fixNewLineAfterImport(context, previousImport)
        });
      } else if (currentImport.rank === previousImport.rank && emptyLinesBetween > 0 && newlinesBetweenImports !== 'always-and-inside-groups') {
        context.report({
          node: previousImport.node,
          message: 'There should be no empty line within import group',
          fix: removeNewLineAfterImport(context, currentImport, previousImport)
        });
      }
    } else if (emptyLinesBetween > 0) {
      context.report({
        node: previousImport.node,
        message: 'There should be no empty line between import groups',
        fix: removeNewLineAfterImport(context, currentImport, previousImport)
      });
    }

    previousImport = currentImport;
  });
}

function getAlphabetizeConfig(options) {
  const alphabetize = options.alphabetize || {};
  const order = alphabetize.order || 'ignore';

  return { order };
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('order')
    },

    fixable: 'code',
    schema: [{
      type: 'object',
      properties: {
        groups: {
          type: 'array'
        },
        pathGroups: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              pattern: {
                type: 'string'
              },
              patternOptions: {
                type: 'object'
              },
              group: {
                type: 'string',
                enum: types
              },
              position: {
                type: 'string',
                enum: ['after', 'before']
              }
            },
            required: ['pattern', 'group']
          }
        },
        'newlines-between': {
          enum: ['ignore', 'always', 'always-and-inside-groups', 'never']
        },
        alphabetize: {
          type: 'object',
          properties: {
            order: {
              enum: ['ignore', 'asc', 'desc'],
              default: 'ignore'
            }
          },
          additionalProperties: false
        }
      },
      additionalProperties: false
    }]
  },

  create: function importOrderRule(context) {
    const options = context.options[0] || {};
    const newlinesBetweenImports = options['newlines-between'] || 'ignore';
    const alphabetize = getAlphabetizeConfig(options);
    let ranks;

    try {
      var _convertPathGroupsFor = convertPathGroupsForRanks(options.pathGroups || []);

      const pathGroups = _convertPathGroupsFor.pathGroups,
            maxPosition = _convertPathGroupsFor.maxPosition;

      ranks = {
        groups: convertGroupsToRanks(options.groups || defaultGroups),
        pathGroups,
        maxPosition
      };
    } catch (error) {
      // Malformed configuration
      return {
        Program: function (node) {
          context.report(node, error.message);
        }
      };
    }
    let imported = [];
    let level = 0;

    function incrementLevel() {
      level++;
    }
    function decrementLevel() {
      level--;
    }

    return {
      ImportDeclaration: function handleImports(node) {
        if (node.specifiers.length) {
          // Ignoring unassigned imports
          const name = node.source.value;
          registerNode(context, node, name, 'import', ranks, imported);
        }
      },
      CallExpression: function handleRequires(node) {
        if (level !== 0 || !(0, _staticRequire2.default)(node) || !isInVariableDeclarator(node.parent)) {
          return;
        }
        const name = node.arguments[0].value;
        registerNode(context, node, name, 'require', ranks, imported);
      },
      'Program:exit': function reportAndReset() {
        if (alphabetize.order !== 'ignore') {
          mutateRanksToAlphabetize(imported, alphabetize.order);
        }

        makeOutOfOrderReport(context, imported);

        if (newlinesBetweenImports !== 'ignore') {
          makeNewlinesBetweenReport(context, imported, newlinesBetweenImports);
        }

        imported = [];
      },
      FunctionDeclaration: incrementLevel,
      FunctionExpression: incrementLevel,
      ArrowFunctionExpression: incrementLevel,
      BlockStatement: incrementLevel,
      ObjectExpression: incrementLevel,
      'FunctionDeclaration:exit': decrementLevel,
      'FunctionExpression:exit': decrementLevel,
      'ArrowFunctionExpression:exit': decrementLevel,
      'BlockStatement:exit': decrementLevel,
      'ObjectExpression:exit': decrementLevel
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9vcmRlci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0R3JvdXBzIiwicmV2ZXJzZSIsImFycmF5IiwibWFwIiwidiIsIm5hbWUiLCJyYW5rIiwibm9kZSIsImdldFRva2Vuc09yQ29tbWVudHNBZnRlciIsInNvdXJjZUNvZGUiLCJjb3VudCIsImN1cnJlbnROb2RlT3JUb2tlbiIsInJlc3VsdCIsImkiLCJnZXRUb2tlbk9yQ29tbWVudEFmdGVyIiwicHVzaCIsImdldFRva2Vuc09yQ29tbWVudHNCZWZvcmUiLCJnZXRUb2tlbk9yQ29tbWVudEJlZm9yZSIsInRha2VUb2tlbnNBZnRlcldoaWxlIiwiY29uZGl0aW9uIiwidG9rZW5zIiwibGVuZ3RoIiwidGFrZVRva2Vuc0JlZm9yZVdoaWxlIiwiZmluZE91dE9mT3JkZXIiLCJpbXBvcnRlZCIsIm1heFNlZW5SYW5rTm9kZSIsImZpbHRlciIsImltcG9ydGVkTW9kdWxlIiwicmVzIiwiZmluZFJvb3ROb2RlIiwicGFyZW50IiwiYm9keSIsImZpbmRFbmRPZkxpbmVXaXRoQ29tbWVudHMiLCJ0b2tlbnNUb0VuZE9mTGluZSIsImNvbW1lbnRPblNhbWVMaW5lQXMiLCJlbmRPZlRva2VucyIsInJhbmdlIiwidGV4dCIsInRva2VuIiwidHlwZSIsImxvYyIsInN0YXJ0IiwibGluZSIsImVuZCIsImZpbmRTdGFydE9mTGluZVdpdGhDb21tZW50cyIsInN0YXJ0T2ZUb2tlbnMiLCJpc1BsYWluUmVxdWlyZU1vZHVsZSIsImRlY2xhcmF0aW9ucyIsImRlY2wiLCJpZCIsImluaXQiLCJjYWxsZWUiLCJhcmd1bWVudHMiLCJpc1BsYWluSW1wb3J0TW9kdWxlIiwic3BlY2lmaWVycyIsImNhbkNyb3NzTm9kZVdoaWxlUmVvcmRlciIsImNhblJlb3JkZXJJdGVtcyIsImZpcnN0Tm9kZSIsInNlY29uZE5vZGUiLCJpbmRleE9mIiwic29ydCIsImZpcnN0SW5kZXgiLCJzZWNvbmRJbmRleCIsIm5vZGVzQmV0d2VlbiIsInNsaWNlIiwibm9kZUJldHdlZW4iLCJmaXhPdXRPZk9yZGVyIiwiY29udGV4dCIsIm9yZGVyIiwiZ2V0U291cmNlQ29kZSIsImZpcnN0Um9vdCIsImZpcnN0Um9vdFN0YXJ0IiwiZmlyc3RSb290RW5kIiwic2Vjb25kUm9vdCIsInNlY29uZFJvb3RTdGFydCIsInNlY29uZFJvb3RFbmQiLCJjYW5GaXgiLCJuZXdDb2RlIiwic3Vic3RyaW5nIiwibWVzc2FnZSIsInJlcG9ydCIsImZpeCIsImZpeGVyIiwicmVwbGFjZVRleHRSYW5nZSIsInJlcG9ydE91dE9mT3JkZXIiLCJvdXRPZk9yZGVyIiwiZm9yRWFjaCIsImltcCIsImZvdW5kIiwiZmluZCIsImhhc0hpZ2hlclJhbmsiLCJpbXBvcnRlZEl0ZW0iLCJtYWtlT3V0T2ZPcmRlclJlcG9ydCIsInJldmVyc2VkSW1wb3J0ZWQiLCJyZXZlcnNlZE9yZGVyIiwiaW1wb3J0c1NvcnRlckFzYyIsImltcG9ydEEiLCJpbXBvcnRCIiwiaW1wb3J0c1NvcnRlckRlc2MiLCJtdXRhdGVSYW5rc1RvQWxwaGFiZXRpemUiLCJncm91cGVkQnlSYW5rcyIsInJlZHVjZSIsImFjYyIsIkFycmF5IiwiaXNBcnJheSIsImdyb3VwUmFua3MiLCJPYmplY3QiLCJrZXlzIiwic29ydGVyRm4iLCJncm91cFJhbmsiLCJuZXdSYW5rIiwiYWxwaGFiZXRpemVkUmFua3MiLCJpbXBvcnRlZEl0ZW1OYW1lIiwiY29tcHV0ZVBhdGhSYW5rIiwicmFua3MiLCJwYXRoR3JvdXBzIiwicGF0aCIsIm1heFBvc2l0aW9uIiwibCIsInBhdHRlcm4iLCJwYXR0ZXJuT3B0aW9ucyIsImdyb3VwIiwicG9zaXRpb24iLCJub2NvbW1lbnQiLCJjb21wdXRlUmFuayIsImltcFR5cGUiLCJncm91cHMiLCJyZWdpc3Rlck5vZGUiLCJpc0luVmFyaWFibGVEZWNsYXJhdG9yIiwidHlwZXMiLCJjb252ZXJ0R3JvdXBzVG9SYW5rcyIsInJhbmtPYmplY3QiLCJpbmRleCIsImdyb3VwSXRlbSIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsInVuZGVmaW5lZCIsIm9taXR0ZWRUeXBlcyIsImNvbnZlcnRQYXRoR3JvdXBzRm9yUmFua3MiLCJhZnRlciIsImJlZm9yZSIsInRyYW5zZm9ybWVkIiwicGF0aEdyb3VwIiwicG9zaXRpb25TdHJpbmciLCJhc3NpZ24iLCJncm91cExlbmd0aCIsImdyb3VwSW5kZXgiLCJNYXRoIiwibWF4Iiwia2V5IiwiZ3JvdXBOZXh0UG9zaXRpb24iLCJwb3ciLCJjZWlsIiwibG9nMTAiLCJmaXhOZXdMaW5lQWZ0ZXJJbXBvcnQiLCJwcmV2aW91c0ltcG9ydCIsInByZXZSb290IiwiZW5kT2ZMaW5lIiwiaW5zZXJ0VGV4dEFmdGVyUmFuZ2UiLCJyZW1vdmVOZXdMaW5lQWZ0ZXJJbXBvcnQiLCJjdXJyZW50SW1wb3J0IiwiY3VyclJvb3QiLCJyYW5nZVRvUmVtb3ZlIiwidGVzdCIsInJlbW92ZVJhbmdlIiwibWFrZU5ld2xpbmVzQmV0d2VlblJlcG9ydCIsIm5ld2xpbmVzQmV0d2VlbkltcG9ydHMiLCJnZXROdW1iZXJPZkVtcHR5TGluZXNCZXR3ZWVuIiwibGluZXNCZXR3ZWVuSW1wb3J0cyIsImxpbmVzIiwidHJpbSIsImVtcHR5TGluZXNCZXR3ZWVuIiwiZ2V0QWxwaGFiZXRpemVDb25maWciLCJvcHRpb25zIiwiYWxwaGFiZXRpemUiLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJ1cmwiLCJmaXhhYmxlIiwic2NoZW1hIiwicHJvcGVydGllcyIsIml0ZW1zIiwiZW51bSIsInJlcXVpcmVkIiwiZGVmYXVsdCIsImFkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiY3JlYXRlIiwiaW1wb3J0T3JkZXJSdWxlIiwiZXJyb3IiLCJQcm9ncmFtIiwibGV2ZWwiLCJpbmNyZW1lbnRMZXZlbCIsImRlY3JlbWVudExldmVsIiwiSW1wb3J0RGVjbGFyYXRpb24iLCJoYW5kbGVJbXBvcnRzIiwic291cmNlIiwidmFsdWUiLCJDYWxsRXhwcmVzc2lvbiIsImhhbmRsZVJlcXVpcmVzIiwicmVwb3J0QW5kUmVzZXQiLCJGdW5jdGlvbkRlY2xhcmF0aW9uIiwiRnVuY3Rpb25FeHByZXNzaW9uIiwiQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24iLCJCbG9ja1N0YXRlbWVudCIsIk9iamVjdEV4cHJlc3Npb24iXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLGdCQUFnQixDQUFDLFNBQUQsRUFBWSxVQUFaLEVBQXdCLFFBQXhCLEVBQWtDLFNBQWxDLEVBQTZDLE9BQTdDLENBQXRCOztBQUVBOztBQUVBLFNBQVNDLE9BQVQsQ0FBaUJDLEtBQWpCLEVBQXdCO0FBQ3RCLFNBQU9BLE1BQU1DLEdBQU4sQ0FBVSxVQUFVQyxDQUFWLEVBQWE7QUFDNUIsV0FBTztBQUNMQyxZQUFNRCxFQUFFQyxJQURIO0FBRUxDLFlBQU0sQ0FBQ0YsRUFBRUUsSUFGSjtBQUdMQyxZQUFNSCxFQUFFRztBQUhILEtBQVA7QUFLRCxHQU5NLEVBTUpOLE9BTkksRUFBUDtBQU9EOztBQUVELFNBQVNPLHdCQUFULENBQWtDQyxVQUFsQyxFQUE4Q0YsSUFBOUMsRUFBb0RHLEtBQXBELEVBQTJEO0FBQ3pELE1BQUlDLHFCQUFxQkosSUFBekI7QUFDQSxRQUFNSyxTQUFTLEVBQWY7QUFDQSxPQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUgsS0FBcEIsRUFBMkJHLEdBQTNCLEVBQWdDO0FBQzlCRix5QkFBcUJGLFdBQVdLLHNCQUFYLENBQWtDSCxrQkFBbEMsQ0FBckI7QUFDQSxRQUFJQSxzQkFBc0IsSUFBMUIsRUFBZ0M7QUFDOUI7QUFDRDtBQUNEQyxXQUFPRyxJQUFQLENBQVlKLGtCQUFaO0FBQ0Q7QUFDRCxTQUFPQyxNQUFQO0FBQ0Q7O0FBRUQsU0FBU0kseUJBQVQsQ0FBbUNQLFVBQW5DLEVBQStDRixJQUEvQyxFQUFxREcsS0FBckQsRUFBNEQ7QUFDMUQsTUFBSUMscUJBQXFCSixJQUF6QjtBQUNBLFFBQU1LLFNBQVMsRUFB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bkNsQjtBQW9DTCwrQkFBeUJBO0FBcENwQixLQUFQO0FBc0NEO0FBbkljLENBQWpCIiwiZmlsZSI6Im9yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBtaW5pbWF0Y2ggZnJvbSAnbWluaW1hdGNoJ1xuaW1wb3J0IGltcG9ydFR5cGUgZnJvbSAnLi4vY29yZS9pbXBvcnRUeXBlJ1xuaW1wb3J0IGlzU3RhdGljUmVxdWlyZSBmcm9tICcuLi9jb3JlL3N0YXRpY1JlcXVpcmUnXG5pbXBvcnQgZG9jc1VybCBmcm9tICcuLi9kb2NzVXJsJ1xuXG5jb25zdCBkZWZhdWx0R3JvdXBzID0gWydidWlsdGluJywgJ2V4dGVybmFsJywgJ3BhcmVudCcsICdzaWJsaW5nJywgJ2luZGV4J11cblxuLy8gUkVQT1JUSU5HIEFORCBGSVhJTkdcblxuZnVuY3Rpb24gcmV2ZXJzZShhcnJheSkge1xuICByZXR1cm4gYXJyYXkubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHYubmFtZSxcbiAgICAgIHJhbms6IC12LnJhbmssXG4gICAgICBub2RlOiB2Lm5vZGUsXG4gICAgfVxuICB9KS5yZXZlcnNlKClcbn1cblxuZnVuY3Rpb24gZ2V0VG9rZW5zT3JDb21tZW50c0FmdGVyKHNvdXJjZUNvZGUsIG5vZGUsIGNvdW50KSB7XG4gIGxldCBjdXJyZW50Tm9kZU9yVG9rZW4gPSBub2RlXG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgIGN1cnJlbnROb2RlT3JUb2tlbiA9IHNvdXJjZUNvZGUuZ2V0VG9rZW5PckNvbW1lbnRBZnRlcihjdXJyZW50Tm9kZU9yVG9rZW4pXG4gICAgaWYgKGN1cnJlbnROb2RlT3JUb2tlbiA9PSBudWxsKSB7XG4gICAgICBicmVha1xuICAgIH1cbiAgICByZXN1bHQucHVzaChjdXJyZW50Tm9kZU9yVG9rZW4pXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBnZXRUb2tlbnNPckNvbW1lbnRzQmVmb3JlKHNvdXJjZUNvZGUsIG5vZGUsIGNvdW50KSB7XG4gIGxldCBjdXJyZW50Tm9kZU9yVG9rZW4gPSBub2RlXG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgIGN1cnJlbnROb2RlT3JUb2tlbiA9IHNvdXJjZUNvZGUuZ2V0VG9rZW5PckNvbW1lbnRCZWZvcmUoY3VycmVudE5vZGVPclRva2VuKVxuICAgIGlmIChjdXJyZW50Tm9kZU9yVG9rZW4gPT0gbnVsbCkge1xuICAgICAgYnJlYWtcbiAgICB9XG4gICAgcmVzdWx0LnB1c2goY3VycmVudE5vZGVPclRva2VuKVxuICB9XG4gIHJldHVybiByZXN1bHQucmV2ZXJzZSgpXG59XG5cbmZ1bmN0aW9uIHRha2VUb2tlbnNBZnRlcldoaWxlKHNvdXJjZUNvZGUsIG5vZGUsIGNvbmRpdGlvbikge1xuICBjb25zdCB0b2tlbnMgPSBnZXRUb2tlbnNPckNvbW1lbnRzQWZ0ZXIoc291cmNlQ29kZSwgbm9kZSwgMTAwKVxuICBjb25zdCByZXN1bHQgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChjb25kaXRpb24odG9rZW5zW2ldKSkge1xuICAgICAgcmVzdWx0LnB1c2godG9rZW5zW2ldKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuZnVuY3Rpb24gdGFrZVRva2Vuc0JlZm9yZVdoaWxlKHNvdXJjZUNvZGUsIG5vZGUsIGNvbmRpdGlvbikge1xuICBjb25zdCB0b2tlbnMgPSBnZXRUb2tlbnNPckNvbW1lbnRzQmVmb3JlKHNvdXJjZUNvZGUsIG5vZGUsIDEwMClcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgZm9yIChsZXQgaSA9IHRva2Vucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChjb25kaXRpb24odG9rZW5zW2ldKSkge1xuICAgICAgcmVzdWx0LnB1c2godG9rZW5zW2ldKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQucmV2ZXJzZSgpXG59XG5cbmZ1bmN0aW9uIGZpbmRPdXRPZk9yZGVyKGltcG9ydGVkKSB7XG4gIGlmIChpbXBvcnRlZC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBsZXQgbWF4U2VlblJhbmtOb2RlID0gaW1wb3J0ZWRbMF1cbiAgcmV0dXJuIGltcG9ydGVkLmZpbHRlcihmdW5jdGlvbiAoaW1wb3J0ZWRNb2R1bGUpIHtcbiAgICBjb25zdCByZXMgPSBpbXBvcnRlZE1vZHVsZS5yYW5rIDwgbWF4U2VlblJhbmtOb2RlLnJhbmtcbiAgICBpZiAobWF4U2VlblJhbmtOb2RlLnJhbmsgPCBpbXBvcnRlZE1vZHVsZS5yYW5rKSB7XG4gICAgICBtYXhTZWVuUmFua05vZGUgPSBpbXBvcnRlZE1vZHVsZVxuICAgIH1cbiAgICByZXR1cm4gcmVzXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGZpbmRSb290Tm9kZShub2RlKSB7XG4gIGxldCBwYXJlbnQgPSBub2RlXG4gIHdoaWxlIChwYXJlbnQucGFyZW50ICE9IG51bGwgJiYgcGFyZW50LnBhcmVudC5ib2R5ID09IG51bGwpIHtcbiAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50XG4gIH1cbiAgcmV0dXJuIHBhcmVudFxufVxuXG5mdW5jdGlvbiBmaW5kRW5kT2ZMaW5lV2l0aENvbW1lbnRzKHNvdXJjZUNvZGUsIG5vZGUpIHtcbiAgY29uc3QgdG9rZW5zVG9FbmRPZkxpbmUgPSB0YWtlVG9rZW5zQWZ0ZXJXaGlsZShzb3VyY2VDb2RlLCBub2RlLCBjb21tZW50T25TYW1lTGluZUFzKG5vZGUpKVxuICBsZXQgZW5kT2ZUb2tlbnMgPSB0b2tlbnNUb0VuZE9mTGluZS5sZW5ndGggPiAwXG4gICAgPyB0b2tlbnNUb0VuZE9mTGluZVt0b2tlbnNUb0VuZE9mTGluZS5sZW5ndGggLSAxXS5yYW5nZVsxXVxuICAgIDogbm9kZS5yYW5nZVsxXVxuICBsZXQgcmVzdWx0ID0gZW5kT2ZUb2tlbnNcbiAgZm9yIChsZXQgaSA9IGVuZE9mVG9rZW5zOyBpIDwgc291cmNlQ29kZS50ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHNvdXJjZUNvZGUudGV4dFtpXSA9PT0gJ1xcbicpIHtcbiAgICAgIHJlc3VsdCA9IGkgKyAxXG4gICAgICBicmVha1xuICAgIH1cbiAgICBpZiAoc291cmNlQ29kZS50ZXh0W2ldICE9PSAnICcgJiYgc291cmNlQ29kZS50ZXh0W2ldICE9PSAnXFx0JyAmJiBzb3VyY2VDb2RlLnRleHRbaV0gIT09ICdcXHInKSB7XG4gICAgICBicmVha1xuICAgIH1cbiAgICByZXN1bHQgPSBpICsgMVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuZnVuY3Rpb24gY29tbWVudE9uU2FtZUxpbmVBcyhub2RlKSB7XG4gIHJldHVybiB0b2tlbiA9PiAodG9rZW4udHlwZSA9PT0gJ0Jsb2NrJyB8fCAgdG9rZW4udHlwZSA9PT0gJ0xpbmUnKSAmJlxuICAgICAgdG9rZW4ubG9jLnN0YXJ0LmxpbmUgPT09IHRva2VuLmxvYy5lbmQubGluZSAmJlxuICAgICAgdG9rZW4ubG9jLmVuZC5saW5lID09PSBub2RlLmxvYy5lbmQubGluZVxufVxuXG5mdW5jdGlvbiBmaW5kU3RhcnRPZkxpbmVXaXRoQ29tbWVudHMoc291cmNlQ29kZSwgbm9kZSkge1xuICBjb25zdCB0b2tlbnNUb0VuZE9mTGluZSA9IHRha2VUb2tlbnNCZWZvcmVXaGlsZShzb3VyY2VDb2RlLCBub2RlLCBjb21tZW50T25TYW1lTGluZUFzKG5vZGUpKVxuICBsZXQgc3RhcnRPZlRva2VucyA9IHRva2Vuc1RvRW5kT2ZMaW5lLmxlbmd0aCA+IDAgPyB0b2tlbnNUb0VuZE9mTGluZVswXS5yYW5nZVswXSA6IG5vZGUucmFuZ2VbMF1cbiAgbGV0IHJlc3VsdCA9IHN0YXJ0T2ZUb2tlbnNcbiAgZm9yIChsZXQgaSA9IHN0YXJ0T2ZUb2tlbnMgLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgaWYgKHNvdXJjZUNvZGUudGV4dFtpXSAhPT0gJyAnICYmIHNvdXJjZUNvZGUudGV4dFtpXSAhPT0gJ1xcdCcpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIHJlc3VsdCA9IGlcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIGlzUGxhaW5SZXF1aXJlTW9kdWxlKG5vZGUpIHtcbiAgaWYgKG5vZGUudHlwZSAhPT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgaWYgKG5vZGUuZGVjbGFyYXRpb25zLmxlbmd0aCAhPT0gMSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGNvbnN0IGRlY2wgPSBub2RlLmRlY2xhcmF0aW9uc1swXVxuICBjb25zdCByZXN1bHQgPSBkZWNsLmlkICYmXG4gICAgKGRlY2wuaWQudHlwZSA9PT0gJ0lkZW50aWZpZXInIHx8IGRlY2wuaWQudHlwZSA9PT0gJ09iamVjdFBhdHRlcm4nKSAmJlxuICAgIGRlY2wuaW5pdCAhPSBudWxsICYmXG4gICAgZGVjbC5pbml0LnR5cGUgPT09ICdDYWxsRXhwcmVzc2lvbicgJiZcbiAgICBkZWNsLmluaXQuY2FsbGVlICE9IG51bGwgJiZcbiAgICBkZWNsLmluaXQuY2FsbGVlLm5hbWUgPT09ICdyZXF1aXJlJyAmJlxuICAgIGRlY2wuaW5pdC5hcmd1bWVudHMgIT0gbnVsbCAmJlxuICAgIGRlY2wuaW5pdC5hcmd1bWVudHMubGVuZ3RoID09PSAxICYmXG4gICAgZGVjbC5pbml0LmFyZ3VtZW50c1swXS50eXBlID09PSAnTGl0ZXJhbCdcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBpc1BsYWluSW1wb3J0TW9kdWxlKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUudHlwZSA9PT0gJ0ltcG9ydERlY2xhcmF0aW9uJyAmJiBub2RlLnNwZWNpZmllcnMgIT0gbnVsbCAmJiBub2RlLnNwZWNpZmllcnMubGVuZ3RoID4gMFxufVxuXG5mdW5jdGlvbiBjYW5Dcm9zc05vZGVXaGlsZVJlb3JkZXIobm9kZSkge1xuICByZXR1cm4gaXNQbGFpblJlcXVpcmVNb2R1bGUobm9kZSkgfHwgaXNQbGFpbkltcG9ydE1vZHVsZShub2RlKVxufVxuXG5mdW5jdGlvbiBjYW5SZW9yZGVySXRlbXMoZmlyc3ROb2RlLCBzZWNvbmROb2RlKSB7XG4gIGNvbnN0IHBhcmVudCA9IGZpcnN0Tm9kZS5wYXJlbnRcbiAgY29uc3QgW2ZpcnN0SW5kZXgsIHNlY29uZEluZGV4XSA9IFtcbiAgICBwYXJlbnQuYm9keS5pbmRleE9mKGZpcnN0Tm9kZSksXG4gICAgcGFyZW50LmJvZHkuaW5kZXhPZihzZWNvbmROb2RlKSxcbiAgXS5zb3J0KClcbiAgY29uc3Qgbm9kZXNCZXR3ZWVuID0gcGFyZW50LmJvZHkuc2xpY2UoZmlyc3RJbmRleCwgc2Vjb25kSW5kZXggKyAxKVxuICBmb3IgKHZhciBub2RlQmV0d2VlbiBvZiBub2Rlc0JldHdlZW4pIHtcbiAgICBpZiAoIWNhbkNyb3NzTm9kZVdoaWxlUmVvcmRlcihub2RlQmV0d2VlbikpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBmaXhPdXRPZk9yZGVyKGNvbnRleHQsIGZpcnN0Tm9kZSwgc2Vjb25kTm9kZSwgb3JkZXIpIHtcbiAgY29uc3Qgc291cmNlQ29kZSA9IGNvbnRleHQuZ2V0U291cmNlQ29kZSgpXG5cbiAgY29uc3QgZmlyc3RSb290ID0gZmluZFJvb3ROb2RlKGZpcnN0Tm9kZS5ub2RlKVxuICBjb25zdCBmaXJzdFJvb3RTdGFydCA9IGZpbmRTdGFydE9mTGluZVdpdGhDb21tZW50cyhzb3VyY2VDb2RlLCBmaXJzdFJvb3QpXG4gIGNvbnN0IGZpcnN0Um9vdEVuZCA9IGZpbmRFbmRPZkxpbmVXaXRoQ29tbWVudHMoc291cmNlQ29kZSwgZmlyc3RSb290KVxuXG4gIGNvbnN0IHNlY29uZFJvb3QgPSBmaW5kUm9vdE5vZGUoc2Vjb25kTm9kZS5ub2RlKVxuICBjb25zdCBzZWNvbmRSb290U3RhcnQgPSBmaW5kU3RhcnRPZkxpbmVXaXRoQ29tbWVudHMoc291cmNlQ29kZSwgc2Vjb25kUm9vdClcbiAgY29uc3Qgc2Vjb25kUm9vdEVuZCA9IGZpbmRFbmRPZkxpbmVXaXRoQ29tbWVudHMoc291cmNlQ29kZSwgc2Vjb25kUm9vdClcbiAgY29uc3QgY2FuRml4ID0gY2FuUmVvcmRlckl0ZW1zKGZpcnN0Um9vdCwgc2Vjb25kUm9vdClcblxuICBsZXQgbmV3Q29kZSA9IHNvdXJjZUNvZGUudGV4dC5zdWJzdHJpbmcoc2Vjb25kUm9vdFN0YXJ0LCBzZWNvbmRSb290RW5kKVxuICBpZiAobmV3Q29kZVtuZXdDb2RlLmxlbmd0aCAtIDFdICE9PSAnXFxuJykge1xuICAgIG5ld0NvZGUgPSBuZXdDb2RlICsgJ1xcbidcbiAgfVxuXG4gIGNvbnN0IG1lc3NhZ2UgPSAnYCcgKyBzZWNvbmROb2RlLm5hbWUgKyAnYCBpbXBvcnQgc2hvdWxkIG9jY3VyICcgKyBvcmRlciArXG4gICAgICAnIGltcG9ydCBvZiBgJyArIGZpcnN0Tm9kZS5uYW1lICsgJ2AnXG5cbiAgaWYgKG9yZGVyID09PSAnYmVmb3JlJykge1xuICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgIG5vZGU6IHNlY29uZE5vZGUubm9kZSxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBmaXg6IGNhbkZpeCAmJiAoZml4ZXIgPT5cbiAgICAgICAgZml4ZXIucmVwbGFjZVRleHRSYW5nZShcbiAgICAgICAgICBbZmlyc3RSb290U3RhcnQsIHNlY29uZFJvb3RFbmRdLFxuICAgICAgICAgIG5ld0NvZGUgKyBzb3VyY2VDb2RlLnRleHQuc3Vic3RyaW5nKGZpcnN0Um9vdFN0YXJ0LCBzZWNvbmRSb290U3RhcnQpXG4gICAgICAgICkpLFxuICAgIH0pXG4gIH0gZWxzZSBpZiAob3JkZXIgPT09ICdhZnRlcicpIHtcbiAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICBub2RlOiBzZWNvbmROb2RlLm5vZGUsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgZml4OiBjYW5GaXggJiYgKGZpeGVyID0+XG4gICAgICAgIGZpeGVyLnJlcGxhY2VUZXh0UmFuZ2UoXG4gICAgICAgICAgW3NlY29uZFJvb3RTdGFydCwgZmlyc3RSb290RW5kXSxcbiAgICAgICAgICBzb3VyY2VDb2RlLnRleHQuc3Vic3RyaW5nKHNlY29uZFJvb3RFbmQsIGZpcnN0Um9vdEVuZCkgKyBuZXdDb2RlXG4gICAgICAgICkpLFxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVwb3J0T3V0T2ZPcmRlcihjb250ZXh0LCBpbXBvcnRlZCwgb3V0T2ZPcmRlciwgb3JkZXIpIHtcbiAgb3V0T2ZPcmRlci5mb3JFYWNoKGZ1bmN0aW9uIChpbXApIHtcbiAgICBjb25zdCBmb3VuZCA9IGltcG9ydGVkLmZpbmQoZnVuY3Rpb24gaGFzSGlnaGVyUmFuayhpbXBvcnRlZEl0ZW0pIHtcbiAgICAgIHJldHVybiBpbXBvcnRlZEl0ZW0ucmFuayA+IGltcC5yYW5rXG4gICAgfSlcbiAgICBmaXhPdXRPZk9yZGVyKGNvbnRleHQsIGZvdW5kLCBpbXAsIG9yZGVyKVxuICB9KVxufVxuXG5mdW5jdGlvbiBtYWtlT3V0T2ZPcmRlclJlcG9ydChjb250ZXh0LCBpbXBvcnRlZCkge1xuICBjb25zdCBvdXRPZk9yZGVyID0gZmluZE91dE9mT3JkZXIoaW1wb3J0ZWQpXG4gIGlmICghb3V0T2ZPcmRlci5sZW5ndGgpIHtcbiAgICByZXR1cm5cbiAgfVxuICAvLyBUaGVyZSBhcmUgdGhpbmdzIHRvIHJlcG9ydC4gVHJ5IHRvIG1pbmltaXplIHRoZSBudW1iZXIgb2YgcmVwb3J0ZWQgZXJyb3JzLlxuICBjb25zdCByZXZlcnNlZEltcG9ydGVkID0gcmV2ZXJzZShpbXBvcnRlZClcbiAgY29uc3QgcmV2ZXJzZWRPcmRlciA9IGZpbmRPdXRPZk9yZGVyKHJldmVyc2VkSW1wb3J0ZWQpXG4gIGlmIChyZXZlcnNlZE9yZGVyLmxlbmd0aCA8IG91dE9mT3JkZXIubGVuZ3RoKSB7XG4gICAgcmVwb3J0T3V0T2ZPcmRlcihjb250ZXh0LCByZXZlcnNlZEltcG9ydGVkLCByZXZlcnNlZE9yZGVyLCAnYWZ0ZXInKVxuICAgIHJldHVyblxuICB9XG4gIHJlcG9ydE91dE9mT3JkZXIoY29udGV4dCwgaW1wb3J0ZWQsIG91dE9mT3JkZXIsICdiZWZvcmUnKVxufVxuXG5mdW5jdGlvbiBpbXBvcnRzU29ydGVyQXNjKGltcG9ydEEsIGltcG9ydEIpIHtcbiAgaWYgKGltcG9ydEEgPCBpbXBvcnRCKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICBpZiAoaW1wb3J0QSA+IGltcG9ydEIpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgcmV0dXJuIDBcbn1cblxuZnVuY3Rpb24gaW1wb3J0c1NvcnRlckRlc2MoaW1wb3J0QSwgaW1wb3J0Qikge1xuICBpZiAoaW1wb3J0QSA8IGltcG9ydEIpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgaWYgKGltcG9ydEEgPiBpbXBvcnRCKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICByZXR1cm4gMFxufVxuXG5mdW5jdGlvbiBtdXRhdGVSYW5rc1RvQWxwaGFiZXRpemUoaW1wb3J0ZWQsIG9yZGVyKSB7XG4gIGNvbnN0IGdyb3VwZWRCeVJhbmtzID0gaW1wb3J0ZWQucmVkdWNlKGZ1bmN0aW9uKGFjYywgaW1wb3J0ZWRJdGVtKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjY1tpbXBvcnRlZEl0ZW0ucmFua10pKSB7IFxuICAgICAgYWNjW2ltcG9ydGVkSXRlbS5yYW5rXSA9IFtdXG4gICAgfVxuICAgIGFjY1tpbXBvcnRlZEl0ZW0ucmFua10ucHVzaChpbXBvcnRlZEl0ZW0ubmFtZSlcbiAgICByZXR1cm4gYWNjXG4gIH0sIHt9KVxuXG4gIGNvbnN0IGdyb3VwUmFua3MgPSBPYmplY3Qua2V5cyhncm91cGVkQnlSYW5rcylcblxuICBjb25zdCBzb3J0ZXJGbiA9IG9yZGVyID09PSAnYXNjJyA/IGltcG9ydHNTb3J0ZXJBc2MgOiBpbXBvcnRzU29ydGVyRGVzY1xuICAvLyBzb3J0IGltcG9ydHMgbG9jYWxseSB3aXRoaW4gdGhlaXIgZ3JvdXBcbiAgZ3JvdXBSYW5rcy5mb3JFYWNoKGZ1bmN0aW9uKGdyb3VwUmFuaykge1xuICAgIGdyb3VwZWRCeVJhbmtzW2dyb3VwUmFua10uc29ydChzb3J0ZXJGbilcbiAgfSlcblxuICAvLyBhc3NpZ24gZ2xvYmFsbHkgdW5pcXVlIHJhbmsgdG8gZWFjaCBpbXBvcnRcbiAgbGV0IG5ld1JhbmsgPSAwXG4gIGNvbnN0IGFscGhhYmV0aXplZFJhbmtzID0gZ3JvdXBSYW5rcy5zb3J0KCkucmVkdWNlKGZ1bmN0aW9uKGFjYywgZ3JvdXBSYW5rKSB7XG4gICAgZ3JvdXBlZEJ5UmFua3NbZ3JvdXBSYW5rXS5mb3JFYWNoKGZ1bmN0aW9uKGltcG9ydGVkSXRlbU5hbWUpIHtcbiAgICAgIGFjY1tpbXBvcnRlZEl0ZW1OYW1lXSA9IG5ld1JhbmtcbiAgICAgIG5ld1JhbmsgKz0gMVxuICAgIH0pXG4gICAgcmV0dXJuIGFjY1xuICB9LCB7fSlcblxuICAvLyBtdXRhdGUgdGhlIG9yaWdpbmFsIGdyb3VwLXJhbmsgd2l0aCBhbHBoYWJldGl6ZWQtcmFua1xuICBpbXBvcnRlZC5mb3JFYWNoKGZ1bmN0aW9uKGltcG9ydGVkSXRlbSkge1xuICAgIGltcG9ydGVkSXRlbS5yYW5rID0gYWxwaGFiZXRpemVkUmFua3NbaW1wb3J0ZWRJdGVtLm5hbWVdXG4gIH0pXG59XG5cbi8vIERFVEVDVElOR1xuXG5mdW5jdGlvbiBjb21wdXRlUGF0aFJhbmsocmFua3MsIHBhdGhHcm91cHMsIHBhdGgsIG1heFBvc2l0aW9uKSB7XG4gIGZvciAobGV0IGkgPSAwLCBsID0gcGF0aEdyb3Vwcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCB7IHBhdHRlcm4sIHBhdHRlcm5PcHRpb25zLCBncm91cCwgcG9zaXRpb24gPSAxIH0gPSBwYXRoR3JvdXBzW2ldXG4gICAgaWYgKG1pbmltYXRjaChwYXRoLCBwYXR0ZXJuLCBwYXR0ZXJuT3B0aW9ucyB8fCB7IG5vY29tbWVudDogdHJ1ZSB9KSkge1xuICAgICAgcmV0dXJuIHJhbmtzW2dyb3VwXSArIChwb3NpdGlvbiAvIG1heFBvc2l0aW9uKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjb21wdXRlUmFuayhjb250ZXh0LCByYW5rcywgbmFtZSwgdHlwZSkge1xuICBjb25zdCBpbXBUeXBlID0gaW1wb3J0VHlwZShuYW1lLCBjb250ZXh0KVxuICBsZXQgcmFua1xuICBpZiAoaW1wVHlwZSAhPT0gJ2J1aWx0aW4nICYmIGltcFR5cGUgIT09ICdleHRlcm5hbCcpIHtcbiAgICByYW5rID0gY29tcHV0ZVBhdGhSYW5rKHJhbmtzLmdyb3VwcywgcmFua3MucGF0aEdyb3VwcywgbmFtZSwgcmFua3MubWF4UG9zaXRpb24pXG4gIH1cbiAgaWYgKCFyYW5rKSB7XG4gICAgcmFuayA9IHJhbmtzLmdyb3Vwc1tpbXBUeXBlXVxuICB9XG4gIGlmICh0eXBlICE9PSAnaW1wb3J0Jykge1xuICAgIHJhbmsgKz0gMTAwXG4gIH1cblxuICByZXR1cm4gcmFua1xufVxuXG5mdW5jdGlvbiByZWdpc3Rlck5vZGUoY29udGV4dCwgbm9kZSwgbmFtZSwgdHlwZSwgcmFua3MsIGltcG9ydGVkKSB7XG4gIGNvbnN0IHJhbmsgPSBjb21wdXRlUmFuayhjb250ZXh0LCByYW5rcywgbmFtZSwgdHlwZSlcbiAgaWYgKHJhbmsgIT09IC0xKSB7XG4gICAgaW1wb3J0ZWQucHVzaCh7bmFtZSwgcmFuaywgbm9kZX0pXG4gIH1cbn1cblxuZnVuY3Rpb24gaXNJblZhcmlhYmxlRGVjbGFyYXRvcihub2RlKSB7XG4gIHJldHVybiBub2RlICYmXG4gICAgKG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRvcicgfHwgaXNJblZhcmlhYmxlRGVjbGFyYXRvcihub2RlLnBhcmVudCkpXG59XG5cbmNvbnN0IHR5cGVzID0gWydidWlsdGluJywgJ2V4dGVybmFsJywgJ2ludGVybmFsJywgJ3Vua25vd24nLCAncGFyZW50JywgJ3NpYmxpbmcnLCAnaW5kZXgnXVxuXG4vLyBDcmVhdGVzIGFuIG9iamVjdCB3aXRoIHR5cGUtcmFuayBwYWlycy5cbi8vIEV4YW1wbGU6IHsgaW5kZXg6IDAsIHNpYmxpbmc6IDEsIHBhcmVudDogMSwgZXh0ZXJuYWw6IDEsIGJ1aWx0aW46IDIsIGludGVybmFsOiAyIH1cbi8vIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgaXQgY29udGFpbnMgYSB0eXBlIHRoYXQgZG9lcyBub3QgZXhpc3QsIG9yIGhhcyBhIGR1cGxpY2F0ZVxuZnVuY3Rpb24gY29udmVydEdyb3Vwc1RvUmFua3MoZ3JvdXBzKSB7XG4gIGNvbnN0IHJhbmtPYmplY3QgPSBncm91cHMucmVkdWNlKGZ1bmN0aW9uKHJlcywgZ3JvdXAsIGluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiBncm91cCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGdyb3VwID0gW2dyb3VwXVxuICAgIH1cbiAgICBncm91cC5mb3JFYWNoKGZ1bmN0aW9uKGdyb3VwSXRlbSkge1xuICAgICAgaWYgKHR5cGVzLmluZGV4T2YoZ3JvdXBJdGVtKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgY29uZmlndXJhdGlvbiBvZiB0aGUgcnVsZTogVW5rbm93biB0eXBlIGAnICtcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShncm91cEl0ZW0pICsgJ2AnKVxuICAgICAgfVxuICAgICAgaWYgKHJlc1tncm91cEl0ZW1dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgY29uZmlndXJhdGlvbiBvZiB0aGUgcnVsZTogYCcgKyBncm91cEl0ZW0gKyAnYCBpcyBkdXBsaWNhdGVkJylcbiAgICAgIH1cbiAgICAgIHJlc1tncm91cEl0ZW1dID0gaW5kZXhcbiAgICB9KVxuICAgIHJldHVybiByZXNcbiAgfSwge30pXG5cbiAgY29uc3Qgb21pdHRlZFR5cGVzID0gdHlwZXMuZmlsdGVyKGZ1bmN0aW9uKHR5cGUpIHtcbiAgICByZXR1cm4gcmFua09iamVjdFt0eXBlXSA9PT0gdW5kZWZpbmVkXG4gIH0pXG5cbiAgcmV0dXJuIG9taXR0ZWRUeXBlcy5yZWR1Y2UoZnVuY3Rpb24ocmVzLCB0eXBlKSB7XG4gICAgcmVzW3R5cGVdID0gZ3JvdXBzLmxlbmd0aFxuICAgIHJldHVybiByZXNcbiAgfSwgcmFua09iamVjdClcbn1cblxuZnVuY3Rpb24gY29udmVydFBhdGhHcm91cHNGb3JSYW5rcyhwYXRoR3JvdXBzKSB7XG4gIGNvbnN0IGFmdGVyID0ge31cbiAgY29uc3QgYmVmb3JlID0ge31cblxuICBjb25zdCB0cmFuc2Zvcm1lZCA9IHBhdGhHcm91cHMubWFwKChwYXRoR3JvdXAsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgeyBncm91cCwgcG9zaXRpb246IHBvc2l0aW9uU3RyaW5nIH0gPSBwYXRoR3JvdXBcbiAgICBsZXQgcG9zaXRpb24gPSAwXG4gICAgaWYgKHBvc2l0aW9uU3RyaW5nID09PSAnYWZ0ZXInKSB7XG4gICAgICBpZiAoIWFmdGVyW2dyb3VwXSkge1xuICAgICAgICBhZnRlcltncm91cF0gPSAxXG4gICAgICB9XG4gICAgICBwb3NpdGlvbiA9IGFmdGVyW2dyb3VwXSsrXG4gICAgfSBlbHNlIGlmIChwb3NpdGlvblN0cmluZyA9PT0gJ2JlZm9yZScpIHtcbiAgICAgIGlmICghYmVmb3JlW2dyb3VwXSkge1xuICAgICAgICBiZWZvcmVbZ3JvdXBdID0gW11cbiAgICAgIH1cbiAgICAgIGJlZm9yZVtncm91cF0ucHVzaChpbmRleClcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcGF0aEdyb3VwLCB7IHBvc2l0aW9uIH0pXG4gIH0pXG5cbiAgbGV0IG1heFBvc2l0aW9uID0gMVxuXG4gIE9iamVjdC5rZXlzKGJlZm9yZSkuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICBjb25zdCBncm91cExlbmd0aCA9IGJlZm9yZVtncm91cF0ubGVuZ3RoXG4gICAgYmVmb3JlW2dyb3VwXS5mb3JFYWNoKChncm91cEluZGV4LCBpbmRleCkgPT4ge1xuICAgICAgdHJhbnNmb3JtZWRbZ3JvdXBJbmRleF0ucG9zaXRpb24gPSAtMSAqIChncm91cExlbmd0aCAtIGluZGV4KVxuICAgIH0pXG4gICAgbWF4UG9zaXRpb24gPSBNYXRoLm1heChtYXhQb3NpdGlvbiwgZ3JvdXBMZW5ndGgpXG4gIH0pXG5cbiAgT2JqZWN0LmtleXMoYWZ0ZXIpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IGdyb3VwTmV4dFBvc2l0aW9uID0gYWZ0ZXJba2V5XVxuICAgIG1heFBvc2l0aW9uID0gTWF0aC5tYXgobWF4UG9zaXRpb24sIGdyb3VwTmV4dFBvc2l0aW9uIC0gMSlcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIHBhdGhHcm91cHM6IHRyYW5zZm9ybWVkLFxuICAgIG1heFBvc2l0aW9uOiBtYXhQb3NpdGlvbiA+IDEwID8gTWF0aC5wb3coMTAsIE1hdGguY2VpbChNYXRoLmxvZzEwKG1heFBvc2l0aW9uKSkpIDogMTAsXG4gIH1cbn1cblxuZnVuY3Rpb24gZml4TmV3TGluZUFmdGVySW1wb3J0KGNvbnRleHQsIHByZXZpb3VzSW1wb3J0KSB7XG4gIGNvbnN0IHByZXZSb290ID0gZmluZFJvb3ROb2RlKHByZXZpb3VzSW1wb3J0Lm5vZGUpXG4gIGNvbnN0IHRva2Vuc1RvRW5kT2ZMaW5lID0gdGFrZVRva2Vuc0FmdGVyV2hpbGUoXG4gICAgY29udGV4dC5nZXRTb3VyY2VDb2RlKCksIHByZXZSb290LCBjb21tZW50T25TYW1lTGluZUFzKHByZXZSb290KSlcblxuICBsZXQgZW5kT2ZMaW5lID0gcHJldlJvb3QucmFuZ2VbMV1cbiAgaWYgKHRva2Vuc1RvRW5kT2ZMaW5lLmxlbmd0aCA+IDApIHtcbiAgICBlbmRPZkxpbmUgPSB0b2tlbnNUb0VuZE9mTGluZVt0b2tlbnNUb0VuZE9mTGluZS5sZW5ndGggLSAxXS5yYW5nZVsxXVxuICB9XG4gIHJldHVybiAoZml4ZXIpID0+IGZpeGVyLmluc2VydFRleHRBZnRlclJhbmdlKFtwcmV2Um9vdC5yYW5nZVswXSwgZW5kT2ZMaW5lXSwgJ1xcbicpXG59XG5cbmZ1bmN0aW9uIHJlbW92ZU5ld0xpbmVBZnRlckltcG9ydChjb250ZXh0LCBjdXJyZW50SW1wb3J0LCBwcmV2aW91c0ltcG9ydCkge1xuICBjb25zdCBzb3VyY2VDb2RlID0gY29udGV4dC5nZXRTb3VyY2VDb2RlKClcbiAgY29uc3QgcHJldlJvb3QgPSBmaW5kUm9vdE5vZGUocHJldmlvdXNJbXBvcnQubm9kZSlcbiAgY29uc3QgY3VyclJvb3QgPSBmaW5kUm9vdE5vZGUoY3VycmVudEltcG9ydC5ub2RlKVxuICBjb25zdCByYW5nZVRvUmVtb3ZlID0gW1xuICAgIGZpbmRFbmRPZkxpbmVXaXRoQ29tbWVudHMoc291cmNlQ29kZSwgcHJldlJvb3QpLFxuICAgIGZpbmRTdGFydE9mTGluZVdpdGhDb21tZW50cyhzb3VyY2VDb2RlLCBjdXJyUm9vdCksXG4gIF1cbiAgaWYgKC9eXFxzKiQvLnRlc3Qoc291cmNlQ29kZS50ZXh0LnN1YnN0cmluZyhyYW5nZVRvUmVtb3ZlWzBdLCByYW5nZVRvUmVtb3ZlWzFdKSkpIHtcbiAgICByZXR1cm4gKGZpeGVyKSA9PiBmaXhlci5yZW1vdmVSYW5nZShyYW5nZVRvUmVtb3ZlKVxuICB9XG4gIHJldHVybiB1bmRlZmluZWRcbn1cblxuZnVuY3Rpb24gbWFrZU5ld2xpbmVzQmV0d2VlblJlcG9ydCAoY29udGV4dCwgaW1wb3J0ZWQsIG5ld2xpbmVzQmV0d2VlbkltcG9ydHMpIHtcbiAgY29uc3QgZ2V0TnVtYmVyT2ZFbXB0eUxpbmVzQmV0d2VlbiA9IChjdXJyZW50SW1wb3J0LCBwcmV2aW91c0ltcG9ydCkgPT4ge1xuICAgIGNvbnN0IGxpbmVzQmV0d2VlbkltcG9ydHMgPSBjb250ZXh0LmdldFNvdXJjZUNvZGUoKS5saW5lcy5zbGljZShcbiAgICAgIHByZXZpb3VzSW1wb3J0Lm5vZGUubG9jLmVuZC5saW5lLFxuICAgICAgY3VycmVudEltcG9ydC5ub2RlLmxvYy5zdGFydC5saW5lIC0gMVxuICAgIClcblxuICAgIHJldHVybiBsaW5lc0JldHdlZW5JbXBvcnRzLmZpbHRlcigobGluZSkgPT4gIWxpbmUudHJpbSgpLmxlbmd0aCkubGVuZ3RoXG4gIH1cbiAgbGV0IHByZXZpb3VzSW1wb3J0ID0gaW1wb3J0ZWRbMF1cblxuICBpbXBvcnRlZC5zbGljZSgxKS5mb3JFYWNoKGZ1bmN0aW9uKGN1cnJlbnRJbXBvcnQpIHtcbiAgICBjb25zdCBlbXB0eUxpbmVzQmV0d2VlbiA9IGdldE51bWJlck9mRW1wdHlMaW5lc0JldHdlZW4oY3VycmVudEltcG9ydCwgcHJldmlvdXNJbXBvcnQpXG5cbiAgICBpZiAobmV3bGluZXNCZXR3ZWVuSW1wb3J0cyA9PT0gJ2Fsd2F5cydcbiAgICAgICAgfHwgbmV3bGluZXNCZXR3ZWVuSW1wb3J0cyA9PT0gJ2Fsd2F5cy1hbmQtaW5zaWRlLWdyb3VwcycpIHtcbiAgICAgIGlmIChjdXJyZW50SW1wb3J0LnJhbmsgIT09IHByZXZpb3VzSW1wb3J0LnJhbmsgJiYgZW1wdHlMaW5lc0JldHdlZW4gPT09IDApIHtcbiAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgIG5vZGU6IHByZXZpb3VzSW1wb3J0Lm5vZGUsXG4gICAgICAgICAgbWVzc2FnZTogJ1RoZXJlIHNob3VsZCBiZSBhdCBsZWFzdCBvbmUgZW1wdHkgbGluZSBiZXR3ZWVuIGltcG9ydCBncm91cHMnLFxuICAgICAgICAgIGZpeDogZml4TmV3TGluZUFmdGVySW1wb3J0KGNvbnRleHQsIHByZXZpb3VzSW1wb3J0KSxcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEltcG9ydC5yYW5rID09PSBwcmV2aW91c0ltcG9ydC5yYW5rXG4gICAgICAgICYmIGVtcHR5TGluZXNCZXR3ZWVuID4gMFxuICAgICAgICAmJiBuZXdsaW5lc0JldHdlZW5JbXBvcnRzICE9PSAnYWx3YXlzLWFuZC1pbnNpZGUtZ3JvdXBzJykge1xuICAgICAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICAgICAgbm9kZTogcHJldmlvdXNJbXBvcnQubm9kZSxcbiAgICAgICAgICBtZXNzYWdlOiAnVGhlcmUgc2hvdWxkIGJlIG5vIGVtcHR5IGxpbmUgd2l0aGluIGltcG9ydCBncm91cCcsXG4gICAgICAgICAgZml4OiByZW1vdmVOZXdMaW5lQWZ0ZXJJbXBvcnQoY29udGV4dCwgY3VycmVudEltcG9ydCwgcHJldmlvdXNJbXBvcnQpLFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZW1wdHlMaW5lc0JldHdlZW4gPiAwKSB7XG4gICAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICAgIG5vZGU6IHByZXZpb3VzSW1wb3J0Lm5vZGUsXG4gICAgICAgIG1lc3NhZ2U6ICdUaGVyZSBzaG91bGQgYmUgbm8gZW1wdHkgbGluZSBiZXR3ZWVuIGltcG9ydCBncm91cHMnLFxuICAgICAgICBmaXg6IHJlbW92ZU5ld0xpbmVBZnRlckltcG9ydChjb250ZXh0LCBjdXJyZW50SW1wb3J0LCBwcmV2aW91c0ltcG9ydCksXG4gICAgICB9KVxuICAgIH1cblxuICAgIHByZXZpb3VzSW1wb3J0ID0gY3VycmVudEltcG9ydFxuICB9KVxufVxuXG5mdW5jdGlvbiBnZXRBbHBoYWJldGl6ZUNvbmZpZyhvcHRpb25zKSB7XG4gIGNvbnN0IGFscGhhYmV0aXplID0gb3B0aW9ucy5hbHBoYWJldGl6ZSB8fCB7fVxuICBjb25zdCBvcmRlciA9IGFscGhhYmV0aXplLm9yZGVyIHx8ICdpZ25vcmUnXG5cbiAgcmV0dXJuIHtvcmRlcn1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGE6IHtcbiAgICB0eXBlOiAnc3VnZ2VzdGlvbicsXG4gICAgZG9jczoge1xuICAgICAgdXJsOiBkb2NzVXJsKCdvcmRlcicpLFxuICAgIH0sXG5cbiAgICBmaXhhYmxlOiAnY29kZScsXG4gICAgc2NoZW1hOiBbXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgZ3JvdXBzOiB7XG4gICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcGF0aEdyb3Vwczoge1xuICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICAgIGl0ZW1zOiB7XG4gICAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgcGF0dGVybjoge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBncm91cDoge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICBlbnVtOiB0eXBlcyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgIGVudW06IFsnYWZ0ZXInLCAnYmVmb3JlJ10sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgcmVxdWlyZWQ6IFsncGF0dGVybicsICdncm91cCddLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgICduZXdsaW5lcy1iZXR3ZWVuJzoge1xuICAgICAgICAgICAgZW51bTogW1xuICAgICAgICAgICAgICAnaWdub3JlJyxcbiAgICAgICAgICAgICAgJ2Fsd2F5cycsXG4gICAgICAgICAgICAgICdhbHdheXMtYW5kLWluc2lkZS1ncm91cHMnLFxuICAgICAgICAgICAgICAnbmV2ZXInLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFscGhhYmV0aXplOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgb3JkZXI6IHtcbiAgICAgICAgICAgICAgICBlbnVtOiBbJ2lnbm9yZScsICdhc2MnLCAnZGVzYyddLFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICdpZ25vcmUnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiBpbXBvcnRPcmRlclJ1bGUgKGNvbnRleHQpIHtcbiAgICBjb25zdCBvcHRpb25zID0gY29udGV4dC5vcHRpb25zWzBdIHx8IHt9XG4gICAgY29uc3QgbmV3bGluZXNCZXR3ZWVuSW1wb3J0cyA9IG9wdGlvbnNbJ25ld2xpbmVzLWJldHdlZW4nXSB8fCAnaWdub3JlJ1xuICAgIGNvbnN0IGFscGhhYmV0aXplID0gZ2V0QWxwaGFiZXRpemVDb25maWcob3B0aW9ucylcbiAgICBsZXQgcmFua3NcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHBhdGhHcm91cHMsIG1heFBvc2l0aW9uIH0gPSBjb252ZXJ0UGF0aEdyb3Vwc0ZvclJhbmtzKG9wdGlvbnMucGF0aEdyb3VwcyB8fCBbXSlcbiAgICAgIHJhbmtzID0ge1xuICAgICAgICBncm91cHM6IGNvbnZlcnRHcm91cHNUb1JhbmtzKG9wdGlvbnMuZ3JvdXBzIHx8IGRlZmF1bHRHcm91cHMpLFxuICAgICAgICBwYXRoR3JvdXBzLFxuICAgICAgICBtYXhQb3NpdGlvbixcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gTWFsZm9ybWVkIGNvbmZpZ3VyYXRpb25cbiAgICAgIHJldHVybiB7XG4gICAgICAgIFByb2dyYW06IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICBjb250ZXh0LnJlcG9ydChub2RlLCBlcnJvci5tZXNzYWdlKVxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgICBsZXQgaW1wb3J0ZWQgPSBbXVxuICAgIGxldCBsZXZlbCA9IDBcblxuICAgIGZ1bmN0aW9uIGluY3JlbWVudExldmVsKCkge1xuICAgICAgbGV2ZWwrK1xuICAgIH1cbiAgICBmdW5jdGlvbiBkZWNyZW1lbnRMZXZlbCgpIHtcbiAgICAgIGxldmVsLS1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgSW1wb3J0RGVjbGFyYXRpb246IGZ1bmN0aW9uIGhhbmRsZUltcG9ydHMobm9kZSkge1xuICAgICAgICBpZiAobm9kZS5zcGVjaWZpZXJzLmxlbmd0aCkgeyAvLyBJZ25vcmluZyB1bmFzc2lnbmVkIGltcG9ydHNcbiAgICAgICAgICBjb25zdCBuYW1lID0gbm9kZS5zb3VyY2UudmFsdWVcbiAgICAgICAgICByZWdpc3Rlck5vZGUoY29udGV4dCwgbm9kZSwgbmFtZSwgJ2ltcG9ydCcsIHJhbmtzLCBpbXBvcnRlZClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIENhbGxFeHByZXNzaW9uOiBmdW5jdGlvbiBoYW5kbGVSZXF1aXJlcyhub2RlKSB7XG4gICAgICAgIGlmIChsZXZlbCAhPT0gMCB8fCAhaXNTdGF0aWNSZXF1aXJlKG5vZGUpIHx8ICFpc0luVmFyaWFibGVEZWNsYXJhdG9yKG5vZGUucGFyZW50KSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5hbWUgPSBub2RlLmFyZ3VtZW50c1swXS52YWx1ZVxuICAgICAgICByZWdpc3Rlck5vZGUoY29udGV4dCwgbm9kZSwgbmFtZSwgJ3JlcXVpcmUnLCByYW5rcywgaW1wb3J0ZWQpXG4gICAgICB9LFxuICAgICAgJ1Byb2dyYW06ZXhpdCc6IGZ1bmN0aW9uIHJlcG9ydEFuZFJlc2V0KCkge1xuICAgICAgICBpZiAoYWxwaGFiZXRpemUub3JkZXIgIT09ICdpZ25vcmUnKSB7XG4gICAgICAgICAgbXV0YXRlUmFua3NUb0FscGhhYmV0aXplKGltcG9ydGVkLCBhbHBoYWJldGl6ZS5vcmRlcilcbiAgICAgICAgfVxuXG4gICAgICAgIG1ha2VPdXRPZk9yZGVyUmVwb3J0KGNvbnRleHQsIGltcG9ydGVkKVxuXG4gICAgICAgIGlmIChuZXdsaW5lc0JldHdlZW5JbXBvcnRzICE9PSAnaWdub3JlJykge1xuICAgICAgICAgIG1ha2VOZXdsaW5lc0JldHdlZW5SZXBvcnQoY29udGV4dCwgaW1wb3J0ZWQsIG5ld2xpbmVzQmV0d2VlbkltcG9ydHMpXG4gICAgICAgIH1cblxuICAgICAgICBpbXBvcnRlZCA9IFtdXG4gICAgICB9LFxuICAgICAgRnVuY3Rpb25EZWNsYXJhdGlvbjogaW5jcmVtZW50TGV2ZWwsXG4gICAgICBGdW5jdGlvbkV4cHJlc3Npb246IGluY3JlbWVudExldmVsLFxuICAgICAgQXJyb3dGdW5jdGlvbkV4cHJlc3Npb246IGluY3JlbWVudExldmVsLFxuICAgICAgQmxvY2tTdGF0ZW1lbnQ6IGluY3JlbWVudExldmVsLFxuICAgICAgT2JqZWN0RXhwcmVzc2lvbjogaW5jcmVtZW50TGV2ZWwsXG4gICAgICAnRnVuY3Rpb25EZWNsYXJhdGlvbjpleGl0JzogZGVjcmVtZW50TGV2ZWwsXG4gICAgICAnRnVuY3Rpb25FeHByZXNzaW9uOmV4aXQnOiBkZWNyZW1lbnRMZXZlbCxcbiAgICAgICdBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbjpleGl0JzogZGVjcmVtZW50TGV2ZWwsXG4gICAgICAnQmxvY2tTdGF0ZW1lbnQ6ZXhpdCc6IGRlY3JlbWVudExldmVsLFxuICAgICAgJ09iamVjdEV4cHJlc3Npb246ZXhpdCc6IGRlY3JlbWVudExldmVsLFxuICAgIH1cbiAgfSxcbn1cbiJdfQ==