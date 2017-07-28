## Background & Objectives

For the next two challenges, you'll be re-implementing some of your ruby scripts in Rails. That means:

- Your program interface is now your browser (rather than your terminal)
- The only way to communicate with your Rails app is through HTTP requests

Re-implement the stupid coaching challenge (01-Ruby/01-Programming-basics/04-Stupid-coaching) in Rails.

There is no `rake` here, and do not create your Rails app in `fullstack-challenges` ⛔️

```bash
cd ~/code/<user.github_nickname>
rails new rails-stupid-coaching -T
cd rails-stupid-coaching
git init
git add .
git commit -m "rails new"
hub create
git push origin master
```

## Specs

Get familiar with [Rails command line basics](http://guides.rubyonrails.org/command_line.html#command-line-basics). For this exercise, you should know at least how to:

- Create a new Rails app
- Launch a web server to test your app locally
- Generate a new controller from the command line
- Check your routes with the relevant `rails` command

### Generate a CoachingController

Once you have created your new coaching app, add a new `CoachingController`, using the correct rails generator on the command line. This controller will have two actions, `CoachingController#answer` and `CoachingController#ask`

### Your coach answer logic

Implement a first route `GET '/answer'` to your `CoachingController#answer` action. The `answer.html.erb` will display the question you ask your coach as well as his answer.

Your question to your coach should be given as a parameter named `:query`. Ex: GET `/answer?query=hello` or GET `/answer?query=what+should+i+do?`.

![Coach answer to a question](https://raw.githubusercontent.com/lewagon/karr-images/master/coach-answer-2.png)

![Coach answer to a statement](https://raw.githubusercontent.com/lewagon/karr-images/master/coach-answer-1.png)

### Ask a question using a form

Implement a new route `GET '/ask'` to your `CoachingController#ask` action. This action is here to build the page including your HTML form. Here is the code for the form.

```html
<form action="/???">
  <label for="question">Speak to your coach</label>
  <input type="text" id="question" name="???" placeholder="what time is it?">
  <input type="submit" value="Go on!">
</form>
```

Notice the important HTML attributes in the form:

- `action` specifies the URL that will be used when submitting the form
- `name` enables you to name each parameter corresponding to each input of the form.

Replace the `???` so that your form send a request to `CoachingController#answer` with a good parameter name.

![Question for the Coach](https://raw.githubusercontent.com/lewagon/karr-images/master/coach-ask.png)

### Add a backlink in `answer.html.erb`

- Add a link to `/ask` on the `answer.html.erb` view using the `link_to` Rails helper.

![Coach answer](https://raw.githubusercontent.com/lewagon/karr-images/master/coach-adding-link.png)
