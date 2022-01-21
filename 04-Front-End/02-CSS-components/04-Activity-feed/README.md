## Background & Objectives

Build [an activity feed](http://lewagon.github.io/html-css-challenges/13-activity-feed/) similar to Dribbble's one.

1. Create your `avatar` CSS component.
2. Implement your tabs and your notification design in `tabs.css` and `notification.css`.

But first, **read all the instructions**!

## Tab design

Tabs are pretty easy to design. The HTML looks like this:

```html
<div class="tabs">
  <a href="#" class="tab active">Traveling</a>
  <a href="#" class="tab">Hosting</a>
</div>
```

Once that is done:
- Make `.tabs` a flexbox
- Add some `padding` on each `.tab`
- You don't even need `space-between` or `align-items` here because the tabs already have the same `height`
- You can also design the **active** and **hover** states of tabs using `.tab:active` & `.tab:hover`. You will probably need to play with the `opacity` and the `border-bottom` 😬

## Notification design

For the `.notification` design, **go back to the slides!** This is a classic use case for flexbox here, with the body of the notification pushing the other items thanks to a `flex-grow`.

Once that is done, it's just a matter of fine-tuning your `margin`, `padding`, and playing with fonts and colors.

So what are you waiting for? Time to make a cool activity feed! 🚀🚀

## [Extra tip] User Images

For user images in your activity feed you can use a placeholder service that we have built to get any Kitt user's github image using their GitHub nickname. Just use this URL: `https://kitt.lewagon.com/placeholder/users/<user.github_nickname>`, and try it with a few different github handles.

## [Extra tip] First & last child selectors

You can select first (or last notification) with these selectors:

```css
.notification:first-child {
  /* CSS code for the first element with class="notification" */
}
.notification:last-child {
  /* CSS code for the last element with class="notification" */
}
```

It can be useful to get rid of `border-bottom` on the last notification of the feed for instance!

NB: don't forget to **hard refresh** your browser (`Cmd + Shift + R`) to clear your browser's cache if your page doesn't seem to display your current code!
