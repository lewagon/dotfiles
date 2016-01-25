## Background & Objectives

Write a small HTML/CSS/JS plugin that creates a modal when you click on an image.

Example : [jQuery modal](http://kylefox.ca/jquery-modal/examples/)

## Specs

You have a simple html page with an image :

```html
<img src="xxx.jpg" data-modal-height="800" data-modal-width="600">
```

- Clicking on the image:
  - displays a black background: append to the `body` a full screen `div` with background color set to black and opacity set to 0.5.
  - displays another `div` (the modal) on top of the black background: this div should contain the image.
- Clicking on the black background comes back to normal page.

It would be nice if the image appears with a little animation (eg. fade, stretch or slide).

The modal must be vertically and horizontally centered with a fixed size of 800*600px (the size depends on the `data-modal-height` and `data-modal-width` attributes).

## Tips & Tricks

- You can use jQuery `append()` and `html()`.
- You can use jQuery `css()` to set some css like the size of the image.

## If this is too simple for you

- Display a modal that contains an image. when clicking on a link which have a `rel="xxx.jpg"` attribute that contains the image url.
- Add a text to your modal.
