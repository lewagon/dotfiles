## Background & Objectives

### Discuss with classmates

- What are the differences between Strings and Symbols?
- When is it more relevant to use one or the other type?
- Memory-wize, what's the behavior of each type?

### Technical overview

For ruby beginners, understanding symbols can be quite harsh.
A rule of thumb, symbols are "like" strings, but:

When you use a string not really for its textual content, but as a kind of tag/unique identifier in your program, you should consider using a Symbol.

Hence many Hash keys are symbols, as they are more here to identify things than for their "text value". Consider for instance this Hash:

```ruby
fox = { color: "red", species: "mammal" }
```

The `:color` and `:species` keys are used as identifiers, their actual text value is chosen so that a human can quickly understand what these hash keys are about. Hence we used Symbols instead of Strings.

You may find this other syntax:

```ruby
fox = { :color => "red", :species => "mammal" }
```

Read [this StackOverflow answer](http://stackoverflow.com/a/8189435/197944/) to understand more in-depth the subtle difference  between Strings and Symbols. The concept of **mutability** is important here.

## Specs

Look at the `lib/symbols.rb`, you will find a true/false quizz
and some methods to exercise your ability to pick symbols over strings.

Instructions are inlined in the file.

## Key learning points

For each example, which type should you use?

```ruby
{ "temperature" => "10 deg", "pressure" => "10 bar" }
# or
{ temperature: "10 deg", pressure: "10 bar" }
```

```ruby
user_name = :bob
# or
user_name = "bob"
# or
"user_name" = "bob"
# or
:user_name = :bob
```

```ruby
{ "action" => "show", controller => "users" }
# or something else? (you will see that in Rails)
```

*TL;DR: Use symbols every time you need internal identifiers that aren't generated dynamically*
