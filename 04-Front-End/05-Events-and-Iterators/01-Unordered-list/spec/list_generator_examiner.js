const runChallenges = (listItem, unorderedList) => {
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
      addError((typeof (msg) === 'string') ? `${msg}` : `Expected ${expected}, got ${actual}`);
    } else {
      addError((typeof (msg) === 'string') ? `${msg}` : `Expected "${expected}", got "${actual}"`);
    }
  }

  const check = (listItem, unorderedList) => {
    assertEqual(listItem(''), '<li class="list-group-item"></li>');
    assertEqual(listItem('eggs'), '<li class="list-group-item">eggs</li>');
    assertEqual(unorderedList([]) && unorderedList([]).replace(/(\n| {2})/g, ''), '<ul class="list-group"></ul>');
    assertEqual(unorderedList(['eggs', 'bread']) && unorderedList(['eggs', 'bread']).replace(/(\n| {2})/g, ''), '<ul class="list-group"><li class="list-group-item">eggs</li><li class="list-group-item">bread</li></ul>');
  }

  if (typeof window === "object") {
    document.addEventListener("DOMContentLoaded", () => {
      check(listItem, unorderedList);
    });
  };
};

export default runChallenges;
