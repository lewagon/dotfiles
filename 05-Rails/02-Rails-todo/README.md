## Background & Objectives
In this challenge, you will meet again your old friend **Active Record**, which is Rails' ORM.

## Specs

### Routing

Build a Rails todolist application. Your todo-app should have 7 entry points in the routing:

1. `GET '/tasks'`: get all your tasks.
1. `GET '/tasks/:id'`: get a precise task, e.g `GET '/tasks/33'` get task with id=3
1. `GET '/tasks/new'`: get the form to create a new task
1. `POST '/tasks'`: post a new task
1. `GET '/tasks/:id/edit'`: get the form to edit an existing task
1. `PATCH '/tasks/:id'`: update an existing task
1. `DELETE '/tasks/:id'`: delete an existing task

You will have to create a `TasksController` with 7 actions related to those 7 routes. For the names of these actions, use Rails naming convention.

1. index
1. show
1. new
1. create
1. edit
1. update
1. destroy

### Your model first

Before starting to build your routes, your controller and views, generate your model:

- Use `rails generate model <ModelName> <attr1>:<type> <attr2>:<type> ..` to create the model and associated migration all at the same time.
- If you forget a field in your model, you can use `rails generate migration <MigrationName>` to automatically create a new migration file  with good timestamps.
- You still have to run the good `rake db:migrate` to execute your migrations.
- Once that's done, play with the [Rails console](http://guides.rubyonrails.org/command_line.html#rails-console). This is a **IRB-on-steroids** that enables you to interact with your Rails application from the command line. You can try to add new tasks to your DB directly from the command line.

### Guidelines on Views

Some guidelines to build your views

`index.html.erb`
- Should display a list of all tasks and, for each task:
  - a link to its show view (use a `link_to` helper)
  - a link to its edit view
  - a link to its delete action. **Tips**: a standard link does not allow to perform `DELETE` request, so here you should add a `method: :delete` option to your `link_to` helper.
- Should include a link to the new view to create a new task

`show.html.erb`
- Should display the task's details (content, date of creation, etc.) and a back-link to the index page.

`new.html.erb` and `edit.html.erb`
- Should include a form to create or update a task.


#### Important

Notice that creating (as well as updating) a task is a **2-requests** process:

1. A first GET request is here to display the HTML form
1. A second POST or PATCH request enables to actually create or update the tasks using the parameters submitted in the form.

An action is not necessarily associated with a view. For instance, the create/update/destroy actions are not associated with any views. They are just here to perform operations on the DB and then `redirect_to` another URL.

#### When you are done

When you are done with the exercise, which means you have a functionnal todo-app, refactor your code:

- Use a [partial](http://guides.rubyonrails.org/layouts_and_rendering.html) to factor the new and edit HTML forms.
- Use the `form_for` helper to build you new/edit form.
- Refactor your routes with the `resources` routing method.