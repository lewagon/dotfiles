import { assert } from 'chai';
import { expect } from 'chai';
import { hasNewMessage, newMessage } from "../lib/inbox.js";

global.document = {
  addEventListener: () => { } // mock document
};

describe('hasNewMessage', () => {
  it('should return `true` 20% of the time', () => {
    let trueCount = 0;
    for (let i = 0; i < 100; i += 1) {
      if (hasNewMessage() === true) {
        trueCount += 1;
      }
    }
    assert.isAbove(trueCount, 10, "For 100 calls, should return true at least 10 times");
    assert.isBelow(trueCount, 30, "For 100 calls, should return true at most 30 times");
  });
});

// http://stackoverflow.com/a/21445415
function unique(a) {
  const u = [];
  for (let i = 0, l = a.length; i < l; i += 1) {
    if (u.indexOf(a[i]) === -1) {
      u.push(a[i]);
    }
  }
  return u;
}

describe('newMessage()', () => {
  it('should return an object with subject and sender keys', () => {
    const message = newMessage();
    expect(message).to.have.property('subject');
    expect(message).to.have.property('sender');
  });

  it('should not always return the same message', () => {
    const subjects = [];
    const senders = [];
    for (let i = 0; i < 100; i += 1) {
      const message = newMessage();
      if (message.subject) {
        subjects.push(message.subject);
      }
      if (message.sender) {
        senders.push(message.sender);
      }
    }

    const uniqueSubjects = unique(subjects);
    const uniqueSenders = unique(senders);
    expect(uniqueSubjects).to.have.length.above(1);
    expect(uniqueSenders).to.have.length.above(1);
  });
});