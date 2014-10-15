## Background & Objectives

Let's dive into regular expressions, this time focusing on numbers.
More precisely, we'll learn how to handle phone numbers in your app.

## Specs

Write a method `french_phone_number?` that takes a string as parameter and returns a boolean,
`true` when the phone number is a valid French phone number:

- It is valid when starting with a `0` and containing 10 digits
- It is also valid when starging with `+33` and containing 11 digits

The method should ignore space or dashes between digits.

```ruby
french_phone_number?("0665363636")
#=> true

french_phone_number?("06 65 36 36")
#=> false
```

## Tips

Here is a great resource to tests your regex before writing code:
[Rubular](http://rubular.com/)