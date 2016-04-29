## Background & Objectives

Getters and setters are elementary methods to read or write the values of instance variables. Remember, at any given time, an object's instance variables represent the current state (data) of the object.

* Understand getters and setters by reading this [Quora post](http://www.quora.com/Ruby-programming-language/What-are-setters-and-getters-in-Ruby)
* In your own words, explain it to your pair.

## Specs

1. In the given code we defined a `Playboy` class but forgot to define some getters and setters for it. As a consequence, we cannot run our script `meeting_casanova.rb` without errors. Try it by yourself!

```bash
$ ruby lib/meeting_casanova.rb
```

**Code the necessary getter or setter methods so that you can interact with casanova without errors** when running `meeting_casanova.rb`.

2. Read up on `attr_reader`, `attr_writer` and `attr_accessor` helper methods => see [this post](http://stackoverflow.com/questions/5046831/why-use-rubys-attr-accessor-attr-reader-and-attr-writer) and [this one](http://stackoverflow.com/questions/4370960/what-is-attr-accessor-in-ruby)

3. Now redefine your accessor methods (getters / setters) in a more concise way using these helper methods.

## Key learning points

- What is a getter? A setter?
- How do we define them manually?
- What are shortcut-methods to define all accessors in a more concise way?
