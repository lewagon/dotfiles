## Intro (1')

1. Until now, scripts in 1 or 2 files
1. Today: we’ll build a software from scratch
1. How to figure out the classes we need to code?

## How to figure out a class (10')

1. Until now: `Car`, `Restaurant`, `OrangeTree`… == **Real world objects**
  1. Note: classes are always defined in the singular form!
  1. Quite easy to figure out attributes (instance variables) and behavior (instance methods)
  1. Examples (slides)

1. **Data structures** - ex: `Array`, `Hash` (less concrete, harder to model)
  1. Stack
    1. State? elements’ list `@elements = []`
    1. Behavior? LIFO `#push(element)` `#pop`
  1. Queue
    1. State? elements’ list `@elements = []`
    1. Behavior? FIFO `#enqueue(element)` `#dequeue`
    1. Load Balancer example

## Livecode: TODO-manager (35')

1. Client demand: task manager
1. User stories:
  - list tasks
  - add a task
  - mark a task as done
  - remove a task

### Let's figure out the classes we need!

1. Smallest entity? Underlying data to model? class **Task**
  1. Process: conceive your class on the whiteboard
  1. State? `@description`, `@done` - that’s it for our MVP
  1. Behavior? `#mark_as_done!`
  1. Code [class](https://github.com/lewagon/oop-todolist/blob/master/lib/task.rb)
  1. Test it in `irb`: `cleaning = Task.new("Cleaning")`, `cooking = Task.new("Cooking")`, `cleaning.mark_as_done!` => OK
  1. Emerging need: where should we store our tasks?
1. Class to act as our in-memory DB? **Repository**
  1. State? `@tasks = []` - # Stores INSTANCES of Task!
  1. Behavior? `#add(task)`, `#remove(task)`
  1. Code [class](https://github.com/lewagon/oop-todolist/blob/master/lib/task_repository.rb)
  1. Test in `irb`: `repo.add(cleaning)`, `repo.add(cooking)`, `repo.remove(cleaning)` => OK
  1. Emerging need: how do we display tasks in the terminal?
1. Class to display/ fetch data to/ from user? **View**
  1. State? None! There’s nothing to characterise a View! Only behavior.
  1. Behavior? `#display(tasks)` # array of Task INSTANCES
  1. Code [class](https://github.com/lewagon/oop-todolist/blob/master/lib/tasks_view.rb)
  1. Test in `irb`: `view.display(repo.all)`
    1. Necessity to add `#all` in our `Repository` class
    1. Necessity to add `attr_reader :description` in our `Task` class
  1. Good. But we're still far from launching `ruby app.rb` and typing 1, 2, 3…
1. Class to articulate everything: **Controller**
  1. Responsibility: serve user actions
  1. State? Hard to guess here (not concrete enough). We’ll discover it when we code the actions.
  1. Behavior? ACTIONS: `#list`, `#create`, `#mark_as_done`, `#destroy`
    1. **List**
      1. Pseudo code
        1. # Fetch array of tasks from repo
        1. # Send it to view to display them
      1. Code action in controller
        1. Necessity to define `@repo` and `@view`
        1. Necessity to define `Repository#all`
      1. Create `test.rb` file to test
      1. Improve `View#display(tasks)` with `“[x]” : “[ ]”`
      1. Add `#done?` in `Task`
      1. Test => OK
    1. **Create**
      1. Pseudo code
        1. # Get description from `@view`
        1. # Create new task with description
        1. # Store it in `@repo`
      1. Code
        1. Necessity to code `View#ask_user_for_description`
      1. Add `controller.create` in `test.rb`
      1. Test => OK
    1. **Mark as done**
      1. Pseudo code
        1. # Display tasks
        1. # Ask user for index
        1. # Fetch task
        1. # Mark task as done
      1. Code
        1. Refacto private `Controller#display` with the 2 steps from `#list`
        1. Necessity to enhance `View#display(tasks)` with indices
        1. Code `View#ask_user_for_index`
        1. Necessity to code `Repository#find(index)`
      1. Add action in `test.rb`
      1. Test => OK
    1. **Destroy** (if there’s enough time left)
      1. Pseudo code
        1. # Display tasks
        1. # Ask user for index
        1. # Remove it from repo
      1. Code
        1. Replace `#remove(task)` by `#remove(task_index)` (better UX)
      1. Add action in `test.rb`
      1. Test => OK
1. Class to route user’s request to the right controller’s action: **Router**
  1. State? No guess here either => we’ll see as we code
  1. Behavior? `#run`
  1. Code [class](https://github.com/lewagon/oop-todolist/blob/master/lib/router.rb)
    1. Infinite loop
    1. Private `#print_menu`
    1. Case action calling the right action on `@controller` (dependency injection)
1. Executable [file](https://github.com/lewagon/oop-todolist/blob/master/app.rb) `app.rb`
  1. Bottom-up approach
  1. `router.run` => we need a `router`
  1. `Router.new(controller)` => we need a `controller`
  1. `Controller.new(repo)` => we need a `repo`
  1. `Repo.new`
  1. `require_relative` => every class called with a capital first letter in the file
  1. Test => OK

## Whiteboard => MVC recap (15')

1. View => **V** - Controller => **C** - Task? Generic name => Model **M** => **MVC** design pattern
1. Rails framework based on MVC
1. In software architecture: 1 file == 1 class
1. **SRP - Single Responsibility Principle** - 1 class == 1 responsibility
1. The MVC pattern follows this principle
1. Responsibilities
  1. **Model (Task)**: **in-memory representation of a task**
  1. **View**: **interact with the user** - only `puts` and `gets`
  1. **Controller**: **serve user actions** by pivoting between V and M + Repo (= Data brick). Encapsulates intelligence
  1. Outside MVC
    1. Repository: store tasks - will be replaced by a DB in a few days
    1. Router: dispatch user’s intention to the right action in the controller
1. Parallel with Web
  1. View: will generate the HTML to send back to the user’s browser
  1. Repository: out - ActiveRecord: in. Request DB directly from Model.
  1. Router: given by Rails. User intention == HTTP request.
1. What’s the major limit of our TODO-manager?
  1. When we quit the program and relaunch it => data is lost
  1. Repository only holds an in-memory DB role
  1. In today’s exercise => you’ll add persistency to your hard drives by using a CSV file!

## Cookbook challenge (1')

1. Really close from this morning's livecode
1. Add persistency
1. The challenge is to organize your code properly!
