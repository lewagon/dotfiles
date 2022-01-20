'use strict';

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                 * @fileoverview Rule to disallow namespace import
                                                                                                                                                                                                 * @author Radek Benkel
                                                                                                                                                                                                 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------


module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('no-namespace')
    },
    fixable: 'code'
  },

  create: function (context) {
    return {
      'ImportNamespaceSpecifier': function (node) {
        const scopeVariables = context.getScope().variables;
        const namespaceVariable = scopeVariables.find(variable => variable.defs[0].node === node);
        const namespaceReferences = namespaceVariable.references;
        const namespaceIdentifiers = namespaceReferences.map(reference => reference.identifier);
        const canFix = namespaceIdentifiers.length > 0 && !usesNamespaceAsObject(namespaceIdentifiers);

        context.report({
          node,
          message: `Unexpected namespace import.`,
          fix: canFix && (fixer => {
            const scopeManager = context.getSourceCode().scopeManager;
            const fixes = [];

            // Pass 1: Collect variable names that are already in scope for each reference we want
            // to transform, so that we can be sure that we choose non-conflicting import names
            const importNameConflicts = {};
            namespaceIdentifiers.forEach(identifier => {
              const parent = identifier.parent;
              if (parent && parent.type === 'MemberExpression') {
                const importName = getMemberPropertyName(parent);
                const localConflicts = getVariableNamesInScope(scopeManager, parent);
                if (!importNameConflicts[importName]) {
                  importNameConflicts[importName] = localConflicts;
                } else {
                  localConflicts.forEach(c => importNameConflicts[importName].add(c));
                }
              }
            });

            // Choose new names for each import
            const importNames = Object.keys(importNameConflicts);
            const importLocalNames = generateLocalNames(importNames, importNameConflicts, namespaceVariable.name);

            // Replace the ImportNamespaceSpecifier with a list of ImportSpecifiers
            const namedImportSpecifiers = importNames.map(importName => importName === importLocalNames[importName] ? importName : `${importName} as ${importLocalNames[importName]}`);
            fixes.push(fixer.replaceText(node, `{ ${namedImportSpecifiers.join(', ')} }`));

            // Pass 2: Replace references to the namespace with references to the named imports
            namespaceIdentifiers.forEach(identifier => {
              const parent = identifier.parent;
              if (parent && parent.type === 'MemberExpression') {
                const importName = getMemberPropertyName(parent);
                fixes.push(fixer.replaceText(parent, importLocalNames[importName]));
              }
            });

            return fixes;
          })
        });
      }
    };
  }

  /**
   * @param {Identifier[]} namespaceIdentifiers
   * @returns {boolean} `true` if the namespace variable is more than just a glorified constant
   */
};function usesNamespaceAsObject(namespaceIdentifiers) {
  return !namespaceIdentifiers.every(identifier => {
    const parent = identifier.parent;

    // `namespace.x` or `namespace['x']`
    return parent && parent.type === 'MemberExpression' && (parent.property.type === 'Identifier' || parent.property.type === 'Literal');
  });
}

/**
 * @param {MemberExpression} memberExpression
 * @returns {string} the name of the member in the object expression, e.g. the `x` in `namespace.x`
 */
function getMemberPropertyName(memberExpression) {
  return memberExpression.property.type === 'Identifier' ? memberExpression.property.name : memberExpression.property.value;
}

/**
 * @param {ScopeManager} scopeManager
 * @param {ASTNode} node
 * @return {Set<string>}
 */
function getVariableNamesInScope(scopeManager, node) {
  let currentNode = node;
  let scope = scopeManager.acquire(currentNode);
  while (scope == null) {
    currentNode = currentNode.parent;
    scope = scopeManager.acquire(currentNode, true);
  }
  return new Set([].concat(_toConsumableArray(scope.variables.map(variable => variable.name)), _toConsumableArray(scope.upper.variables.map(variable => variable.name))));
}

/**
 *
 * @param {*} names
 * @param {*} nameConflicts
 * @param {*} namespaceName
 */
function generateLocalNames(names, nameConflicts, namespaceName) {
  const localNames = {};
  names.forEach(name => {
    let localName;
    if (!nameConflicts[name].has(name)) {
      localName = name;
    } else if (!nameConflicts[name].has(`${namespaceName}_${name}`)) {
      localName = `${namespaceName}_${name}`;
    } else {
      for (let i = 1; i < Infinity; i++) {
        if (!nameConflicts[name].has(`${namespaceName}_${name}_${i}`)) {
          localName = `${namespaceName}_${name}_${i}`;
          break;
        }
      }
    }
    localNames[name] = localName;
  });
  return localNames;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uby1uYW1lc3BhY2UuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJ0eXBlIiwiZG9jcyIsInVybCIsImZpeGFibGUiLCJjcmVhdGUiLCJjb250ZXh0Iiwibm9kZSIsInNjb3BlVmFyaWFibGVzIiwiZ2V0U2NvcGUiLCJ2YXJpYWJsZXMiLCJuYW1lc3BhY2VWYXJpYWJsZSIsImZpbmQiLCJ2YXJpYWJsZSIsImRlZnMiLCJuYW1lc3BhY2VSZWZlcmVuY2VzIiwicmVmZXJlbmNlcyIsIm5hbWVzcGFjZUlkZW50aWZpZXJzIiwibWFwIiwicmVmZXJlbmNlIiwiaWRlbnRpZmllciIsImNhbkZpeCIsImxlbmd0aCIsInVzZXNOYW1lc3BhY2VBc09iamVjdCIsInJlcG9ydCIsIm1lc3NhZ2UiLCJmaXgiLCJmaXhlciIsInNjb3BlTWFuYWdlciIsImdldFNvdXJjZUNvZGUiLCJmaXhlcyIsImltcG9ydE5hbWVDb25mbGljdHMiLCJmb3JFYWNoIiwicGFyZW50IiwiaW1wb3J0TmFtZSIsImdldE1lbWJlclByb3BlcnR5TmFtZSIsImxvY2FsQ29uZmxpY3RzIiwiZ2V0VmFyaWFibGVOYW1lc0luU2NvcGUiLCJjIiwiYWRkIiwiaW1wb3J0TmFtZXMiLCJPYmplY3QiLCJrZXlzIiwiaW1wb3J0TG9jYWxOYW1lcyIsImdlbmVyYXRlTG9jYWxOYW1lcyIsIm5hbWUiLCJuYW1lZEltcG9ydFNwZWNpZmllcnMiLCJwdXNoIiwicmVwbGFjZVRleHQiLCJqb2luIiwiZXZlcnkiLCJwcm9wZXJ0eSIsIm1lbWJlckV4cHJlc3Npb24iLCJ2YWx1ZSIsImN1cnJlbnROb2RlIiwic2NvcGUiLCJhY3F1aXJlIiwiU2V0IiwidXBwZXIiLCJuYW1lcyIsIm5hbWVDb25mbGljdHMiLCJuYW1lc3BhY2VOYW1lIiwibG9jYWxOYW1lcyIsImxvY2FsTmFtZSIsImhhcyIsImkiLCJJbmZpbml0eSJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7Ozs7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QyxJQUEvQyxDQUZFLEdBQVA7QUFJRDs7QUFFRDs7Ozs7O0FBTUEsU0FBU0Qsa0JBQVQsQ0FBNEJlLEtBQTVCLEVBQW1DQyxhQUFuQyxFQUFrREMsYUFBbEQsRUFBaUU7QUFDL0QsUUFBTUMsYUFBYSxFQUFuQjtBQUNBSCxRQUFNM0IsT0FBTixDQUFlYSxJQUFELElBQVU7QUFDdEIsUUFBSWtCLFNBQUo7QUFDQSxRQUFJLENBQUNILGNBQWNmLElBQWQsRUFBb0JtQixHQUFwQixDQUF3Qm5CLElBQXhCLENBQUwsRUFBb0M7QUFDbENrQixrQkFBWWxCLElBQVo7QUFDRCxLQUZELE1BRU8sSUFBSSxDQUFDZSxjQUFjZixJQUFkLEVBQW9CbUIsR0FBcEIsQ0FBeUIsR0FBRUgsYUFBYyxJQUFHaEIsSUFBSyxFQUFqRCxDQUFMLEVBQTBEO0FBQy9Ea0Isa0JBQWEsR0FBRUYsYUFBYyxJQUFHaEIsSUFBSyxFQUFyQztBQUNELEtBRk0sTUFFQTtBQUNMLFdBQUssSUFBSW9CLElBQUksQ0FBYixFQUFnQkEsSUFBSUMsUUFBcEIsRUFBOEJELEdBQTlCLEVBQW1DO0FBQ2pDLFlBQUksQ0FBQ0wsY0FBY2YsSUFBZCxFQUFvQm1CLEdBQXBCLENBQXlCLEdBQUVILGFBQWMsSUFBR2hCLElBQUssSUFBR29CLENBQUUsRUFBdEQsQ0FBTCxFQUErRDtBQUM3REYsc0JBQWEsR0FBRUYsYUFBYyxJQUFHaEIsSUFBSyxJQUFHb0IsQ0FBRSxFQUExQztBQUNBO0FBQ0Q7QUFDRjtBQUNGO0FBQ0RILGVBQVdqQixJQUFYLElBQW1Ca0IsU0FBbkI7QUFDRCxHQWZEO0FBZ0JBLFNBQU9ELFVBQVA7QUFDRCIsImZpbGUiOiJuby1uYW1lc3BhY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgUnVsZSB0byBkaXNhbGxvdyBuYW1lc3BhY2UgaW1wb3J0XG4gKiBAYXV0aG9yIFJhZGVrIEJlbmtlbFxuICovXG5cbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSdWxlIERlZmluaXRpb25cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGE6IHtcbiAgICB0eXBlOiAnc3VnZ2VzdGlvbicsXG4gICAgZG9jczoge1xuICAgICAgdXJsOiBkb2NzVXJsKCduby1uYW1lc3BhY2UnKSxcbiAgICB9LFxuICAgIGZpeGFibGU6ICdjb2RlJyxcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXInOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBjb25zdCBzY29wZVZhcmlhYmxlcyA9IGNvbnRleHQuZ2V0U2NvcGUoKS52YXJpYWJsZXNcbiAgICAgICAgY29uc3QgbmFtZXNwYWNlVmFyaWFibGUgPSBzY29wZVZhcmlhYmxlcy5maW5kKCh2YXJpYWJsZSkgPT5cbiAgICAgICAgICB2YXJpYWJsZS5kZWZzWzBdLm5vZGUgPT09IG5vZGVcbiAgICAgICAgKVxuICAgICAgICBjb25zdCBuYW1lc3BhY2VSZWZlcmVuY2VzID0gbmFtZXNwYWNlVmFyaWFibGUucmVmZXJlbmNlc1xuICAgICAgICBjb25zdCBuYW1lc3BhY2VJZGVudGlmaWVycyA9IG5hbWVzcGFjZVJlZmVyZW5jZXMubWFwKHJlZmVyZW5jZSA9PiByZWZlcmVuY2UuaWRlbnRpZmllcilcbiAgICAgICAgY29uc3QgY2FuRml4ID0gbmFtZXNwYWNlSWRlbnRpZmllcnMubGVuZ3RoID4gMCAmJiAhdXNlc05hbWVzcGFjZUFzT2JqZWN0KG5hbWVzcGFjZUlkZW50aWZpZXJzKVxuXG4gICAgICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgICAgICBub2RlLFxuICAgICAgICAgIG1lc3NhZ2U6IGBVbmV4cGVjdGVkIG5hbWVzcGFjZSBpbXBvcnQuYCxcbiAgICAgICAgICBmaXg6IGNhbkZpeCAmJiAoZml4ZXIgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2NvcGVNYW5hZ2VyID0gY29udGV4dC5nZXRTb3VyY2VDb2RlKCkuc2NvcGVNYW5hZ2VyXG4gICAgICAgICAgICBjb25zdCBmaXhlcyA9IFtdXG5cbiAgICAgICAgICAgIC8vIFBhc3MgMTogQ29sbGVjdCB2YXJpYWJsZSBuYW1lcyB0aGF0IGFyZSBhbHJlYWR5IGluIHNjb3BlIGZvciBlYWNoIHJlZmVyZW5jZSB3ZSB3YW50XG4gICAgICAgICAgICAvLyB0byB0cmFuc2Zvcm0sIHNvIHRoYXQgd2UgY2FuIGJlIHN1cmUgdGhhdCB3ZSBjaG9vc2Ugbm9uLWNvbmZsaWN0aW5nIGltcG9ydCBuYW1lc1xuICAgICAgICAgICAgY29uc3QgaW1wb3J0TmFtZUNvbmZsaWN0cyA9IHt9XG4gICAgICAgICAgICBuYW1lc3BhY2VJZGVudGlmaWVycy5mb3JFYWNoKChpZGVudGlmaWVyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IGlkZW50aWZpZXIucGFyZW50XG4gICAgICAgICAgICAgIGlmIChwYXJlbnQgJiYgcGFyZW50LnR5cGUgPT09ICdNZW1iZXJFeHByZXNzaW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGltcG9ydE5hbWUgPSBnZXRNZW1iZXJQcm9wZXJ0eU5hbWUocGFyZW50KVxuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsQ29uZmxpY3RzID0gZ2V0VmFyaWFibGVOYW1lc0luU2NvcGUoc2NvcGVNYW5hZ2VyLCBwYXJlbnQpXG4gICAgICAgICAgICAgICAgaWYgKCFpbXBvcnROYW1lQ29uZmxpY3RzW2ltcG9ydE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICBpbXBvcnROYW1lQ29uZmxpY3RzW2ltcG9ydE5hbWVdID0gbG9jYWxDb25mbGljdHNcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgbG9jYWxDb25mbGljdHMuZm9yRWFjaCgoYykgPT4gaW1wb3J0TmFtZUNvbmZsaWN0c1tpbXBvcnROYW1lXS5hZGQoYykpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvLyBDaG9vc2UgbmV3IG5hbWVzIGZvciBlYWNoIGltcG9ydFxuICAgICAgICAgICAgY29uc3QgaW1wb3J0TmFtZXMgPSBPYmplY3Qua2V5cyhpbXBvcnROYW1lQ29uZmxpY3RzKVxuICAgICAgICAgICAgY29uc3QgaW1wb3J0TG9jYWxOYW1lcyA9IGdlbmVyYXRlTG9jYWxOYW1lcyhcbiAgICAgICAgICAgICAgaW1wb3J0TmFtZXMsXG4gICAgICAgICAgICAgIGltcG9ydE5hbWVDb25mbGljdHMsXG4gICAgICAgICAgICAgIG5hbWVzcGFjZVZhcmlhYmxlLm5hbWVcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgLy8gUmVwbGFjZSB0aGUgSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyIHdpdGggYSBsaXN0IG9mIEltcG9ydFNwZWNpZmllcnNcbiAgICAgICAgICAgIGNvbnN0IG5hbWVkSW1wb3J0U3BlY2lmaWVycyA9IGltcG9ydE5hbWVzLm1hcCgoaW1wb3J0TmFtZSkgPT5cbiAgICAgICAgICAgICAgaW1wb3J0TmFtZSA9PT0gaW1wb3J0TG9jYWxOYW1lc1tpbXBvcnROYW1lXVxuICAgICAgICAgICAgICAgID8gaW1wb3J0TmFtZVxuICAgICAgICAgICAgICAgIDogYCR7aW1wb3J0TmFtZX0gYXMgJHtpbXBvcnRMb2NhbE5hbWVzW2ltcG9ydE5hbWVdfWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIGZpeGVzLnB1c2goZml4ZXIucmVwbGFjZVRleHQobm9kZSwgYHsgJHtuYW1lZEltcG9ydFNwZWNpZmllcnMuam9pbignLCAnKX0gfWApKVxuXG4gICAgICAgICAgICAvLyBQYXNzIDI6IFJlcGxhY2UgcmVmZXJlbmNlcyB0byB0aGUgbmFtZXNwYWNlIHdpdGggcmVmZXJlbmNlcyB0byB0aGUgbmFtZWQgaW1wb3J0c1xuICAgICAgICAgICAgbmFtZXNwYWNlSWRlbnRpZmllcnMuZm9yRWFjaCgoaWRlbnRpZmllcikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBpZGVudGlmaWVyLnBhcmVudFxuICAgICAgICAgICAgICBpZiAocGFyZW50ICYmIHBhcmVudC50eXBlID09PSAnTWVtYmVyRXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbXBvcnROYW1lID0gZ2V0TWVtYmVyUHJvcGVydHlOYW1lKHBhcmVudClcbiAgICAgICAgICAgICAgICBmaXhlcy5wdXNoKGZpeGVyLnJlcGxhY2VUZXh0KHBhcmVudCwgaW1wb3J0TG9jYWxOYW1lc1tpbXBvcnROYW1lXSkpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiBmaXhlc1xuICAgICAgICAgIH0pLFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICB9XG4gIH0sXG59XG5cbi8qKlxuICogQHBhcmFtIHtJZGVudGlmaWVyW119IG5hbWVzcGFjZUlkZW50aWZpZXJzXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSBuYW1lc3BhY2UgdmFyaWFibGUgaXMgbW9yZSB0aGFuIGp1c3QgYSBnbG9yaWZpZWQgY29uc3RhbnRcbiAqL1xuZnVuY3Rpb24gdXNlc05hbWVzcGFjZUFzT2JqZWN0KG5hbWVzcGFjZUlkZW50aWZpZXJzKSB7XG4gIHJldHVybiAhbmFtZXNwYWNlSWRlbnRpZmllcnMuZXZlcnkoKGlkZW50aWZpZXIpID0+IHtcbiAgICBjb25zdCBwYXJlbnQgPSBpZGVudGlmaWVyLnBhcmVudFxuXG4gICAgLy8gYG5hbWVzcGFjZS54YCBvciBgbmFtZXNwYWNlWyd4J11gXG4gICAgcmV0dXJuIChcbiAgICAgIHBhcmVudCAmJiBwYXJlbnQudHlwZSA9PT0gJ01lbWJlckV4cHJlc3Npb24nICYmXG4gICAgICAocGFyZW50LnByb3BlcnR5LnR5cGUgPT09ICdJZGVudGlmaWVyJyB8fCBwYXJlbnQucHJvcGVydHkudHlwZSA9PT0gJ0xpdGVyYWwnKVxuICAgIClcbiAgfSlcbn1cblxuLyoqXG4gKiBAcGFyYW0ge01lbWJlckV4cHJlc3Npb259IG1lbWJlckV4cHJlc3Npb25cbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBuYW1lIG9mIHRoZSBtZW1iZXIgaW4gdGhlIG9iamVjdCBleHByZXNzaW9uLCBlLmcuIHRoZSBgeGAgaW4gYG5hbWVzcGFjZS54YFxuICovXG5mdW5jdGlvbiBnZXRNZW1iZXJQcm9wZXJ0eU5hbWUobWVtYmVyRXhwcmVzc2lvbikge1xuICByZXR1cm4gbWVtYmVyRXhwcmVzc2lvbi5wcm9wZXJ0eS50eXBlID09PSAnSWRlbnRpZmllcidcbiAgICA/IG1lbWJlckV4cHJlc3Npb24ucHJvcGVydHkubmFtZVxuICAgIDogbWVtYmVyRXhwcmVzc2lvbi5wcm9wZXJ0eS52YWx1ZVxufVxuXG4vKipcbiAqIEBwYXJhbSB7U2NvcGVNYW5hZ2VyfSBzY29wZU1hbmFnZXJcbiAqIEBwYXJhbSB7QVNUTm9kZX0gbm9kZVxuICogQHJldHVybiB7U2V0PHN0cmluZz59XG4gKi9cbmZ1bmN0aW9uIGdldFZhcmlhYmxlTmFtZXNJblNjb3BlKHNjb3BlTWFuYWdlciwgbm9kZSkge1xuICBsZXQgY3VycmVudE5vZGUgPSBub2RlXG4gIGxldCBzY29wZSA9IHNjb3BlTWFuYWdlci5hY3F1aXJlKGN1cnJlbnROb2RlKVxuICB3aGlsZSAoc2NvcGUgPT0gbnVsbCkge1xuICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucGFyZW50XG4gICAgc2NvcGUgPSBzY29wZU1hbmFnZXIuYWNxdWlyZShjdXJyZW50Tm9kZSwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gbmV3IFNldChbXG4gICAgLi4uc2NvcGUudmFyaWFibGVzLm1hcCh2YXJpYWJsZSA9PiB2YXJpYWJsZS5uYW1lKSxcbiAgICAuLi5zY29wZS51cHBlci52YXJpYWJsZXMubWFwKHZhcmlhYmxlID0+IHZhcmlhYmxlLm5hbWUpLFxuICBdKVxufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0geyp9IG5hbWVzXG4gKiBAcGFyYW0geyp9IG5hbWVDb25mbGljdHNcbiAqIEBwYXJhbSB7Kn0gbmFtZXNwYWNlTmFtZVxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZUxvY2FsTmFtZXMobmFtZXMsIG5hbWVDb25mbGljdHMsIG5hbWVzcGFjZU5hbWUpIHtcbiAgY29uc3QgbG9jYWxOYW1lcyA9IHt9XG4gIG5hbWVzLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICBsZXQgbG9jYWxOYW1lXG4gICAgaWYgKCFuYW1lQ29uZmxpY3RzW25hbWVdLmhhcyhuYW1lKSkge1xuICAgICAgbG9jYWxOYW1lID0gbmFtZVxuICAgIH0gZWxzZSBpZiAoIW5hbWVDb25mbGljdHNbbmFtZV0uaGFzKGAke25hbWVzcGFjZU5hbWV9XyR7bmFtZX1gKSkge1xuICAgICAgbG9jYWxOYW1lID0gYCR7bmFtZXNwYWNlTmFtZX1fJHtuYW1lfWBcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBJbmZpbml0eTsgaSsrKSB7XG4gICAgICAgIGlmICghbmFtZUNvbmZsaWN0c1tuYW1lXS5oYXMoYCR7bmFtZXNwYWNlTmFtZX1fJHtuYW1lfV8ke2l9YCkpIHtcbiAgICAgICAgICBsb2NhbE5hbWUgPSBgJHtuYW1lc3BhY2VOYW1lfV8ke25hbWV9XyR7aX1gXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsb2NhbE5hbWVzW25hbWVdID0gbG9jYWxOYW1lXG4gIH0pXG4gIHJldHVybiBsb2NhbE5hbWVzXG59XG4iXX0=