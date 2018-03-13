## Background & Objectives

Let's say you have a user database with thousands of emails, and you want to analyze them according to their provider.

### The problem

Your input will be a ruby Array containing all your users' email. For instance:

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

You need to group these users depending on their mail provider (gmail, yahoo, hotmail,...), and put the result in a hash:

```ruby
group_mails(users)
# => {
#   "yahoo" => ["bob@yahoo.fr", "bigbox@yahoo.fr"],
#   "hotmail" => ["roger57@hotmail.fr"],
#   "lewagon" => ["boris@lewagon.org"],
#   "gmail" => ["monsieur.olivier@gmail.com", "monsieur.mack@gmail.com"]
# }
```

Write a method `provider?(email, provider)` which returns `true` if an email is from a given provider. For instance, with our previous array we have this output:

```ruby
email = "bob@gmail.com"
provider?(email, "gmail") # => true
provider?(email, "lewagon") # => false
provider?(email, "noos") # => false
```
