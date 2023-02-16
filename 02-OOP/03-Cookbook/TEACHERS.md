## Intro (1')

- Until now, scripts in 1 or 2 files
- In this block: we’ll build a software from scratch
- How to figure out the classes we need to code?

## How to figure out a class (10')

- Until now: `Car`, `Restaurant`, `OrangeTree`… == **Real world objects**
  - Note: classes are always defined in the singular form!
  - Quite easy to figure out attributes (instance variables) and behavior (instance methods)
  - Examples (slides)

- **Data structures** - ex: `Array`, `Hash` (less concrete, harder to model)
  - Stack
    - State? elements’ list `@elements = []`
    - Behavior? LIFO `#push(element)` `#pop`
  - Queue
    - State? elements’ list `@elements = []`
    - Behavior? FIFO `#enqueue(element)` `#dequeue`
    - Load Balancer example

## Livecode: TODO-manager (35')

- Client demand: task manager
- User stories:
  - list tasks
  - add a task
  - mark a task as done
  - remove a task

### Let's figure out the classes we need!

- Smallest entity? Underlying data to model? class **Task**
  - Process: conceive your class on the whiteboard
  - State? `@description`, `@done` - that’s it for our MVP
  - Behavior? `#mark_as_done!`
  - Code [class](https://github.com/lewagon/oop-todolist/blob/master/lib/task.rb)
  - Test it in `irb`: `cleaning = Task.new("Cleaning")`, `cooking = Task.new("Cooking")`, `cleaning.mark_as_done!` => OK
  - Emerging need: where should we store our tasks?
- Class to act as our in-memory DB? **Repository**
  - State? `@tasks = []` - # Stores INSTANCES of Task!
  - Behavior? `#create(task)`, `#destroy(task)`
  - Code [class](https://github.com/lewagon/oop-todolist/blob/master/lib/task_repository.rb)
  - Test in `irb`: `repo.create(cleaning)`, `repo.create(cooking)`, `repo.destroy(cleaning)` => OK
  - Emerging need: how do we display tasks in the terminal?
- Class to display/ fetch data to/ from user? **View**
  - State? None! There’s nothing to characterise a View! Only behavior.
  - Behavior? `#display(tasks)` # array of Task INSTANCES
  - Code [class](https://github.com/lewagon/oop-todolist/blob/master/lib/tasks_view.rb)
  - Test in `irb`: `view.display(repo.all)`
    - Necessity to add `#all` in our `Repository` class
    - Necessity to add `attr_reader :description` in our `Task` class
  - Good. But we're still far from launching `ruby app.rb` and typing 1, 2, 3…
- Class to articulate everything: **Controller**
  - Responsibility: serve user actions
  - State? Hard to guess here (not concrete enough). We’ll discover it when we code the actions.
  - Behavior? ACTIONS: `#list`, `#add`, `#mark_as_done`, `#remove`

  **List**
  - Pseudo code
    - Fetch array of tasks from repo
    - Send it to view to display them
  - Code action in controller
    - Necessity to define `@repo` and `@view`
    - Necessity to define `Repository#all`
  - Create `test.rb` file to test
  - Improve `View#display(tasks)` with `“[x]” : “[ ]”`
  - Add `#done?` in `Task`
  - Test => OK

  **Add**
  - Pseudo code
    - Get description from `@view`
    - Create new task with description
    - Store it in `@repo`
  - Code
    - Necessity to code `View#ask_user_for_description`
  - Add `controller.add` in `test.rb`
  - Test => OK

  **Mark as done**
  - Pseudo code
    - Display tasks
    - Ask user for index
    - Fetch task
    - Mark task as done
  - Code
    - Refacto private `Controller#display` with the 2 steps from `#list`
    - Necessity to enhance `View#display(tasks)` with indices
    - Code `View#ask_user_for_index`
    - Necessity to code `Repository#find(index)`
  - Add action in `test.rb`
  - Test => OK

  **Remove** (if there’s enough time left)
  - Pseudo code
    - Display tasks
    - Ask user for index
    - Remove it from repo
  - Code
    - Replace `#destroy(task)` by `#destroy(task_index)` (better UX)
  - Add action in `test.rb`
  - Test => OK
- Class to route user’s request to the right controller’s action: **Router**
  - State? No guess here either => we’ll see as we code
  - Behavior? `#run`
  - Code [class](https://github.com/lewagon/oop-todolist/blob/master/lib/router.rb)
    - Infinite loop
    - Private `#print_menu`
    - Case action calling the right action on `@controller` (dependency injection)
- Executable [file](https://github.com/lewagon/oop-todolist/blob/master/app.rb) `app.rb`
  - Bottom-up approach
  - `router.run` => we need a `router`
  - `Router.new(controller)` => we need a `controller`
  - `Controller.new(repo)` => we need a `repo`
  - `Repo.new`
  - `require_relative` => every class called with a capital first letter in the file
  - Test => OK

## Whiteboard => MVC recap (15')

- View => **V** - Controller => **C** - Task? Generic name => Model **M** => **MVC** design pattern
- Rails framework based on MVC
- In software architecture: 1 file == 1 class
- **SRP - Single Responsibility Principle** - 1 class == 1 responsibility
- The MVC pattern follows this principle
- Responsibilities
  - **Model (Task)**: **in-memory representation of a task**
  - **View**: **interact with the user** - only `puts` and `gets`
  - **Controller**: **serve user actions** by pivoting between V and M + Repo (= Data brick). Encapsulates intelligence
  - Outside MVC
    - Repository: store tasks - will be replaced by a DB in a few days
    - Router: dispatch user’s intention to the right action in the controller
- Parallel with Web
  - View: will generate the HTML to send back to the user’s browser
  - Repository: out - Active Record: in. Request DB directly from Model.
  - Router: given by Rails. User intention == HTTP request.
- What’s the major limit of our TODO-manager?
  - When we quit the program and relaunch it => data is lost
  - Repository only holds an in-memory DB role
  - In this block’s exercise => you’ll add persistency to your hard drives by using a CSV file!

## Cookbook challenge (1')

- Really close from the lecture's livecode
- Add persistency
- The challenge is to organize your code properly!
- If students manage to reach the part with [Nokogiri](https://nokogiri.org/) to scrape recipes from the web at the end of the third challenge, you can remind them about [our dedicated cheatsheet](https://kitt.lewagon.com/knowledge/cheatsheets/nokogiri).
