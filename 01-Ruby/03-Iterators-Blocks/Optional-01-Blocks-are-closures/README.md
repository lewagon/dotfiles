The concept of closure may be quite hard to grasp for beginners but it makes a block's behavior really different from a method's behavior in ruby. Let's see what are the main difference between a block and a method in ruby :

* first of all, a block can be passed as an argument (either through `yield`, as an ampersand final argument, or as an explicit `Proc` object given to the method)

* Also, a block remembers the values of all the variables that were in scope when the function was created. It is then able to access those variables when it is called even though they may no longer be in scope.

Study the following example :

```ruby
def block_counter
  n = 0
  return Proc.new { n = n + 1 }
end

b = block_counter
puts b.call
puts b.call
```
What do you expect this program to print ? Try to figure it out and discuss together what happened in this program.

## Your turn

You can run the template with:

```bash
$ ruby lib/welcome_closure.rb
```

Complete the given code template so that it welcomes all the Wagon's students and count them at the same time, to check that no one gave up :) As you code ask yourself:

- How does the `count` value get linked to the block when the block is instantiated?
- How would a method behave if I used a method instead of a block?
- If I print the `count` variable after calling the block, what will be its value?

## Subtleties...

Once your code runs let's try to insert a line as below :

```ruby
welcome_blk.call("felix")
welcome_blk.call("estelle")
count = 10
welcome_blk.call("cedric")
welcome_blk.call("fred")
````

What will happen ?

Now, with the former example, let's try this:

```ruby
def block_counter
  n = 0
  return Proc.new { n = n + 1 }
end

b = block_counter
puts b.call
n = 10
puts b.call
```

What will happen?


