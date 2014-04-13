## Background & Objectives

Getters and setters are elementary methods to access or set the values of instance variables. Remember, at any given time, the values of an object's instance variables represent its current state. 

* Understand getters and setters reading this [Quora post](http://www.quora.com/Ruby-programming-language/What-are-setters-and-getters-in-Ruby)
* Explain it with your words to your pair

## Specs

1. In the given code we defined a `Playboy` class but forgot to define some getters an setters for it.. As a consequence, we cannot run our script `meeting_casanova.rb` without errors. Try by yourself 

```bash
$ ruby lib/meeting_casanova.rb
```

**Code the necessary getter or setter methods so that you can interact with casanova without errors** when running `meeting_casanova.rb`.  

2. Document yourself on `attr_reader`, `attr_writer` and `attr_accessor` helper methods => see [this post](http://stackoverflow.com/questions/5046831/why-use-rubys-attr-accessor-attr-reader-and-attr-writer) and [this one](http://stackoverflow.com/questions/4370960/what-is-attr-accessor-in-ruby)

3. Now redefine your accessor methods (getters / setters) in a more concise way using these helper methods.

## Learning Badges

- What is a getter? a setter?
- How do we define them manually?
- What are the shortcut-methods to define all the accessors in a more concise way?
