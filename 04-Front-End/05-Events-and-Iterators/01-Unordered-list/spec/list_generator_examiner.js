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

  const HTMLSafe = (str) => {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  const check = (listItem, unorderedList) => {
    assertEqual(HTMLSafe(listItem('')), HTMLSafe('<li class="list-group-item"></li>'));
    assertEqual(HTMLSafe(listItem('eggs')), HTMLSafe('<li class="list-group-item">eggs</li>'));
    assertEqual(HTMLSafe(unorderedList([])) && HTMLSafe(unorderedList([])?.replace(/(\n| {2})/g, '')), HTMLSafe('<ul class="list-group"></ul>'));
    assertEqual(HTMLSafe(unorderedList(['eggs', 'bread'])) && HTMLSafe((unorderedList(['eggs', 'bread'])?.replace(/(\n| {2})/g, ''))), HTMLSafe('<ul class="list-group"><li class="list-group-item">eggs</li><li class="list-group-item">bread</li></ul>'));
  }

  if (typeof window === "object") {
    document.addEventListener("DOMContentLoaded", () => {
      check(listItem, unorderedList);
    });
  };
};

export default runChallenges;
