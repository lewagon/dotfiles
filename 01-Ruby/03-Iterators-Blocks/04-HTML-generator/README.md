## Background & Objectives

Ruby on rails is a tool to build application for the web, you'l learn it in a few weeks. In the meantime, let's discover something useful that you'll use a lot when programming with Ruby on Rails.
In this framework, some methods are dedicated to format text, dates, numbers, etc to display them. Those methods are called **helpers**. 

Code your first helper, it will help build HTML tags.

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

#### Arguments with default value

In ruby you can supply a default value for an argument. This means that if a value for the argument isn’t supplied, the default value will be used instead, e.g.:

```ruby
def sum(a, b, c = 0)
  return a + b + c
end

sum(3, 6, 1) # => 10
sum(4, 2)    # => 6
```

Here, the third argument is worth `0` if we call `sum` with only two arguments.
