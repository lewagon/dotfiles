## Background & Objectives 

The objectives of this challenge are :

* Embrace the [Bootstrap CSS](http://getbootstrap.com/) library, it will be your best friend for the rest of your life!
* This challenge focus on the [Bootstrap grid system](http://getbootstrap.com/css/#grid), you will not need to use other components of Bootstrap here. But the grid system is the hardest part of Boostrap, all the rest is just a matter of copy & paste!
* Embed [Fontawesome](http://fontawesome.io/) icons, which behave as texts as you will realize (this is VERY convenient).

In the HTML of the canvas, we give you raw blogposts. **You need to insert these blogposts in a well-structured Bootstrap grid**. Remember:

- A good grid should include **an immediate succession of `.container > .row > .col`**. Don't insert any `<div>` between a `.container` and a `.row` or between a `.row` and a `.col`. 
- If you want a grid with responsive behavior, start with the smallest class (`.col-xs`) and then add additional classes if you want a change in your grid for larger devices (`.col-sm`, `.col-md`, `.col-lg`) 
- You're are not obliged to write all the classes(`.col-xs`, `.col-sm`, `.col-md`, `.col-lg`). If not specified, the last class will apply. E.g `<div class="col-xs-12 col-sm-6">` will occupy six columns on tablets (`sm`) **AND on larger devices** (`md` and `lg`).  

## Specs

Change the **HTML**, and the HTML ONLY, to reproduce [this design](http://lewagon.github.io/showroom/Layouts/header-better/blog.html) 

## Optional

* If you have completed this challenge, try to change you HTML markup (this time by adding HTML tags), to have 3 blocks, one for the post title and date on the left, 1 central for the post content, and a last block on the right with social links (FB/twitter).

* Give some custom responsive behavior to your website and test it by changing your window's size.
