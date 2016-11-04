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

The `rake` should help you go through all these steps. Follow your guide!

To launch only meal tests, use `rspec -t meal`

Done? Good! Time to `commit` and `push`.

## 2 - We need a router!

We haven't launch our app code yet. We need a router and a `run` method. Go back to the **Cookbook** code to get some inspiration. Make sure that you can run the two meals-related user actions when launching the program:

```bash
ruby app.rb
```

Done? Good! Time to `commit` and `push`.

## 3 - (`Customer`) Who's always right?

We will maintain a list of all our customers. When a new customer calls to order, we'll first need to add him/her to our list. A customer has a name and an address. Work on the model, the repository to store the CSV (it's a different file than `meals.csv`!) and finally the controller to implement the following user actions:

- List all customers available in the restaurant
- Add a new customer (later, we'll restrict that to the manager role as well)

Once your controller methods are implemented, add them to the router! Make sure your 4 user actions work before moving on to the next feature.

```bash
ruby app.rb
```

To launch only customer tests, use `rspec -t customer`

Done? Good! Time to `commit` and `push`.

## 4 - (Optional) Inheritance to the rescue

When you look at `MealsRepository` and `CustomersRepository`, don't you see similarities? We want to stay [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), so time to introduce a parent class, `BaseRepository`, which will hold the common behavior.

Reminder: as it's an optional section, you can skip it and come back to it later.

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
