## Background & Objectives

In `01-Ruby` module, you wrote many ruby programs involving classes such as `String`, `Fixnum`, `Array`, `Hash`, etc. In fact, you manipulated *realization* of those class.

For instance, `"world"` is a realization of `String`.

Using built-in classes is good, but creating your *own* classes is even better!

## Specs

Implement an `OrangeTree` class that models an orange tree (its birth, life cycle and death)

- You should be able to measure the tree
- Each year, the tree should age (it becomes older and taller, and eventually dies).
- A tree grows 1 meter per year until 10 years old. Then it stops.
- Before 50 years old, the proabability of dying as a year pass is zero.
- After 50 years old, the probability of dying increases
- No tree can live more than 100 years
- A tree will produce 100 fruits a year once it is 5 years old
- A tree will produce 200 fruits a year between 10 and 15 years old
- A tree will not produce any fruits after that
- You should be able to pick an fruit from the tree
- You should be able to count how many fruits on the tree there are left
- Every year, fruits which were not picked just fall off

## Learning Badges

- What are the instance variables of the `OrangeTree` class?
- What do we mean by state?
- Which methods, when called, modify the object there are called on? How should you name these methods?
