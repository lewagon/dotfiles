## Background & Objectives
People often like to play with **window scroll event**. In this challenge, you will see a series of jQuery animations on scroll, some of them using external js lib.

## Specs

Implement all the following animations on the Middleman project you built end of last week. The aim of this challenge is to reproduce the final version of [Stylus](http://lewagon.github.io/stylus).


- **Smooth scroll** is nice when you have internal links in a page. Example:

```html
<a href="#newlsetter">newsletter</a>

<!-- ... -->

<div id="newlsetter">
  Subscribe to our newsletter
</div>
```

Here is the [smoothscroll jQuery script](http://css-tricks.com/snippets/jquery/smooth-scrolling/). Notice the advanced CSS selector `a[href*=#]:not([href=#])`, which enables to select internal links only (href starting with `#`) and not standard links.

- **Window-height**: sometimes you want divisions to exactly fit window height on page load. This can be nice combined with smooth scroll animations. Here is how you can do it

```javascript
// Set div height to exact window height on page load
$(document).ready(function() {
  $(".window-height").css("height", $(window).height());
});
```

Be careful to apply `class="window-height"` only on divs with few content. Otherwise content may overflow.

- **Navbar scroll**: here we give you two navbar jQuery script that you should understand at this point. Feel free to adapt them and use them in your Middleman project

```javascript
$(document).ready(function() {
  // navbar transition jQuery script
  $(window).scroll(function(e){
    if ($(this).scrollTop() > 0) {
      $(".navbar").css({
        "background": "rgba(0, 0, 0, 0.7)",
        "box-shadow": "0 0 2px black"
      });
    }
    else {
      $(".navbar").css({
        "background": "transparent",
        "box-shadow": "0 0 0px transparent"
      });
    }
  });
});
```

```javascript
$(document).ready(function() {
  // navbar transition jQuery script
  $(window).scroll(function(e){
    if ($(this).scrollTop() > 200) {
      $(".navbar").slideUp();
    }
    else {
      $(".navbar").slideDown();
    }
  });
});
```

- **Scroll Reveal**: many website have elements that nicely appear on scroll. This is not very easy to implement in jQuery, especially if you want some cool reveal animatons. [ScrollReveal.js](http://scrollrevealjs.org/) is a nice library that does this job. If you want to use it, nothing easier => [read the doc](https://github.com/julianlloyd/scrollReveal.js). Put the js file in a `javascripts/vendor` folder. **It's never a good idea to mix your code with external lib (in CSS or JS)**. A good practice is to put external files in `vendor` folder (e.g. `stylesheets/vendor` and `javascripts/vendor`).


**Let the scroll be with you!**


