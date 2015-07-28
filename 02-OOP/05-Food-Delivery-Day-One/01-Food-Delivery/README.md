## Background & Objectives

You'll be building an interface for a delivery-restaurant.

The software will run in **one restaurant** only, so no need to think of a multi-restaurant one.

The main components are:

- **Employees** (manager, delivery guys)
- **Customers** of the Restaurant
- **Meals** that can be ordered
- **Orders** made by customers, and assigned to a given delivery guy

This is a fairly open-ended challenge. The expectations are loose, so you will be making most of the decisions about how to design and build your program. Talk it out with your pair. Go to the whiteboard. Have fun!

## Models

### What's on the menu?

You restaurant sells food, so you must store somewhere the meals that can be ordered.
A meal typically has a name and a price.

Write some code to model this, along with the repository which will read/write the meals from a CSV.

### Restaurant's employees

The restaurant has two types of employees, **managers** and **delivery guys**.
As soon as you start your ruby code, the employee will have to sign in (manager/delivery guys
don't have the same privileges). So the employee model should have something to login (user / password)
and a way to tell if he's a manager or not.

Again, write some code for the model, along with its **read-only** repository (we won't create
employees through the ruby application)

Open your `employees.csv` file and manually add some employees.

NB: Their password would be stored in clear, is that a good idea? What could we do?

### The customer is king

A customer is another model. We'll store a name and an address where the delivery guy can go deliver.
Again, this model needs its repository.

### Orders

An order is taken for a given **customer**, a given **meal** (we'll simplify to say that
an order is just one meal) and assigned to a given **delivery guy**.

That's where our models become connected together. Write the model class and its repository.

## Specs / User stories

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

### Bonus

We did not talk about **deleting** stuff here. What happens if you want to implement these new user stories?

- As a manager, I can delete a meal
- As a manager, I can delete a customer

