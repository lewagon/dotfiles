## Guidelines

### Morning lecture

#### Rehearsals
Before starting the last lecture of the week, make a small question/answer session to discuss simple concepts with the class (variable, methods, arguments, return vs. puts). It's quite normal if some of the students still don't get it perfectly. So that's good occasion to code some very simple methods and re-explain things.

#### From array to hash
Start with the live code described in the slides. Make it interactive.

- How can we do to map student names and ages? Ok, so let's give us two arrays to store students'names and ages. Now how do we print associated values for one student? For all students ? Now what if we have to add some new records, is it convenient? Is there a more adapted data stucture for representing this data?
- Yep there is! Let's introduce the name/age hash
- Show elementary operations on hashes? Define hash (empty or not)? add key-value? Read value? Modify value? Etc..
- Why using hash? Suppose you have 1M users with emails in your website and you store them in an array `["toto@gmail.com", "titi@gmail.com", ...]`. Given some email `"titi@gmail.com", you will have to cover the array index-by-index to know if this email belongs to one of your users. Now if you use a hash `emails = {"toto@gmail.com" => "", "titi@gmail.com" => "", ...]`, it's immediate `emails["titi@gmail.com"]`. You can explain it's like a dictionnary: you don't turn the pages of your dictionnary one-by-one when you are looking for a given word definition. You just go to the good page directly! `hash[key]` is as fast as `array[i]`.
- 2 mots sur les iterateur => each / map sur des hash : 2 arguments

#### Symbols

##### Introduction

Sometimes you need immutable strings, identifiers for your app ! Make the following live-code. Imagine 2 users of your app are both named Bob

```
$ irb
irb(main):001:0> user_1 = "bob"
irb(main):002:0> user_2 = "bob"
```

Ruby will allocate two memory space for them. In fact, the second Bob may change his username to "bobby" in the future. So we have to get two different objects.

```
irb(main):003:0> user_1.object_id
=> 70208594926480
irb(main):003:0> user_2.object_id
=> 70208594906000
```

Sometimes you need "tags", "identifiers" in your app. **Texts that do not feel like textual data, user input**. For them, there is a new ruby type => Symbol.

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
« name »
:name
name
```
Make them understand a **symbol is not a variable** the `:` is not optionnal. It's the symbol delimiter such as `""` is the string delimiter.

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

Ask them if "name" and "population" are "textual data"? No? So let's use symbols. Introduce the new syntax with hash and symbols.

```ruby
paris = {
  name: "Paris",
  population: 2211000
}
```

#### Data format

The idea here is to make a bridge with reality, which is really important to keep the class motivated! What are the standards data formats offered by web-services and how do we get this data into ruby.


##### CSV / Array
Introduce CSV speaking of Excel (which they might know). Ask them what's the natural ruby format to represent a CSV file in ruby in their opinion? An array for each line? Bingo!! Now live-code a CSV parsing to show them how it's immediate to parse a CSV in ruby (you can use the exmaple in the slides). Tell them many web-services as Mailchimp propose to import/export CSV files, so that they can now begin to build some growth-hacking ruby scripts from now on!

##### JSON / Hash
Speak of tje JSON data format which is the standard with which the web APIs discuss. The link with the ruby hash should be immediate form them. Now show them how to parse a JSON string. Show the difference of the terminal between the JSON **string** and the output **hash**.

Finish by using the facebook graph explorer to show examples of JSON data returned by the facebook API. You should get a waou effect and get them boosted to start their day-challenges.








1) partir du fichier CSV
2) importer un CSV dans excel !

Quelle est la structure ruby qu’on va avoir en face ??

Demo facebook graph