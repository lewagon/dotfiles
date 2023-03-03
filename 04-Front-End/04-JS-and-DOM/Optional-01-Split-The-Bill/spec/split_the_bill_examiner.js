const runChallenges = (splitTheBill) => {
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

  const assertEqual = (actual, expected, msg = {}) => {
    if (actual === expected) {
      addSuccess();
    } else if (typeof expected === "number") {
      addError((typeof(msg) === 'string') ? `${msg}` : `Expected ${expected}, got ${actual}`);
    } else {
      addError((typeof(msg) === 'string') ? `${msg}` : `Expected "${expected}", got "${actual}"`);
    }
  }

  const assertNotEqual = (actual, notExpected) => {
    if (actual !== notExpected) {
      addSuccess();
    } else if (typeof notExpected === "number") {
      addError(`Expected ${actual} to differ from ${notExpected}`);
    } else {
      addError(`Expected "${actual}" to differ from "${notExpected}"`);
    }
  }

  const shouldReturnSomething = (splitTheBill) => {
    if (typeof(splitTheBill) === 'undefined') {
      addError("splitTheBill() should return something");
    }
  }

  const check = (splitTheBill) => {
    const empty = splitTheBill({});
    shouldReturnSomething(empty);
    assertEqual(Object.keys(empty).length, 0);
    const oneValue = splitTheBill({ John: 100 });
    shouldReturnSomething(oneValue);
    assertEqual(Object.keys(oneValue).length, 1);
    assertEqual(oneValue.John, 0, "John is alone, so he should receive 0 from the group");
    const sameValue = splitTheBill({ John: 100, Paul: 100 });
    shouldReturnSomething(sameValue);
    assertEqual(Object.keys(sameValue).length, 2);
    assertEqual(sameValue.John, 0);
    assertEqual(sameValue.Paul, 0);
    const twoDifferentValues = splitTheBill({ John: 0, Paul: 100 });
    shouldReturnSomething(twoDifferentValues);
    assertEqual(Object.keys(twoDifferentValues).length, 2);
    assertEqual(twoDifferentValues.John, -50);
    assertEqual(twoDifferentValues.Paul, 50);
    const fourDifferentValues = splitTheBill({ John: 0, Paul: 100, Ringo: 0, George: 300 });
    shouldReturnSomething(fourDifferentValues);
    assertEqual(Object.keys(fourDifferentValues).length, 4);
    assertEqual(fourDifferentValues.John, -100);
    assertEqual(fourDifferentValues.Paul, 0);
    assertEqual(fourDifferentValues.Ringo, -100);
    assertEqual(fourDifferentValues.George, 200);
  }

  if (typeof window === "object") {
    document.addEventListener("DOMContentLoaded", () => {
      check(splitTheBill);
    });
  }
}

export default runChallenges;
