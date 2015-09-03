## Program flow, if..else and for

Standard ruby instuctions are read **line-by-line, top to bottom**. No some structure will modify this flow such as `if..else..end` or `for..end` structures. Let's play with conditions:

```ruby
puts "Heads or tails?"
answer = gets.chomp

if answer == "heads"
  puts "you pick heads"
elsif answer == "tails"
  puts "you pick tails"
else
  puts "wrong choice"
end

flipped_coin = rand(0..1)
if flipped_coin == 1
  "Coin is Heads!"
else
  "Coin is Tails!"
end
```

Now let's play with `for` loop.

```ruby
for i in 0..10
  puts i
end
for beatle in ["john", "paul", "ringo", "george"]
  puts beatle
end
```

## Arrays

Let's play with an array

```ruby
beatles = []
beatles << "jon"
beatles << "paul"
beatles << "ringo"
beatles << "george"

puts beatles[0]
beatles[0] = "John"
puts beatles[0]

for i in 0...beatles.count
  beatles[i] = beatles[i].capitalize
end

p beatles
```

Tomorrow we'll see very powerfull methods to perform operations on arrays, **iterators**.
