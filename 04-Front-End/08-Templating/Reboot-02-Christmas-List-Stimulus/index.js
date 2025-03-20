// Select the necessary elements for adding an item to the list via the gift form
const giftForm = document.querySelector(".gift-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector(".list");

// Function to add an item to the main list with a click event listener
const addItemToList = (item) => {
  // Ensure item has only one event listener for toggling strike-through
  // Without this, when we add the items from the 'gift ideas' list to our main list, the item will remove and re-add itself at the end every time
  item.removeEventListener("click", handleSearchListItemClick);
  item.addEventListener("click", toggleStrike);
  list.appendChild(item);
};

// Event listener function for items in the gift list
const toggleStrike = (event) => {
  const item = event.currentTarget;
  item.classList.toggle("strike");
};

// When we hear a 'submit' on the form...
giftForm.addEventListener("submit", (e) => {
  // Prevent form from reloading the page
  e.preventDefault();

  // Extract 'name' and 'price' from input values
  const name = nameInput.value;
  const price = priceInput.value;

  // Create <li> element
  const listItem = document.createElement("li");
  listItem.textContent = `${name} - €${price}`;

  // Add the <li> to our list using the helper function
  addItemToList(listItem);

  // Clear input fields after submission
  nameInput.value = "";
  priceInput.value = "";
});

// Select the necessary elements for adding an item to the list via the ideas form
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#search-input");
const searchList = document.querySelector(".search-list");

// Function to remove item from the ideas list and add it to the main list
const handleSearchListItemClick = (event) => {
  const item = event.currentTarget;
  item.remove();
  addItemToList(item);
};

// When we hear a 'submit' on the searchForm...
searchForm.addEventListener("submit", (e) => {
  // Prevent form from reloading the page
  e.preventDefault();

  // Extract the 'query' from the input value
  const query = searchInput.value;

  // Use 'fetch' to make a get request to the API endpoint, interpolating the user's query
  fetch(`https://fakestoreapi.com/products/category/${query}`)
    .then((res) => res.json())
    .then((data) => {
      // Clear the previous search results
      searchList.innerHTML = "";

      // 'data' is an array of objects; for each one...
      data.forEach((item) => {
        // Create an <li>
        const listItem = document.createElement("li");
        // Access the 'title' and 'price' values via their keys
        listItem.textContent = `${item.title} - €${item.price}`;

        // Add event listener to move the item to the main list
        listItem.addEventListener("click", handleSearchListItemClick);

        // Append the list item to the search list
        searchList.appendChild(listItem);
      });
    });
});
