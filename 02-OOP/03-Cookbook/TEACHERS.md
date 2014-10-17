## Guidelines

### Morning lecture

#### Reminder

Spend 30 minutes on a simple class and ask them questions step-by-step to code it:

- how do I define the class for my cat? what's the name convention?
- what are the caracteristics of a cat? which kind of variables do you use?
- where do I find the value to instantiate color and name? (code the `initialize` without argument at 1st step)
- how do I access my cat name? define the reader manually with them then use `attr_reader`?
- to change my color? We don't use a writer? Try not to use writer or accessor code your own methods for writing values and keep only the readers. Example here, by having our own method to change color, we can add intelligence (e.g. store color history for my cat), without changing the API.

**Rule of thumb:** No `attr_writer` or `attr_accessor`, code your own writer methods.

<script src="https://gist.github.com/ssaunier/f95ac9e983032bcbe396.js"></script>

#### Building Software

Start with the slides

- Real-life objects: direct way to see classes (ex: car, recipe)
- Data structures: which data structures do you know already? Array, Hash

There are other classicals structures we use a lot in programming

**Stack ("pile" in french)**
- LIFO stucture: "Last In First Out"
- `push` => append element at the end of the array
- `pop` => delete **last** elements and return it
- Well, `Array` is already a LIFO.

**Queue**
- FIFO structure: "First In First Out"
- `push` => append element at the end of the array
- `pop` => delete **first** elements and return it

There are **queues** everywhere in programs. A gives tasks to do to B, well they will use a intermediate queue. A will push tasks and B will pop them progressively.

#### TODO manager
We'll code this software together and interactively. **Here we give you a good way to articulate the live-code and discussion with the class**

What classes do we need for this program (**whiteboard brainstorm**)?
- task, list, file (**data**)
- **display** tasks
- how do you make data & display communicate? **controller** => chief orchestra who has methods for the app logic, add / delete / mark tasks.


##### Data
What do we start with? display, interface, controller? Let's start with data it's the heart of our app

```ruby
# task.rb
class Task
  attr_reader :description, :done
  def initialize(description)
    @description = description
    @done = false
  end
end
```
Well, where is the real data? We need a DB, that we'll see next week. Let's create a repository class to mimic a DB.

```ruby
# task_repository.rb
class TaskRepository
  attr_reader :tasks
  def initialize
    @tasks = []
  end

  def add_task(task)
    @tasks << task
  end
end
```

##### Controller
The controller is the chief orchestra, he will get user input from interface and then manipulate tasks, and update the repository.

```ruby
# controller.rb
class Controller
  def initialize(task_repository) # 4) ok we need to create our controller with an attached repo for 3)
    @task_repository = task_repository
  end

  def add_task
    description = ? # 1) user gives description
    task = Task.new(description) # 2) we create the task
    @task_repository.add_task(task) # 3) add it to our "DB"
  end
end
```

How do we deal with 1)? No `gets.chomp` in the controller this is interface !


##### Display
```ruby
# display.rb
class Dipslay
  def ask_user_for_new_task_description
    puts "What do you want to do?"
    print "> "
    return  gets.chomp
  end
end
```

Now we can complete 1) in controller

```
# controller.rb
class Controller
  def initialize(task_repository, display)
    @task_repository = task_repository
    @display = display
  end

  def add_task
    description = @display.ask_user_for_new_task_description # 1) we can add the display method
    task = Task.new(description)
    @task_repository.add_task(task)
  end

  def list_tasks
    tasks = @task_repository.tasks # 2) use the repository reader
    @display.print_tasks # 3) don't use puts here ! this is the interface responsibility
  end
end
```

Let's enhance our interface

```ruby
# display.rb
class Dipslay
  def ask_user_for_new_task_description
    puts "What do you want to do?"
    print "> "
    return  gets.chomp
  end
  def print_tasks
    puts "Here is your list of tasks:"
    tasks.each do |task|
      task.done ? (print "[ ]") : (print "[X]")
      puts " #{task.description}"
    end
  end
end
```

##### The Glue

Let's code the `app.rb` file that we will launch from terminal

```ruby
require_relative "task_repository"
require_relative "display"
require_relative "controller"

# Create fake DB
task_repo = Task_repository.new

# Create display
display = Dipslay.new

# Create controller
controller = Controller.new(task_repository, display)

while true
  controller.list_tasks

  puts "What do you want to do?"
  puts "1 - add a task"
  puts "2 - ..."
  action = gets_chomp.to_i

  if action == 1
    controller.add_task
  end
end
```

Read the error message! the controller needs the task class. Add `require_relative "task"` in the controller. If we are not satisfied by the display, we know we need to change the `Display` class only !! yeah, that's what is great with separating responsibilities.

Finish the live-code adding the feature of marking tasks as done.


### Day challenges
Before starting the challenges

- Ensure every student has a clean git status, and that he has pulled upstream. Otherwise students may work on old versions of the challenges :).

```
$ cd ~/code/${GITHUB_USERNAME}/promo-4-challenges/
$ git status #everything should be ok!
$ git pull --no-edit upstream master
```

- Ensure they're connected on the class Slack

- Make a brief overview of the roadmap of the day with them, explaining the general idea behind each challenge.

The

### Live-code

#### General guidelines
- The live-code should be made **from scratch**. No specs, no boilerplate. The student has to `mkdir` a new folder, `touch` its ruby file, and start coding in it. Help him on the setup. Make him code **a solution that works** in one ruby file before refactoring the code (separating the logic from the interface in 2 files, DRYing the repetitive code chunks, etc..)

- Announce, **before the live-code**, which challenges they are going to live-code and who are the coders of the day. It will make them stay tensed and focused! Tell them they have to speak loud and explain their approach while they are live-coding. That's the best exercise to improve their skills!

- At the end of the live-code, ensure every `git status` is clean in the class! To make the work of your buddy-teacher easier tomorrow :)

#### Live-code details
