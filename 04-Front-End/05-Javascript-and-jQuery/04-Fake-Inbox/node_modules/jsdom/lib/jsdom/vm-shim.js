"use strict";

// We can't use the default browserify vm shim because it doesn't work in a web worker.

var acorn = require("acorn");
var findGlobals = require("acorn-globals");
var escodegen = require("escodegen");

exports.createContext = function (sandbox) {
  Object.defineProperty(sandbox, "__isVMShimContext", {
    value: true,
    writable: true,
    configurable: true,
    enumerable: false
  });
};

exports.isContext = function (sandbox) {
  return sandbox.__isVMShimContext;
};

exports.runInContext = function (code, contextifiedSandbox, options) {
  if (code === "this") {
    // Special case for during window creation.
    return contextifiedSandbox;
  }

  if (options === undefined) {
    options = {};
  }

  var comments = [];
  var tokens = [];
  var ast = acorn.parse(code, {
    ecmaVersion: 6,
    allowReturnOutsideFunction: true,
    ranges: true,
    // collect comments in Esprima's format
    onComment: comments,
    // collect token ranges
    onToken: tokens
  });

  // make sure we keep comments
  escodegen.attachComments(ast, comments, tokens);

  var globals = findGlobals(ast);
  for (var i = 0; i < globals.length; ++i) {
    if (globals[i].name === "window") {
      continue;
    }

    var nodes = globals[i].nodes;
    for (var j = 0; j < nodes.length; ++j) {
      var type = nodes[j].type;
      var name = nodes[j].name;
      nodes[j].type = "MemberExpression";
      nodes[j].property = {
        name: name,
        type: type
      };
      nodes[j].computed = false;
      nodes[j].object = {
        name: "window",
        type: "Identifier"
      };
    }
  }

  var lastNode = ast.body[ast.body.length - 1];
  if (lastNode.type === "ExpressionStatement") {
    lastNode.type = "ReturnStatement";
    lastNode.argument = lastNode.expression;
    delete lastNode.expression;
  }

  var rewrittenCode = escodegen.generate(ast, { comment: true });
  var suffix = options.filename !== undefined ? "\n//# sourceURL=" + options.filename : "";

  /* jshint -W054 */
  return new Function("window", rewrittenCode + suffix).bind(contextifiedSandbox)(contextifiedSandbox);
  /* jshint +W054 */
};
