## Background & Objectives

Let's code a banner, like [this airbnb-like banner](http://lewagon.github.io/html-css-challenges/09-canonical-banner/). A banner is an important component, used on most startups' home page.


## Re-use your button

Don't forget to re-use the `button.css` file that you've coded in the previous challenge. That's exactly the point of splitting your design by components: you can then re-use them 💪💪💪.

## HTML Structure

**Always start by thinking about the HTML structure of your component**. For a banner it should look like:

```html
<div class="banner" style="background-image: linear-gradient(-225deg, rgba(0,101,168,0.6) 0%, rgba(0,36,61,0.6) 50%), url('images/background.jpg');">
  <div class="banner-content">
    <h1>Your title</h1>
    <p>Your tagline</p>
    <a href="" class="btn-yours">Your call-to-action</a>
  </div>
</div>
```

It can be convenient to put the `background-image` directly in the HTML (we speak of **"inlining the CSS"**
). You can then use your banner class **with different background pictures** by just changing the image URL in the HTML.

Don't forget `background-size: cover;` in the CSS to tell the background to cover all the banner div.

### Linear-gradient filters

We often use a transparent linear gradient on top of an image to kill contrasts of the image and make texts more readable. A linear gradient is defined this way:

```css
linear-gradient(angle, start_color start_point, end_color end_point)
```

You can then write your background like this:

```css
.banner {
  background-image:
    /* Transparent gradient above */
    linear-gradient(-225deg, rgba(0,101,168,0.6) 0%, rgba(0,36,61,0.6) 50%),
    /* Then image below */
    url('images/background.jpg');
}

```


If you just want a **flat** filter with transparency, you can use this simple syntax:


```css
.banner-flat-filter {
  background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('images/background.jpg');
}
```

In this case, we put a flat black filter with a `0.3` opacity on top of the background image.


## Banner height

If you want your banner to take 100% of your screen height:

```css
.banner {
  height: 100vh; /* 1vh => 1% of viewport height */
}
```

## Centering content with flexbox

Here the `<div class="banner">` is a flexbox with only one item which is `<div class="banner-content">`. Use flexbox properties (`justify-content` and `align-items`) to center the banner's content both horizontally and vertically. Have a look to the Karr lecture if you forgot how flexbox works.
