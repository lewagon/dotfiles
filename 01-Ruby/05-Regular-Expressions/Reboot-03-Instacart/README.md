## Guidelines

You should kickstart this challenge before lunch with the teacher. And then it will take your all the afternoon to finish it!

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

How should your program work when your launch it? Write the pseudo code!


```ruby
# interface.rb

# Pseudo-code

# 1. Print Welcome
# 2. Define your store (with a bunch of food items)
# 2. Get items from the user (shopping step)
# 3. Print the bill (cashier step)
```

For each step above (a bit too general), *try to detail a bit more the pseudo-code*.


## Start simple


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

## Adding quantity

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


## Adding availability

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
