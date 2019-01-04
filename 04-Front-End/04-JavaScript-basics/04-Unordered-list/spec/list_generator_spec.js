const assert = require("assert");
const { listItem, unorderedList } = require("../lib/list_generator");

describe("listItem", () => {
  it("should return an empty <li> when passed an empty string", () => {
    assert.equal(listItem(''), '<li class="list-group-item"></li>');
  });

  it("should return the right markup", () => {
    assert.equal(listItem('milk'), '<li class="list-group-item">milk</li>');
  });
});

describe("unorderedList", () => {
  it("should return an empty <ul> when passed an empty array", () => {
    assert.equal(unorderedList([]).replace(/(\n| {2})/g, ''), '<ul class="list-group"></ul>');
  });

  it("should return the right markup when passed items", () => {
    assert.equal(unorderedList(['milk', 'bread']).replace(/(\n| {2})/g, ''), '<ul class="list-group"><li class="list-group-item">milk</li><li class="list-group-item">bread</li></ul>');
  });
});
