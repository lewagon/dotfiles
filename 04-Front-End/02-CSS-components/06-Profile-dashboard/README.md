## Background & Objectives

Build a beautiful page with

- A banner with a linear gradient on top of background image.
- Nice cards with background picture and user avatars.

## Specs

Here is [your objective](http://lewagon.github.io/html-css-challenges/09-card-design/).

## Tips & Resources

### Organize your CSS with components files

In this challenge you have to design 3 different UI components. So split the design in 3 files:

- **Avatar**: cool to put it in different file. Imagine if you have different classes `.avatar`, `.avatar-small`, `.avatar-big`, `.avatar-bordered`. Now you are happy to have a different file for all this CSS code!
- **Banner**: you've already built it in previous challenge.
- **Card**: a very useful UI component that you will use a lot in your Rails products!

Here is your project architecture:

```
.
├── css
│   ├── avatar.css
│   ├── banner.css
│   ├── card.css
│   └── style.css
└── in
```

Then in `style.css`

```css
/* Importing all components file */
@import url("avatar.css");
@import url("card.css");
@import url("banner.css");

/* General style rules on fonts and colors */
body {
  margin: 0;
  font-family: Open-sans, sans-serif;
}
h1, h2, h3 {
  font-family: Raleway, Helvetica, sans-serif;
}
.text-center {
  text-align: center;
}
```

Then you just need to link the `style.css` file in your HTML `<head>`:

```html
 <link rel="stylesheet" href="css/style.css">
```

### Relative > absolute pattern

Here is an idea of the HTML markup of a card

```html
<div class="card">
  <span class="card-bg" style="background-image: url('https://unsplash.it/500/200?image=0')"></span>
  <span class="card-gradient"></span>
  <span class="card-description">Popular</span>
  <span class="card-text">
    <h2>Trello</h2>
    <p>Very cool stuff, useful and smart</p>
  </span>
  <span class="card-user">
    <img src='http://placehold.it/40x40' class="avatar avatar-bordered"/>
  </span>
  <a href="#" class="card-link"></a>
</div>
```


- Here again the `.card` div is `position: relative` and every div inside (`.card-bg`, `card-gradient`, `card-description`, etc..) are `position: absolute`.
- The 3 div `card-bg`, `card-gradient`, `card-link` should be covering all the card div (same technique as for the banner in the previous challenge). Of course the `card-link` should have the higher z-index and be transparent to **make all the card clickable**.
- `card-description` is positioned top / left
- `card-text` is positioned bottom / left
- `card-description` is positioned bottom / left
- `card-user` is positioned top / right

### Flex box

To position the cards next to each other, you can use the flex-box auto-sizing technique seen in the lecture:

```css
.cards {
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
}
.cards .card{
  flex: 1 1 0;
  -webkit-flex: 1 1 0;
  -moz-flex: 1 1 0;
  margin: 20px;
}
```
