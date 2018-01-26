## Background & Objectives

When recruiting developers for your team, you often interview people who struggle with basic code. There is a famous article talking about
[Why Can't Programmers... Program?](http://blog.codinghorror.com/why-cant-programmers-program/) where it talks about the "FizzBuzz" problem.

Let's work on this basic program and make sure that we can do it 😊

## Specs

Write a method `fizz_buzz` which takes a `number` as an argument, and
return an array of `number` elements from 1 to `number`, but replaces some
of them according to these rules:

- If the number is divisible by `3`, then replace it by `'Fizz'`
- If the number is divisible by `5`, then replace it by `'Buzz'`
- If the number is divisible by both `3` and `5`, then replace it by `'FizzBuzz'`

e.g.

```ruby
fizz_buzz(7)
# => [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7]
```
