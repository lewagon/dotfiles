### Background & Objectives

You'll be building an interface for a delivery-restaurant. The main components are: the actual restaurant, its employees (manager, delivery guys), and its customers.

The goal of this challenge is to explore the utility of object-oriented design. You will be building multiple classes and will have to define their interfaces.

This is a fairly open-ended challenge. The expectations are loose, so you will be making most of the decisions about how to design and build your program. Talk it out with your pair. Go to the whiteboard. Have fun !

As you are coding, ask yourself...

* How will I use this class?
* How will this class interact with the other classes?
* Does this attribute need to be private or public?
* Are my methods and variables well named?

#### Create the Restaurant
Write the code that will create a new restaurant object. What types of attributes or accessors will be needed?

For example, you'll definitely need a name for the restaurant. You can also add its location, phone number, number of employees, and number of customers.

#### What's on the menu?
You restaurant sells food, so you must store somewhere the meals that can be ordered.
A meal typically has a name and a price.


#### Customers and Orders
Your customers will be stored in the restaurant's "database".
Don't worry about creating a real database though - just create an Array instance when your program starts and you'll push your customers there.

Customers will order food and you will have to record these orders.

* What are the attributes of an order?
* What class should you create to store a client's orders?
* How do you know if an order is complete or pending?


#### Create the Employees
There are multiple types of employees.

A few obvious examples are: manager, and delivery guys. What attributes and methods might they all share? What will be different for each?

#### Build an interface with authentication
Now imagine you're delivering this software and it's going to run as a Ruby file in Terminal.

You're going to create a single manager who can add customers, and only this manager is allowed to create these objects in the system.

You also want to allow the employees to be able to login and access customers and orders info. However, the different employees may not have same access. Here are the possible choices :

* The manager will access customer's infos and orders to manage the delivery guys and assign them new orders.
* Delivery guys just need to access infos about pending orders they get assigned and mark them as completed

An example of how this interface might look (this is just an idea - you are welcome to implement this feature however you think is best):

```ruby
$ ruby restaurant.rb
> Welcome to CORBA SALONU
> -------------------------------
> Please enter your username:
> john_doe
> Please enter your password:
> ********
> -------------------------------
> Welcome, john_doe.  Your access level is : MANAGER
> -------------------------------
> What would you like to do?
> Options:
> 1. List customers
> 2. Add customer
> 3. View orders <customer_id>
> 4. Add order <customer_id>, <employee_id_>
> 5. Remove order <order_id>
> 6. List employees
> 7. Log out
```



```ruby
$ ruby restaurant.rb
> Welcome to CORBA SALONU
> -------------------------------
> Please enter your username:
> jimmy_boy
> Please enter your password:
> ********
> -------------------------------
> Welcome, jimmy_boy.  Your access level is : DELIVERY GUY
> -------------------------------
> What would you like to do?
> Options:
> 1. View orders
> 2. Complete order <order_id>
> 3. Log out
```

## Specs

You're quite free to do things as you like here, but here some guidance so that
you all aim to the same feature set.

### Basics

* An employee doesn't need much more than a name and a password
* For a customer, you'll probably need his name and address
* For each "parameter" of the menu items (eg. 'order_id' in `complete_order <order_id>`), you can proceed in several steps in order to perform the requested action (ie. when 'complete_order' is entered, ask then for the order id, then complete the correct order)
* A completed order will simply be destroyed
* You'll only have two types of employees: managers and delivery guys. Menus must only present what a given employee really has permission to do.
* You are not expected to code the interface to add or remove employees. Just create some at startup of your program in an `app.rb` kind of file.
* Likewise, available meals can be hard coded into your main ruby file and added to your restaurant inventory from there.
* Orders must be assigned to a specific delivery guy when created by a manager
* Printing out an order to the screen should show the order number, the order's date, the delivery boy who's in charge and the meals purchased.
* When an order is delivered, simply delete it.


## Learning badges

This will probably not be too easy an exercise, so there's plenty to (re)learn!

You will definitely strengthen your experience with arrays and hashes, but also:

* Model a complete software architecture and code it from scratch!
* Learn how to use inheritance effectively
* Work on relations between classes
* ...

## Tips & Resources

* Paper, pencils, whiteboards, ... are a bunch of old friends you should not forget!
* Really take your time to write things down and think of all that's needed to complete this exercise.
* When you start coding, don't hesitate to use `irb` to try out your classes one by one
* Our own solution makes a smart use of blocks for the UI menu... to understand it, you must understand that blocks [can be stored into variables](http://www.reactive.io/tips/2008/12/21/understanding-ruby-blocks-procs-and-lambdas/) too :)
