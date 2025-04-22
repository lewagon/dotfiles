## Background & Objectives

There are two main ways to receive blocks in a method in Ruby. The first - as we have already seen - is to use the `yield` keyword. Sometimes however, we need to **store** the block in an object, either because we want to call it later or because the method that takes the block as an argument delegates to another method and needs to transfer the block to this sub-called method.

Thankfully we can store blocks of Ruby code in `Proc` objects.

## Ampersand block argument

When prefixing the last argument in a method signature with an ampersand, it creates a `Proc` object from any block passed in. This object can then be executed with the `call` method like so:

```ruby
def speak(&block)
  puts block.call
end

speak { "Hello" }
# Hello
#  => nil
```

**A new `Proc` object will be created from the block any time the method is called.**

## Creating Proc objects
You may also want to create your `Proc` objects by yourself and pass them to the method as normal parameters like so:

```ruby
def speak(block)
  puts block.call
end

message_block = Proc.new { "Hello" }
speak(message_block)
# Hello
#  => nil
```

**The `Proc` object is created once and for all, and can be used several times if we call the method several times.**

## Specs

- Your turn! Tell your mum how much you love her 😊 Implement the `#tell`, `#tell_mum`, `#tell_with_proc`, `#tell_mum_with_proc`  methods which use either ampersand block arguments or pass `Proc` objects explicitly.
