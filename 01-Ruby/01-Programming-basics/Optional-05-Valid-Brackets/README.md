## Background and Objectives

Congratulations for reaching the last optional challenge! You have probably noticed during the session that round brackets `()`, square brackets `[]` and curly brackets `{}` can break your code if they are not paired correctly. Imagine if we had a way to proofread the code and check if we are for example not missing a closing bracket. Actually, let's do it now!

## Specs

The goal of this challenge is to write a method that takes a string of brackets, and determines if the order of the brackets is valid. The method should return `true` if the string is valid, and `false` if it is invalid.

Along with opening `(` and closing `)` brackets, input may contain any valid ASCII characters. Furthermore, the input string may be empty or not contain any brackets at all.

Do not treat other forms of brackets (e.g. `[]`, `{}`) yet. We will handle them in the second part of the challenge!

After finishing this part of the challenge you should be passing the first part of `rake`.

## Examples

```ruby
"()"              =>  true
")(()))"          =>  false
"("               =>  false
"(())((()())())"  =>  true
```

## Different Brackets

Let's take it a step further and introduce more complexity.

The input string will consist of round, square and curly brackets: `()` `[]` `{}`.

Update your `valid_brackets?` method accordingly to pass all tests.

## Examples

```ruby
"(){}[]"   =>  true
"([{}])"   =>  true
"(}"       =>  false
"[(])"     =>  false
"[({})](]" =>  false
```
