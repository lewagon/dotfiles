## Background & Objectives

The goal of the next two challenges is to re-implement some of your ruby scripts in Rails. That means:

- Your program interface isn't the terminal anymore, it is your browser now.
- The only way to communicate with your Rails app is through HTTP requests.

Re-implement the stupid coaching challenge (01-Ruby/01-Programming-basics/05-Stupid-coaching) in Rails.


## Specs

Get familiar with [Rails command line basics](http://guides.rubyonrails.org/command_line.html#command-line-basics). For this exercise, you should know at least how to:

- create a new Rails app
- launch a web server to test your app locally
- generate a new controller from the command line
- check your routes with the relevant `rake` task


### Generate a CoachingController

Once you have created your new coaching app, add a new `CoachingController`, using the adequate rails generator on the command line. This controller will have two actions, `CoachingController#answer` and `CoachingController#ask`


### Your coach answer logic

Implement a first route `GET '/answer'` to your `CoachingController#answer` action. The `answer.html.erb` will display the question you ask your coach as well as his answer.

Your question to your coach should be given as a parameter named `:query`. Ex: GET `/answer?query=hello` or GET `/answer?query=what+should+i+do?`.

![Coach answer to question](https://raw.githubusercontent.com/lewagon/karr-images/master/coach-answer-2.png)

![Coach answer to assertion](https://raw.githubusercontent.com/lewagon/karr-images/master/coach-answer-1.png)

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

![Coach answer to assertion](https://raw.githubusercontent.com/lewagon/karr-images/master/coach-ask.png)

### Add a backlink in `answer.html.erb`
- Add a link to `/ask` on the `answer.html.erb` view using the `link_to` Rails helper.

![Coach answer to assertion](https://raw.githubusercontent.com/lewagon/karr-images/master/coach-adding-link.png)
