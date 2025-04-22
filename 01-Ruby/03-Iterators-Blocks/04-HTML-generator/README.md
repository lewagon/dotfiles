## Background & Objectives

Let's keep practicing blocks in this challenge. We will code another method that should be called with a block, and this time we will see how blocks enable nesting method calls, and how this can be useful in a real-life example. We will also discover how we can define methods with a second optional parameter, which happens frequently!

## Specs

Implement the `#tag` method that builds the HTML tags around the content we give it in the block. For instance:

```ruby
tag("h1") do
  "Some Title"
end
#=> "<h1>Some Title</h1>"
```

This method accepts a second optional parameter (see section below on arguments with default value), enabling to pass an array with one HTML attribute name and its value, like `["href", "www.google.com"]`.

```ruby
tag("a", ["href", "www.google.com"]) do
  "Google it"
end
#=> '<a href="www.google.com">Google it</a>'
```

You may need to know that to include a `"` symbol inside a string delimited by double quotes,
you need to **escape** this character with an antislash: `\"`.

The cool thing about this method is that you can nest method calls:

```ruby
tag("a", ["href", "www.google.com"]) do
  tag("h1") do
    "Google it"
  end
end
# => '<a href="www.google.com"><h1>Google it</h1></a>'
```

Cool right?

### Arguments with default value

In Ruby you can supply a default value for an argument. This means that if a value for the argument isn’t supplied, the default value will be used instead, e.g.:

```ruby
def sum(a, b, c = 0)
  return a + b + c
end

sum(3, 6, 1) # => 10
sum(4, 2)    # => 6
```

Here, the third argument is worth `0` if we call `sum` with only two arguments.
