## Validation Guidelines (Monday morning)

Here are some instructions for validating DB and routes when kick-starting project on Monday morning. Note that students work on a Airbnb-like so they can replace `flats` by any other table of `offers` (e.g. renting `boats`, `cats`, `gardens`, etc.).

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

- Users can see offers at `/offers`, their own offers at `/my_offers`, etc.
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

## Le Wagon's minimal template (Monday afternoon)

Don't let students waste time and creating their Rails app from scratch. Use our minimal template with already a frontend setup (Bootstrap, Simple Form)

```bash
cd ~/code/<user.github_nickname>
rails new \
  --database postgresql \
  -m https://raw.githubusercontent.com/lewagon/rails-templates/master/minimal.rb \
  APP_NAME
```

## Intermediate demo (until Wednesday)

For the first intermediate demo on Wednesday evening, every team should have:

- A well-designed app (Bootstrap classes for form inputs and buttons, content centered in `container`, responsive grid for flat's cards, nice home page, functional navigation bar, etc.).
- Where a user can signup/signin
- Where a user can post a new offer (and attach pictures to it)
- Where a user can check all offers and see one specific offer
- They should have started working on the "booking" features (at least embed a booking form in the offer show page).
- Every page should have a clean design.

If you see students losing time on non-core features (edit your profile, connect with Facebook, geocode the offers, etc.) while they have not finished the core ones or have a dirty design for main pages, **it's your role to put them back on track**. You are a teacher but also a product manager this week!

On the contrary, if all your teams have a very well designed app with simple core features working, they will be really motivated to keep enhancing their app and make kick-ass final demo on Friday evening.
