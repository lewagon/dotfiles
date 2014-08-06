## Background & Objectives

Time to re-implement your "Longest-word game" with a cool web-interface. You can use the code in the solution to `01-Ruby/06-Parsing/02-Numbers-and-Letters` as a starting point.

## Specs

Herebelow is how your game should work. We only give you the routing structure. Your call to generate the relevant controller, actions and views.

- `GET '/game/new'`: render the page with a new random grid of words, and the HTML form to write your guess below.

- `POST '/attempt'` should post your attempt. An attempt means 2 parameters: your guess e.g "horse" and the initial word-grid e.g. "ossghreui".

- `GET '/result'` should display your result.

## Tips

- If you want your form to hit a POST request when submitted you have to add the `method` attribute to your form. Ex:

```html
<form action="/some/url" method="post">
  <!--your form body-->
</form>
```

- To post a parameter though a form without displaying the corresponding input field (like for the initial grid in this challenge), you can use a hidden input field `<input type="hidden">`!

## Extra

Use [Rails session](http://guides.rubyonrails.org/action_controller_overview.html#session) to keep track of the number of games you have played, your average score, this can of information you want to store cross-requests.


