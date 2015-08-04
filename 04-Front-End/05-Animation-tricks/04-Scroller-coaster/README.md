## Background & Objectives
People often like to play with **window scroll event**. In this challenge, you will see a series of jQuery animations on scroll, some of them using external js libraries.

## Specs

Implement all the following animations on the Middleman project you built end of last week. The aim of this challenge is to reproduce the final version of our [Middleman challenge](http://lewagon.github.io/middleman-challenges/).


### Smooth scroll

Smoothing navigation when you have internal links in a page. Example:

```html
<a href="#map">Find us</a>

<!-- ... -->

<div id="map"></div>
```

Here is the [smoothscroll jQuery script](http://css-tricks.com/snippets/jquery/smooth-scrolling/). Notice the advanced CSS selector `a[href*=#]:not([href=#])`, which enables to select internal links only (href starting with `#`) and not standard links.

### Navbar scroll

Here we give you two navbar scripts that you should be able to understand at this point. Feel free to adapt them and use them in your Middleman project as you wish

```javascript
$(document).ready(function() {
  // navbar transition jQuery script
  $(window).scroll(function(e){
    if ($(this).scrollTop() > 50) {
      $(".navbar").css({
        "margin-top": "-70px"
      });
    }
    else {
      $(".navbar").css({
        "margin-top": "0px"
      });
    }
  });
});
```

### Scroll Reveal

Many website have elements that nicely appear on scroll. This can be a bit long to implement in jQuery, especially if you want some fancy reveal animatons. [ScrollReveal.js](http://scrollrevealjs.org/) is a popular library for this job. Very easy to integrate, [read the documentation](https://github.com/julianlloyd/scrollReveal.js).


**Important** Put ScrollReveal js file in a `javascripts/vendor` folder. It's never a good idea to mix your code with external library (CSS or JS). A common practice is to put external files in a `vendor` folders (e.g. `stylesheets/vendor` and `javascripts/vendor`).


Let the scroll be with you!