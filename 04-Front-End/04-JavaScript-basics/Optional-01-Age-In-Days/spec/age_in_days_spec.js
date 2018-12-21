const assert = require("assert");
const ageInDays = require("../lib/age_in_days");

describe("Age in days", () => {
  const millenialExpectedDays = Math.round(((Date.now() - new Date(2000, 0, 1)) / 86400000));
  it(`should be ${millenialExpectedDays} days for someone born on January 1st, 2000`, () => {
    const days = ageInDays(1, 1, 2000);
    assert.equal(days, millenialExpectedDays);
  });

  const johnExpectedDays = Math.round(((Date.now() - new Date(1940, 9, 9)) / 86400000));
  it(`should be ${johnExpectedDays} days for John Lennon`, () => {
    const days = ageInDays(9, 10, 1940);
    assert.equal(days, johnExpectedDays);
  });
});
