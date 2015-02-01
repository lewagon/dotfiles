## Background & Objectives
When people start coding in jQuery, they often forget they can still make cool stuff using only CSS. A good example: CSS animations. In this challenge, you will play with CSS animations, learn to build your own and to use animation library.

## Specs

The aim of this challenge is to reproduce [this page](http://lewagon.github.io/html-css-challenges/07-css-animations/). For that, you will code your own animation and you will also use animations already coded for you.

### Build your animation

In `animation.css` we gave you the starting point to define the banner animation which combine fade-in and slide-down effects. Some important points:

- This animation (keyframe) should be implemented for all vendors (chrome, mozilla..)
- It's a simple example where we only specify CSS properties at beginning of the animation (**0%**) and at the end (**100%**). There are more complicated examples with more time-steps.
- It's good practice to define a CSS class that will apply our animation. We can then use it everywhere in our website just adding `class="fadeInAndSlideDown"`.
- Notice the code for calling an animation in CSS

```css
animation: animationName duration delay easing forwards;
```

- The last parameter `forwards` is very important. It enables to keep CSS values as they are at the end of the animation, and **not to re-initialize them**.

### Use an external CSS library

In `animation_cheat_sheet.css` we give you the code of [this CSS library](http://www.justinaguilar.com/animations/) where a lot of animation classes are already implemented. Add CSS classes from this lib in your HTML code to reproduce our page effects (on footer and on "down-arrow" icon).