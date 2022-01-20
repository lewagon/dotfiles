'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var callBind = require('../helpers/callBind');
var callBound = require('../helpers/callBound');
var forEach = require('../helpers/forEach');

var $pushApply = callBind.apply(GetIntrinsic('%Array.prototype.push%'));
var $SymbolValueOf = callBound('Symbol.prototype.valueOf', true);
var $gOPS = $SymbolValueOf ? GetIntrinsic('%Object.getOwnPropertySymbols%') : null;

var keys = require('object-keys');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

var IsArray = require('./IsArray');
var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

var OwnPropertyKeys = function OwnPropertyKeys(ES, source) {
	var ownKeys = keys(source);
	if ($gOPS) {
		$pushApply(ownKeys, $gOPS(source));
	}
	return ownKeys;
};

// https://www.ecma-international.org/ecma-262/9.0/#sec-copydataproperties

module.exports = function CopyDataProperties(target, source, excludedItems) {
	if (Type(target) !== 'Object') {
		throw new TypeError('Assertion failed: "target" must be an Object');
	}

	if (!IsArray(excludedItems)) {
		throw new TypeError('Assertion failed: "excludedItems" must be a List of Property Keys');
	}
	for (var i = 0; i < excludedItems.length; i += 1) {
		if (!IsPropertyKey(excludedItems[i])) {
			throw new TypeError('Assertion failed: "excludedItems" must be a List of Property Keys');
		}
	}

	if (typeof source === 'undefined' || source === null) {
		return target;
	}

	var ES = this;

	var fromObj = ES.ToObject(source);

	var sourceKeys = OwnPropertyKeys(ES, fromObj);
	forEach(sourceKeys, function (nextKey) {
		var excluded = false;

		forEach(excludedItems, function (e) {
			if (ES.SameValue(e, nextKey) === true) {
				excluded = true;
			}
		});

		var enumerable = $isEnumerable(fromObj, nextKey) || (
		// this is to handle string keys being non-enumerable in older engines
			typeof source === 'string'
            && nextKey >= 0
            && ES.IsInteger(ES.ToNumber(nextKey))
		);
		if (excluded === false && enumerable) {
			var propValue = ES.Get(fromObj, nextKey);
			ES.CreateDataProperty(target, nextKey, propValue);
		}
	});

	return target;
};
