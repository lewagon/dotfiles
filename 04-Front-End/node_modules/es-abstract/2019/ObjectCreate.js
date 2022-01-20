'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $ObjectCreate = GetIntrinsic('%Object.create%');
var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var Type = require('./Type');

// https://www.ecma-international.org/ecma-262/6.0/#sec-objectcreate

module.exports = function ObjectCreate(proto, internalSlotsList) {
	if (proto !== null && Type(proto) !== 'Object') {
		throw new $TypeError('Assertion failed: `proto` must be null or an object');
	}
	var slots = arguments.length < 2 ? [] : internalSlotsList;
	if (slots.length > 0) {
		throw new $SyntaxError('es-abstract does not yet support internal slots');
	}

	if (proto === null && !$ObjectCreate) {
		throw new $SyntaxError('native Object.create support is required to create null objects');
	}

	return $ObjectCreate(proto);
};
