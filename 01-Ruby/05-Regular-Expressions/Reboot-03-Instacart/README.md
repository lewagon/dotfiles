## Guidelines

- You should kickstart this challenge before lunch altogether with the teacher.
- Then it will take your all the afternoon to finish it.
- Validate each step of the challenge with the teacher with an intermediate live-code 💻 to correct each step.

## Setup

Let's create a folder for this new challenge:

```shell
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

Here is the first version of our program:


```shell
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
> Which article? ('quit' to checkout)
> kiwi
> Which article? ('quit' to checkout)
> pineapple
> Sorry, no pineapple..
> Which article? ('quit' to checkout)
> mango
> Which article? ('quit' to checkout)
> quit
> -------BILL---------
> TOTAL: 5.25€
> --------------------
```

### Modeling the store and the cart

- How do we model the `store` and the `cart`?
- What's the most convenient stucture for each one?
- Should we use an array?
- Should we use a hash? With which keys and which values?

**Brainstorm about it with your teacher before starting!**

## Step 2 - Adding quantity 🛍🛍

```shell
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
> Which article? ('quit' to checkout)
> kiwi
> Which quantity?
> 2
> Which article? ('quit' to checkout)
> mango
> Which quantity?
> 3
> Which article? ('quit' to checkout)
> quit
> -------BILL---------
> kiwi: 2 X 1.25€ = 2.5€
> mango: 3 X 4€ = 12€
> TOTAL: 14.5€
> --------------------
```

### Modeling the store and the cart

- How do we modify the `store` and the `cart` to take the quantity into consideration?
- What do we need to change in our code?

## Step 3 - Adding availability 🛍🛍🛍

Now let's push the program further and handle our stock (with availability):

```shell
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
> Which article? ('quit' to checkout)
> kiwi
> Which quantity?
> 2
> Which article? ('quit' to checkout)
> kiwi
> Which quantity?
> 4
> Sorry, only 3 kiwis remaining..
> [...]
```

### Modeling the store and the cart

- How do we modify the `store` and the `cart` to take the quantity into consideration?
- What do we need to change in our code?
