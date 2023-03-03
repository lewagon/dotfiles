const runChallenges = (evenOrOdd) => {
  if (typeof document !== 'undefined') {
    let EXERCISE_NUMBER = 1;

    const addSuccess = () => {
      document.getElementById('results').insertAdjacentHTML(
        'beforeend',
        `<div class="col-3 text-center success mx-2">Exercise ${EXERCISE_NUMBER} OK</div>`);
      EXERCISE_NUMBER += 1;
    }

    const addError = (msg) => {
      document.getElementById('results').insertAdjacentHTML(
        'beforeend',
        `<div class="col-3 text-center error mx-2">Exercise ${EXERCISE_NUMBER} KO: ${msg} </div>`);
      EXERCISE_NUMBER += 1;
    }

    const assertEqual = (actual, expected) => {
      if (actual === expected) {
        addSuccess();
      } else if (typeof expected === "number") {
        addError(`Expected ${expected}, got ${actual}`);
      } else {
        addError(`Expected "${expected}", got "${actual}"`);
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

    const check = (evenOrOdd) => {
      assertEqual(evenOrOdd(0), "even");
      assertEqual(evenOrOdd(1), "odd");
      assertEqual(evenOrOdd(2), "even");
    }

    document.addEventListener("DOMContentLoaded", () => {
      check(evenOrOdd);
    });
  }
}

export default runChallenges;