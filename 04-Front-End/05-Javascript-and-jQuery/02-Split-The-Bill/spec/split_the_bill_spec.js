var assert = require('assert');
var splitTheBill = require('../lib/split_the_bill');

describe('Split the bill', function() {
  it('should return an empty object if passed an empty one', function() {
    var money = splitTheBill({});
    assert(money !== undefined, "splitTheBill() should return something");
    assert.equal(Object.keys(money).length, 0);
  });

  it ('should return an object with zero if the group is composed of just one person', function() {
    var money = splitTheBill({ "John": 100 });
    assert(money !== undefined, "splitTheBill() should return something");
    assert.equal(Object.keys(money).length, 1);
    assert.equal(money["John"], 0, "John is alone, so he should receive 0 from the group");
  });

  it ('should work correctly for a group of 2 people who each spent the same amount', function() {
    var money = splitTheBill({ "John": 100, "Paul": 100 });
    assert(money !== undefined, "splitTheBill() should return something");
    assert.equal(Object.keys(money).length, 2);
    assert.equal(money["John"], 0);
    assert.equal(money["Paul"], 0);
  });

  it ('should work correctly for a group of 2 people who didn\'t spent the same amount', function() {
    var money = splitTheBill({ "John": 0, "Paul": 100 });
    assert(money !== undefined, "splitTheBill() should return something");
    assert.equal(Object.keys(money).length, 2);
    assert.equal(money["John"], -50);
    assert.equal(money["Paul"], 50);
  });

  it ('should work correctly for a group of 4 people', function() {
    var money = splitTheBill({ "John": 0, "Paul": 100, "Ringo": 0, "George": 300 });
    assert(money !== undefined, "splitTheBill() should return something");
    assert.equal(Object.keys(money).length, 4);
    assert.equal(money["John"], -100);
    assert.equal(money["Paul"], 0);
    assert.equal(money["Ringo"], -100);
    assert.equal(money["George"], 200);
  });
});
