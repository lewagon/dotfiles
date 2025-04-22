## Setup

We want to put the final touches on our profile page now. If you haven't already, let's copy your profile into this challenge's folder:

```bash
cp -r ../03-Finishing-profile-design/profile .
```

## Background & Objectives

## Make our page responsive with media queries

Your profile is complete, but what happens if you re-size your browser window and make it smaller? Your page is not yet **responsive** 😱.

If you want a responsive design, you can add media queries in your CSS. To use media queries, you must have this line in the `<head>` of your html 👇

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

This allows your page to detect the screen width of the device you are using.

Media queries work a bit like an `if` statement in Ruby. Basically **you can define CSS rules that will only apply if the window is smaller than a given width**. For instance, if you want a responsive container, you can build it like this:


```css
@media (max-width: 960px) {
  /* For a screen < 960px, this CSS will be read */
  .container {
    width: 700px;
  }
}

@media (max-width: 720px) {
  /* For a screen < 720px, this CSS will be read */
  .container {
    width: 500px;
  }
}

@media (max-width: 540px) {
  /* For a screen < 540px, this CSS will be read */
  .container {
    width: 300px;
  }
}
```

Try to resize your window to understand how media queries work.

### ⚠️⚠️⚠️ Be careful with the order of your media queries ⚠️⚠️⚠️

As with `if` statements in Ruby, order matters! If several conditions are `true`, the last CSS rule will be applied.
