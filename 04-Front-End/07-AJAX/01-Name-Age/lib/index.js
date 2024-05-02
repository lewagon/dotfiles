const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const displayDefinition = (event) => {
  event.preventDefault();
  const word = document.getElementById("word").value;
  // TODO: Display your word's definition with an AJAX call instead of the console.log()
  console.log(word);
};

const form = document.getElementById("fetch-word");
form.addEventListener("submit", displayDefinition);
