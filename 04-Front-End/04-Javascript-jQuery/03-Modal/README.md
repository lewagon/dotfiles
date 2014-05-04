# Background & Objectives

Write a small HTML/CSS/JS plugin that creates a modal when you click on an image.

Example : http://kylefox.ca/jquery-modal/examples/

# Specs

You have a simple html page with an image :

```html
  `<img src="xxx.jpg" data-modal-height="800" data-modal-width="600">`
```

- Clicking on the image appends to the <body> a full screen `div` with black background (opacity 0.5).
  Then it displays an other div (the modal) on top of this, containing the image.
  The modal must be vertically and horizontally centered with a fixed size 800*600px (the size depends on the data-modal-height & data-modal-width attributes).
- Clicking on the black background comes back to normal page.
- It would be nice if the image came with a little animation (eg. fade, stretch or slide)

# Tips & Tricks

- You can use jQuery `append()` and `html()`.
- You can use jQuery `css()` to set some css like the size of the image.

# If this is too simple for us :

- Create a way to display a modal when clicking on a link with a `rel="xxx.jpg"` the same as the `src="xxx.jpg"` of the img tag.
- Create a way to display not only an image in the modal, but text.