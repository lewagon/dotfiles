var assert = require('chai').assert;
var expect = require('chai').expect;
var jsdom = require('jsdom').jsdom;

function createDocument() {
  const document = jsdom(undefined);
  const window = document.defaultView;
  const $ = require('jquery')(window);
  global.document = document;
  global.window = window;
  global.$ = $;

  Object.keys(window).forEach((key) => {
    if (!(key in global)) {
      global[key] = window[key];
    }
  });

  return document;
}

createDocument();

var application = require('../application');

describe('hasNewMessage()', function () {
  it('should not return `true` 20% of the time', function() {
    var trueCount = 0;
    for(var i = 0; i < 100; i += 1) {
      if (application.hasNewMessage() === true) {
        trueCount += 1;
      }
    }
    assert.isAbove(trueCount, 10, "For 100 calls, should return true at least 10 times");
    assert.isBelow(trueCount, 30, "For 100 calls, should return true at most 30 times");
  })
});

// http://stackoverflow.com/a/21445415
function unique(a) {
  var unique = []
  for (var i = 0, l = a.length; i<l; i++) {
    if (unique.indexOf(a[i]) === -1) {
      unique.push(a[i]);
    }
  }
  return unique;
}

describe('newMessage()', function () {
  it ('should return an object with subject and sender keys', function () {
    var message = application.newMessage();
    expect(message).to.have.property('subject');
    expect(message).to.have.property('sender');
  });

  it ('should not always return the same message', function() {
    var subjects = [];
    var senders = [];
    for (var i = 0; i < 100; i += 1) {
      var message = application.newMessage();
      if (message.subject) {
        subjects.push(message.subject);
      }
      if (message.sender) {
        senders.push(message.sender);
      }
    }

    var unique_subjects = unique(subjects);
    var unique_senders = unique(senders);
    expect(unique_subjects).to.have.length.above(1);
    expect(unique_senders).to.have.length.above(1);
  });
});
