## Background and Objectives

This is the largest exercise of the day. We will build a simple store interface program, where the user can see which items are available and their respective prices. The user can then select which items they wish to put in their shopping cart and, when they are done, checkout and see their final bill.

## Guidelines

- If you have time before lunch, start thinking about the pseudo-code for this challenge with the teacher.
- It should take you all the afternoon to finish it.
- Validate each step of the challenge with the teacher with an intermediate live-code 💻 to correct each step.

## Pseudo-code

How should your program work when you launch it? **Let's write the pseudo code**

```ruby
# interface.rb

# Pseudo-code
# 1. Print Welcome
# 2. Define your store (what items are for sale?)
# 3. Get items from the user (shopping)
# 4. Print the bill (checkout)
```

**Can you make the pseudo-code above a bit more detailed?**

## Step 1 - Dumb shopping 🛍

Here is the first version of our program:

```
ruby interface.rb

> --------------------
> Welcome to Instacart
> --------------------
> In our store today:
> kiwi: 1.25€
> banana: 0.5€
> mango: 4€
> asparagus: 9€
> --------------------
> Which item? (or 'quit' to checkout)
> kiwi
> Which item? (or 'quit' to checkout)
> pineapple
> Sorry, we don't have pineapple today.
> Which item? (or 'quit' to checkout)
> mango
> Which item? (or 'quit' to checkout)
> quit
> -------BILL---------
> TOTAL: 5.25€
> --------------------
```

### Modeling the store and the cart

- How do we model the `store` and the `cart`?
- What's the **most suited structure for each one**?
- Should we use an array? Should we use a hash (which keys and which values)?

**Brainstorm with your teacher before starting!**

## Step 2 - Adding quantity 🛍🛍

```
ruby interface.rb

> --------------------
> Welcome to Instacart
> --------------------
> In our store today:
> kiwi: 1.25€
> banana: 0.5€
> mango: 4€
> asparagus: 9€
> --------------------
> Which item? (or 'quit' to checkout)
> kiwi
> How many?
> 2
> Which item? (or 'quit' to checkout)
> mango
> How many?
> 3
> Which item? (or 'quit' to checkout)
> quit
> -------BILL---------
> kiwi: 2 X 1.25€ = 2.5€
> mango: 3 X 4€ = 12€
> TOTAL: 14.5€
> --------------------
```

### Modeling the store and the cart

- How do we modify the `store` and the `cart` to take the quantity into consideration?
- What do we need to change in our code with this new modelling?

## Step 3 - Adding availability 🛍🛍🛍

Now let's push the program further and handle our stock (with availability):

```
ruby interface.rb

> --------------------
> Welcome to Instacart
> --------------------
> In our store today:
> kiwi: 1.25€ (5 available)
> banana: 0.5€ (4 available)
> mango: 4€ (1 available)
> asparagus: 9€ (5 available)
> --------------------
> Which item? ('quit' to checkout)
> kiwi
> How many?
> 2
> Which item? ('quit' to checkout)
> kiwi
> How many?
> 4
> Sorry, there are only 3 kiwis left.
> [...]
```

### Modelling the store and the cart

- How do we modify the `store` and the `cart` to take the quantity into consideration?
- What do we need to change in our code with this new modelling?

## Flashcards

To help you master the keys objectives of this reboot day you can redo the 2 following decks of flashcards: **Flow, Conditions, Arrays** as well as the ones on **Iterators & Blocks**.