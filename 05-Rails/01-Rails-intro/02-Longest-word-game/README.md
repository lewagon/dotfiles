## Background & Objectives

Time to re-implement your "Longest-word game" with a cool web-interface. You can use the code in the solution to `01-Ruby/06-Parsing/02-Numbers-and-Letters` as a starting point.

There is no `rake` here, and do not create your Rails app in `fullstack-challenges`.

⛔️ Please do not copy/paste solutions from previous exercises, try to rewrite them from scratch.

```bash
cd ~/code/<user.github_nickname>
rails new rails-longest-word-game -T
cd rails-longest-word-game
git init
git add .
git commit -m "rails new"
hub create
git push origin master
```

## Specs

For this challenge, we only give you the routing structure. It's your call to generate the relevant controller, actions and views.
This is how your game should work:

- `GET '/game'`: render the page with a new random grid of words, and the HTML form to write your guess just below the word-grid.
- `GET '/score'` should compute and display your score..

## Further suggestions

- To submit a parameter through a form without displaying the corresponding input, you can use a hidden input field `<input type="hidden">`!

## Extra (optional)

Every time a new HTTP request hits your Rails app, it generates a new instance of the controller. This means you cannot store values across requests unless you use a Rails session. A Rails session persists across all requests during a user's session.

Here's how to use a [Rails session](http://guides.rubyonrails.org/action_controller_overview.html#session) to keep track of the total number of games you have played, your average score and other kind of general information.
