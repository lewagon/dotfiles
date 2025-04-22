## Setup

Again if you haven't copied the files from the previous exercise yet, let's copy your profile from the previous challenge in the current directory of this challenge:

```bash
cp -r ../02-Fonts-and-colors/profile .
```

## Background & Objectives

Play with the box model (`margin/border/padding/width/height`) by splitting your profile information into different `<div>` tags. Then, use advanced CSS selectors (id, class, grouping, descendant selectors) to fine-tune your page with a more subtle design.

Don't forget to **hard refresh** your browser (`cmd + shift + r` on macOS, `ctrl` + `F5` on Windows) to clear your browser's cache if your page doesn't seem to display your current code!

## Specs

### Step 1: Box Model

Here is [your objective](https://lewagon.github.io/html-css-challenges/03-box-model-and-selectors/).

- You should start with the following structure for your page

```html
<div class="container">
  <div class="card"></div>
  <div class="card"></div>
</div>
```

- The `<div class="container">` is here to center the page content using left & right margins to prevent it taking 100% of the window (which would be ugly).
- The `<div class="card">` is used to group information into a nice white box.
- Add cool touches to your cards using CSS properties like `background`, `border`, `border-radius` and `box-shadow`. Keep it simple, with white background and subtle radius and shadows (as you saw in the lecture).

### Step 2: Selectors

Any time you want to **name** an element of your page, ask yourself:
- Should I use a `class` or an `id`? Is it unique or re-usable?
- What name should I pick for my class? Respect the `component-shape` convention
- Should I split this design into several classes instead of one big class?

Here is an example of **bad** CSS code:

```css
#home-page-first-image {
  border-radius: 50%;
}

.home-card {
  text-align: center;
  background: white;
  padding: 30px;
  border: 1px solid lightgrey;
}
```

And here is the **good version** of it:

```css
.img-circle {
  border-radius: 50%;
}

.text-center {
  text-align: center;
}

.card-white {
  background: white;
  padding: 30px;
  border: 1px solid lightgrey;
}
```

- Making an image circle and centering texts are **very common design tasks**. They deserve their own re-usable class, not to be mixed in other classes or ids!
- Don't repeat yourself and try to use **generic class names**. Consider each CSS class as a re-usable design that you can apply everywhere on your website. Getting this mindset is the main difficulty for CSS beginners.

## Further suggestions & resources

### Container

Here is the div centering technique for the main container:

```css
.container {
  width: 500px;   /* This sets the width */
  margin: 0 auto; /* This automatically sets left/right margins */
}
```

### Inline list

To design your lists of icons, you'll have to change the `block` behavior of list items by **inlining them**. Here is the corresponding CSS rules.

```css
.list-inline > li {
  display: inline-block;
  padding: 0px 20px;
}
```

Even inline, a list `<ul>` has some `padding-left` and bullet points that you will also have to kill to have a nicer looking list.

```css
.list-inline {
  list-style: none;
  padding-left: 0px;
}
```

From this exercise onwards, **it is critical that you use your Web browser inspector (right-click then "Inspect")** to play with your CSS in the browser and test things out before you write the final code.

## Finished?

Once you've finished you can push this exercise and copy the content to the next exercise folder with this command:

```bash
# Push to Gihtub
git add .
git commit -m "Added div to my profile page"
git push origin master

# Copy your profile into the next exercise folder
cp -r profile ../04-Responsive-profile
```
