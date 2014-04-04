### The context
You can extract lots of information from someone's email address. There are even some [jokes on the topic](http://theoatmeal.com/comics/email_address). Let's say you have a user database with thousands of email, and you want to make some semantic analysis on these emails depending on their provider.

### The problem
* In input, you have a ruby Array containing all your users' email. For instance

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

* You want to group these users depending on their mail provider (gmail, yahoo, hotmail,...), and put the result in a hash.

```ruby
group_mails( users ) 
=> { 
  "yahoo" => ["bob@yahoo.fr", "bigbox@yahoo.fr"], 
  "hotmail" => ["roger57@hotmail.fr"], 
  "lewagon" => ["boris@lewagon.org"], 
  "gmail" => ["monsieur.olivier@gmail.com", "monsieur.mack@gmail.com"]
}
```

### Improve your hash using symbols
Change your function `group_mails` to use symbols instead of strings for keys.

* Let's say you have new users in you array input.
* If you group again the emails with this new input, what's the interest of using symbols as keys ?

### Add some functionality
Write a method `has_provider?(user_array, provider)` which takes a provider name as input, and tells you whether or not you have emails from that provider in your user array. For instance, with or previous array

```ruby
has_provider?(users, "gmail") # => true
has_provider?(users, "lewagon") # => true
has_provider?(users, "noos") # => false
````
You should write this method 2 different ways :
* starting from the initial user array
* using the hash resulting from your first provider grouping method, thhis should take **1 line** using this method.

*Be carefull, "john.gmail@hotmail.fr" has not the Gmail provider :)*











