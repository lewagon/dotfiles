Let's build a Food Delivery program for a restaurant.

The software will run in **one restaurant** only, so no need to think of a multi-restaurant one (no need for a `Restaurant` model for instance).

The main components are:

- **Employees** (managers, delivery guys)
- **Customers** of the Restaurant
- **Meals** that can be ordered
- **Orders** made by customers, and assigned to a given delivery guy.

## 1 - (`Meal`) What's on the menu?

Your restaurant sells food, so you must store somewhere the meals that can be ordered. A meal typically has a name and a price. Write some code to model this, along with the repository which will read/write the meals from a CSV.

Then let's move to the controller. Here are the user actions we want to implement:

- List all meals available in the restaurant
- Add a new meal (later, we'll restrict that to the manager role)

The `rake` should help you go through all these steps.

## 2 - We need a router!

We haven't launch our app code yet. We need a router and a `run` method. Go back to the **Cookbook** code to get some inspiration. Make sure that you can run the two meals-related user actions when launching the program:

```bash
ruby app.rb
```

## 3 - (`Customer`) Who's always right?

We will maintain a list of all our customers. When a new customer calls to order, we'll first need to add him/her to our list. A customer has a name and an address. Work on the model, the repository to store the CSV (it's a different file than `meals.csv`!) and finally the controller to implement the following user actions:

- List all customers available in the restaurant
- Add a new customer (later, we'll restrict that to the manager role as well)

Once your controller methods are implemented, add them to the router! Make sure your 4 user actions work before moving on to the next feature.

-- WIP --

## 4 - Employee

The restaurant has two types of employees, **managers** and **delivery guys**. As soon as you start your ruby code, the employee will have to sign in (manager/delivery guys
don't have the same privileges). So the employee model should have something to login (user / password)
and a way to tell if he's a manager or not.

Again, write some code for the model, along with its **read-only** repository (we won't create
employees through the ruby application)

Open your `employees.csv` file and manually add some employees.

NB: Their password would be stored in clear, is that a good idea? What could we do?

### Orders

An order is taken for a given **customer**, a given **meal** (we'll simplify to say that an order is **just one meal**) and assigned to a given **delivery guy**.

That's where our models become connected together. Write the model class and its repository.

## User actions

Please implement the following user stories in your program:

- As an employee, I can log in
- As a manager, I can add a meal
- As a manager, I can view all the meals
- As a manager, I can add a customer
- As a manager, I can view all the customers
- As a manager, I can view all the undelivered orders
- As a manager, I can add an order for a customer and assign it to a delivery guy
- As a delivery guy, I can view my undelivered orders
- As a delivery guy, I can mark an order as delivered

## Bonus

We did not talk about **deleting** stuff here. What happens if you want to implement these new user stories?

- As a manager, I can delete a meal
- As a manager, I can delete a customer
