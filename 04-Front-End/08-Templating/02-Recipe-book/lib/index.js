// TODO: Use the Meal DB API to search for recipes by ingredient

// Todo: select the HTML elements you need
const searchInput = document.getElementById("search-input");
const template = document.getElementById("recipe-template");
const recipesContainer = document.getElementById("recipes-container");
const favouritesContainer = document.getElementById("favourites-container");

// Initialize the favourites array
const favourites = [];

const mealApiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

const addRecipeToFavourites = (event) => {
  const idMeal = event.currentTarget.id;
  const strMeal = event.currentTarget.parentElement.querySelector("h6").textContent;
  const strMealThumb = event.currentTarget.parentElement.querySelector("img").src;

  const newRecipeToAdd = { idMeal: idMeal, strMeal: strMeal, strMealThumb: strMealThumb };

  favourites.push(newRecipeToAdd);
  insertRecipes(favourites, favouritesContainer);
}

const addFavouriteListeners = () => {
  const favouriteButtons = document.querySelectorAll(".fa-bookmark");
  favouriteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      addRecipeToFavourites(event);
    });
  });
};

const insertRecipes = (recipes, container) => {
  if (recipes && recipes.length > 0) {
    container.innerHTML = "";
    recipes.forEach((result) => {
      const clone = template.content.cloneNode(true);
      clone.querySelector(".col-6").id = result.idMeal;
      clone.querySelector(".fa-solid.fa-bookmark").id = result.idMeal;
      clone.querySelector("img").src = result.strMealThumb;
      clone.querySelector("h6").textContent = result.strMeal;
      container.appendChild(clone);
    });
  }
}

searchInput.addEventListener("change", (event) => {
  fetch(`${mealApiUrl}${event.target.value}`)
    .then(response => response.json())
    .then((data) => {
      if (data.meals && data.meals.length > 0) {
        insertRecipes(data.meals, recipesContainer);
        addFavouriteListeners();
      } else {
        recipesContainer.innerHTML = "No results found! Try with another ingredient.";
      }
    })
})
