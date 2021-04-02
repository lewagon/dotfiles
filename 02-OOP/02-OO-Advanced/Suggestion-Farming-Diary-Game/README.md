## Background and Objectives

You made a good work with classes. Let's turn all your efforts into a real mini-game. The player will be able to plant crops and add animals into a nice little farm illustration we provide.
You'll learn to make the interface with a real menu.



## Specs

The player can choose between a set of actions: plant corn, plant rice, water the crops, add animals, etc.
When the player picks one action, we deliver and move on to the next choice. It's a loop.
Let's build it step by step.

![Loop](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/farming-diary/loop.svg?sanitize=true)


There is no `rake` on this challenge.


### Code a basic user interface

Open `interface.rb` and code a very basic user interface. For the moment, it runs only once:
  - Invite the player to pick a word from a list.
  - Display a custom feedback for each word.

Run `lib/interface.rb`, it should output something like this:

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

or when the player types a random word:

```bash
Pick an action: [corn | rice | quit]
> lalala
I don't know what you mean...
```

**Hint to code the condition:** You can choose a basic `if` but try to explore the [`case`](https://ruby-doc.org/docs/keywords/1.9/Object.html#method-i-case) statement operator. Why? Because you'll add more words to choose from, and a `case` statement is perfect for a long list of closed options.



### Build the loop

Display the menu over and over **until** the player types the keyword **quit**:
  - Surround the user interface with a loop. Use [`until`](https://ruby-doc.org/docs/keywords/1.9/Object.html#method-i-until).
  - Make it stop when the user types the string `quit` (you need to store the string in a variable to be able to test it against `until`).

Run `lib/interface.rb`, it should look like this:

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

**Help:** If you happen to run an infinite loop, break it with `CTRL C` (you can hit `CTRL C` several times if it doesn't stop immediatly).


<details>
    <summary markdown='span'>View solution</summary>

```bash
 action = ""
  until action == "quit"

    puts "Pick an action: [corn | rice | quit]"
    print "> "

    action = gets.chomp
    case action
    when "corn"
      puts "Let's plant corn crops!"
    when "rice"
      puts "Rice crops today!"
    when "quit"
      puts "See you next time"
    else
      puts "I don't know what you mean..."
    end
  end 
```
</details>


### Implement the first actions: plant crops

The UI is ready, now let's replace all the `puts` with real actions!

- Run this command to import the classes from the previous farm challenges:

```ruby
# TODO: copy the classes
```

 - Move the line `Board.new.display` **inside** the loop, on the first line. It displays an interactive illustration of the farm. If your code works, you'll see suprises appear :)
 - Go back to the case statement: in the `corn` clause, create a new instance of the class `Corn`.
 - Run `lib/interface.rb`, do you see the corn appear in the illustration?

When ready, make the same with the `rice` clause.


### Common action: water

Add a new action to the user interface: `water`.

```bash
Pick an action: [corn | rice | water | quit]
```

In this action, the player waters all the crops (corn and rice) already planted. Remember they both inherit the `water!` method from `Crop`.

At this point, you may ask yourself how to get all the crops 🤔 . What about storing them in a array as soon as you create them?

  - Create and array to store the crops, place it before the loop.
  - In the clauses `corn` and `rice`, modify your code to store the newly instances in the array.
  - In the clause `water`, apply the method `water!` to all the crops of the array.


### Animals

Congratulations on building the crops part. Do you want to give a try to build the animals part all by yourself?

The UI has three new entries (cow, chicken and feed):

```bash
Pick an action: [corn | rice | water | cow | chicken | feed | quit] 
```

**Hints and clues:**
  - `cow` and `chicken` actions create new intances of the corresponding classes.
  - As you know animals have names, you may ask the player to fill the name.
  
    <details>
    <summary markdown='span'>View solution</summary>

    ```bash
    when "cow"
      puts "Name the cow"
      print "> "
      name = gets.chomp
      Cow.new(name) 
    ``` 
    </details>

  - Chickens have gender. Let the user choose or pick it at random.
  
    <details>
    <summary markdown='span'>View solution</summary>

    ```bash
      when "chicken"
        gender = ["female", "male"].sample
        puts "The chicken is a #{gender}"
        puts "Name the chicken"
        print "> "
        name = gets.chomp
        Chicken.new(name, gender)
    ``` 
    </details>

  - You may need to store the animals in an array to apply the `feed!` method.

Good luck!
