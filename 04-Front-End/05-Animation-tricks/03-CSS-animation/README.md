## Background & Objectives
When people start coding in jQuery, they often forget they can still make cool stuff using only CSS. A good example: CSS animations. In this challenge, you will play with CSS animations, learn to build your own and to use animation library.

## Specs

The aim of this challenge is to reproduce [this page](http://lewagon.github.io/html-css-challenges/07-css-animations/). For that, you will code your own animation and you will also use animations already coded for you.

**Build your animation**: In `animation.css` we gave you the starting point to define the banner animation which combine fade-in and slide-down effects. Notice

- This animation (== keyframe) should be implemented for all vendors (chrome, mozilla..)
- It's a simple animation where we only specify CSS properties at beginning of the animation (0%) and at the end (100%). One could imagine more complicated examples with more time-steps.
- It's common practice to define a CSS class that will call our home-made animation. This way we can use it everywhere in our website just adding `class="fadeInAndSlideDown"`.
- Notice all the argument when we call the animation

```css
animation: animationName duration delay easing forwards;
```

- The last parameter `forwars` is very important. It enables to keep CSS values as they are at the end of the animation, and **not to re-initialize them**.

**Use an external CSS library**: In `animation_cheat_sheet.css` we give you the code of [this CSS library](http://www.justinaguilar.com/animations/) where a lot of animation CSS classes are already implemented. Add CSS classes from this lib in your HTML code to reproduce our page (effects on footer and on down-arrow icon).