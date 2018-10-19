const assert = require('assert');
const franceElement = require("../lib/select");

const selected = franceElement();
const feedback = document.getElementById('feedback');

if (selected) {
  if (selected.innerText === 'France (2 wins)') {
    feedback.innerText = 'Congratulations! 🎉';
  } else {
    feedback.innerText = `Hmm, not quite there yet! You selected: ${selected.innerText}`;
  }
} else {
  feedback.innerText = 'Read the instructions in `lib/select.js`! 😉';
}
