const assert = require('assert');
const User = require('../lib/user');

describe('User', () => {
  it('should have a firstName attribute', () => {
    const user = new User('John', 'Lennon');
    assert.equal(user.firstName, 'John');
  });

  it('should have a lastName attribute', () => {
    const user = new User('John', 'Lennon');
    assert.equal(user.lastName, 'Lennon');
  });

  it('should have a fullName() method', () => {
    const user = new User('John', 'Lennon');
    assert.equal(user.fullName(), 'John Lennon');
  });
});
