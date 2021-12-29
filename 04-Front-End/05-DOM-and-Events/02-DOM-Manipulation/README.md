## Background & Objectives

The goal of this exercise is to dynamically manipulate a web page using what you learnt about selectors during the CSS module.

We refer to this as manipulating the [Document Object Model](http://en.wikipedia.org/wiki/Document_Object_Model) (DOM), which is **the in-memory representation of the HTML built by the browser**. Think of it like a family tree: the root node, its children, its grandchildren, etc. On that tree, you can then:

- Traverse it to read specific nodes
- Remove nodes
- Add nodes

Doing any of these will instantly change the look of the page without hitting "Refresh".

## Specs

Open the `lib/dom.js` file, you will find a list of challenges to
complete.

To test your code, open a new terminal and run this command:

```bash
rake webpack
```

Then open [`localhost:8080`](http://localhost:8080) in your favorite web browser. Open the Console.

Change some code in the `lib/dom.js`, as soon as you save in your text editor, the page will reload in the browser.

Your goal is to make all tests pass!
