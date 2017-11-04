## Background & Objectives

Remember your first weeks of Ruby? We only had the terminal for the program user interface. Those days are over, we will now use Rails! This means:

- The program user interface is now your **browser**
- The only way to communicate with your Rails app is through **HTTP requests**

There is no `rake` here. Also, do not create your Rails app in `fullstack-challenges` ⛔️

```bash
cd ~/code/<user.github_nickname>
rails new rails-stupid-coaching
cd rails-stupid-coaching
git init
git add .
git commit -m "rails new"
hub create
git push origin master
```

**Objective**: We will implement a simple Rails application with 2 pages:

1. First page is a form with an input, where a user can type a question to ask the Coach
2. After submitting the form, the user is redirected to a new page where he will see his question and the coach answer.

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


```bash
GET /answer?question=hello
GET /answer?question=what+time+is+it%3F
```

If you don't remember about the coach (poor) logic, here it is:

1. If the message is `I am going to work`, the coach will answer `Great!`
2. If the message has a question mark `?` at the end, the coach will answer `Silly question, get dressed and go to work!`.
3. Otherwise he will answer `I don't care, get dressed and go to work!`

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

Just open (or create) the `app/assets/stylesheets/questions.scss` file. You can directly code some SCSS, save, and reload the page! You should try to make the design match at least the screenshots.
