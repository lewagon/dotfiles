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

---

[...]

## 5 - (`Employee`)

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

## 7 - (Optional) - `Destroy` actions

We haven't done any **deleting** yet. How would you implement these additional user stories?

- As a manager, I can delete a meal
- As a manager, I can delete a customer

