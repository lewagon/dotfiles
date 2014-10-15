## Guidelines

### Morning lecture

#### Rehearsals
Before starting the last lecture of the week, make a small question/answer session to discuss simple concepts with the class (variable, methods, arguments, return vs. puts). It's quite normal if some of the students still don't get it perfectly. So that's good occasion to code some very simple methods and re-explain things.

#### From array to hash
Start with the live code described in the slides. Make it interactive.

- How can we do to map student names and ages? Ok, so let's give us two arrays to store students'names and ages. Now how do we print associated values for one student? For all students ? Now what if we have to add some new records, is it convenient? Is there a more adapted data stucture for representing this data?
- Yep there is! Let's introduce the name/age hash
- Show elementary operations on hashes? Define hash (empty or not)? add key-value? Read value? Modify value? Etc..


##### Why using hash?
Suppose you have 1M users with emails in your website and you store them in an array `["toto@gmail.com", "titi@gmail.com", ...]`.

Given some input email `"titi@gmail.com"`, you will have to go along the array index-by-index in order to know if this email belongs to one of your users. By using a hash `emails = {"toto@gmail.com" => "", "titi@gmail.com" => "", ...]`, you've got immediate access with `emails["titi@gmail.com"]`. Explain it's like a dictionnary: you don't turn the pages of your dictionnary one-by-one when you are looking for a definition. You just go directly to the good page! Make them understand that `hash[key]` is as fast as `array[i]`.


##### Iterators on hashes
Show them that `each` does not work the same way on a hash since it yields two arguments (key/value) in the block.

#### Symbols

##### Introduction

Sometimes you need internal identifiers / tags in your code! Unfortunately, strings are not the best candidates for that purposes.. Make the following live-code.

Imagine two users of your app are both named Bob

```
$ irb
irb(main):001:0> user_1 = "bob"
irb(main):002:0> user_2 = "bob"
```

Ruby will allocate two memory spaces for them. In fact, the second Bob may change his username to "bobby" next week, who knows. So we have to get two different objects to store these strings.

```
irb(main):003:0> user_1.object_id
=> 70208594926480
irb(main):003:0> user_2.object_id
=> 70208594906000
```

Sometimes however, you need "tags", "identifiers" in your code. **These tags do not feel like data, user input**. We do not want to change them in the future as a string. For this use, there is a new ruby object => Symbol.

```
$ irb
irb(main):001:0> user_1 = :bob
irb(main):002:0> user_2 = :bob
irb(main):002:0> user_1.object_id
=> 538888
irb(main):002:0> user_2.object_id
=> 538888
```

##### Quizz

Open your ruby file and ask them the difference between:

```ruby
"name"
:name
name
```

Ensure they understand that a **symbol is not a variable**. The `:` is not optionnal. It's the symbol's delimiter such as `""` is the string's delimiter.

##### Symbols and hash

```ruby
paris = {
  "name" => "Paris",
  "population" => 2211000
}

london = {
  "name" => "London",
  "population" => 8308000
}
```

Ask them if "name" and "population" feel more like "text data" or "tags".  Tags? So let's use symbols for them.

```ruby
paris = {
  :name => "Paris",
  :population => 2211000
}
```

Introduce the new syntax.

```ruby
paris = {
  name: "Paris",
  population: 2211000
}
```

#### Data format

The idea here is to make a link between the ruby world and the real world. This is really important to keep the students motivated! What are the classic data formats offered by web-services? How do we get this data right into our ruby programs to manipulate it and be some growth-hackers?


##### CSV / Array
Introduce CSV speaking of Excel (which they're likely to know).

- Can they guess what's the natural ruby format to represent a CSV file in ruby? An array for each line? Bingo!!
- Now live-code a CSV parsing to show them how immediate it is to parse a CSV file in ruby (you can use the exmaple in the slides).
- Tell them that many web-services (like Mailchimp) offer a CSV import/export feature. They can build some growth-hacking ruby scripts right away!

##### JSON / Hash
Introduce JSON as the standard format used by web APIs.

- Can they figure out in which ruby structure a JSON will be represented? The link with the ruby hash should be immediate.
- Now show them how to parse a JSON string. Show the difference in the terminal between the JSON **string** in input and the output **hash**.

- Finish the lecture with a demo of the facebook graph explorer to show them examples of JSON data returned by the facebook graph. You should get a "waou" effect at this stage, and students will be 100% motivated for the all day :)


### Day challenges
Before starting the challenges

- Ensure every student has a clean git status, and that he has pulled upstream. Otherwise students may work on old versions of the challenges :).

```
$ cd ~/code/${GITHUB_USERNAME}/promo-4-challenges/
$ git status #everything should be ok!
$ git pull --no-edit upstream master
```

- Ensure they're connected on the class Slack

- Make a brief overview of the roadmap of the day with them, explaining the general idea behind each challenge.

### Quizz

No live-code this day. Just [a ruby quizz](https://dl.dropboxusercontent.com/u/29947758/lewagon/quizzes/quizz_1.pdf). Here are some instructions:

- This is an individual "paper/pencil" quizz. No computer, no google, no pairing.
- It should start at 2pm when they come back from lunch and it should last 30 minutes.
- One-to-one correction should replace the evening live-code and start at 4pm.


#### Quizz correction
You should spend some time on this correction, it's very important for each student to get one-to-one explanations on the concepts he doesn't understand. Call each student one by one, and spend around 10 minutes with each (some of them will require more time, others less).


#### Classical errors

When trying to make a method out of the code averaging grades in a class, a lot of students will write.

```ruby
def average(grades)
  sum = 0
  for grade in grades
    sum += grade
  end
  avg = sum / grades.count
end
```

- These students don't necessarily have problems with method return but they are afraid to just write `sum / grades.count` as their last line of code. Tell them that their last line suggest they don't "respect" their method's return :)
- Ask them to write explicitely this return => `return avg`.

- At this point, they should realise the the `avg` variable is useless at this point and write directly `return sum / grades.count`. Force them to write explicit returns.

or worse

```ruby
def average(grades)
  sum = 0
  for grade in grades
    sum += grade
  end
  puts sum / grades.count
end
```

For these students, the misunderstanding is deeper. You should take a new example and spend time on this with them.


##### Good implementation
```ruby
def mult(a, b)
  return a * b
end

prod = mult(2, 3)

#What is prod wort at this stage of the program?
```

##### Bad implementation
```ruby

def mult(a, b)
  puts a * b
end

prod = mult(2, 3)

#What is prod wort at this stage of the program?
```

Show them that their `mult` method is completely useless in the second case as we cannot store its result. Ask them how they should check their result on the terminal in the first case. They should tell you `puts prod` as the last line.

Some students may be confused with `p`, `print`, and `puts`. Explain the differences between these methods, and that `p` is just the geek way to display results on the terminal :)



