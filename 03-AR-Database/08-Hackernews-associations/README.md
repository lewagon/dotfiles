## Background & Objectives

Now, it's time to add `users` to your database and to link users and posts.

## Specs

A `User` has the following attributes:

* name:String
* email:String
	
A user can have multiple posts. A post belongs to one user. To model this one-to-many relationships, two steps are necessary:

1. Modify your database scheme, adding a foreign key in the relevant table. For that, you will use a migration.
2. Translate this mapping in the Active Record world, through [associations](http://guides.rubyonrails.org/association_basics.html)

Again, you have to undersand that your db comes first, it is the physical representation of your data. Active Record comes second and represent your db in the ruby world.


* Add a new migration to create the `users` table.
* Add a new migration to add the `user_id` foreign key to your `posts` table
* Run your migrations with the adequate `rake` task
* Specify the Active Record associations for your models `Post` and `User`. For more information about Active Record associations, read [this](http://guides.rubyonrails.org/association_basics.html)

## Learning Badges

- Which kinds of relations between table do you know?
- How does Active Record models these DB relations in the ruby world?
- Whichs kinds of Active Record associations do you know (for every type of relationships between tables)?