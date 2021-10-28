## Background & Objectives

### Discuss with your buddy

- What are the differences between a string and a symbol?
- When should you use one vs the other?
- Memory-wise, what's the behavior of each one?

### Technical overview

For Ruby beginners, understanding symbols can be quite tricky. As a rule of thumb, symbols are pretty similar to strings, but:

When you use a string less for its textual content, and more as a kind of unique identifier in your program, you should consider using a Symbol.

Because of this, many Hash keys are symbols, given their job is more to identify things than to simply be plain text. Here's an example:

```ruby
fox = { color: "red", species: "mammal" }
```

`:color` and `:species` are used as identifiers here, so we use symbols. Their actual text value has been chosen so that a human can quickly understand what the keys represent.

Note: you may occasionally see this other (old) syntax too:

```ruby
fox = { :color => "red", :species => "mammal" }
```

Read [this StackOverflow answer](http://stackoverflow.com/a/8189435/197944/) if you really want to get into the subtle differences between Strings and Symbols. The concept of **mutability** is important here.

## Specs

Look at the `lib/symbols.rb`. You will find a true/false quiz and a few methods to test your ability to pick symbols over strings.

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
