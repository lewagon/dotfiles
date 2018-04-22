## Background and Objectives

Terminal apps are cool, but you know what's cooler? Web applications! Let's try to port our Cookbook to a new web application using the `sinatra` gem.

## Some words about Sinatra

Sinatra is what we call a web "microframework". It's basically a micro Rails, also following the **MVC** pattern.
The `app.rb` file acts as the controller. The router layer is handled by Sinatra.
We already created a controller method to handle the root of the web app. Sinatra maps the URL in the browser to the right method in `app.rb`. Take a look at the [routing doc](http://www.sinatrarb.com/intro.html#Routes) for more info.

Read more about Sinatra in our homemade [tutorial](https://github.com/lewagon/sinatra-101). Follow the [setup](https://github.com/lewagon/sinatra-101#setup), [sinatra app](https://github.com/lewagon/sinatra-101#sinatra-app) and [views](https://github.com/lewagon/sinatra-101#views) steps thoroughly before starting your Cookbook web app.

## Specs

In our web app, we'll use our `Recipe` and `Cookbook` classes as we left them earlier. We won't need the `Router` and `Controller` classes though.

### Index

At the root of your web app (at the `/` url), you should display your cookbook's recipes in an unordered list.

Under the list of recipes, add a navigation link (`<a>`) to the `/new` url, that we'll use for the `create` user story.

### Create

Creating a new recipe takes two steps in the context of our web app. We need one step to display a form. We'll use a `GET /new` HTTP request to display the form.

The `<form>` will be the equivalent of the `gets` in the terminal. We need fields for the recipe's name, description, and any other field you find relevant to add. Submitting this form should trigger the following HTTP request:

```
POST /recipes
```

This request should trigger some code in `app.rb` to add the recipe in the cookbook.
At the end of this code, find a way to **redirect** the user to the `/` url of your web app (the index).

### Destroy

In your index, add a `destroy` link next to the name and the description of the recipe.
Clicking on the link should remove it from the cookbook and **redirect** to the index.


### Going further

When you managed to code these 3 user stories, go on and try to implement the harder `import` and `mark as done` actions!

Happy Sinatra!
