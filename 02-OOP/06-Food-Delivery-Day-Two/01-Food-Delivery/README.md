Make sure you execute the commands above 👆

Then let's copy the code from yesterday.

```bash
cp -r ../../05-Food-Delivery-Day-One/01-Food-Delivery/{app,data,app.rb,router.rb} . # trailing dot is important
```

Then, check that the code working from yesterday still does:

```bash
rake
```

You should continue with your own code and keep adding features to the router / making the `rake` greener. Of course, you can have a look at [this morning's code](https://github.com/lewagon/food-delivery/tree/lecture-day-two) to get some inspiration.

---

[...]

## 5 - (`Employee`) Who's working here?

The restaurant has two types of employees, **managers** and **delivery guys**. We want to implement a **read-only** logic for `EmployeesRepository` from a CSV file that we fill manually (no need for an `add` action).

Open your `employees.csv` file and manually add some employees:

```bash
id,username,password,role
1,paul,secret,manager
2,john,secret,delivery_guy
```

With that information, we can implement a **login** logic in our app to have two menus in the router depending on the user role: a menu for the manager, and a menu for the delivery guy (with less user actions available).

To handle that, we'll introduce a notion of **session**. At the router level, we'll store the logged in user in a session.

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
Welcome paul!
```

Now when you run the food delivery app, the first thing you can do is to **sign in**, and then the menu printed to you should be **dependent on your role**:

```bash
ruby app.rb
```

To launch only employee tests, use `rspec -t employee`

Done? Good! Time to `commit` and `push`.

Optional: Their password would be stored in clear in the CSV / display in clear, is that a good idea? What could we do?

## 6 - (`Order`) Time to link all the models!

An order is taken for a given **customer**, a given **meal** (we'll simplify to say that an order is **just one meal**) and assigned to a given **delivery guy**. Moreover, the `Order` model should store the info that it has been delivered (or not).

That's where our models become connected together. Write the `Order` model class and its repository.

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

To launch only order tests, use `rspec -t order`

## 7 - (Optional) - Destroy actions

We did not talk about **deleting** stuff here. What happens if you want to implement these new user stories?

- As a manager, I can delete a meal
- As a manager, I can delete a customer
