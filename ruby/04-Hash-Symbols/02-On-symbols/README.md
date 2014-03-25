## Background & Objectives
### Figure Out !
Try to answer the following questions and discuss them together.

* what are the differences between Strings and Symbols ?
* When is it more relevant to use one or the other class ?
* In terms of memory, what's the behavior of each class ? 

### Now understand more in-depth 

For ruby beginners, understanding symbols can be quite harsh.. A rule of thumb, symbols are "like" strings, but :

* When you use a string not really for its textual content, but as a kind of tag, a unique identifier in your program, you should consider using a Symbol
* Hence many Hash keys are symbols, as they are more here to identify things than for their "text value". Consider for instance this hash `fox = { color: "red", specie: "mammal" }`. Here `:color` and `:specie` are more used as identifiers than for their actual content. Hence we used Symbols instead of Strings. Note that the old syntax `{ :color => "red", :specie => "mammal" }` for hashes with symbol keys is now replaced with the new one { color: "red", specie: "mammal" }, more JSON-like.
* Read [this article](http://www.robertsosinski.com/2009/01/11/the-difference-between-ruby-symbols-and-strings/) to understand more in-depth the subtle difference  between Strings and Symbols (in terms of mutability & memory allocation).

If you want to draw a parallel with a website, a form text input as the user name for sign up will correspond to a string in ruby, whereas something like an option (single/married, admin/teacher/student, or a filter option like "by_price/by_date") is likely to be translated into a ruby symbol, like `:single`, `:admin`, ":by_date"...


## Learning Badges
For each example what should you use ? try to examine what each solution means, and whether it's licit or not ?

* `{"temperature" => "10 deg", "pressure" => "10 bar"}` or `{temperature: "10 deg", pressure: "10 bar"}`  

* `user_name = :bob` or `user_name = "bob"` or  `"user_name" = "bob"` or  `:user_name = :bob` 

* `{"action" => "show", controller => "users"}` (you will see that in Rails) or something else ? 
