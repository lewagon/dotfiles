## Setup

Again, let's continue building our profile page and copy our previous profile in the current directory of this challenge:

```bash
cp -r ../03-Box-model/profile .
```

## Background & Objectives

Use advanced CSS selectors (id, class, grouping, descendant selectors) to fine-tune your page with a more subtle design.

## Specs

Here is [your objective](http://lewagon.github.io/html-css-challenges/04-advanced-selectors/). Any time you want to **name** an element of your page, ask yourself:

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

## Further suggestions & resources (inlining a list)

To design your lists of icons, you'll have to change the `block` behavior of list items by **inlining them**. Here is the corresponding CSS rules.

```css
.list-inline > li {
  display: inline-block;
  padding: 0px 20px;
}
```

Even inline, a list `<ul>` has some `padding-left` that you will also have to kill to perfectly center your list.

```css
.list-inline {
  padding-left: 0px;
}
```
