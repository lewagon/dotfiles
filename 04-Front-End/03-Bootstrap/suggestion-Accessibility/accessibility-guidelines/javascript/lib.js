function toTop() {
  window.location = "#top";
}

document.querySelectorAll('footer button, .footer button').forEach((button) => {
  button.addEventListener('click', toTop);
});


document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
});


document.querySelector('nav').addEventListener('click', (e) => {
  document.querySelector('nav').classList.toggle('open');
});
