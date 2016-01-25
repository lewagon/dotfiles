## Background & Objectives

Let's code Airbnb banner, here is [your objective](http://lewagon.github.io/html-css-challenges/09-canonical-banner/)

## Tips & Resources

Here are some tips (everything is written in the Karr lecture). First, your markup will look like:

```html
<div class="banner" style="background: linear-gradient(-225deg, rgba(0,101,168,0.6) 0%, rgba(0,36,61,0.6) 50%), url('images/background.jpg');">
  <div class="banner-content">
    <h1>Banner title</h1>
    <p>Banner tagline</p>
    <a href="" class="btn-class">Call to action</a>
  </div>
</div>
```

- A linear gradient filter (like in the slides): don't forget to pick `rgba` colors. If colors are not a bit transparent, you will not see the background image below.
- `height: 100vh;` enables your banner to take 100% of your screen height (`1vh` = 1% of your viewport height).
- `background-size: cover;` tells the background to cover all the banner div.
- Don't forget the flexbox properties (`justify-content` and `align-items`) to center your background content horizontally and vertically.
- **Don't forget to re-use the `button.css` file that you've coded in the previous challenge**
