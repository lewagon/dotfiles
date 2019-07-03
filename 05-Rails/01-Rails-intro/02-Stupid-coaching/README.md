## Warning

⚠️ **Never do `sudo gem install rails` even if the terminal tells you so!** ⚠️
> Restart your terminal if it happens (`cmd + q` or `ctrl + q`) - open a ticket if it still happens

This is the proper way to install rails:

```bash
gem install rails -v 5.2
```

Now quit the Terminal, and restart it.

## Background & Objectives

Remember your first weeks of Ruby? We only had the terminal for the program user interface. Those days are over, we will now use Rails! This means:

- The program user interface is now your **browser**
- The only way to communicate with your Rails app is through **HTTP requests**

There is no `rake` here. Also, do not create your Rails app in `fullstack-challenges`.

⛔ Please do not copy/paste solutions from previous exercises, try to rewrite them from scratch.

```bash
cd ~/code/<user.github_nickname>
rails new rails-stupid-coaching
cd rails-stupid-coaching
git add .
git commit -m "rails new"
hub create
git push origin master
```

`hub` is a gem that we installed on the first day that created a repo on github for us so that we can `git push`. 😊

**Objective**: We will implement a simple Rails application with 2 pages:

1. First page is a form with an input, where a user can type a question to ask the Coach
2. After submitting the form, the user is redirected to a new page where she/he will see his question and the coach answer.

That's it!

## Specs

Get familiar with [Rails command line basics](http://guides.rubyonrails.org/command_line.html#command-line-basics). For this exercise, you should know at least how to:

- Create a new Rails app
- Launch a web server to test your app locally
- Generate a new controller from the command line
- Check your routes with the relevant `rails` command

### 1 - Routing

Open your `routes.rb` file and add the two routes needed for your Stupid Coaching web application.

Check the routes are defined with the following command:

```bash
rails routes
```

It should look like this:

```bash
  Prefix Verb URI Pattern       Controller#Action
     ask GET  /ask(.:format)    questions#ask
  answer GET  /answer(.:format) questions#answer
```

### 2 - Controller

Generate a new `QuestionsController`, using the correct rails generator on the command line. This controller will have two actions, `ask` and `answer`. Open the `routes.rb` file and delete the duplicated routes if they got generated.

### 3 - Coach Answer Page

Time to implement the logic in the `answer` action (second step of the user story). The `answer.html.erb` will display the question you ask your coach as well as his answer. The controller will need to read the question from `params` and compute an instance variable `@answer` for the view to display. Here are two requests that you should be able to handle:

- [localhost:3000/answer?question=hello](http://localhost:3000/answer?question=hello)
- [localhost:3000/answer?question=what+time+is+it%3F](http://localhost:3000/answer?question=what+time+is+it%3F)

⚠️ Don't try to work on the form yet! Click on the links above and make your Answer page work!

If you don't remember about the coach (poor) logic, here it is:

1. If the message is `I am going to work`, the coach will answer `Great!`
2. If the message has a question mark `?` at the end, the coach will answer `Silly question, get dressed and go to work!`.
3. Otherwise she/he will answer `I don't care, get dressed and go to work!`

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/hello_there.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/can_i_go.png)

### 4 - Question Form Page

Let's implement the `ask` action. On this page, we should build a form with an input where the user can type in a question.

```html
<form action="???">
  <input type="text" name="???">
  <input type="submit" value="Ask!">
</form>
```

Notice the important HTML attributes in the form:

- `action` specifies the URL that will be used when submitting the form
- `name` enables you to name each parameter corresponding to each input of the form.

Replace the `???` so that your form send a request to `QuestionsController#answer` with a good parameter name.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/ask.png)

### 5 - Backlink from `/answer` to `/ask`

- Add a link to `/ask` on the `answer.html.erb` view using the `link_to` Rails helper.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/bottom_link.png)

### 6 - Make it look nice!

We have not covered the Front-End aspect of a Rails project, but you can start on your own!

**A few words about SCSS**

[.scss](https://sass-lang.com/guide) is a file extension that allows you to write your css more easily! Browsers only speak css, so there's internal magic that happens in Rails to **pre-process** the file and translate it in "vanilla" css. The main features of `scss` you need to know are:

1. Variables

```scss
// Defining a variable
$gray: #F4F4F4;

body {
  background: $gray; // Using this variable
}
```

2. Nesting

```scss
.banner {
  background: red;
  h1 {
    font-size: 50px;
  }
}
```

3. Chaining

```scss
a {
  color: grey;
  &:hover {
    color: black;
  }
}
```

In a few days, we'll also see how to organize our stylesheets in multiple files, and load them using the `import` keyword!

For now, just open (or create) the `app/assets/stylesheets/questions.scss` file. You can directly code some SCSS, save, and reload the page! You should try to make the design match at least the screenshots.

### 7 - Testing (Optional)

⚠️ Please skip this section if you don't feel at ease yet with Rails internal. You can always come back here later in the day after completing the Longest Word Game exercise.

First, delete the `test/controllers/questions_controller_test.rb` file if it got generated. We will be doing [**System Testing**](http://guides.rubyonrails.org/testing.html#system-testing). The goal of this kind of testing is to automate all the manual testing of "code editing / go to the browser / reload the page / check if this is working". Everything you did manually in the browser can be done _via_ code!

First, you need to make sure you have a **recent** version of Chrome on your system (not Chromium). It's available for both OSX and Ubuntu. Then you need to install `chromedriver` on your machine:

```bash
# OSX
brew install chromedriver

# Ubuntu
gem install chromedriver-helper
```

Last, in your `Gemfile`, you need the following gems:

```ruby
# Gemfile
# [...]
group :test do
  # [...]
  gem 'capybara'             # should be there already
  gem 'selenium-webdriver'   # should be there already
  gem 'chromedriver-helper'  # add it!
  gem 'launchy'              # useful for screenshots, add it too!
end
```

and run `bundle install`!

We will use _Headless Chrome_ for System Testing. It's a browser without a user interface, well-suited for this kind of automated tests. To do that, open the following file and replace **all** its content with:

```ruby
# test/application_system_test_case.rb
require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  Capybara.register_driver(:headless_chrome) do |app|
    capabilities = Selenium::WebDriver::Remote::Capabilities.chrome \
      chromeOptions: { args: %w[headless disable-gpu window-size=1280x760] }
    Capybara::Selenium::Driver.new app,
      browser: :chrome, desired_capabilities: capabilities
  end
  driven_by :headless_chrome
end
```

Ready? Let's dive into Rails Testing.

In the terminal, run the following to create the test file:

```bash
rails g system_test questions
```

Open the generated file in Sublime Text, and write your first test:

```ruby
# test/system/questions_test.rb
require "application_system_test_case"

class QuestionsTest < ApplicationSystemTestCase
  test "visiting /ask renders the form" do
    visit ask_url
    assert_selector "p", text: "Ask your coach anything"
  end
end
```

Run the test in the terminal with:

```bash
rails test:system
```

If you look closely at the test scenario, you can read it as:

1. Go to the `/ask` page
2. Make sure the page got rendered and we can read `Ask your coach anything`.

Great! That's our first feature test. What do we want to test next? If you think about what you _manually_ did, it was typing some text (with different scenarios) and then clicking the button "Ask". Let's do that with tests!

```ruby
# test/system/questions_test.rb
require "application_system_test_case"

class QuestionsTest < ApplicationSystemTestCase
  # [...]

  test "saying Hello yields a grumpy response from the coach" do
    visit ask_url
    fill_in "question", with: "Hello"
    click_on "Ask"

    assert_text "I don't care, get dressed and go to work!"
  end
end
```

Intrigued about this syntax? This is the **capybara** gem! Very helpful in this testing context where we need to automate clicking on links, buttons, or filling forms. Have a look at [its DSL](https://github.com/teamcapybara/capybara#the-dsl).

Now your turn ✌️. Try to implement other scenarios in your system tests. The equivalent of `binding.pry` in the test world is the following in the Ruby code:

```bash
take_screenshot
```

It will take screenshots in the _Headless Chrome_. They will go in the `tmp/screenshots` folder.
