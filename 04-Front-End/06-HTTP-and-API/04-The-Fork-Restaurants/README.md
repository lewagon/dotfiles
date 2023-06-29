## Background & Objectives

In this challenge, we'll take a closer look at the Fork API that we saw during the lecture. The aim is to get more familiar with making API requests, how to read the response and using this response to insert it in the HTML.

## Specs

You will build a search app to filter the restaurants of [The Fork API](https://the-fork-api.students.lewagon.co/).

Your goal is to implement in `index.js` the search logic, so we can filter by category when you click on search.

Open the html page in your browser with:

```bash
serve
```

You should see a form with all the different restaurant categories.

- When we select one and click on _Search_, the page **should not reload** and the goal is to display the list of the filtered restaurants on the right.
- We should see a message indicating that there are no results in case there are no restaurants for that category.
- The list should reset every time you make a new search before displaying the new restaurants.
- You can use the Bootstrap [**flush list**](https://getbootstrap.com/docs/5.2/components/list-group/#flush) to display the restaurants. But feel free to be creative if you like!

```html
<div class="text-center">
  <img
    src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/the-fork-challenge-1.png"
    alt="The Fork Challenge demo"
    width="100%"
  />
</div>
```

## Read the documentation

We will use the [Fork API](https://the-fork-api.students.lewagon.co/), so as always when we use a new API, it's very important to first read the documentation to find the **endpoint we need**, and understand how to build our request.

## Refactoring

Once the search works as expected, let's make the code more readable and avoid too many indentation levels, like we did in the previous challenge.

Let's create two new functions to extract some of our logic out of the `addEventListener` callback:

- First, an `insertResults` method that will insert the results in our list. Which parameter should be passed to it?
- Secondly, a `buildSearchUrl` method that will find the chosen category and build the URL we need to make our query. It should return the **URL appended with the search query parameters**.

At the end, your code should be easily readable and have no more than 1 indentation level!

## Going further

Once your search works for a category, let's add the location in, so we can search both by category and also by location 🎉

```html
<div class="text-center">
  <img
    src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/the-fork-challenge-2.png"
    alt="The Fork Challenge demo"
    width="100%"
  />
</div>
```
