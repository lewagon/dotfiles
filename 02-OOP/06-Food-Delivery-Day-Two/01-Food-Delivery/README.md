Make sure you execute the commands above 👆

Then let's copy the code from yesterday:

```bash
cp -r ../../05-Food-Delivery-Day-One/01-Food-Delivery/{app,data,app.rb,router.rb} . # trailing dot is important
```

Then - before you start - check that it still works:

```bash
rake
```

Now continue with your own code and keep adding features to the router / making the `rake` greener. Of course, you can have a look at [this morning's code](https://github.com/lewagon/food-delivery/tree/lecture-day-two) to get some inspiration.


Let's add more features to our Food Delivery program!

Here are all the **user stories** of our software
[ ] As an employee, I can log in
[X] As a manager, I can create a meal with its name and price
[X] As a manager, I can read all the meals
[X] As a manager, I can create a customer with its name and address
[X] As a manager, I can read all the customers
[ ] As a manager, I can create an order with a meal, for a customer and assigned to a delivery guy
[ ] As a manager, I can read all the undelivered orders
[ ] As a delivery guy, I read all my undelivered orders
[ ] As a delivery guy, I can mark one of my orders as delivered

Hence,there are two new components:
- **Employees**
- **Orders**

## 1 - `Employee`

The restaurant has two types of employees, **managers** and **delivery guys**. We want to implement a **read-only** logic for `EmployeeRepository` from a CSV file that we fill manually (no need for an `add` action).

Open your `employees.csv` file and manually add some employees:

```bash
id,username,password,role
1,paul,secret,manager
2,john,secret,delivery_guy
```

With that information, we can implement a **login** logic in our app to have two dashboards in the router depending on the user role: one dashboard for the manager, and another dashboard for the delivery guy (with fewer user actions available).

To handle that, we'll introduce the notion of a **session**. At the router level, we'll store the logged-in user in a session.

The sign sequence should go like this:

```bash
> username?
paul
> password?
blablabla
Wrong credentials... Try again!
> username?
paul
> password?
secret
Welcome Paul!
```

Now when you run the food delivery app, the first thing you can do is to **sign in**. The dashboard that you then see should be **dependent on your role**:

```bash
ruby app.rb
```
Optional: At the moment, a user's password is stored straight in the CSV and is visible to anyone. Is that a good idea? What could we do instead?

To launch only employee tests, use `rspec -t employee`

Finished? Great work :) Remember to `commit` and `push`.


## 6 - (`Order`) Time to link all the models!

An order is taken for a **customer**, containing a **meal** (to simplify things, let's say that an order can only contain **one meal**) and is then assigned to a given **delivery guy**. Finally, the `Order` model needs to record whether or not the meal has been delivered.

Here's where our models link up. First, write the `Order` model class and its repository.

Then, make sure that the following **user stories** are implemented in your program:

- As an employee, I can log in
- As a manager, I can add a meal
- As a manager, I can view all the meals
- As a manager, I can add a customer
- As a manager, I can view all the customers
- As a manager, I can view all the undelivered orders
- As a manager, I can add an order for a customer and assign it to a delivery guy
- As a delivery guy, I can view my undelivered orders
- As a delivery guy, I can mark an order as delivered

Again, to launch just the order tests, use `rspec -t _order`

**Important**: the `order_repository` and `orders_controller` tests run by `rake` **only work if you define the parameters in `#initialize` in the same order as in the tests**:

```ruby
class OrderRepository
  def initialize(orders_csv_path, meal_repository, employee_repository, customer_repository)
    # [...]
  end

  # [...]
end
```

```ruby
class OrdersController
  def initialize(meal_repository, employee_repository, customer_repository, order_repository)
    # [...]
  end

  # [...]
end
```

-----------------------------------------------------

Let's build a Food Delivery program for a restaurant!

Here are the first **user stories** of our software:
- As a user, I can create a meal with its name and its price
- As a user, I can read all the meals
- As a user, I can create a customer with its name and its address
- As a user, I can read all the customers

**WARNINGS**

The software is designed for **one restaurant only**, so no need to cater (no pun intended 😉) for a multi-restaurant one (e.g. we don't need a `Restaurant` model).

The software is designed for **the restaurant's staff only** (back office), so no need to design a login interface for customers.

Hence,the first components of our software are:
- **Meals**
- **Customers**

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

### 3.1 - Refactor repositories with inheritance

`MealRepository` and `CustomerRepository` have a lot of similarities don't they? In order to stay [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), we need to define a parent class, `BaseRepository`, which will hold all of the shared behavior and from which `MealRepository` and `CustomerRepository` will inherit.

Write some code to implement this. It's a refactoring process so there is no new test for this part. If your `rake` was all green before, it should be all green after!

Done? Time to `git add`, `commit` and `push`.

### 3.2 - Implement update and destroy actions for meal and customer

In our app, a user can't update or destroy an existing meal or customer.

Implement these additional user stories:
- As a user, I can update an existing meal
- As a user, I can delete an existing meal
- As a user, I can update an existing customer
- As a user, I can delete an existing customer
