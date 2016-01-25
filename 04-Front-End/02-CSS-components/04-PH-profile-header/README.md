## Background & Objectives

Build Product Hunt profile header, like [this one](http://lewagon.github.io/html-css-challenges/11-profile-with-tabs/)


## Tips & Resources

### Layout

Before coding the [tabs component](http://lewagon.github.io/ui-components/#tabs) used in the header, take 10 minutes to think about the "div structure" of the [profile header](http://lewagon.github.io/html-css-challenges/11-profile-with-tabs/). In `index.html` we made some choices for you:


```html
<div class="profile-header-wrapper">
  <div class="container profile-header-container">

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

Do you understand the role of the `profile-header-wrapper` div or the `profile-header-container` div?


### Tabs with flexbox

The HTML markup of the tabs component is easy, it should look like

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

Then the flexbox div with `class="tabs"` should be `display:flex;` and each flex item with class `class="tab"` should be `flex: 0 0 25%;`. And that's it !

To make the left-top corner of first tab and right-top corner of last tab rounded, you can use the `:first-child` and `last-child` pseudo-classes:

```css
.tab:first-child {
  border-radius: 10px 0 0 0;
}
.tab:last-child {
  border-radius: 0 10px 0 0;
}
```

Very useful pseudo-classes!
