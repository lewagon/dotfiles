## Background and Objectives

Have you ever noticed that your credit cards normally start with a 4 or 5? That's because there's a pattern.
In this exercise, we'll implement the
[Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) to check if a credit card number is valid.

## Specs

There are three methods to implement in this exercise. First, we'd like to code two methods,
`visa?` and `mastercard?` which will return a boolean based on the `card` argument they receive.

One thing you need to know first is that if your credit card number starts with a `5`, then it was issued by Mastercard, and if starts with a `4` then it was issued by Visa. Check inside your wallet!

```ruby
visa?("4242 4242 4242 4242")
# => true

mastercard?("4242 4242 4242 4242")
# => false
```

Once you've implemented these two simple methods, let's get to the meat of this exercise.

Quoting Wikipedia, here's the algorithm:

1. From the rightmost digit, which is the check digit, and moving left, double the value of every second digit. If the result of this doubling operation is greater than 9 (e.g., 8 × 2 = 16), then add the digits of the product (e.g., 16: 1 + 6 = 7, 18: 1 + 8 = 9) or alternatively subtract 9 from the product (e.g., 16: 16 - 9 = 7, 18: 18 - 9 = 9).
1. Take the sum of all the digits
1. If the total modulo 10 is equal to 0 (if the total ends in zero) then the number is valid according to the Luhn formula; else it is not valid.

If you are more comfortable with a graphic representation, here is one:

![](https://i.stack.imgur.com/Cenb3.png)

This is what you should get:

```ruby
valid_card?("4242 4242 4242 4242")
# => true

valid_card?("4242 4242 4242 4241")
# => false
```

You'll discover by running `rake` that your code should work even if the credit card number was given with spaces. This is something to keep in mind: user input will always be dirty.

