## Background & Objectives

The goal is to reproduce [this website](http://www.iceme.fr/), which has two pages :

- a [home page](http://www.iceme.fr/)
- a [contact page](http://www.iceme.fr/contact.html)

## Tips

Don'bother about over-riding the navbar style, we will see how to do that tomorrow! Focus on :

- Modifying step-by-step the HTML of the navbar you picked in [Bootstrap components](http://getbootstrap.com/components) to keep just the links you need.
- Using the grid cautiously to have the good display on all media (desktop, tablets, mobile).

You will have to create several pages, and you will see your code is not DRY. It's fine for now, but you will see that using Rails, we can introduce a template system to keep our HTML DRY.

Also, you already know Jekyll which has several pages (blog articles) and does not repeat `<head>` elements everywhere!
