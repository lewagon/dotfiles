## Background and Objectives

We will build a simple calculator capable of handling the 4 basic operations (`+`, `-` , `*`, `/`). The program will ask the user for two numbers and one of the four operators in order to be able to perform a simple calculation and display the result to the user.

## Guidelines

This challenge should take you **30 minutes 🕒**

1. Let's kickstart the challenge with the teacher (as a live-code 💻) and **write the pseudo-code together**.
2. Then spend 10 minutes on your own to try and figure out the solution.
3. You'll then correct it with the teacher (again as a live-code 💻).

## Pseudo-code

We will always start with the `interface.rb` file. That's the file you will launch (with the command `ruby interface.rb`) to run your program. It's always intuitive to start with the interface and ask yourself **"What should happen when I launch my program?"**

Always kickstart a challenge altogether with the teacher and write the *pseudo-code*. For example:

```ruby
# interface.rb

# Pseudo-code (what are the steps in plain english):
# 1. Say hello to the user
# 2. Ask user for the first number
# 3. Get user answer
# 4. Ask user for second number
# 5. etc.
```

**Writing the pseudo-code is 80% of the job!** Then translating english into Ruby is really the easy part. Adopt this pseudo-code methodology for **every** challenge of the Reboot session.

## Step 1 - Dumb calculator

Build a simple calculator with a command-line UI:

- First handling only additions
- Then all operations (mutliplications, subtractions, divisions).

It should work like this:

```bash
ruby interface.rb

> Enter a first number:
> 6
> Enter a second one:
> 8
> Choose operation [+][-][*][/]
> *
> Result: 48
```

There is no tests for the reboot exercises but you can still run `rake` to check the style of your code.

## Step 2 - Make it loop

It's a bit painful to re-launch your calculator every time your program ends.. Imagine a real calculator that just switched off after every operation 😊

Make it loop! Think about when you want the program to stop looping.

```bash
ruby interface.rb

> Enter a first number:
> 6
> Enter a second one:
> 8
> Which operation [+][-][x][/]
> x
> Result: 48
> Do you want to calculate again? [Y/N]
> Y
> Enter a first number:
> 55
> Enter a second one:
> 2
> Which operation [+][-][x][/]
> -
> Result: 53
> Do you want to calculate again? [Y/N]
> N
```

## Step 3 - Refactor your code

- What's the code that is really part of the UI (`gets` and `puts`)?
- What's the code that does not belong to the interface?

Try to refactor the code with the help of the teacher. For instance you can create a new `calculator.rb` file:

```ruby
# calculator.rb
def calculate(first_number, second_number, operator)
  # compute and return result
end
```

And use it in your interface:

```ruby
# interface.rb
require_relative "calculator"

# [...]
```

## Flashcards

To help you master the keys objectives of this reboot day you can redo the 2 following decks of flashcards: **Flow, Conditions, Arrays** as well as the ones on **Iterators & Blocks**.