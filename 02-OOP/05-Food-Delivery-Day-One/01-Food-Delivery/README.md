Let's build a Food Delivery program for a restaurant!

Here are the **user stories** of our software:
- As an employee (manager or delivery guy), I can log in
- As a manager, I can create a meal with its name and its price
- As a manager, I can read all the meals
- As a manager, I can create a customer with its name and its address
- As a manager, I can read all the customers
- As a manager, I can create an order with a meal, for a customer and assigned to a delivery guy
- As a manager, I can read all the undelivered orders
- As a delivery guy, I can real all my undelivered orders
- As a delivery guy, I can mark one of my orders as delivered

**WARNINGS**

The software is designed for **one restaurant only**, so no need to cater (no pun intended 😉) for a multi-restaurant one (e.g. we don't need a `Restaurant` model).

The software is designed for **the restaurant's staff only** (back office), so no need to design a login interface for customers.

Hence,the main components of our software are:
- **Meals**
- **Customers**
- **Employees**
- **Orders**

## 1 - `Meal`

### 1.1 - `Meal` model

Our restaurant sells meals, so we need a way to represent what a meal is.

Each meal has an id, a name and a price.

Write some code to implement this and crash-test your model in `irb`. Then test your code by running `rake meal`.

All green? Good! Time to `git add`, `commit` and `push`.

### 1.2 - `Meal` repository

Now that we have a model representing our meals, we need a repository to store them.

This repository is initialized with a CSV file path. It read/write the meals from the CSV file and store them in memory. The interface of this repository allows to:
- Add a new meal to the repository
- Get all the meals from the repository
- Find a specific meal thanks to its id

Write some code to implement this and crash-test your repository in irb. You can create your own `meals.csv` CSV file inside the `data` folder. Then test your code by running `rake meal`.

All green? Good! Time to `git add`, `commit` and `push`.

### 1.3 - Router and app

We haven't launched our app yet. To do this, we need a router and we need to fill in the `app.rb` file.

The router is responsible for displaying the tasks that the user can do and routing his choice to the corresponding action of the matching controller. The `app.rb` file is responsible for requiring all the necessary files, instanciating a router and executing its run method to launch the app.

Fill in the `router.rb` and `app.rb` files to implement this. If you're stuck, you go back to the [Cookbook Day 2](https://kitt.lewagon.com/camps/400/challenges?path=02-OOP%2F04-Cookbook-Day-Two%2F01-Cookbook-Advanced) and download the solution to get some inspiration. **No need to instanciate the router with a controller** has we don't have it yet. Just print `TODO` for the moment when the user select a task.

There is no rake for this part. Launch your app by running this command in the terminal:
```bash
ruby app.rb
```

Everything is working? Good! Time to `git add`, `commit` and `push`.

### 1.4 - `Meal` controller

Let's move to the controller. Here are the **user actions** we want to implement:
- `Add`, to create a new meal with its name and its price
- `List`, to read all the meals

Remember that the role of the controller is to delegate the work to the other components of our app (model, repository and view)!

Start by writing the **pseudocode**, breaking each user action into elementary steps and delegating each step to a component (model, repository or view). Then write the code to implement each step. Create the view and code it step by step.

To test your controller, link it to your app by instanciating it in `app.rb` and passing it to the router. Then you can crash-test your code by launching your app:
```bash
ruby app.rb
```

`rake meal` should also help you go through all these steps. Follow your guide!

Make sure your two meal user stories work before moving on to the next feature.

All green? Good! Time to `git add`, `commit` and `push`.

## 2 - `Customer`

### 1.1 - `Customer` model

Our restaurant sells to customers, so we need a way to represent what a customer is.

Each customer has an id, a name and an address.

Write some code to implement this and crash-test your model in `irb`. Then test your code by running `rake customer`.

All green? Good! Time to `git add`, `commit` and `push`.

### 2.2 - `Customer` repository

Now that we have a model representing our customers, we need a repository to store them.

This repository is initialized with a CSV file path. It read/write the customers from the CSV file and store them in memory. The interface of this repository allows to:
- Add a new customer to the repository
- Get all the customers from the repository
- Find a specific customer thanks to its id

Write some code to implement this and crash-test your repository in irb. You can create your own `customers.csv` CSV file inside the `data` folder. Then test your code by running `rake customer`.

All green? Good! Time to `git add`, `commit` and `push`.

### 2.3 - `Customer` controller

Let's move to the controller. Here are the **user actions** we want to implement:
- `Add`, to create a new customer with its name and its address
- `List`, to read all the customers

Remember that the role of the controller is to delegate the work to the other components of our app (model, repository and view)!

Start by writing the **pseudocode**, breaking each user action into elementary steps and delegating each step to a component (model, repository or view). Then write the code to implement each step. Create the view and code it step by step.

To test your controller, link it to your app by instanciating it in `app.rb` and passing it to the router. Then you can crash-test your code by launching your app:
```bash
ruby app.rb
```

`rake customer` should also help you go through all these steps. Follow your guide!

Make sure your two customer user stories work before moving on to the next feature.

## 3 - Optionals
### 3.1 - refactor repos with inheritance
### 3.2 - entire CRUD for meal and customer

## 4 - (Optional) Inheritance to the rescue

`MealRepository` and `CustomerRepository` have a lot of similarities don't they? We should always stay [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), so it's time to introduce a parent class, `BaseRepository`, which will hold all of the shared behavior.

Reminder: this is an optional section, so you can skip it and come back to it later if you want.

## 7 - (Optional) - `Destroy` actions

We haven't done any **deleting** yet. How would you implement these additional user stories?

- As a manager, I can delete a meal
- As a manager, I can delete a customer
