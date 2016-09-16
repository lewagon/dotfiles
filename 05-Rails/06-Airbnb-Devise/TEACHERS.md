## Guidelines

### DB scheme validation

- The DB scheme must have _a minima_ 3 linked tables: `users`, `products` (whatever the product is) and a joined table between.

```
  +--------------+       +-------------+
  |     users    |       |   products  |
  +--------------+       +-------------+
+-| id           |---+   | id          |-+
| | first_name   |   |   | name        | |
| | last_name    |   |   | description | |
| | address      |   +-->| owner_id    | |
| | phone_number |       +-------------+ |
| +--------------+                       |
|                                        |
|            +-------------+             |
|            |  bookings   |             |
|            +-------------+             |
|            | id          |             |
|            | start_time  |             |
|            | end_time    |             |
+----------->| customer_id |             |
             | product_id  |<------------+
             +-------------+
```

- The user must play 2 roles: `owner` of one or many `products` and `customer`

### Accepted routing

You will find 3 accepted routing below.

#### The dashboard way

- Users can see their `products`, their `bookings`, their `bookings` on their `products` through a dashboard.
- The dashboard view is associated to a `DashboardController` and a possible `profile` action.

#### The non-CRUD way

- Users can see products at `/products`, their own products at `/my_products`, etc...
- This requires custom actions in controllers and custom routes in router.

#### The namespacing way

- Requires new controllers: `Account::ProductsController` and `Account::BookingsController`

```
+-app
   |
   +-controllers
      |
      +-account
      |  |
      |  +-products_controller.rb
      |  |
      |  +-bookings_controller.rb
      |
      +-products_controller.rb
      |
      +-bookings_controller.rb
```
- Requires namespaced routes:

```ruby
# config/router.rb
namespace :account do
  resources :products
  resources :bookings
end
```
