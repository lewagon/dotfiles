## Background & Objectives

Let's build a To Do Manager with the basic CRUD features:

```
As a user I can list tasks
As a user I can view the details of a task
As a user I can add a task in my To Do list
As a user I can edit the details of a task
As a user I can remove a task from my To Do list
```

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

### Your model

Before getting started with your routes, your controller and the views, generate your model:

- Use `rails generate model <ModelName> <attr1>:<type> <attr2>:<type> ..` to create the model and associated migration all at the same time.
- If you forget a field in your model, you can use `rails generate migration <MigrationName>` to automatically create a new migration file with the required timestamps.
- Remember, you still have to run the `rails db:migrate` to execute your migrations.
- Once that's done, play with the [Rails console](http://guides.rubyonrails.org/command_line.html#rails-console). This is **IRB-on-steroids** that enables you to interact with your Rails application from the command line. You can try to add new tasks to your DB directly from the command line.

### Routing

Your To Do app should have 7 entry points in the routing:

- `GET '/tasks'`: get all your tasks.
- `GET '/tasks/:id'`: get a precise task, e.g `GET '/tasks/3'` fetches the task with id=3
- `GET '/tasks/new'`: get the form to create a new task
- `POST '/tasks'`: post a new task
- `GET '/tasks/:id/edit'`: get the form to edit an existing task
- `PATCH '/tasks/:id'`: update an existing task
- `DELETE '/tasks/:id'`: delete an existing task

You will also have to create a `TasksController` with 7 actions related to those 7 routes. For the names of these actions, use the Rails naming convention:

- `index`
- `show`
- `new`
- `create`
- `edit`
- `update`
- `destroy`

### Guidelines on Views

`index.html.erb`

- Should display a list of all tasks and, for each task:
  - a link to its show view (use a `link_to` helper)
  - a link to its edit view
  - a link to its delete action. **Hint:** a standard link does not allow `DELETE` requests, so here you should add a `method: :delete` option to your `link_to` helper.
- Should include a link to the new view to create a new task

`show.html.erb`

- Should display the task's details (content, date of creation, etc.) and a back-link to the index page.

`new.html.erb` and `edit.html.erb`

- Should include a form to create or update a task.

#### Important

Notice that creating (as well as updating) a task is a **2-requests** process:

- A first GET request displays the HTML form
- A second POST or PATCH request enables us to actually create or update the task using the parameters submitted in the form.

**Controller actions do not necessarily need a view.** For instance, the `create` `update` & `destroy` actions. All they do is perform operations on the DB and then `redirect_to` another URL... so we don't need views for them, right?

#### When you are done

Once you have finished the exercise and have a fully-functioning To Do app, refactor your code:

- Use a [partial](http://guides.rubyonrails.org/layouts_and_rendering.html) to factor the new and edit HTML forms.
- Use the `form_for` helper to build your `new`/`edit` form.
- Refactor your routes with the `resources` routing method.
