const runChallenges = (hasNewMessage, newMessage) => {
  let EXERCISE_NUMBER = 1;

  const addSuccess = () => {
    document.getElementById('results').insertAdjacentHTML(
      'beforeend',
      `<li class="success">Exercise ${EXERCISE_NUMBER} OK</li>`);
    EXERCISE_NUMBER += 1;
  }

  const addError = (msg) => {
    document.getElementById('results').insertAdjacentHTML(
      'beforeend',
      `<li class="error">Exercise ${EXERCISE_NUMBER} KO: ${msg} </li>`);
    EXERCISE_NUMBER += 1;
  }

  const assertIsAbove = (actual, valueToBeAbove, msg) => {
    if (actual === null) {
      addError(`${msg}`)
    } else if (actual > valueToBeAbove) {
      addSuccess();
    } else {
      addError(`${msg}`);
    }
  }

  const assertIsBelow = (actual, valueToBeBelow, msg) => {
    if (actual === null) {
      addError(`${msg}`)
    } else if (actual < valueToBeBelow) {
      addSuccess();
    } else {
      addError(`${msg}`);
    }
  }

  const messageProbability = (msg) => {
    let trueCount = 0;
    if (typeof(msg()) === 'undefined') {
      trueCount = null;
    }
    for (let i = 0; i < 1000; i += 1) {
      if (msg() === true) {
        trueCount += 1;
      }
    }

    assertIsAbove(trueCount, 100, "For 1000 calls, should return true at least 100 times");
    assertIsBelow(trueCount, 300, "For 1000 calls, should return true at most 300 times");
  }

  const unique = (a) => {
    const u = [];
    for (let i = 0, l = a.length; i < l; i += 1) {
      if (u.indexOf(a[i]) === -1) {
        u.push(a[i]);
      }
    }
    return u;
  }

  const includeKey = (key, msg) => {
    if (typeof(msg()) === 'undefined') {
      addError(`${msg()} should not be undefined`);
    } else if (key in msg()) {
      addSuccess();
    } else {
      addError(`Expected ${key} to be a key of ${msg()}`);
    }
  }

  const haveLengthAbove = (array, n) => {
    if (array.length > n) {
      addSuccess();
    } else {
      addError(`Expected message to have unique subjects and senders`);
    }
  }

  const checkUniqueness = (msg) => {
    if (typeof(msg() === 'undefined')) {
      return;
    }

    const subjects = [];
    const senders = [];
    for (let i = 0; i < 100; i += 1) {
      const message = msg();
      if (message.subject) {
        subjects.push(message.subject);
      }
      if (message.sender) {
        senders.push(message.sender);
      }
    }

    const uniqueSubjects = unique(subjects);
    const uniqueSenders = unique(senders);
    haveLengthAbove(uniqueSubjects, 1);
    haveLengthAbove(uniqueSenders, 1);
  };


  const check = (hasNewMessage, newMessage) => {
    messageProbability(hasNewMessage);
    includeKey("sender", newMessage);
    includeKey("subject", newMessage);
    checkUniqueness(newMessage);
  }

  if (typeof window === "object") {
    document.addEventListener("DOMContentLoaded", () => {
      check(hasNewMessage, newMessage);
    });
  };
}

export default runChallenges;
