## Background & Objectives

Let's dive into regular expressions, this time focusing on numbers. More precisely, we'll learn how to handle phone numbers in your program.

## Specs

Write a method `french_phone_number?` that takes a string as parameter and returns a boolean `true` when the phone number is a valid French phone number, `false` otherwise:
- It is valid when starting with a `0` and containing 10 digits. The second digit cannot be a 0.
- It is also valid when starting with `+33` and containing 11 digits. And the digit following the `+33` cannot be a 0.

The method should ignore spaces or dashes between digits.

```ruby
french_phone_number?("0665363636")
#=> true

french_phone_number?("07 65 36 36 36")
#=> true

french_phone_number?("01-36-65-36-65")
#=> true

french_phone_number?("02 65 36 36")
#=> false
```

## Further suggestions

Here is a great resource to tests your regex before writing code: [Rubular](http://rubular.com/)
