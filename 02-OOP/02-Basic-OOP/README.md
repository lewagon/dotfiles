### What's a class ?

In the first "ruby beginners" block, you have written many ruby programs that manipulate strings, integers, arrays, hashes, blocks, etc... All of these objects were realizations of built-in ruby classes like `String`, `Fixnum`, `Array`, `Hash`. For instance `"this text"` is a realization of the `String` class. Many instance methods like `sort`, `upcase` are defined for this `String` class and can be called on its objects, for instance running `"this text".upcase`.

**Now it's the time to code your own ruby classes, having their own methods !** A class is a generic structure for similar objects.

Let's take an example. Every restaurant has an address and a name.. so maybe it could make sense to create a class `Restaurant` that will model this generic structure. Then a precise restaurant as "la tour d'argent" would just be one of all the possible realizations of this class, where the name is set to "la tour d'argent" and the address to "15 Quai de la Tournelle, 75005 Paris". `@name` and `@address` are called instance variable as these variables are defined only for `Restaurant` objects, i.e. realizations of the class. The values of the instance variables represent the state of the object !

Don't misunderstand what's a class is. It's not just a way to store data in a convenient way, but also to define intelligence on this data ! Read a bit more about what's a class is : http://en.wikipedia.org/wiki/Class_(computer_programming).


### Your first class !
Code an `OrangeTree` class that models an orange tree (its birth, life cycle and death)

* You should be able to measure the tree thanks to the `measure_height` method

* The method `one_year_passes` contains the main class logic. It ages the tree one year when called. Each year, the tree grows taller (you will have to decide of how much) and after some number of years (again, your call) the tree should die.

* For the first few years, it should not produce fruit, but after a while it should, and I guess older trees produce more each year than younger trees.. Whatever you think makes the more sense.

* Of course, you should be able to `count_the_oranges` (which returns the number of oranges on the tree), and `pick_an_orange`, which reduces the `@orange_count` by 1 and returns a string telling you how delicious the orange was, or else telling you there are no more orange to pick this year (either because all have been picked or because the tree is dead..).

* Make sure any orange you pick one year fall off before the next year.

### How to use this class
Once you have coded the `OrangeTree` class, you can instantiate OrangeTree objects and manipulate them as follows :
```ruby
orange_tree = OrangeTree.new
23.times { orange_tree.one_year_passes }
puts(orange_tree.one_year_passes)
# => This year your tree grew to 9.6 m tall, and produced 119 oranges
puts(orange_tree.count_the_oranges)
# => 119 oranges
puts(orange_tree.pick_an_orange)
# => You pick a delicious juicy orange
puts(orange_tree.count_the_oranges)
# => 118 oranges
puts(orange_tree.measure_height)
# => 9.6 m
puts(orange_tree.one_year_passes)
# => This year your tree grew to 10.0 m tall, and produced 125 oranges
puts(orange_tree.one_year_passes)
# => This year your tree grew to 10.4 m tall, and produced 131 oranges
puts(orange_tree.one_year_passes)
# => Oh, no! The tree is too old, and has died..
puts(orange_tree.one_year_passes)
# => A year later, the tree is still dead..
puts(orange_tree.count_the_oranges)
# => A dead tree has no oranges..
puts(orange_tree.pick_an_orange)
# => A dead tree has nothing to offer..
```
## Instance variables
* What are the instance variables of the `OrangeTree` class, i.e. the variable representing the state of any OrangeTree object? (or in English, the variables representing the characteristics of an orange tree)

* How would you set these variables in the constructor `initialize` ?

## Refactor / Rename
* Which methods, when called, modify the object there are called on ? How should you rename these methods (remember [destructive methods on Array](http://www.lewagonlab.org/challenges/85), the concept is the same here) ?
* Refactor your code adding an intermediate method `any_fruit?` that tells you whether or not the tree has oranges to pick.