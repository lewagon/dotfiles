## Warning

⚠️ **Never do `sudo gem install rails` even if the terminal tells you so!** ⚠️
> Restart your terminal if it happens (`cmd + q` or `ctrl + q`) - open a ticket if it still happens

This is the proper way to install rails:

```bash
gem install rails -v 6.0
```

Now quit the Terminal, and restart it.

## Background & Objectives

Remember your first weeks of Ruby? We only had the terminal for the program user interface. Those days are over, we will now use Rails! This means:

- The program user interface is now your **browser**
- The only way to communicate with your Rails app is through **HTTP requests**

There is no `rake` here. Also, do not create your Rails app in `fullstack-challenges`.

```bash
cd ~/code/<user.github_nickname>
rails new rails-stupid-coaching --skip-active-storage --skip-action-mailbox
cd rails-stupid-coaching
git add .
git commit -m "rails new"
hub create
git push origin master
```

We add the flag `--skip-active-storage` to avoid the installation of [Active Storage](https://edgeguides.rubyonrails.org/active_storage_overview.html). Active Storage facilitates uploading files to a cloud storage service, but we don't need it for the moment, and it will add to your app unnecessary routes.

`hub` is a gem that we installed on the first day that created a repo on github for us so that we can `git push`. 😊

**Objective**: We will implement a simple Rails application with 2 pages:

1. First page is a form with an input, where a user can type a question to ask the Coach
1. After submitting the form, the user is redirected to another page where she/he will see her/his question and the coach answer.

That's it!

## Specs

Get familiar with [Rails command line basics](http://guides.rubyonrails.org/command_line.html#command-line-basics). For this exercise, you should know at least how to:

- Create a new Rails app
- Launch a web server to open your app locally
- Generate a new controller from the command line
- Check your routes with the relevant `rails` command

### Launch a rails server

Every web developer starts working by launching a server and opening a browser to test **live** the features they code. Go ahead:
- launch a server in your terminal
- open [localhost:3000](http://localhost:3000) in your favourite web browser! You should see Rails' welcome page.

Every time you write some code in a file, save it and refresh your browser. You will get many error messages, but it is important to get familiar with them. This way, you will understand Rails' execution flow and learn how to fix them!

### 1. Generate controller

First things first, let's generate a `QuestionsController` we'll use for our two pages. Remember the `rails` command to do that?

### 2. Display the form: `/ask`

We want to display a page with a `<form>` to our users at [localhost:3000/ask](http://localhost:3000/ask). In Rails, this counts as a user story, so we need more than an HTML file to make it happen. For every user action in Rails, we need to code **(i) a route, (ii) an action, and (iii) a view**. Remember the MVC pattern?

**Route**

Write a simple route to serve the `GET /ask` HTTP request to the `ask` action of the questions controller. As a reminder, here is the pattern of a route coded in Rails:

```ruby
verb "url", to: "controller#action"
```

**Controller**

After setting up the **route**, it's time to code the **action**. Go ahead and add an `ask` action in your `QuestionsController`! Do we need to define an instance variable here? We'll figure it out while coding the view!

Oh and by the way, do you remember how to display all your routes in the terminal?

<details><summary markdown='span'>View solution
</summary>

```bash
rails routes
```
You should see the following:

```
Prefix Verb URI Pattern       Controller#Action
   ask GET  /ask(.:format)    questions#ask
```
</details>

**View**

Last step to display the form, let's create a view! Do you remember in which folder it should be and how it should be named? That's one of Rails' conventions, the [Action View convention](https://kitt.lewagon.com/karr/karr.kitt/lectures/rails/rails-intro-6/index.html?title=Rails+Basics&program_id=1#/6/6). Refresh the page at [localhost:3000/ask](http://localhost:3000/ask), if you named your file properly you should finally see a page without an error! For now it's empty, let's finally add the `<form>`. Remember the syntax?

```html
<form action="???">
  <input type="text" name="???">
  <input type="submit" value="Ask!">
</form>
```

The native behaviour of a `<form>` tag is to generate the HTTP request defined by the `method` and `action` attributes.
- the `method` attribute holds the HTTP **verb** (`GET` by default)
- the `action` attribute holds the **url** of the request it triggers on submit

In the `<input>`, the `name` attribute enables you to set the **key** of the corresponding parameter.

Here we want the form to trigger our **second user story**: `answer`, which should be routed on `/answer`. Go ahead and replace the `???` above and try to submit the form.

You should get a **routing error**, let's code the answer now!

### 3. Display the Coach's Answer: `/answer`

Time to implement the logic in the `answer` action (second step of the user journey). For this second user story, follow the same methodology as in `1. Display the form`:
- code the **route**
- code the **action** (in the controller)
- code the **view**

And make sure you refresh your page frequently in your browser to let Rails' execution flow drive your development!

The `answer.html.erb` will display the question you ask your coach as well as his answer. The controller will need to read the question from `params` and compute an instance variable `@answer` for the view to display. Here are two requests that you should be able to handle:

- [localhost:3000/answer?question=hello](http://localhost:3000/answer?question=hello)
- [localhost:3000/answer?question=what time is it?](http://localhost:3000/answer?question=what time is it?)

If you don't remember about the coach (poor) logic, here it is:

1. If the message is `I am going to work`, the coach will answer `Great!`
2. If the message has a question mark `?` at the end, the coach will answer `Silly question, get dressed and go to work!`.
3. Otherwise the coach will answer `I don't care, get dressed and go to work!`

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/hello_there.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/can_i_go.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/ask.png)

### Backlink from `/answer` to `/ask`

- Add a link to `/ask` on the `answer.html.erb` view using the `link_to` Rails helper.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/bottom_link.png)

### Make it look nice!

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

### Testing (Optional)

⚠️ Please skip this section if you don't feel at ease yet with Rails internal. You can always come back here later in the day after completing the Longest Word Game exercise.

First, delete the `test/controllers/questions_controller_test.rb` file if it got generated. We will be doing [**System Testing**](http://guides.rubyonrails.org/testing.html#system-testing). The goal of this kind of testing is to automate all the manual testing of "code editing / go to the browser / reload the page / check if this is working". Everything you did manually in the browser can be done _via_ code!

We will use _Headless Chrome_ for System Testing. It's a browser without a user interface, well-suited for this kind of automated tests. Before running your system tests you need to make sure you have a **recent** version of Chrome on your system (not Chromium). It's available for both OSX and Ubuntu. Then you need to install `chromedriver`:

```bash
 # macOS
brew cask install chromedriver

# Ubuntu
gem install chromedriver-helper
```

After the installation you can open the following file and replace **all** its content with:

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
  driven_by :selenium, using: :headless_chrome
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

Now your turn ✌️. Try to implement other scenarios in your system tests. 

**Screenshots**

The equivalent of `binding.pry` in the test world is to take screenshots. Let's add the `launchy` gem to the `Gemfile` (in the `:test` group):

```ruby
# Gemfile
group :test do	
  # [...]	
  gem 'launchy'
end
```

And run `bundle install`. In your code you just have to write the following:


```bash
take_screenshot
```

It will take screenshots in the _Headless Chrome_. They will go in the `tmp/screenshots` folder.

