## Background and Objectives

Congratulations, you outperformed the Cookbook challenge!

Let's start over and code another entire MVC app. This time we'll create an app to save [DEV](https://dev.to) posts and read them later:

- As a user, I can list all posts I saved
- As a user, I can add a post I want to read later
- As a user, I can read a post I saved
- As a user, I can mark a post as read

A demo's worth a thousand words, so this is the app we want to code:

#### List posts

```bash
---------------------------------
Welcome to your DEV Pocket Reader
---------------------------------

----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 1

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [ ] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
```

#### Save post for later

```bash
----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 2

Path?
> molly_struve/level-up-your-ruby-skillz-working-with-hashes-4bid

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [ ] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
3. [ ] - Level Up Your Ruby Skillz: Working With Hashes (Molly Struve)
```

#### Read post

```bash
----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 3

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [ ] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
3. [ ] - Level Up Your Ruby Skillz: Working With Hashes (Molly Struve)
Index?
> 2

[...] # this should display the post's entire content with linebreaks between paragraphs!
```

#### Mark post as read

```bash
----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 4

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [ ] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
3. [ ] - Level Up Your Ruby Skillz: Working With Hashes (Molly Struve)
Index?
> 2

1. [x] - Visual Studio Code plugins for Ruby and Rails (Magnus Skog)
2. [x] - Level Up Your Ruby Skillz: Working With Arrays (Molly Struve)
3. [ ] - Level Up Your Ruby Skillz: Working With Hashes (Molly Struve)
```

#### Exit gracefully

```bash
----------------------------
What do you want to do next?
----------------------------
1. List posts
2. Save post for later
3. Read post
4. Mark post as read
5. Exit
> 5

Bye bye!
```

As you can see, the user only types the `path` of the DEV article. The `path` is the text that comes after the domain name in a url.

For instance, to save [this article](https://dev.to/unseenwizzard/learn-git-concepts-not-commands-4gjc), the path our users need to enter is everything that is after `https://dev.to/` i.e. `unseenwizzard/learn-git-concepts-not-commands-4gjc`.

So how are we going to retrieve the post's author, title and content...?

Absolutely, we're going to scrape them!

**Question: where are we going to code the scraping part?**

You'll find the answer at the end of this readme.

## Specs

This time you'll code without any help, `rake` will only give you style offenses 👌

Feel free to try and do TDD on this challenge, with help from the previous livecodes corrections.

### Model

As you know now, you should always start with your model. The model is the Ruby class we need in order to manipulate the data in our program.

Here we want to play around with DEV **posts**, so let's go ahead and create a `Post` class. Before coding it, take the time to ask yourself about:

Its state:

- What do we need to store in a `post` **to be able to serve the user stories**?

The answer will give you the instance variables.

Its behavior:

- What transformations will we need to perform on a post?
- Which pieces of state will we need to expose to reading? to writing?

The answers will give you the public instance methods.

Don't force too much if you can't find all instance variables and methods, you'll find them later when the need emerges while coding the repo and the controller. When you think you're done, test your class in `irb`, fix bugs, and move on to the next class.

### Repository

Like in the cookbook, we need a repository to **store** our posts in-memory and on our hard drives. This class needs to be coded right after the model, both classes being part of the same **data** brick.

Implement a `Repository` class which will act as a fake database. It should be connected to a `posts.csv` file to make our app persistent.

**NB:** if you encounter a `csv invalid byte sequence in us-ascii` error while parsing the csv, this can be solved with an option passed to the `CSV.foreach` call:

```ruby
CSV.foreach("posts.csv", encoding: 'ISO-8859-1') do |row|
  # [...]
```

### Controller

The controller serves the user stories. Let's have a look at them:

- As a user, I can list all posts I saved
- As a user, I can add a post I want to read later
- As a user, I can read a post I saved
- As a user, I can mark a post as read

Remember that the controller has a role of pivot in the MVC pattern. Having access to the repo and the view from within every action is a necessity (this should help you define instance variables).

For each user story, you need to code an action (an instance method) in the controller.

This is the process you need to follow for each action:

- Write pseudo-code to breakdown the problem in small steps that you can easily translate in Ruby
- Remember that each instruction having to do with the data will be delegated to the repo, and every `puts` and `gets` will be handled by the view (again, think SRP - Single Responsibility Principle)
- Coding your actions will make you code your `View` class and its instance methods naturally, when the necessity arises
- Everytime there's an emerging need (we need a new method in the repo or in the model), follow the flow and code it right away
- Test regularly your code (every 2 or 3 lines of code)

To test your actions, you can follow these instructions:

```bash
touch lib/test.rb
```

```ruby
# lib/test.rb
repo = Repository.new(File.join(__dir__, 'posts.csv'))
controller = Controller.new(repo)

controller.action_name # replace by the real name of the action you want to test
```

Then test with:

```bash
ruby lib/test.rb
```

**Hint**: if you encounter a `403 Forbidden Bots (OpenURI::HTTPError)` while scraping, there's an easy way around by specifying a `User-Agent` in the **headers** of your HTTP request. Here's an example using `open-uri`:

```ruby
USER_AGENT = "Mozilla/5.0 (Windows NT x.y; rv:10.0) Gecko/20100101 Firefox/10.0"
html_content = URI.open(url, "User-Agent" => USER_AGENT).read
```

### Router

In the Cookbook, we gave you the router. This time, try and code it by yourself! Remember that at the end of the day, we want to call `router.run` in `app.rb` and this should launch our app!

### Tying it all together

This time we didn't give you the `app.rb`. Don't be afraid, just take the problem from the end. We know that the purpose of the `app.rb` file is to call `router.run`.
This means you need to instantiate a `router` which is an instance of our `Router` class. OK so that's a `Router.new(controller)`. That means we need a `controller`... Following this train of thoughts will lead you to the whole code.

When you are ready, you can run your program with:

```bash
ruby lib/app.rb
```

### By the way...

So where should you code the scraping part of the program? Well, let's re-formulate our question. Our program should be able to instantiate a `Post` with only a `path`.

But when we instantiate the `post`, we want it to be automatically populated with its title, content, and author. A good place to code it could be in the `Post`'s `initialize` method. But that's not where we're going to code it.

Let's imagine that we add an `Author` model in the picture, and that we want to scrape info about the post's author when scraping the post. The `Post#initialize` method wouldn't be a good choice anymore... Leaving it in the **controller** (where we have access to models and repositories) would be a necessity, so let's code it there and prepare for an extended version of this challenge!

Next session we'll see how we can plug a `Service` class to the MVC pattern if we want to extract this kind of specific features from the pattern.
