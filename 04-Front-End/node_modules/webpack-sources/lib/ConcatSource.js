/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const SourceNode = require("source-map").SourceNode;
const SourceListMap = require("source-list-map").SourceListMap;
const Source = require("./Source");

class ConcatSource extends Source {
	constructor() {
		super();
		this.children = Array.prototype.slice.call(arguments);
	}

	add(item) {
		this.children.push(item);
	}

	source() {
		return this.children.map(function(item) {
			return typeof item === "string" ? item : item.source();
		}).join("");
	}

	size() {
		return this.children.map(function(item) {
			return typeof item === "string" ? item.length : item.size();
		}).reduce(function(sum, s) {
			return sum + s;
		}, 0);
	}

	node(options) {
		const node = new SourceNode(null, null, null, this.children.map(function(item) {
			return typeof item === "string" ? item : item.node(options);
		}));
		return node;
	}

	listMap(options) {
		const map = new SourceListMap();
		this.children.forEach(function(item) {
			if(typeof item === "string")
				map.add(item);
			else
				map.add(item.listMap(options));
		});
		return map;
	}

	updateHash(hash) {
		this.children.forEach(function(item) {
			if(typeof item === "string")
				hash.update(item);
			else
				item.updateHash(hash);
		});
	}
}

require("./SourceAndMapMixin")(ConcatSource.prototype);

module.exports = ConcatSource;
