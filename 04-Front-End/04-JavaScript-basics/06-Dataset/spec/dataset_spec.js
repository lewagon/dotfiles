const assert = require("assert");
const dataset = require("../lib/dataset");

describe("dataset", () => {
  it("should return an empty object when passed an empty string", () => {
    assert.deepEqual(dataset(''), {});
  });

  it("should return an object with the right key/value pairs", () => {
    const burger = `<div class="card" data-id="42" data-price="15" data-category="popular"></div>`;
    assert.deepEqual(dataset(burger), { id: 42, price: 15, category: "popular" });
  });

  it("should not take into account nested data attributes", () => {
    assert.deepEqual(dataset(`<div><div data-titi="toto"></div></div>`), {});
  });

  it("should cast string to number when relevant", () => {
    assert.equal(typeof dataset(`<div data-id="42"></div>`).id, "number");
  });

  it("should cast string to boolean when relevant", () => {
    assert.equal(typeof dataset(`<div data-admin="true"></div>`).admin, "boolean");
  });
});
