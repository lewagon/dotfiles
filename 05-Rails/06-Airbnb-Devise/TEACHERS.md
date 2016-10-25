## Guidelines

### DB scheme validation

- The DB scheme must have _a minima_ 3 linked tables: `users`, `offers` (whatever the offer is) and a joined table between.

```
  +--------------+       +-------------+
  |     users    |       |    offers   |
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
             | offer_id    |<------------+
             +-------------+
```

- The user must play 2 roles: `owner` of one or many `offers` and `customer`

### Accepted routing

You will find 3 accepted routing below.

#### The dashboard way

- Users can see their `offers`, their `bookings`, their `bookings` on their `offers` through a dashboard.
- The dashboard view is associated to a `DashboardController` and a possible `profile` action.

#### The non-CRUD way

- Users can see offers at `/offers`, their own offers at `/my_offers`, etc...
- This requires custom actions in controllers and custom routes in router.

#### The namespacing way

- Requires new controllers: `Account::OffersController` and `Account::BookingsController`

```
+-app
   |
   +-controllers
      |
      +-account
      |  |
      |  +-offers_controller.rb
      |  |
      |  +-bookings_controller.rb
      |
      +-offers_controller.rb
      |
      +-bookings_controller.rb
```
- Requires namespaced routes:

```ruby
# config/routes.rb
namespace :account do
  resources :offers
  resources :bookings
end
```
