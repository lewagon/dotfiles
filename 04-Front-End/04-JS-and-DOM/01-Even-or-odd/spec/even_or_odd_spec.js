import { assert } from 'chai';
import { evenOrOdd } from "../lib/even_or_odd.js";

describe("evenOrOdd", () => {
  it("should return 'even' for 0", () => {
    assert.equal(evenOrOdd(0), 'even');
  });
  it("should false 'odd' for 1", () => {
    assert.equal(evenOrOdd(1), 'odd');
  });
  it("should return 'even' for 2", () => {
    assert.equal(evenOrOdd(2), 'even');
  });
  it("should return 'odd' for 101", () => {
    assert.equal(evenOrOdd(101), 'odd');
  });
});