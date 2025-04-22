const nav = document.querySelector('nav');

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
});


document.querySelector('.toggle-nav').addEventListener('click', (e) => {
  nav.classList.toggle('close');
});


document.querySelector('nav ul').addEventListener('click', (e) => {
  nav.classList.add('close');
});
