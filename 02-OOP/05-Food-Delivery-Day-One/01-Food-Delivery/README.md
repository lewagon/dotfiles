Let's build a Food Delivery program for a restaurant!

Here are the first **user actions** of our app:
- As a user, I can add a new meal
- As a user, I can list all the meals
- As a user, I can add a new customer
- As a user, I can list all the customers

**WARNINGS**

The software is designed for **one restaurant only**, so no need to cater (no pun intended 😉) for a multi-restaurant one (e.g. we don't need a `Restaurant` model).

The software is designed for **the restaurant's staff only**, so no need to design a login interface for customers.

Hence,the first components of our software are:
- **Meals**
- **Customers**

## 1 - Meals

### 1.1 - Meal model

Our restaurant sells meals, so we need a way to represent what a meal is.

Each meal has an id, a name and a price.

Write some code to implement this and crash-test your model. Then test your code by running `rake meal`.

All green? Good! Time to `git add`, `commit` and `push`.

### 1.2 - Meal repository

Now that we have a model representing our meals, we need a repository to store them.

This repository is initialized with a CSV file path. It reads/writes the meals from the CSV file and holds them as objects in an array. The behavior we want for the repository is to:
- Add a new meal
- Get all the meals
- Find a specific meal thanks to its id

Write some code to implement this and crash-test your repository. You should create your own `meals.csv` CSV file inside the `data` folder. Then test your code by running `rake meal`.

All green? Good! Time to `git add`, `commit` and `push`.

### 1.3 - Router and app

We haven't launched our app yet. To do this, we need a router and we need to fill in the `app.rb` file.

The router is responsible for displaying the tasks that the user can do and routing the user's choice to the corresponding action of the matching controller. The `app.rb` file is responsible for requiring all the necessary files, instanciating a router and executing its `run` method to launch the app.

Fill in the `router.rb` and `app.rb` files to implement this. If you're stuck, you can go back to the [Cookbook Day 2](https://kitt.lewagon.com/camps/<user.batch_slug>/challenges?path=02-OOP%2F04-Cookbook-Day-Two%2F01-Cookbook-Advanced) and download the solution to get some inspiration. **No need to instanciate the router with a controller** as we don't have it yet. Just print `TODO` for the moment when the user selects a task.

There is no rake for this part. Launch your app by running this command in the terminal:

```bash
ruby app.rb
```

Everything is working? Good! Time to `git add`, `commit` and `push`.

### 1.4 - Meals controller

Let's move to the controller. Here are the **user actions** we want to implement:
- `add` a new meal
- `list` all meals

Remember that the role of the controller is to delegate and coordinate the work to the other components of our app (model, repository and view)!

Start by writing the **pseudocode**, breaking each user action into elementary steps and delegating each step to a component (model, repository or view). Then write the code to implement each step. Create the view and code it step by step.

To test your controller, link it to your app by instantiating it in `app.rb` and passing it to the router. Then you can crash-test your code by launching your app:

```bash
ruby app.rb
```

`rake meal` should also help you go through all these steps. Follow your guide!

Make sure your two meal user actions work before moving on to the next feature.

All green? Good! Time to `git add`, `commit` and `push`.

## 2 - Customers

### 2.1 - Customer model

Our restaurant sells to customers, so we need a way to represent what a customer is.

Each customer has an id, a name and an address.

Write some code to implement this and crash-test your model. Then test your code by running `rake customer`.

All green? Good! Time to `git add`, `commit` and `push`.

### 2.2 - Customer repository

Now that we have a model representing our customers, we need a repository to store them.

This repository is initialized with a CSV file path. It reads/writes the customers from the CSV file and holds them as objects in an array. The behavior we want for the repository is to:
- Add a new customer
- Get all the customers
- Find a specific customer thanks to its id

Write some code to implement this and crash-test your repository. You should create your own `customers.csv` CSV file inside the `data` folder. Then test your code by running `rake customer`.

All green? Good! Time to `git add`, `commit` and `push`.

### 2.3 - Customers controller

Let's move to the controller. Here are the **user actions** we want to implement:
- `add` a new customer
- `list` all customers

Remember that the role of the controller is to delegate the work to the other components of our app (model, repository and view)!

Start by writing the **pseudocode**, breaking each user action into elementary steps and delegating each step to a component (model, repository or view). Then write the code to implement each step. Create the view and code it step by step.

To test your controller, link it to your app by instanciating it in `app.rb` and passing it to the router. Then you can crash-test your code by launching your app:

```bash
ruby app.rb
```

`rake customer` should also help you go through all these steps. Follow your guide!

Make sure your two customer user actions work before moving on to the next feature.

All green? Good! Time to `git add`, `commit` and `push`.

## 3 - Optionals

### 3.1 - Implement `edit` and `destroy` actions for meals and customers

In our app, a user can't edit or destroy an existing meal or customer.

Implement these additional user actions:
- As a user, I can edit an existing meal
- As a user, I can destroy an existing meal
- As a user, I can edit an existing customer
- As a user, I can destroy an existing customer

Done? Time to `git add`, `commit` and `push`.

### 3.2 - Refactor repositories with inheritance

`MealRepository` and `CustomerRepository` have a lot of similarities don't they? In order to stay [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), we need to define a parent class, `BaseRepository`, which will hold all of the shared behavior and from which `MealRepository` and `CustomerRepository` will inherit.

Write some code to implement this. It's a refactoring process so there is no new test for this part. If your `rake` was all green before, it should be all green after!

Done? Time to `git add`, `commit` and `push`.

You're done for today!
