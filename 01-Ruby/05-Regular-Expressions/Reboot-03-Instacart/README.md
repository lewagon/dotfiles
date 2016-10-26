## Guidelines

- You should kickstart this challenge before lunch altogether with the teacher.
- Then it will take your all the afternoon to finish it.
- Validate each step of the challenge with the teacher with an intermediate correction live-code 💻.

## Setup

Let's create a folder for this new challenge:

```bash
$ cd ~/code/${GITHUB_USERNAME}/reboot
$ mkdir instacart
$ cd instacart
$ touch interface.rb
```

Again let's start with the interface. It's more intuitive.

## Pseudo-code

How should your program work when your launch it? **Let's write the pseudo code**


```ruby
# interface.rb

# Pseudo-code
# 1. Print Welcome
# 2. Define your store (with a bunch of food items)
# 2. Get items from the user (shopping step)
# 3. Print the bill (cashier step)
```

**Can you to detail a bit more the pseudo-code above?**


## Step 1 - dumb shopping 🛍


```ruby
$ ruby interface.rb
> --------------------
> Welcome to Instacart
> --------------------
> In our store today:
> kiwi: 1.25€
> banana: 0.5€
> mango: 4€
> asparagus: 9€
> --------------------
> Which article? ('exit' to checkout)
> kiwi
> Which article? ('exit' to checkout)
> pineapple
> Sorry, we don't have pineapple
> Which article? ('exit' to checkout)
> mango
> Which article? ('exit' to checkout)
> exit
> -------BILL---------
> TOTAL: 5.25€
> --------------------
```

How do we model the `store` and the `cart`? What's the most convenient for each one?

- Should we use an array?
- Should we use an array? Which keys? Which values?

*Brainstorm with your teacher before starting!*

## Step 2 - Adding quantity 🛍🛍

```ruby
$ ruby interface.rb
> --------------------
> Welcome to Instacart
> --------------------
> In our store today:
> kiwi: 1.25€
> banana: 0.5€
> mango: 4€
> asparagus: 9€
> --------------------
> Which article? ('exit' to checkout)
> kiwi
> Which quantity?
> 2
> Which article? ('exit' to checkout)
> mango
> Which quantity?
> 3
> Which article? ('exit' to checkout)
> exit
> -------BILL---------
> kiwi: 2 X 1.25€ = 2.5€
> mango: 3 X 4€ = 12€
> TOTAL: 14.5€
> --------------------
```

How do we modify the `store` and the `cart` to take the quantity into consideration?


## Step 3 - Adding availability 🛍🛍🛍

Now let's push the program further and handle our stock, with availability:

```ruby
$ ruby interface.rb
> --------------------
> Welcome to Instacart
> --------------------
> In our store today:
> kiwi: 1.25€ (5 items)
> banana: 0.5€ (4 items)
> mango: 4€ (1 items)
> asparagus: 9€ (5 items)
> --------------------
> Which article? ('exit' to checkout)
> kiwi
> Which quantity?
> 2
> Which article? ('exit' to checkout)
> kiwi
> Which quantity?
> 4
> Sorry, only 3 kiwis remaining..
> [...]
```
