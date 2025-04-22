## Background & Objectives

The goal of this exercise is to use your knowledge of CSS selectors to dynamically manipulate a web page using JavaScript.

We refer to this as manipulating the [Document Object Model](http://en.wikipedia.org/wiki/Document_Object_Model) (DOM), which is **the in-memory representation of the HTML built by the browser**. Think of it like a family tree. It starts with the same base, the grandparents. Then there's a generation of parents. Then the children and grandchildren, etc. It will keep spreading out over time. Each person in this family tree, or point in the tree structure, is called a "node". On that tree, you can:

- Traverse the DOM to read specific nodes
- Remove nodes
- Add nodes

Remember that you have to refresh the page every time you make a change.

## Specs

Open the `lib/dom.js` file, you will find a list of challenges to complete that are explained in code comments.

Then, open a new terminal and run this command:

```bash
serve
```

(Leave this server running while you work on this challenge.)

Then open [`localhost:8000`](http://localhost:8000) in your browser. You should see the tests (in red). Your goal is to make them all pass by completing the challenges in the `lib/dom.js` file and make them turn green!

Each time you change some code in the `lib/dom.js`, as soon as you save in your text editor, reload the page in the browser. This is how you will see your changes reflected.
