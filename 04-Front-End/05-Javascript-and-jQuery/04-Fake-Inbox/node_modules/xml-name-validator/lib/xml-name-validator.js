"use strict";
var parser = require("./generated-parser.js");

exports.name = function (potentialName) {
    parser.parse(potentialName, { startRule: "Name" });
};

exports.qname = function (potentialQname) {
    parser.parse(potentialQname, { startRule: "QName" });
};

exports.SyntaxError = parser.SyntaxError;
