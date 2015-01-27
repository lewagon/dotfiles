## Background & Objectives

Use advanced selectors (id, class, grouping, descendant selectors) to fine-tune your page with a more subtle design.

## Specs

Here is [your objective](http://lewagon.github.io/html-css-challenges/04-advanced-selectors/). Any time you want to **name** an element of your page, ask yourself:

- Should I use a `class` or an `id`? Is is unique or re-usable?
- What name should I pick for my class?
- Should I split this design into different classes

Herebelow is an example of **very poor** CSS choices:

```css
#home-page-first-image {
  border-radius: 50%;
}
.card{
  text-align: center;
  background: white;
  padding: 30px;
  border: 1px solid lightgrey;
}
```

And here is the **good version** of it

```css
.img-circle {
  border-radius: 50%;
}
.text-center{
  text-align: center;
}
.card {
  background: white;
  padding: 30px;
  border: 1px solid lightgrey;
}
```

Making an image circle and centering texts are very common design tasks. They deserve their own re-usable classes!

Don't repeat yourself. Try to use **generic class names** as much as you can. Consider each CSS class as a nice re-usable design that is not only linked to the current page but that you can also use everywhere on your website. Getting this mindset is often the main difficulty for CSS beginners.

## Tips & Resources

To design your lists of icons, you'll have to change the `block` behavior of list items by **inlining them**. The problem with `inline` elements is that their width automatically fits their content and cannot be set. To keep control on list item width, make them `inline-block` elements. `inline-block` elements cumulate inline behavior (no line-breaks before and after) and block properties (like `width`), yeah!

Here are the corresponding CSS rules.

```css
.list-inline > li {
  display: inline-block;
  width: 90px;
}
```

**Another CSS trick**: even inline, a list keeps a left padding that you should kill.

```css
.list-inline {
  padding-left: 0px;
}
```