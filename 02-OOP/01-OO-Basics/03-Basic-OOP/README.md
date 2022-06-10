## Background & Objectives

In `01-Ruby` module, you wrote many Ruby programs involving classes such as `String`, `Integer`, `Array`, `Hash`, etc. In fact, you manipulated *instances* of those classes.

`String` is a class right? That means that `"john lennon"`, or `"Hello!"` are both instances of `String`.

Using built-in classes is good, but creating your *own* classes is even better!

## Specs

Implement an `OrangeTree` class that models the life of an orange tree (its birth, life cycle and death).

### Aging
- When an orange tree is born, its age is 0.
- Each year, the tree should age by 1 year.
- The orange tree **cannot** die until it reaches 50 years old.
- After 50 years, the probability of dying increases each year.
- No tree can live more than 100 years.
- You should be able to know the tree's age.
- You should be able to find out if the tree is dead by calling the `#dead?` instance method.

### Height
- An orange tree grows 1 meter per year until it is 10 years old. Then it stops growing.
- You should be able to measure the height of the tree.

### Fruits
- An orange tree produces 100 fruits a year once it is strictly more than 5 years old.
- The tree produces 200 fruits a year once it reaches 10 years old.
- The tree stops producing fruits once it reaches 15 years old.
- You should be able to pick **a single fruit** from the tree by calling the `pick_a_fruit!` instance method on it (but only if there are some left).
- At the end of each year, the oranges which have not been picked will fall off.
- You should be able to find out how many fruits are left hanging on the tree.

To simulate time passing, you will need to implement the following **instance** method:

```ruby
def one_year_passes!
  # TODO: check if the tree has survived
  # TODO: if so, make the tree grow
  # TODO: and produce fruits
end
```

To test it, launch the interface (`ruby lib/interface.rb`) and see what happens ;)

### Refactoring

Once you're done implementing your **instance** method `#one_year_passes!` and your `rake` is 100% green, refactor your code into **private** instance methods:
- `#may_die!`
- `#grow!`
- `#produce_fruits!`

## Key learning points

- What are the instance variables of the `OrangeTree` class?
- What do we mean by state?
- Which methods, when called, modify the object they are called on? How should you name these methods?
