var assert = require('assert');
var ageInDays = require('../lib/age_in_days');

describe('Age in days', function() {
  var millenialExpectedDays = Math.round(((Date.now() - new Date(2000, 0, 1)) / 86400000));
  it('should be ' + millenialExpectedDays + ' days for someone born on January 1st, 2000', function() {
    var days = ageInDays(1, 1, 2000);
    assert.equal(days, millenialExpectedDays);
  });

  var sebExpectedDays = Math.round(((Date.now() - new Date(1984, 11, 8)) / 86400000));
  it('should be ' + sebExpectedDays + ' days for someone born on December 8th, 1984', function() {
    var days = ageInDays(8, 12, 1984);
    assert.equal(days, sebExpectedDays);
  });
});
