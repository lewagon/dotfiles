## Background & Objectives

Let's build a To Do Manager with the basic CRUD features:

1. As a user, I can list tasks
1. As a user, I can view the details of a task
1. As a user, I can add a new task
1. As a user, I can edit a task (mark as completed / update title & details)
1. As a user, I can remove a task

In this challenge, you will meet your old friend [**Active Record**](http://guides.rubyonrails.org/active_record_basics.html) again, which is Rails' ORM.

There is no `rake` here, and do not create your Rails app in `fullstack-challenges` ⛔️ Instead, please follow these instructions:

```bash
cd ~/code/<user.github_nickname>
rails new rails-task-manager --skip-active-storage --skip-action-mailbox
cd rails-task-manager
git add .
git commit -m "rails new"
gh repo create
git push origin master
```

## Specs

### 1 - Model

Generate the `Task` model through the right rails generator. It should have at least the following columns:

- `title`, as a `string`
- `details`, as a `text`
- `completed`, as a `boolean` (default: `false`)

### 2 - Controller

Generate an empty (no actions) `TasksController` with the right rails generator.

For this exercise, **do not use `resources`** in your `config/routes.rb`. The goal of this exercise is to re-build the regular CRUD from scratch.

### 3 - As a user, I can list tasks

First, add a new route to list the tasks, following the convention from the lecture. Then, add a controller action and its view. This action should fetch **all** tasks, and a view should loop over these to display them, like in the screenshot below.

To test your view, you need some tasks in the database! To create some, run a `rails console` in another terminal tab and then run:

```ruby
Task.create title: 'Laundry', details: 'Do not mix colors!'
Task.create title: 'Studying', details: 'A lot of flashcards to do', completed: true
```

⚠️ In the view, do not focus on coding the checkboxes visual for now. You will have the opportunity to code it in the optional questions.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/tasks-manager/index.png)

### 4 - As a user, I can view the details of a task

We now have a list of tasks, and we would like to click on the task title and navigate to a new page, displaying the details of this task. Following the conventions from the lecture, add a new route, a new controller action and a new view. This action should **find** a specific task, thanks to its `id`, directly from `params`.

Update the `index.html.erb` view with the `link_to` helper to build the links.

⚠️ Again, in the view, do not focus on coding the checkboxes visual for now. You will have the opportunity to code it in the optional questions.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/tasks-manager/index_show.gif)

### 5 - As a user, I can add a new task

Following the lecture conventions, add two routes to handle the creation of a task. One route is there to display the Task form, and another one is there to handle the `POST` request generated when submitting this form. Try to use directly the `form_for` helper in your view.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/tasks-manager/new.gif)

### 6 - As a user, I can edit a task

We want to be able to edit a task, changing its title, its details and especially **marking it as completed**. Following the lecture conventions, add the two routes you need for that feature. Implement the controller actions, and the views.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/tasks-manager/edit.gif)

### 7 - As a user, I can remove a task

Last feature, we want to be able to destroy tasks directly from the list. A JavaScript confirmation could be handy.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/tasks-manager/destroy.gif)

### 8 - Refactoring (Optional)

Have a critical look at your code and introduce the following refactoring:

1. Use `resources` in your `config/routes.rb`
1. Use a `before_action` in the `TasksController`
1. Should we DRY a bit the `new` and `edit` views? How can we handle the fact that the `new` form should **not** display "Completed"? ([hint](http://api.rubyonrails.org/classes/ActiveRecord/Persistence.html#method-i-new_record-3F))

### 9 - Checkboxes Visuals (Optional)

The checkboxes are not real ones! They are simply Font Awesome icons.

To create the checkboxes visuals in your view for each task, import Bootstrap & Font Awesome CDNs in the `<head>` of your `application.html.erb`.

Then, in your view, use conditionals. If your task is completed, display the checked square, else, display an empty square (as a hint 😉, search for `check-square` and `square` icons on fontawesome 😉).
