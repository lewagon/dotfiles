const assert = require("assert");
const { listItem, unorderedList } = require("../lib/list_generator");

describe("listItem", () => {
  it("should return an empty <li> when passed an empty string", () => {
    assert.equal(listItem(''), '<li class="group-list-item"></li>');
  });

  it("should return the right markup", () => {
    assert.equal(listItem('milk'), '<li class="group-list-item">milk</li>');
  });
});

describe("unorderedList", () => {
  it("should return an empty <ul> when passed an empty array", () => {
    assert.equal(unorderedList([]).replace(/(\n| {2})/g, ''), '<ul class="group-list"></ul>');
  });

  it("should return the right markup when passed items", () => {
    assert.equal(unorderedList(['milk', 'bread']).replace(/(\n| {2})/g, ''), '<ul class="group-list"><li class="group-list-item">milk</li><li class="group-list-item">bread</li></ul>');
  });
});
