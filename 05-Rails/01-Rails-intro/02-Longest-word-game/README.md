## Background & Objectives

Time to re-implement your "Longest-word game" with a cool web-interface. You can use the code in the solution to `01-Ruby/06-Parsing/02-Numbers-and-Letters` as a starting point.

## Specs

Herebelow is how your game should work. We only give you the routing structure. Your call to generate the relevant controller, actions and views.

- `GET '/game'`: render the page with a new random grid of words, and the HTML form to write your guess just below the word-grid.

- `GET '/score'` should compute and display your score..

## Further suggestions

- To submit a parameter through a form without displaying the corresponding input, you can use a hidden input field `<input type="hidden">`!

- Remember: for the forms to work you will need to remove the following line :
```ruby
  protect_from_forgery with: :exception
```
In the `app/controllers/application_controller.rb` file.
This will be explained in more details during the next days, but you can learn more about it [here](http://guides.rubyonrails.org/security.html).

## Extra (optional)

Everytime a new HTTP request hits your Rails app, it generates a new instance of the controller. Hence, you cannot store values across requests, except if you use Rails session. Rails session is persisted between all requests of the user's session.

Here you can use [Rails session](http://guides.rubyonrails.org/action_controller_overview.html#session) to keep track of the total number of games you have played, your average score and other kind of general information.
