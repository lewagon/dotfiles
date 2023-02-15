const runChallenges = (selected) => {
  const feedback = document.getElementById('feedback');

  if (selected) {
    if (selected().innerText === 'France (2 wins)') {
      feedback.innerText = 'Congratulations! 🎉';
      document.body.style.backgroundColor = '#CEFED9';
    } else {
      feedback.innerText = `Hmm, not quite there yet! You selected: ${selected().innerText}`;
      document.body.style.backgroundColor = '';
    }
  } else {
    feedback.innerText = 'Read the instructions in `lib/select.js`! 😉';
    document.body.style.backgroundColor = '';
  }
}

export default runChallenges;
