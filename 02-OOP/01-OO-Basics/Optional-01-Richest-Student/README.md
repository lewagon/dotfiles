## Background & Objectives

Congrats for reaching the first optional exercise of the first OOP block. We will now work on an exercise to mix sorting and comparable methods with objects.

Suppose you have students (defined by the class `Student`) who each have an amount of money (in bills of five, ten and twenty euros). We want to be able to compare them based on their wealth.

### Specs

- When initializing a `Student`, you should pass 4 arguments representing the student name and the number of bills they own (fives, tens and twenties)
- Implement a `wealth` instance method on `Student`
- Implement [Comparable](https://ruby-doc.org/core-2.7.5/Comparable.html) on this method so that it's possible to compare 2 students, and to sort an `Array` of students. You can read more about the spaceship operator `<=>` and sorting objects [here](http://stackoverflow.com/a/28014514).
