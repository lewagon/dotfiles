## Background & Objectives

The objective of this challenge is to build a 2-models Rails app with restaurant and anonymous reviews. You can refer to [Rails guide](http://guides.rubyonrails.org/getting_started.html#adding-a-second-model) to see a similar example on articles and comments.

## Specs

### Active Record Models

#### Attributes
- A restaurant has a name, an address, a phone number, and a category (chinese, italian)
- A review has a content and a starring (between 0 and 5)

#### Associations
- A restaurant has many reviews
- A review belongs to a restaurant
- When you delete a restaurant in the DB, it should delete all related reviews (see the `dependent: :destroy` option of the `has_many` association)

#### Validation
- A restaurant must have at least a name and an address. The category should belongs to a fixed list `[:chinese, :italian, :japonese, :french, :belgian]`
- A review must have a content and a starring. The starring should be a number between 0 and 5.

### Routing
Asking yourself what routes you need is an important step. It depends on what features you want for your app. Let's define our minimal product:

- A user can see the list of all restaurant.
- He can see the details of a restaurant, with all reviews related to the restaurant.
- He can add a new review.
- And that's it!

A user cannot create / delete / update any restaurant. The restaurant database will be seeded by the admin (you). A user cannot update or delete any review. That will be the role of the admin to make some curation on his rails console :)

We know that it's a pretty poor first version. However, the goal is to force you to think about your routes, and not create 7 CRUD routes for any resources of your app!

List all the routes you need to build this product, and check the list with a teacher.

## Seeding
You can seed your restaurant database in `db/seeds.rb`. Ex:

```ruby
# db/seeds.rb

Restaurant.create(name: "Epicure, Bristol", address: "112 r. Fg St-Honoré 75008", phone: "01 53 43 43 40")

Restaurant.create(name: "L'atelier de Joel Robuchon", address: "133 av. des Champs-Élysées 75008", phone: "01 47 23 75 75")

# etc.
```

You will have to run `rake db:seed` to launch the seeding ruby script.
