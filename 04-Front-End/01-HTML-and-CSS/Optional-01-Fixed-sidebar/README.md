## Getting started

For this challenge, continue to work on your profile project, the one you pushed on Github pages:

```bash
cd ~/code/<user.github_nickname>/profile
```

Then, **at the end of this challenge**, when you're done implementing the fixed sidebar, you can push your work on the `gh-pages` branch to make it live!

```bash
git add .
git commit -m "enhanced my profile with a fixed sidebar"
git push origin gh-pages
```


## Background & Objectives

Build a nice layout with a fixed sidebar and scrollable page content.

## Specs

Here is [your objective](http://lewagon.github.io/html-css-challenges/05-fixed-sidebar/). To build a layout like this, you will have to **fix the position of the left sidebar**, and add some CSS to get the page content on the right. Your page HTML structure should look like this:

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

Sometimes you will need to use internal links that refer to sections of the page you are on rather than to other pages of your site. Here's how you do it:

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

Later on, we will add a nice smooth scroll effect for links like this. But you'll have to wait until next week!

You can read [this post](http://css-tricks.com/absolute-relative-fixed-positioining-how-do-they-differ/) about positioning if you have some free time!
