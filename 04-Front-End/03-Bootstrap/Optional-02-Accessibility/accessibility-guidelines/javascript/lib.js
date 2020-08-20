function toTop() {
  window.location = "#top";
}

document.querySelectorAll('.to-top').forEach((button) => {
  button.addEventListener('click', toTop);
});


document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
});


document.querySelector('.toggle-nav').addEventListener('click', (e) => {
  document.querySelector('nav').classList.toggle('open');
});
