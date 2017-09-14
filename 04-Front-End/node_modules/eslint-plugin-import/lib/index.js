'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const rules = exports.rules = {
  'no-unresolved': require('./rules/no-unresolved'),
  'named': require('./rules/named'),
  'default': require('./rules/default'),
  'namespace': require('./rules/namespace'),
  'no-namespace': require('./rules/no-namespace'),
  'export': require('./rules/export'),
  'no-mutable-exports': require('./rules/no-mutable-exports'),
  'extensions': require('./rules/extensions'),
  'no-restricted-paths': require('./rules/no-restricted-paths'),
  'no-internal-modules': require('./rules/no-internal-modules'),

  'no-named-default': require('./rules/no-named-default'),
  'no-named-as-default': require('./rules/no-named-as-default'),
  'no-named-as-default-member': require('./rules/no-named-as-default-member'),
  'no-anonymous-default-export': require('./rules/no-anonymous-default-export'),

  'no-commonjs': require('./rules/no-commonjs'),
  'no-amd': require('./rules/no-amd'),
  'no-duplicates': require('./rules/no-duplicates'),
  'first': require('./rules/first'),
  'max-dependencies': require('./rules/max-dependencies'),
  'no-extraneous-dependencies': require('./rules/no-extraneous-dependencies'),
  'no-absolute-path': require('./rules/no-absolute-path'),
  'no-nodejs-modules': require('./rules/no-nodejs-modules'),
  'no-webpack-loader-syntax': require('./rules/no-webpack-loader-syntax'),
  'order': require('./rules/order'),
  'newline-after-import': require('./rules/newline-after-import'),
  'prefer-default-export': require('./rules/prefer-default-export'),
  'no-dynamic-require': require('./rules/no-dynamic-require'),
  'unambiguous': require('./rules/unambiguous'),
  'no-unassigned-import': require('./rules/no-unassigned-import'),

  // metadata-based
  'no-deprecated': require('./rules/no-deprecated'),

  // deprecated aliases to rules
  'imports-first': require('./rules/imports-first')
};

const configs = exports.configs = {
  'recommended': require('../config/recommended'),

  'errors': require('../config/errors'),
  'warnings': require('../config/warnings'),

  // shhhh... work in progress "secret" rules
  'stage-0': require('../config/stage-0'),

  // useful stuff for folks using various environments
  'react': require('../config/react'),
  'react-native': require('../config/react-native'),
  'electron': require('../config/electron')
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJ1bGVzIiwicmVxdWlyZSIsImNvbmZpZ3MiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQU8sTUFBTUEsd0JBQVE7QUFDbkIsbUJBQWlCQyxRQUFRLHVCQUFSLENBREU7QUFFbkIsV0FBU0EsUUFBUSxlQUFSLENBRlU7QUFHbkIsYUFBV0EsUUFBUSxpQkFBUixDQUhRO0FBSW5CLGVBQWFBLFFBQVEsbUJBQVIsQ0FKTTtBQUtuQixrQkFBZ0JBLFFBQVEsc0JBQVIsQ0FMRztBQU1uQixZQUFVQSxRQUFRLGdCQUFSLENBTlM7QUFPbkIsd0JBQXNCQSxRQUFRLDRCQUFSLENBUEg7QUFRbkIsZ0JBQWNBLFFBQVEsb0JBQVIsQ0FSSztBQVNuQix5QkFBdUJBLFFBQVEsNkJBQVIsQ0FUSjtBQVVuQix5QkFBdUJBLFFBQVEsNkJBQVIsQ0FWSjs7QUFZbkIsc0JBQW9CQSxRQUFRLDBCQUFSLENBWkQ7QUFhbkIseUJBQXVCQSxRQUFRLDZCQUFSLENBYko7QUFjbkIsZ0NBQThCQSxRQUFRLG9DQUFSLENBZFg7QUFlbkIsaUNBQStCQSxRQUFRLHFDQUFSLENBZlo7O0FBaUJuQixpQkFBZUEsUUFBUSxxQkFBUixDQWpCSTtBQWtCbkIsWUFBVUEsUUFBUSxnQkFBUixDQWxCUztBQW1CbkIsbUJBQWlCQSxRQUFRLHVCQUFSLENBbkJFO0FBb0JuQixXQUFTQSxRQUFRLGVBQVIsQ0FwQlU7QUFxQm5CLHNCQUFvQkEsUUFBUSwwQkFBUixDQXJCRDtBQXNCbkIsZ0NBQThCQSxRQUFRLG9DQUFSLENBdEJYO0FBdUJuQixzQkFBb0JBLFFBQVEsMEJBQVIsQ0F2QkQ7QUF3Qm5CLHVCQUFxQkEsUUFBUSwyQkFBUixDQXhCRjtBQXlCbkIsOEJBQTRCQSxRQUFRLGtDQUFSLENBekJUO0FBMEJuQixXQUFTQSxRQUFRLGVBQVIsQ0ExQlU7QUEyQm5CLDBCQUF3QkEsUUFBUSw4QkFBUixDQTNCTDtBQTRCbkIsMkJBQXlCQSxRQUFRLCtCQUFSLENBNUJOO0FBNkJuQix3QkFBc0JBLFFBQVEsNEJBQVIsQ0E3Qkg7QUE4Qm5CLGlCQUFlQSxRQUFRLHFCQUFSLENBOUJJO0FBK0JuQiwwQkFBd0JBLFFBQVEsOEJBQVIsQ0EvQkw7O0FBaUNuQjtBQUNBLG1CQUFpQkEsUUFBUSx1QkFBUixDQWxDRTs7QUFvQ25CO0FBQ0EsbUJBQWlCQSxRQUFRLHVCQUFSO0FBckNFLENBQWQ7O0FBd0NBLE1BQU1DLDRCQUFVO0FBQ3JCLGlCQUFlRCxRQUFRLHVCQUFSLENBRE07O0FBR3JCLFlBQVVBLFFBQVEsa0JBQVIsQ0FIVztBQUlyQixjQUFZQSxRQUFRLG9CQUFSLENBSlM7O0FBTXJCO0FBQ0EsYUFBV0EsUUFBUSxtQkFBUixDQVBVOztBQVNyQjtBQUNBLFdBQVNBLFFBQVEsaUJBQVIsQ0FWWTtBQVdyQixrQkFBZ0JBLFFBQVEsd0JBQVIsQ0FYSztBQVlyQixjQUFZQSxRQUFRLG9CQUFSO0FBWlMsQ0FBaEIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgcnVsZXMgPSB7XG4gICduby11bnJlc29sdmVkJzogcmVxdWlyZSgnLi9ydWxlcy9uby11bnJlc29sdmVkJyksXG4gICduYW1lZCc6IHJlcXVpcmUoJy4vcnVsZXMvbmFtZWQnKSxcbiAgJ2RlZmF1bHQnOiByZXF1aXJlKCcuL3J1bGVzL2RlZmF1bHQnKSxcbiAgJ25hbWVzcGFjZSc6IHJlcXVpcmUoJy4vcnVsZXMvbmFtZXNwYWNlJyksXG4gICduby1uYW1lc3BhY2UnOiByZXF1aXJlKCcuL3J1bGVzL25vLW5hbWVzcGFjZScpLFxuICAnZXhwb3J0JzogcmVxdWlyZSgnLi9ydWxlcy9leHBvcnQnKSxcbiAgJ25vLW11dGFibGUtZXhwb3J0cyc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tbXV0YWJsZS1leHBvcnRzJyksXG4gICdleHRlbnNpb25zJzogcmVxdWlyZSgnLi9ydWxlcy9leHRlbnNpb25zJyksXG4gICduby1yZXN0cmljdGVkLXBhdGhzJzogcmVxdWlyZSgnLi9ydWxlcy9uby1yZXN0cmljdGVkLXBhdGhzJyksXG4gICduby1pbnRlcm5hbC1tb2R1bGVzJzogcmVxdWlyZSgnLi9ydWxlcy9uby1pbnRlcm5hbC1tb2R1bGVzJyksXG5cbiAgJ25vLW5hbWVkLWRlZmF1bHQnOiByZXF1aXJlKCcuL3J1bGVzL25vLW5hbWVkLWRlZmF1bHQnKSxcbiAgJ25vLW5hbWVkLWFzLWRlZmF1bHQnOiByZXF1aXJlKCcuL3J1bGVzL25vLW5hbWVkLWFzLWRlZmF1bHQnKSxcbiAgJ25vLW5hbWVkLWFzLWRlZmF1bHQtbWVtYmVyJzogcmVxdWlyZSgnLi9ydWxlcy9uby1uYW1lZC1hcy1kZWZhdWx0LW1lbWJlcicpLFxuICAnbm8tYW5vbnltb3VzLWRlZmF1bHQtZXhwb3J0JzogcmVxdWlyZSgnLi9ydWxlcy9uby1hbm9ueW1vdXMtZGVmYXVsdC1leHBvcnQnKSxcblxuICAnbm8tY29tbW9uanMnOiByZXF1aXJlKCcuL3J1bGVzL25vLWNvbW1vbmpzJyksXG4gICduby1hbWQnOiByZXF1aXJlKCcuL3J1bGVzL25vLWFtZCcpLFxuICAnbm8tZHVwbGljYXRlcyc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tZHVwbGljYXRlcycpLFxuICAnZmlyc3QnOiByZXF1aXJlKCcuL3J1bGVzL2ZpcnN0JyksXG4gICdtYXgtZGVwZW5kZW5jaWVzJzogcmVxdWlyZSgnLi9ydWxlcy9tYXgtZGVwZW5kZW5jaWVzJyksXG4gICduby1leHRyYW5lb3VzLWRlcGVuZGVuY2llcyc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXMnKSxcbiAgJ25vLWFic29sdXRlLXBhdGgnOiByZXF1aXJlKCcuL3J1bGVzL25vLWFic29sdXRlLXBhdGgnKSxcbiAgJ25vLW5vZGVqcy1tb2R1bGVzJzogcmVxdWlyZSgnLi9ydWxlcy9uby1ub2RlanMtbW9kdWxlcycpLFxuICAnbm8td2VicGFjay1sb2FkZXItc3ludGF4JzogcmVxdWlyZSgnLi9ydWxlcy9uby13ZWJwYWNrLWxvYWRlci1zeW50YXgnKSxcbiAgJ29yZGVyJzogcmVxdWlyZSgnLi9ydWxlcy9vcmRlcicpLFxuICAnbmV3bGluZS1hZnRlci1pbXBvcnQnOiByZXF1aXJlKCcuL3J1bGVzL25ld2xpbmUtYWZ0ZXItaW1wb3J0JyksXG4gICdwcmVmZXItZGVmYXVsdC1leHBvcnQnOiByZXF1aXJlKCcuL3J1bGVzL3ByZWZlci1kZWZhdWx0LWV4cG9ydCcpLFxuICAnbm8tZHluYW1pYy1yZXF1aXJlJzogcmVxdWlyZSgnLi9ydWxlcy9uby1keW5hbWljLXJlcXVpcmUnKSxcbiAgJ3VuYW1iaWd1b3VzJzogcmVxdWlyZSgnLi9ydWxlcy91bmFtYmlndW91cycpLFxuICAnbm8tdW5hc3NpZ25lZC1pbXBvcnQnOiByZXF1aXJlKCcuL3J1bGVzL25vLXVuYXNzaWduZWQtaW1wb3J0JyksXG5cbiAgLy8gbWV0YWRhdGEtYmFzZWRcbiAgJ25vLWRlcHJlY2F0ZWQnOiByZXF1aXJlKCcuL3J1bGVzL25vLWRlcHJlY2F0ZWQnKSxcblxuICAvLyBkZXByZWNhdGVkIGFsaWFzZXMgdG8gcnVsZXNcbiAgJ2ltcG9ydHMtZmlyc3QnOiByZXF1aXJlKCcuL3J1bGVzL2ltcG9ydHMtZmlyc3QnKSxcbn1cblxuZXhwb3J0IGNvbnN0IGNvbmZpZ3MgPSB7XG4gICdyZWNvbW1lbmRlZCc6IHJlcXVpcmUoJy4uL2NvbmZpZy9yZWNvbW1lbmRlZCcpLFxuXG4gICdlcnJvcnMnOiByZXF1aXJlKCcuLi9jb25maWcvZXJyb3JzJyksXG4gICd3YXJuaW5ncyc6IHJlcXVpcmUoJy4uL2NvbmZpZy93YXJuaW5ncycpLFxuXG4gIC8vIHNoaGhoLi4uIHdvcmsgaW4gcHJvZ3Jlc3MgXCJzZWNyZXRcIiBydWxlc1xuICAnc3RhZ2UtMCc6IHJlcXVpcmUoJy4uL2NvbmZpZy9zdGFnZS0wJyksXG5cbiAgLy8gdXNlZnVsIHN0dWZmIGZvciBmb2xrcyB1c2luZyB2YXJpb3VzIGVudmlyb25tZW50c1xuICAncmVhY3QnOiByZXF1aXJlKCcuLi9jb25maWcvcmVhY3QnKSxcbiAgJ3JlYWN0LW5hdGl2ZSc6IHJlcXVpcmUoJy4uL2NvbmZpZy9yZWFjdC1uYXRpdmUnKSxcbiAgJ2VsZWN0cm9uJzogcmVxdWlyZSgnLi4vY29uZmlnL2VsZWN0cm9uJyksXG59XG4iXX0=