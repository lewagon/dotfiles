## Background & Objectives

Time to re-implement your "Longest-word game" with a cool web-interface. You can use the code in the solution to `01-Ruby/06-Parsing/02-Numbers-and-Letters` as a starting point.

## Specs

Herebelow is how your game should work. We only give you the routing structure. Your call to generate the relevant controller, actions and views.

- `GET '/game'`: render the page with a new random grid of words, and the HTML form to write your guess just below the word-grid.

- `GET '/score'` should compute and display your score..

## Tips

- To submit a parameter though a form without displaying the corresponding input, you can use a hidden input field `<input type="hidden">`!


## Extra (optional)

Everytime a new HTTP request hits your Rails app, it generate a new instance of the controller. Hence, you cannot store values cross-request, except if you use Rails session or flash. Rails session is persisted between all requests of the user's session, whereas Rails [flash](http://guides.rubyonrails.org/action_controller_overview.html#the-flash) is just stored for the next request.

Here you can use [Rails session](http://guides.rubyonrails.org/action_controller_overview.html#session) to keep track of the number of games you have played, your average score, this kind of information.


