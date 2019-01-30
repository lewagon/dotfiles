## Background & Objectives

Recreate the Product Hunt profile header, like [this one](http://lewagon.github.io/html-css-challenges/11-profile-with-tabs/)

## Further suggestions & resources

### Layout

Before coding the [tabs component](http://lewagon.github.io/ui-components/#tabs) used in the header, take 10 minutes to think about the global "div structure" of the [profile header](http://lewagon.github.io/html-css-challenges/11-profile-with-tabs/). In `index.html` we made some choices for you:

```html
<div class="profile-header-wrapper">
  <div class="container">

    <!-- Avatar and username -->
    <div class="profile-header-infos">
      <img src="your-picture.png" alt="" class="avatar">
      <h1>Github username</h1>
      <h2>co-founder @YourStartup</h2>
    </div>

    <!-- Insert your <div class="tabs"> here -->

  </div>
</div>
```

Now answer these questions:

- What's the role of the `.profile-header-wrapper`?
- What's the role of the `.container`?

`wrapper` and `container` are two elementary blocks used to build your page's layout. Once you have that structure, you just have to insert the right components inside.

### Tabs with flexbox

The HTML markup of the tabs component is easy - it should look like

```html
<div class="tabs">
  <a class="tab active" href="#">
    <h3>350</h3>
    <p>Followers</p>
  </a>
  <a class="tab" href="#">
    <h3>456</h3>
    <p>Following</p>
  </a>
  <a class="tab" href="#">
    <h3>189</h3>
    <p>Upvoted</p>
  </a>
  <a class="tab" href="#">
    <h3>13</h3>
    <p>Submitted</p>
  </a>
</div>
```

- `<div class="tabs">` is the **flexbox** and should be `display:flex;`
- `<div class="tab">` are the **flex items**

You have two options to code the flex items:

```css
.tab {
  flex: 0 0 25%;
}
```

This solution will work only with 4 items. A more generic solution consists in using the same `flex-grow` of 1 for each item:

```css
.tab {
  flex: 1 1 auto;
}
```

This will work independently from the number of tabs.

### First / last child

To make the left-top corner of first tab and right-top corner of last tab rounded, you can use the `:first-child` and `:last-child` pseudo-classes:

```css
.tab:first-child {
  border-radius: 10px 0 0 0; /* clockwise starting top-left*/
}
.tab:last-child {
  border-radius: 0 10px 0 0; /* clockwise starting top-left*/
}
```

`:first-child` and `:last-child` are very useful pseudo-classes!

NB: don't forget to **hard refresh** your browser (`cmd + shift + r`) to clear your browser's cache if your page doesn't seem to display your current code!
