// Zelda sound implementation WITHOUT Stimulus
const button = document.querySelector('#clickme');
const sound = new Audio('secret.mp3');

button.addEventListener('click', (event) => {
  const clickedButton = event.currentTarget;
  clickedButton.setAttribute('disabled', '');
  clickedButton.innerText = 'Bingo!';
  sound.addEventListener("ended", () => {
    clickedButton.removeAttribute('disabled');
    clickedButton.innerText = "Click me!";
  });
  sound.play();
});
