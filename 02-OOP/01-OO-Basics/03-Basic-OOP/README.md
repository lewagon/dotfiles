## Background & Objectives

In `01-Ruby` module, you wrote many Ruby programs involving classes such as `String`, `Integer`, `Array`, `Hash`, etc. In fact, you manipulated *instances* of those classes.

`String` is a class right? That means that `"john lennon"`, or `"Hello!"` are both instances of `String`.

Using built-in classes is good, but creating your *own* classes is even better!

## Specs

Implement an `OrangeTree` class that models the life of an orange tree (its birth, life cycle and death).

To simulate time passing, you will need to implement the following **instance** method:

```ruby
def one_year_passes!
  # TODO: age the tree by one year
  # TODO: check if the tree has survived
  # TODO: if so, make the tree height grow
  # TODO: if so, make the tree grow fruits
end
```

- You should be able to measure the height of the tree.
- You should be able to find out if the tree is dead.
- Each year, the tree should age by 1 year (it becomes older and taller, and eventually dies).
- A tree grows 1 meter per year until it is 10 years old. Then it stops growing.
- The orange tree **cannot** die until it reaches 50 years old.
- After 50 years, the probability of dying increases each year.
- No tree can live more than 100 years.
- A tree will produce 100 fruits a year once it is more than 5 years old.
- A tree will produce 200 fruits a year when it reaches 10 years old.
- A tree will not produce fruits once it reaches 15 years old.
- You should be able to pick **a single fruit** from the tree by calling the `pick_a_fruit!` method on your tree (but only if there are some left).
- At the end of each year, the fruits which have not been picked **will fall off**.
- You should be able to find out how many fruits are left hanging on the tree.

To test it, launch the interface (`ruby lib/interface.rb`) and see what happens ;).

## Key learning points

- What are the instance variables of the `OrangeTree` class?
- What do we mean by state?
- Which methods, when called, modify the object they are called on? How should you name these methods?
