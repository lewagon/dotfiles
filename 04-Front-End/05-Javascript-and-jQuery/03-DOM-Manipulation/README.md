## Background & Objectives

You are about to write your first jQuery code. The goal of this exercise
is to dynamically manipulate the web page using what you learnt during the CSS module about selectors.

We say that we manipulate the [Document Object Model](http://en.wikipedia.org/wiki/Document_Object_Model) (DOM), which is the in-memory representation of the HTML built by the browser. Think of it like a family tree: the root node, its children, its grandchildren, etc. On that tree, you can then:

- Traverse it to read specific nodes
- Remove nodes
- Add nodes

Doing any of these will instantly change the look of the page without
hitting "Refresh".

(Given we're working **in the browser**, there's no `rake` to check your work)

## Specs

Open the `application.js` file, you will find a list of challenges to
complete. To test your code, open a new terminal and run this command:

```bash
serve
```

Then open [`localhost:8000`](http://localhost:8000) in your favorite web browser. Hit `Cmd` (or `Ctrl` on Linux) + `Shift` + `R` to force reload if you have an old site (previous exercise or something else).

Right now, you will see that all results are failing. Work through them in order from top to bottom, and hit F5 (Refresh) on the page each time you want to check if you've solved an exercise.
