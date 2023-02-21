Make sure you execute the commands above 👆

**IMPORTANT** 👇

Copy the code from the last block:

```bash
cp -r ../../04-Food-Delivery-Day-One/01-Food-Delivery/{app,data,app.rb,router.rb} . # trailing dot is important
```

Then, before you start, check that it still works by launching your app:

```bash
ruby app.rb
```

Then, finally, you can run:

```bash
rake
```

Now continue with your own code and keep adding features to the router / making the `rake` greener.

Let's add more features to our Food Delivery program!

Here are all the **user actions** of our app:
[ ] As an employee, I can log in
[X] As a manager, I can add a new meal
[X] As a manager, I can list all the meals
[X] As a manager, I can add a new customer
[X] As a manager, I can list all the customers
[ ] As a manager, I can add a new order
[ ] As a manager, I can list all the undelivered orders
[ ] As a rider, I can mark one of my orders as delivered
[ ] As a rider, I list all my undelivered orders

Hence, there are two new components:
- **Employees**
- **Orders**

## 1 - Employees

### 1.1 - Employee model

Our restaurant has two types of employees, **managers** and **riders**. Both have an `id`, a `username` and a `password`, but they have different privileges depending of their `role`.

Write some code to implement this and crash-test your model. Then test your code by running `rake employee`.

All green? Good! Time to `git add`, `commit` and `push`.

### 1.2 - Employee repository

Now that we have a model representing our employees, we need a repository to store them.

This repository is initialized with a CSV file path. It has a **read-only** logic since only the administrator of our app can create accounts (no need for and `add` method). The interface of this repository allows to:
- Get `all_riders` from the repository
- `find` a specific employee thanks to its id
- `find_by_username` a specific employee thanks to their username

Write some code to implement this and crash-test your repository in `irb`. You should create your own `employees.csv` CSV file inside the `data` folder. Then test your code by running `rake employee`.

All green? Good! Time to `git add`, `commit` and `push`.

### 1.3 - Sessions controller

Let's implement a **login** logic in our app.

We want to have two menus in the router: one listing the tasks for managers and one listing the tasks for riders. We also want to route the employee's choice to the corresponding action of the matching controller.

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

## 2 - Orders

### 2.1 - Order model

Our restaurant takes orders, so we need a way to represent what an order is.

An order is what ties everything together. Each order has an id, a meal, a customer, an employee plus a `delivered` boolean to record whether or not the order has been delivered.

Write some code to implement this and crash-test your model. Then test your code by running `rake order`.

All green? Good! Time to `git add`, `commit` and `push`.

### 2.2 - Order repository

Now that we have a model representing our orders, we need a repository to store them.

This repository is initialized with a CSV file path. It reads/writes the orders from the CSV file and store them in memory. The interface of this repository allows to:
- Create a new order
- Get all the undelivered orders

Since an order has a `meal`, a `customer` and an `employee` **instances**, we also need to initialize our order repository with a meal repository, a customer repository and an employee repository.

Write some code to implement this and crash-test your repository. You should create your own `orders.csv` CSV file inside the `data` folder. Then test your code by running `rake order`.

**Important**: the `order_repository` tests run by `rake` **only work if you define the parameters in `#initialize` in the same order as in the tests**:

```ruby
class OrderRepository
  def initialize(orders_csv_path, meal_repository, customer_repository, employee_repository)
    # [...]
  end

  # [...]
end
```

Also, make sure that your Orders CSV file stores the information with these header names so you can pass the tests:
`id, delivered, meal_id, customer_id, employee_id`

All green? Good! Time to `git add`, `commit` and `push`.

### 2.3 - Orders controller

Let's move to the controller. Here are the **user actions** we want to implement:
- As a manager, I can `add` a new order
- As a manager, I can `list_undelivered_orders`
- As a rider, I `list_my_orders` to list all my undelivered orders
- As a rider, I can `mark_as_delivered` one of my undelivered orders

Remember that the role of the controller is to delegate the work to the other components of our app (models, repositories and views)!

Start by writing the **pseudocode**, breaking each user action into elementary steps and delegating each step to a component (model, repository or views). Then write the code to implement each step. Create the view and code it step by step.

To test your controller, link it to your app by instanciating it in `app.rb` and passing it to the router. Then you can crash-test your code by launching your app:

```bash
ruby app.rb
```

`rake order` should also help you go through all these steps. Follow your guide!

Make sure your four order user actions work before moving on to the next feature.

**Important**: the `orders_controller` tests run by `rake` **only work if you define the parameters in `#initialize` in the same order as in the tests**:

```ruby
class OrdersController
  def initialize(meal_repository, customer_repository, employee_repository, order_repository)
    # [...]
  end

  # [...]
end
```

**Warning** ⚠️ Since **ids** do not necessarily start from 1 and are not necessarily continuous, it's a **bad practice to ask a user for an id**.

Imagine we have 3 meals, with id `1234`, `4242` and `987654`. We **don't** want to display:

```bash
1234 - pizza
4242 - burger
987654 - salad

Please choose an id:
>
```

Instead, we want to use **indexes** to improve the user experience:

```bash
1 - pizza
2 - burger
3 - salad

Please choose an index:
>
```

All green? Good! Time to `git add`, `commit` and `push`.

## 3 - (Optionals)

### 3.1 - Implement `edit` and `destroy` actions for orders

In our app, a manager can't edit or destroy an existing order.

Implement these additional user actions:
- As a manager, I can edit an existing order
- As a manager, I can destroy an existing order

Done? Time to `git add`, `commit` and `push`.

### 3.2 - Hide the user's password

At the moment, a user's password is stored straight in the CSV and is visible to anyone. Is that a good idea? What could we do instead?

Done? Time to `git add`, `commit` and `push`.

You're done with Food Delivery!
