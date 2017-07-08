## Background & Objectives

Let's code Airbnb banner, here is [your objective](http://lewagon.github.io/html-css-challenges/09-canonical-banner/). A banner is an important component, used on most startups' home page.

## Further suggestions & resources

### Re-use your button

Don't forget to re-use the `button.css` file that you've coded in the previous challenge. That's exactly the point of splitting your design by components: you can then re-use them!

### HTML Structure

**Always start by thinking about the HTML structure of your component**. For a banner it should look like:

```html
<div class="banner" style="background-image: linear-gradient(-225deg, rgba(0,101,168,0.6) 0%, rgba(0,36,61,0.6) 50%), url('images/background.jpg');">
  <div class="banner-content">
    <h1>Banner title</h1>
    <p>Banner tagline</p>
    <a href="" class="btn-yours">Call to action</a>
  </div>
</div>
```

Here it's convenient to put the `background-image` directly in the HTML (we say "inline"). You can then use your banner class **with different background pictures**. Imagine you set the picture in the CSS instead, then your banner class will always apply the same background picture.

- Don't forget `background-size: cover;` in the CSS to tell the background to cover all the banner div.
- For the linear gradient, pick `rgba` colors (**with transparency** to see the picture behind) and try to choose nice colors.

### Banner height

If you want your banner to take 100% of your screen height:

```css
.banner {
  height: 100vh; /* 1vh => 1% of viewport height */
}
```

### Centering content with flexbox

Here the `<div class="banner">` is a flexbox with only one item which is `<div class="banner-content">`. Use flexbox properties (`justify-content` and `align-items`) to center the banner's content both horizontally and vertically. Have a look to the Karr lecture if you forgot how flexbox works.
