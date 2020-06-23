'use strict';

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('prefer-default-export')
    }
  },

  create: function (context) {
    let specifierExportCount = 0;
    let hasDefaultExport = false;
    let hasStarExport = false;
    let hasTypeExport = false;
    let namedExportNode = null;

    function captureDeclaration(identifierOrPattern) {
      if (identifierOrPattern.type === 'ObjectPattern') {
        // recursively capture
        identifierOrPattern.properties.forEach(function (property) {
          captureDeclaration(property.value);
        });
      } else if (identifierOrPattern.type === 'ArrayPattern') {
        identifierOrPattern.elements.forEach(captureDeclaration);
      } else {
        // assume it's a single standard identifier
        specifierExportCount++;
      }
    }

    return {
      'ExportDefaultSpecifier': function () {
        hasDefaultExport = true;
      },

      'ExportSpecifier': function (node) {
        if (node.exported.name === 'default') {
          hasDefaultExport = true;
        } else {
          specifierExportCount++;
          namedExportNode = node;
        }
      },

      'ExportNamedDeclaration': function (node) {
        // if there are specifiers, node.declaration should be null
        if (!node.declaration) return;

        const type = node.declaration.type;


        if (type === 'TSTypeAliasDeclaration' || type === 'TypeAlias' || type === 'TSInterfaceDeclaration' || type === 'InterfaceDeclaration') {
          specifierExportCount++;
          hasTypeExport = true;
          return;
        }

        if (node.declaration.declarations) {
          node.declaration.declarations.forEach(function (declaration) {
            captureDeclaration(declaration.id);
          });
        } else {
          // captures 'export function foo() {}' syntax
          specifierExportCount++;
        }

        namedExportNode = node;
      },

      'ExportDefaultDeclaration': function () {
        hasDefaultExport = true;
      },

      'ExportAllDeclaration': function () {
        hasStarExport = true;
      },

      'Program:exit': function () {
        if (specifierExportCount === 1 && !hasDefaultExport && !hasStarExport && !hasTypeExport) {
          context.report(namedExportNode, 'Prefer default export.');
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9wcmVmZXItZGVmYXVsdC1leHBvcnQuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJ0eXBlIiwiZG9jcyIsInVybCIsImNyZWF0ZSIsImNvbnRleHQiLCJzcGVjaWZpZXJFeHBvcnRDb3VudCIsImhhc0RlZmF1bHRFeHBvcnQiLCJoYXNTdGFyRXhwb3J0IiwiaGFzVHlwZUV4cG9ydCIsIm5hbWVkRXhwb3J0Tm9kZSIsImNhcHR1cmVEZWNsYXJhdGlvbiIsImlkZW50aWZpZXJPclBhdHRlcm4iLCJwcm9wZXJ0aWVzIiwiZm9yRWFjaCIsInByb3BlcnR5IiwidmFsdWUiLCJlbGVtZW50cyIsIm5vZGUiLCJleHBvcnRlZCIsIm5hbWUiLCJkZWNsYXJhdGlvbiIsImRlY2xhcmF0aW9ucyIsImlkIiwicmVwb3J0Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsUUFBTTtBQUNKQyxVQUFNLFlBREY7QUFFSkMsVUFBTTtBQUNKQyxXQUFLLHVCQUFRLHVCQUFSO0FBREQ7QUFGRixHQURTOztBQVFmQyxVQUFRLFVBQVNDLE9BQVQsRUFBa0I7QUFDeEIsUUFBSUMsdUJBQXVCLENBQTNCO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMsZ0JBQWdCLEtBQXBCO0FBQ0EsUUFBSUMsZ0JBQWdCLEtBQXBCO0FBQ0EsUUFBSUMsa0JBQWtCLElBQXRCOztBQUVBLGFBQVNDLGtCQUFULENBQTRCQyxtQkFBNUIsRUFBaUQ7QUFDL0MsVUFBSUEsb0JBQW9CWCxJQUFwQixLQUE2QixlQUFqQyxFQUFrRDtBQUNoRDtBQUNBVyw0QkFBb0JDLFVBQXBCLENBQ0dDLE9BREgsQ0FDVyxVQUFTQyxRQUFULEVBQW1CO0FBQzFCSiw2QkFBbUJJLFNBQVNDLEtBQTVCO0FBQ0QsU0FISDtBQUlELE9BTkQsTUFNTyxJQUFJSixvQkFBb0JYLElBQXBCLEtBQTZCLGNBQWpDLEVBQWlEO0FBQ3REVyw0QkFBb0JLLFFBQXBCLENBQ0dILE9BREgsQ0FDV0gsa0JBRFg7QUFFRCxPQUhNLE1BR0M7QUFDUjtBQUNFTDtBQUNEO0FBQ0Y7O0FBRUQsV0FBTztBQUNMLGdDQUEwQixZQUFXO0FBQ25DQywyQkFBbUIsSUFBbkI7QUFDRCxPQUhJOztBQUtMLHlCQUFtQixVQUFTVyxJQUFULEVBQWU7QUFDaEMsWUFBSUEsS0FBS0MsUUFBTCxDQUFjQyxJQUFkLEtBQXVCLFNBQTNCLEVBQXNDO0FBQ3BDYiw2QkFBbUIsSUFBbkI7QUFDRCxTQUZELE1BRU87QUFDTEQ7QUFDQUksNEJBQWtCUSxJQUFsQjtBQUNEO0FBQ0YsT0FaSTs7QUFjTCxnQ0FBMEIsVUFBU0EsSUFBVCxFQUFlO0FBQ3ZDO0FBQ0EsWUFBSSxDQUFDQSxLQUFLRyxXQUFWLEVBQXVCOztBQUZnQixjQUkvQnBCLElBSitCLEdBSXRCaUIsS0FBS0csV0FKaUIsQ0FJL0JwQixJQUorQjs7O0FBTXZDLFlBQ0VBLFNBQVMsd0JBQVQsSUFDQUEsU0FBUyxXQURULElBRUFBLFNBQVMsd0JBRlQsSUFHQUEsU0FBUyxzQkFKWCxFQUtFO0FBQ0FLO0FBQ0FHLDBCQUFnQixJQUFoQjtBQUNBO0FBQ0Q7O0FBRUQsWUFBSVMsS0FBS0csV0FBTCxDQUFpQkMsWUFBckIsRUFBbUM7QUFDakNKLGVBQUtHLFdBQUwsQ0FBaUJDLFlBQWpCLENBQThCUixPQUE5QixDQUFzQyxVQUFTTyxXQUFULEVBQXNCO0FBQzFEViwrQkFBbUJVLFlBQVlFLEVBQS9CO0FBQ0QsV0FGRDtBQUdELFNBSkQsTUFLSztBQUNIO0FBQ0FqQjtBQUNEOztBQUVESSwwQkFBa0JRLElBQWxCO0FBQ0QsT0ExQ0k7O0FBNENMLGtDQUE0QixZQUFXO0FBQ3JDWCwyQkFBbUIsSUFBbkI7QUFDRCxPQTlDSTs7QUFnREwsOEJBQXdCLFlBQVc7QUFDakNDLHdCQUFnQixJQUFoQjtBQUNELE9BbERJOztBQW9ETCxzQkFBZ0IsWUFBVztBQUN6QixZQUFJRix5QkFBeUIsQ0FBekIsSUFBOEIsQ0FBQ0MsZ0JBQS9CLElBQW1ELENBQUNDLGFBQXBELElBQXFFLENBQUNDLGFBQTFFLEVBQXlGO0FBQ3ZGSixrQkFBUW1CLE1BQVIsQ0FBZWQsZUFBZixFQUFnQyx3QkFBaEM7QUFDRDtBQUNGO0FBeERJLEtBQVA7QUEwREQ7QUF6RmMsQ0FBakIiLCJmaWxlIjoicHJlZmVyLWRlZmF1bHQtZXhwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgdHlwZTogJ3N1Z2dlc3Rpb24nLFxuICAgIGRvY3M6IHtcbiAgICAgIHVybDogZG9jc1VybCgncHJlZmVyLWRlZmF1bHQtZXhwb3J0JyksXG4gICAgfSxcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICBsZXQgc3BlY2lmaWVyRXhwb3J0Q291bnQgPSAwXG4gICAgbGV0IGhhc0RlZmF1bHRFeHBvcnQgPSBmYWxzZVxuICAgIGxldCBoYXNTdGFyRXhwb3J0ID0gZmFsc2VcbiAgICBsZXQgaGFzVHlwZUV4cG9ydCA9IGZhbHNlXG4gICAgbGV0IG5hbWVkRXhwb3J0Tm9kZSA9IG51bGxcblxuICAgIGZ1bmN0aW9uIGNhcHR1cmVEZWNsYXJhdGlvbihpZGVudGlmaWVyT3JQYXR0ZXJuKSB7XG4gICAgICBpZiAoaWRlbnRpZmllck9yUGF0dGVybi50eXBlID09PSAnT2JqZWN0UGF0dGVybicpIHtcbiAgICAgICAgLy8gcmVjdXJzaXZlbHkgY2FwdHVyZVxuICAgICAgICBpZGVudGlmaWVyT3JQYXR0ZXJuLnByb3BlcnRpZXNcbiAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgICAgICAgICAgY2FwdHVyZURlY2xhcmF0aW9uKHByb3BlcnR5LnZhbHVlKVxuICAgICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKGlkZW50aWZpZXJPclBhdHRlcm4udHlwZSA9PT0gJ0FycmF5UGF0dGVybicpIHtcbiAgICAgICAgaWRlbnRpZmllck9yUGF0dGVybi5lbGVtZW50c1xuICAgICAgICAgIC5mb3JFYWNoKGNhcHR1cmVEZWNsYXJhdGlvbilcbiAgICAgIH0gZWxzZSAge1xuICAgICAgLy8gYXNzdW1lIGl0J3MgYSBzaW5nbGUgc3RhbmRhcmQgaWRlbnRpZmllclxuICAgICAgICBzcGVjaWZpZXJFeHBvcnRDb3VudCsrXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICdFeHBvcnREZWZhdWx0U3BlY2lmaWVyJzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGhhc0RlZmF1bHRFeHBvcnQgPSB0cnVlXG4gICAgICB9LFxuXG4gICAgICAnRXhwb3J0U3BlY2lmaWVyJzogZnVuY3Rpb24obm9kZSkge1xuICAgICAgICBpZiAobm9kZS5leHBvcnRlZC5uYW1lID09PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgICBoYXNEZWZhdWx0RXhwb3J0ID0gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNwZWNpZmllckV4cG9ydENvdW50KytcbiAgICAgICAgICBuYW1lZEV4cG9ydE5vZGUgPSBub2RlXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgICdFeHBvcnROYW1lZERlY2xhcmF0aW9uJzogZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgc3BlY2lmaWVycywgbm9kZS5kZWNsYXJhdGlvbiBzaG91bGQgYmUgbnVsbFxuICAgICAgICBpZiAoIW5vZGUuZGVjbGFyYXRpb24pIHJldHVyblxuXG4gICAgICAgIGNvbnN0IHsgdHlwZSB9ID0gbm9kZS5kZWNsYXJhdGlvblxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICB0eXBlID09PSAnVFNUeXBlQWxpYXNEZWNsYXJhdGlvbicgfHxcbiAgICAgICAgICB0eXBlID09PSAnVHlwZUFsaWFzJyB8fFxuICAgICAgICAgIHR5cGUgPT09ICdUU0ludGVyZmFjZURlY2xhcmF0aW9uJyB8fFxuICAgICAgICAgIHR5cGUgPT09ICdJbnRlcmZhY2VEZWNsYXJhdGlvbidcbiAgICAgICAgKSB7XG4gICAgICAgICAgc3BlY2lmaWVyRXhwb3J0Q291bnQrK1xuICAgICAgICAgIGhhc1R5cGVFeHBvcnQgPSB0cnVlXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9kZS5kZWNsYXJhdGlvbi5kZWNsYXJhdGlvbnMpIHtcbiAgICAgICAgICBub2RlLmRlY2xhcmF0aW9uLmRlY2xhcmF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGRlY2xhcmF0aW9uKSB7XG4gICAgICAgICAgICBjYXB0dXJlRGVjbGFyYXRpb24oZGVjbGFyYXRpb24uaWQpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAvLyBjYXB0dXJlcyAnZXhwb3J0IGZ1bmN0aW9uIGZvbygpIHt9JyBzeW50YXhcbiAgICAgICAgICBzcGVjaWZpZXJFeHBvcnRDb3VudCsrXG4gICAgICAgIH1cblxuICAgICAgICBuYW1lZEV4cG9ydE5vZGUgPSBub2RlXG4gICAgICB9LFxuXG4gICAgICAnRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uJzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGhhc0RlZmF1bHRFeHBvcnQgPSB0cnVlXG4gICAgICB9LFxuXG4gICAgICAnRXhwb3J0QWxsRGVjbGFyYXRpb24nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaGFzU3RhckV4cG9ydCA9IHRydWVcbiAgICAgIH0sXG5cbiAgICAgICdQcm9ncmFtOmV4aXQnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHNwZWNpZmllckV4cG9ydENvdW50ID09PSAxICYmICFoYXNEZWZhdWx0RXhwb3J0ICYmICFoYXNTdGFyRXhwb3J0ICYmICFoYXNUeXBlRXhwb3J0KSB7XG4gICAgICAgICAgY29udGV4dC5yZXBvcnQobmFtZWRFeHBvcnROb2RlLCAnUHJlZmVyIGRlZmF1bHQgZXhwb3J0LicpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfVxuICB9LFxufVxuIl19