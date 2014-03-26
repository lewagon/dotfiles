You'll be building an interface for a delivery-restaurant. The main components are: the actual restaurant, its employees (manager, delivery boys), and its customers.

The goal of this challenge is to explore the utility of object-oriented design. You will be building multiple classes and will have to define their interfaces.

This is a fairly open-ended challenge. The expectations are loose, so you will be making most of the decisions about how to design and build your program. Talk it out with your pair. Go to the whiteboard. Have fun !

As you are coding, ask yourself...
* How will I use this class?
* How will this class interact with the other classes?
* Does this attribute need to be private or public?
* Are my methods and variables well named?

## Objectives
### Create the Restaurant
Write the code that will create a new restaurant object. What types of attributes or accessors will be needed?

For example, you'll definitely need a name for the restaurant. You can also add its location, phone number, number of employees, and number of customers.

### Customers and Orders
Your customers will be stored in the restaurant database. (Don't worry about creating a database - just create fake data when launching your program).

Customers will make orders for food and you will have to record these orders. What are the attributes of an order ? What class should you create to store a client's orders ? How do you know if an order is complete or pending ?

### Create the Employees
There are multiple types of employees.

A few obvious examples are: manager, and  delivery boys. What attributes and methods might they all share ? What will be different for each ?

### Build an interface with authentication
Now imagine you're delivering this software and it's going to run as a Ruby file in Terminal. 

You're going to create a single manager who can add employees and customers, and only this manager is allowed to create these objects in the system.

You also want to allow the created employees to login and access customers and orders info. However, the different employees may not have same access. Here are some possible choices :

* A manager might access client's infos and orders to manage the delivery boys, assign them new orders, make promotions to frequent customers, understand what are the most popular orders, etc..
* Delivery boys just need to access infos about pending orders they get assigned.

An example of how this interface might look (this is just an idea - you are welcome to implement this feature however you think is best):

```
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
> - list_customers
> - add_customer
> - view_orders <customer_id>
> - add_order <customer_id>
> - remove_order <order_id>
> - list_employees
> - add_employee
> - delete_employee <employee_id>
```

or 

$ ruby restaurant.rb
> Welcome to CORBA SALONU
> -------------------------------
> Please enter your username:
> john_doe
> Please enter your password:
> ********
> -------------------------------
> Welcome, jimmy_boy_.  Your access level is : DELIVERY BOY
> -------------------------------
> What would you like to do?
> Options:
> - view_pending_orders
> - complete_order <order_id>
```