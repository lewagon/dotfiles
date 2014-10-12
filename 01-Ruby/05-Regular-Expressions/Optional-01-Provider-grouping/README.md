## Background & Objectives

Let's say you have a user database with thousands of email, and you want to make some semantic analysis on these emails depending on their provider.

### The problem

In input, you have a ruby Array containing all your users' email. For instance

```ruby
users = [
  "bob@yahoo.fr",
  "roger57@hotmail.fr",
  "bigbox@yahoo.fr",
  "boris@lewagon.org",
  "monsieur.olivier@gmail.com",
  "monsieur.mack@gmail.com"
]
```

You want to group these users depending on their mail provider (gmail, yahoo, hotmail,...), and put the result in a hash.

```ruby
group_mails(users)
# => {
#   "yahoo" => ["bob@yahoo.fr", "bigbox@yahoo.fr"],
#   "hotmail" => ["roger57@hotmail.fr"],
#   "lewagon" => ["boris@lewagon.org"],
#   "gmail" => ["monsieur.olivier@gmail.com", "monsieur.mack@gmail.com"]
# }
```

Write a method `provider?(user_array, provider)` which takes a provider name as input, and tells you whether or not you have emails from that provider in your user array. For instance, with or previous array

```ruby
provider?(users, "gmail") # => true
provider?(users, "lewagon") # => true
provider?(users, "noos") # => false
````












