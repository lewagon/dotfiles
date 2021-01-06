'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%');
var $TypeError = GetIntrinsic('%TypeError%');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var IsPropertyKey = require('./IsPropertyKey');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');
var ValidateAndApplyPropertyDescriptor = require('./ValidateAndApplyPropertyDescriptor');

// https://www.ecma-international.org/ecma-262/6.0/#sec-ordinarydefineownproperty

module.exports = function OrdinaryDefineOwnProperty(O, P, Desc) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	var desc = $gOPD(O, P);
	var current = desc && ToPropertyDescriptor(desc);
	var extensible = IsExtensible(O);
	return ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current);
};
