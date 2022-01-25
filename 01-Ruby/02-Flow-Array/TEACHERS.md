## Intro

1. Two-parts lecture.
1. First part on **conditions and loops**.
1. Second part on **arrays**.

## Rehearsal

1. Start with a **5-minutes rehearsal** on data types they know (String, Integer, Float, Booleans), and on variables and methods

## Controlling the flow

1. The flow we know **for the moment** is: top to bottom / line-by-line.
2. Conditions and loops will **change this flow**.

### if

Introduces a **condition**, let's play with it:

```ruby
puts "How old are you?"
print ">"
age = gets.chomp.to_i

if age >= 18
  puts "you can vote!"
end
```

### if / else

For several branches, let's enhance our code:

```ruby
if age >= 18
  puts "you can vote!"
else
  puts "too young to vote.."
end
```

### Ternary operator

For inline `if..else`, let's flip coins:

```ruby
puts "heads or tails?"
choice = gets.chomp
coin = ["heads", "tails"].sample

result = (choice == coin) ? "winner" : "loser"
puts "#{result}, that was #{coin}"
```

### if / elsif / else

1. Be careful with **branch order**
2. **More specific** to **less specific**
3. What's wrong with this program? let's fix it!

```ruby
hour = Time.now.hour

if hour < 12
  puts "Good morning!"
elsif hour > 12
  puts "Good afternoon!"
elsif hour >= 20
  puts "Good night!"
else
  puts "Lunch time!"
end
```

### case / when / else

When conditions all depend on same variable, example: an old school UI

```ruby
puts "Which action? [read|write|exit]"
action = gets.chomp

case action
when "read"
  puts 'You are in READ mode'
when "write"
  puts 'You are in WRITE mode'
when "exit"
  puts 'Bye Bye'
else
  puts 'Wrong action'
end
```

### Multiple conditions

1. Explain `&&`
2. Explain `||`
3. Live-code a program giving a **shop's opening hours**

```ruby
hour = Time.now.hour

if (hour > 9 && hour < 12) || (hour > 14 && hour < 18)
  puts "The shop is opened!"
else
  puts "Sorry, the shop is closed.."
end
```

### Looping with `while`

1. We are done with branch, **let's loop**
2. Introduce `while` with an example
3. Then refacto with `until`
4. Here is an example you can take, **The Right Price!**

```ruby
price_to_find = rand(5)
choice = nil

while choice != price_to_find
  puts "How much (between 0$ and 4$)?"
  choice = gets.chomp.to_i
end

puts "You won! Price was #{price_to_find}$"
```

## Arrays

1. Go step by step with the class on every CRUD action on Array
1. **Define** an array (empty or not)
1. **Read** in an array
1. **Modify** an element
1. **Append** an element
1. **Delete** an element
1. Get **array's size**
1. Loop with `each`
1. Pick custom methods in the Ruby doc with the class and test them

```ruby
# 1. Define an array
empty_array = []                        # an empty array
beatles = ["john", "ringo", "seb"]      # array of 3 strings

# 2. Get an element with its index
beatles[0]  #=> "john"
beatles[2]  #=> "seb"
beatles[8]  #=> nil

# 3. Modify an element
beatles[2] = "george"
p beatles #=> ["john", "ringo", "george"]

# 4. Append an element
beatles << "paul"
p beatles #=> ["john", "ringo", "george", "paul"]

# 5. Delete an element
# By element:
beatles.delete("john")
# By index:
beatles.delete_at(2)

# 6. Loop on elements
beatles.each do |beatle|
 puts "#{beatle} is in the Beatles"
end

# 7. Look in the doc and test methods with students, example:
puts beatles.join(" and ")
```
