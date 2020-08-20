document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
});


document.querySelector('.toggle-nav').addEventListener('click', (e) => {
  document.querySelector('nav').classList.toggle('open');
});
