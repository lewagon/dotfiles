## Background & Objectives

Let's code Airbnb banner, here is [your objective](http://lewagon.github.io/html-css-challenges/09-canonical-banner/). A banner is an important component which appears on most startup home pages.

## Tips & Resources

### Re-use button components

**Don't forget to re-use the `button.css` file that you've coded in the previous challenge**


### HTML Structure

First, the HTML structure of a banner should look like:

```html
<div class="banner" style="background: linear-gradient(-225deg, rgba(0,101,168,0.6) 0%, rgba(0,36,61,0.6) 50%), url('images/background.jpg');">
  <div class="banner-content">
    <h1>Banner title</h1>
    <p>Banner tagline</p>
    <a href="" class="btn-class">Call to action</a>
  </div>
</div>
```

Putting the `background` inline (i.e. directly in the HTML) is a common practice. In fact, it enables you to use your banner class **with different background pictures**. If you fix the background image in the CSS instead, then your banner class is boring and always applies the same background picture. Don't forget `background-size: cover;` in the CSS to tell the background to cover all the banner div.

For the linear gradient, don't forget to pick `rgba` colors (**with transparency** to see the picture behind).

### Banner height

If you want your banner to take 100% of your screen height:

```css
.banner {
  height: 100vh; /* 1vh = 1% of your viewport height
}
```

### Centering content with flexbox

You will have to use flexbox (with `justify-content` and `align-items`) to center your banner content horizontally and vertically. Have a look to this morning lecture in Karr if your forgot how flexbox works.
