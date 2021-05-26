## Background and Objectives
Back to our Farm diary. After all the great work you did building the classes, let's reward our efforts by building a game on top of it! Let's build an interface where the player is a farmer who manages his/her crops and animals, and see the farm evolve thanks to an illustration we provide.

You will learn how to build an interface using an infinite loop!

## Setup

Let's start by importing your animals and crops classes in this challenge:

```bash
cp ../02-Farming-Diary-Crops/lib/{crop.rb,corn.rb,rice.rb} lib
cp ../03-Farming-Diary-Animals/lib/{animal.rb,cow.rb,chicken.rb} lib
```

In `lib/interface.rb`, we already added the right `require_relative` at the top of the file to load your classes 👌

## Specs

The player can choose between a set of actions: plant corn, plant rice, water the crops, add animals, etc.
When the player picks one action, we translate it in code using our classes and move on to the next choice. It's a loop. Let's build it step by step.

![Loop](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/farming-diary/loop.svg?sanitize=true)


There is no `rake` on this challenge.

### Start with a basic UI

Open `lib/interface.rb` and code a very basic user interface, running only once:
- Invite the player to pick a word from a list.
- Display a simple sentence for each word.

Running `ruby lib/interface.rb`, you should display something along:

```bash
Pick an action: [corn | rice | quit]
> corn
Let's plant corn crops!
```

or

```bash
Pick an action: [corn | rice | quit]
> rice
Rice crops today!
```

or

```bash
Pick an action: [corn | rice | quit]
> quit
See you next time
```

When the player types a random word:

```bash
Pick an action: [corn | rice | quit]
> lalala
I don't know what you mean...
```

**Note:** You can choose a basic `if` / `else` statement, or write your conditional with a [`case` / `when`](https://ruby-doc.org/docs/keywords/1.9/Object.html#method-i-case) statement, perfect for long lists of closed options.


### Make it loop

The game will not be very funny to play if it quits after one action. Make it loop until the `quit` action is typed the player. Running `lib/interface.rb`, should give the following output:

```bash
Pick an action: [corn | rice | quit]
> corn
Let's plant corn crops!

Pick an action: [corn | rice | quit]
> rice
Rice crops today!

Pick an action: [corn | rice | quit]
> corn
Let's plant corn crops!

Pick an action: [corn | rice | quit]
> quit
See you next time
```

### Planting crops

Now that you have the infinite loop in place, let's introduce our farm classes in the game. When the player picks `corn` or `rice`, instantiate objects of the appropriate class and store them in a `crops` array.

To give you an illustrated feedback of the state of the farm after each action, move the `Board.new.display` inside the loop. If your code works as expected, the farm will live :)


### Watering crops

Add a new action to the user interface: `water`:

```bash
Pick an action: [corn | rice | water | quit]
```

In this action, the player waters all the crops (corn and rice) already planted. Remember they both inherit the `water!` method from `Crop`.

### Animals

Congratulations on building the crops part. Do you want to give a try to build the animals part all by yourself?

The UI has three new entries (cow, chicken and feed):

```bash
Pick an action: [corn | rice | water | cow | chicken | feed | quit]
```

**Hints and clues:**
- `cow` and `chicken` actions create new instances of the corresponding classes and stores them in an `animals` array
- Chickens have a gender, picked randomly by the game
  <details>
  <summary markdown='span'>View solution</summary>

  ```bash
  when "chicken"
    gender = ["female", "male"].sample
    puts "The chicken is a #{gender}"
    Chicken.new(gender)
  ```
  </details>

Good luck!
