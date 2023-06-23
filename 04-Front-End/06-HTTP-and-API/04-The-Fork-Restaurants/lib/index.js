// Todo: Use the Fork Api to get a filtered list of restaurants, depending on the category selected (and as a bonus, the location)

const searchForm = document.getElementById("searchForm");

// Todo: select the HTML elements you need


searchForm.addEventListener("submit", (event) => {
  // Todo: Find the category selected and build the URL you will send your request to

  // Todo: Replace "the-endpoint-url" with the URL you built
  fetch("the-endpoint-url")
    .then(response => response.json())
    .then((data) => {
      // Todo: Insert results into the list

    });
})
