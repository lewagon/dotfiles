## Background & Objectives

Let's build a To Do Manager with the basic CRUD features:

1. As a user, I can list tasks
1. As a user, I can view the details of a task
1. As a user, I can add a task in my To Do list
1. As a user, I can edit the details of a task
1. As a user, I can remove a task from my To Do list

In this challenge, you will meet your old friend [**Active Record**](http://guides.rubyonrails.org/active_record_basics.html) again, which is Rails' ORM.

There is no `rake` here, and do not create your Rails app in `fullstack-challenges` ⛔️

```bash
cd ~/code/<user.github_nickname>
rails new rails-task-manager -T
cd rails-task-manager
git init
git add .
git commit -m "rails new"
hub create
git push origin master
```

## Specs

### 1 - Model

Generate the `Task` model through the right rails generator. It should have at least the following columns:

- `title`, as a `string`
- `details`, as a `text`
- `completed`, as a `boolean` (default: `false`)

### 2 - Controller

Generate an empty (no action) `TasksController` with the right rails generator.

For this exercise, **do not use `resources`** in your `config/routes.rb`. The goal of this exercise is to re-build the regular CRUD from scratch.

### 3 - _As a user, I can list tasks_

First, add a new route to list the tasks, following the convention from the lecture. Then, add a controller action and its view. This action should fetch **all** tasks, and a view should loop over these to display them, like in the screenshot below.

To test your view, you need some tasks in the database! To create some, run a `rails console` in another terminal tab and then run:

```ruby
Task.create title: 'Laundry', details: 'Do not mix colors!'
Task.create title: 'Studying', details: 'A lot of flashcards to do', completed: true
```

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/tasks-manager/index.png)


WIP
