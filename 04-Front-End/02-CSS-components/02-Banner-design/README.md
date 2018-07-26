## Background & Objectives

Let's code a banner, like [this airbnb-like banner](http://lewagon.github.io/html-css-challenges/09-canonical-banner/). A banner is a vital component that is used on most startups' home pages.

## Re-use your button

Don't forget to re-use the `button.css` file that you coded in the previous challenge. This is exactly why we split our design into components: it makes it super easy to re-use them 💪💪💪.

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

It is often convenient to put the `background-image` directly in the HTML (this is called **"inlining the CSS"**). You can then use your banner class **with different background pictures** by just changing the image URL in the HTML.

Don't forget `background-size: cover;` in your CSS (to tell the background to cover the entire banner div).

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

Here, we put a flat black filter with a `0.3` opacity on top of the background image.


## Banner height

If you want your banner to take 100% of your screen height:

```css
.banner {
  height: 100vh; /* 1vh => 1% of viewport height */
}
```

## Centering content with flexbox

The `<div class="banner">` here is a flexbox with only one item inside it: `<div class="banner-content">`. Use flexbox properties (`justify-content` & `align-items`) to center the banner's content both horizontally and vertically. Have a look at the lecture slides if you can't remember how flexboxes work.

NB: don't forget to **hard refresh** your browser (`cmd + shift + r`) to clear your browser's cache if your page doesn't seem to display your current code!
