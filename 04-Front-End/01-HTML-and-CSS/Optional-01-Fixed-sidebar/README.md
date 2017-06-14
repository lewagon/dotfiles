## Background & Objectives

Build a nice layout with a fixed sidebar and a scrollable page content.

## Specs

Here is [your objective](http://lewagon.github.io/html-css-challenges/05-fixed-sidebar/). To build such layout, you will have to **position the left sidebar as fixed**, and add some CSS to get the page content on the right. Your page HTML structure should look like that:

```html
<div id="sidebar">
  ...
</div>
<div id="page-content">
  ...
</div>
```

And the associated CSS code:

```css
#sidebar {
  position: fixed;
  width: 300px;
  left: 0;
  top: 0;
  bottom: 0;
}
#page-content {
  margin-left: 300px;
}
```

## Further suggestions & resources (internal links)

Sometimes you need internal links, referring to sections of your page, not to other pages of your site. Here is how you do that:

```html
<!-- Here some internal links -->
<a href="#summary">Info</a>
<a href="#favorite-movies">Movies</a>
<a href="#help">Info</a>

<!-- [...] -->

<!-- Here the associated sections -->
<div id="summary">your summary</div>
<div id="favorite-movies">your favorite movies</div>
<div id="help">some help section</div>
```

Later on, we will add a nice smoothscroll effect on such links. But wait for next week!

You can read [this post](http://css-tricks.com/absolute-relative-fixed-positioining-how-do-they-differ/) about positioning if you have some free time!
