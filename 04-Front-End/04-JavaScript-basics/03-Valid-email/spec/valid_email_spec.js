const assert = require("assert");
const valid = require("../lib/valid_email");

describe("valid", () => {
  it("should return false for an empty string", () => {
    assert.equal(valid(''), false);
  });

  it("should return false if there is no @", () => {
    assert.equal(valid('boris.lewagon.org'), false);
  });

  it("should return false if the extension is too short", () => {
    assert.equal(valid('boris@lewagon.o'), false);
  });

  it("should return false if there's nothing before the @", () => {
    assert.equal(valid('@lewagon.org'), false);
  });

  it("should return false if there's no dot in the domain", () => {
    assert.equal(valid('boris@lewagon'), false);
  });

  it("should return true with a simple valid email", () => {
    assert.equal(valid('boris@lewagon.org'), true);
  });

  it("should return true with a more complex valid email", () => {
    assert.equal(valid('b.papillard75@caramail.fr'), true);
  });
});
