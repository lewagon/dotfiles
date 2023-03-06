const agifyApiUrl = "https://api.agify.io/"

const displayAge = (event) => {
  event.preventDefault();
  const firstName = document.getElementById("first-name").value;
  // TODO: Display your age with an AJAX call instead of the console.log()
  console.log(firstName);
}

const form = document.getElementById("fetch-age");
form.addEventListener("submit", displayAge);
