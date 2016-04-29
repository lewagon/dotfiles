## Background & Objectives

In `01-Ruby` module, you wrote many Ruby programs involving classes such as `String`, `Fixnum`, `Array`, `Hash`, etc. In fact, you manipulated *instances* of those classes.

For instance, `"world"` is an instance of `String`.

Using built-in classes is good, but creating your *own* classes is even better!

## Specs

Implement an `OrangeTree` class that models an orange tree (its birth, life cycle and death).

To simulate time passing, you will need to implement the following **instance** method:

```ruby
def one_year_passes!
  # TODO: age the tree of one year
  # TODO: check if the tree has survived
  # TODO: if so, make the tree height grow
  # TODO: if so, make the tree grow fruits
end
```

- You should be able to measure the tree
- Each year, the tree should age (it becomes older and taller, and eventually dies).
- A tree grows 1 meter per year until 10 years old. Then it stops growing.
- Up until 50 years old, the orange tree should not be dead.
- After 50 years, the probability of dying increases.
- No tree can live more than 100 years
- A tree will produce 100 fruit a year once it is older than 5 years.
- A tree will produce 200 fruit a year when it is between 10 and 15 years old.
- A tree will not produce any fruits after that.
- You should be able to pick a fruit from the tree.
- You should be able to count how many fruit are left hanging on the tree.
- Every year fruit which are not picked will fall off.

## Key learning points

- What are the instance variables of the `OrangeTree` class?
- What do we mean by state?
- Which methods, when called, modify the object they are called on? How should you name these methods?
