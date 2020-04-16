Make sure you execute the commands above 👆

**IMPORTANT** 👇

Copy the code from yesterday:
```bash
cp -r ../../05-Food-Delivery-Day-One/01-Food-Delivery/{app,data,app.rb,router.rb} . # trailing dot is important
```

Then, before you start, check that it still works:
```bash
rake
```

Now continue with your own code and keep adding features to the router / making the `rake` greener. Of course, you can have a look at [this morning's code](https://github.com/lewagon/food-delivery/tree/lecture-day-two) to get some inspiration.

Let's add more features to our Food Delivery program!

Here are all the **user stories** of our software:
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

### 1.1 - `Employee` model

Our restaurant has two types of employees, **managers** and **delivery guys**. Both have an id, a username and a password, but they have different privileges depending of their roles.

Write some code to implement this and crash-test your model in `irb`. Then test your code by running `rake employee`.

All green? Good! Time to `git add`, `commit` and `push`.

### 1.2 - `Employee` repository

Now that we have a model representing our employees, we need a repository to store them.

This repository is initialized with a CSV file path. It has a **read-only** logic since only the administrator of our app can create accounts (no need for and `add` method). The interface of this repository allows to:
- Get all the delivery guys from the repository
- Find a specific employee thanks to its id
- Find a specific employee thanks to username

Write some code to implement this and crash-test your repository in irb. You should create your own `employees.csv` CSV file inside the `data` folder. Then test your code by running `rake employee`.

All green? Good! Time to `git add`, `commit` and `push`.

### 1.3 - `Session` controller

Let's implement a **login** logic in our app.

We want to have two menus in the router: one listing the tasks for managers and one listing the tasks for delivery guys. We also want to route the employee's choice to the corresponding action of the matching controller.

To handle that, we'll introduce the notion of a **session**. At the router level, we'll store the logged-in user in a session.

The sign-in sequence should go like this:
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

After signing in, the dashboard that you see should be **dependent on your role**.

Write some code to implement this behavior.


There is no rake for this part. Launch your app by running this command in the terminal:
```bash
ruby app.rb
```

Everything is working? Good! Time to `git add`, `commit` and `push`.

## 6 - `Order` Time to link all the models!

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
Optional: At the moment, a user's password is stored straight in the CSV and is visible to anyone. Is that a good idea? What could we do instead?
