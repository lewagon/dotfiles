## Guidelines

### Morning Lecture

This lecture is an introduction for the **next 2 blocks**. People will
work on their first app with several models / controllers, on the
next 2 blocks (there won't be any lectures for the next block, the last one of OOP).

#### Methodology

You want to keep the students focused on the big picture. Don't hesitate to
take the whiteboard and write in plain english what your program should do.
Keep that always on so that you can refer to it. Explain to the student
that is the first point.

Once those sentences are written down, try to guess which model classes
the program should use. That would be `Room` and `Patient`.

So basically, the begininng of the presentation is on the whiteboard, and
the slides are here for future reference, don't just stick on them. Once
you have the specs written in plain english + the UML diagram, asks the question,
"How to convert this diagram into Ruby?"

That's where you jump to live-code. Write all the models with `initialize` and
instance variables.

Then add two new models to your diagram: appointments and doctors. Add these to your code and add the method to create an appointment and link doctors and patients.

#### Introduction to the Food Delivery Exercise

You should make a good introduction for the food delivery:

- It will last 2 blocks
- Do a demo of what they should program (in the `fullstack-solutions` repo, launch `ruby app.rb`)
- Explain there will be a logged in access
- Explain that they will have several models, controllers and views
- Explain that for each model, there is one controller and one view (but start by the model)
- The "Routing logic" is not provided, students should not focus on it at first, just models and controllers, and run basic scenario through app.rb
- Explain that there will be storage as CSV again, and that their should be a repository class for each model.
