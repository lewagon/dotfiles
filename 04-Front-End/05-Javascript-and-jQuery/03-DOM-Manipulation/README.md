## Background & Objectives

You are about to write your first jQuery code. The goal of this exercise
is to re-use what you have learned throughout the CSS module about
selectors, to dynamically manipulate the web page.

We say that we manipulate the [Document Object Model](http://en.wikipedia.org/wiki/Document_Object_Model) (DOM), which is
the in-memory representation of the HTML built by the browser. It is
a tree (root node, with children, and grand-children, etc.), and
you can:

- Traverse it to read a specific node
- Remove some nodes
- Add some nodes

Doing so will change what the page looks like, instantaneously, without
hitting "Refresh".

Here we can't check the code correctness with `rake`, it will happen directly **in the browser**.

## Specs

Open the `application.js` file, you will find a list of challenges to
complete. To test your code, open a new terminal and run this command:

```bash
serve
```

Then open [`localhost:8000`](http://localhost:8000) in your favorite web browser. Hit `Cmd` (or `Ctrl` on Linux) + `Shift` + `R` to force reload if you have an old site (previous exercise or something else).

You will see that all results are failing. Solve them from top to bottom, and hit F5 (Refresh) each time you want to check if you've solved an exercise. That's a **manual** test if you will, no `rake` here.
