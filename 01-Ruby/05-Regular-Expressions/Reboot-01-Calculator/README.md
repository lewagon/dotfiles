## Guidelines

This challenge should take you **30 minutes 🕒**

1. Let's kickstart the challenge with the teacher (as a live-code 💻) and **write the pseudo-code altogether**.
2. Then work 10 minutes on your own to try to figure out the solution.
3. Then correct it altogether with the teacher (again as a live-code 💻).

## ReBoot setup

For Reboot challenges we will not use `rake` and we will create a new folder for every new challenge and start coding from scratch. Sometimes that's the best way to learn.

First, let's create a `reboot` folder for these 2 days:

```bash
mkdir ~/code/<user.github_nickname>/reboot
cd ~/code/<user.github_nickname>/reboot
```

Now let's create a folder for the first challenge:

```bash
mkdir calculator
cd calculator
touch interface.rb
```

We will always start with the `interface.rb` file. That's the file your will launch (with `ruby interface.rb`) to execute your program. It's always intuitive to start with the interface and ask yourself **"What should happen when I launch my program?"**


## Pseudo-code

Always kickstart a challenge altogether with the teacher and write the *pseudo-code*. For example:


```ruby
# interface.rb

# Pseudo-code (what are the steps in plain english):
# 1. Say hello to the user
# 2. Ask user for first number
# 3. Get user answer
# 4. Ask user for second number
# 5. etc...
```

**Writing the pseudo-code is 80% of the job!** Then translating english into ruby is really the easy part. Adopt this pseudo-code methodology for every challenge of the Reboot session.


## Dumb calculator

Build a simple calculator with a command-line UI:

- First handling only additions
- Then all operations (mutliplications, substractions, divisions).

It should work like this:

```bash
ruby interface.rb

> Enter a first number:
> 6
> Enter a second one:
> 8
> Which operation [+][-][x][/]
> x
> Result: 48
```

## Make it loop

It's a bit painful to re-launch your calculator every time your program ends.. Imagine a real calcultor that just switch off after every operation :)

Make it loop:

```bash
ruby interface.rb

> Enter a first number:
> 6
> Enter a second one:
> 8
> Which operation [+][-][x][/]
> x
> Result: 48
> Enter a first number:
> 55
> Enter a second one:
> 2
> Which operation [+][-][x][/]
> -
> Result: 53
```

## Refacto your code

- What's the code that is really part of the UI (`gets` and `puts`)?
- What's the code that does not belong to the interface?

Try to refactor the code with the help of the teacher. For instance you can create a new `calcultor.rb` file:

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
