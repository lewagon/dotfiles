const runChallenges = (email, teamCount, sum) => {
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

  const check = (email, teamCount, sum) => {
    assertEqual(email, "boris@lewagon.org");
    assertNotEqual(document.getElementById("email").value, "boris@lewagon.org");
    assertEqual(document.getElementById("email-hint").innerHTML, "<strong>This is my email now</strong>");
    assertEqual(document.querySelectorAll('th.blue').length, 3);
    assertEqual(teamCount, 14);
    assertEqual(document.querySelectorAll('tbody > tr').length, 15);
    assertEqual(sum(), 859);
    assertEqual(Array.from(document.querySelectorAll('th')).map(element => element.style.backgroundColor).toString(), ["rgb(221, 244, 255)", "rgb(221, 244, 255)", "rgb(221, 244, 255)"].toString());
    assertEqual(document.getElementsByTagName('label').length, 0);
  }

  document.addEventListener("DOMContentLoaded", () => {
    check(email, teamCount, sum);
  });
}

export default runChallenges;
