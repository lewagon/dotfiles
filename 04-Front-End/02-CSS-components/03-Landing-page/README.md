## Background & Objectives

Now that we have had some practice building some basic components, lets see how we can use them and combine them to make a real landing page! Any website has to have a **beautiful landing page**. They are important as they're the first page visitors will see and it needs to be good enough to convert them into clients 💰.
In this challenge you will learn how to browse the web for frontend inspiration, and then build a professional looking page yourself!

Your landing page should **at least** include:

- A **Hero / Banner** section presenting your product with a call to action.
- A **How it works** section (what componenets could be used to break down the different aspects of your product/service) .
- A **Footer**.

## Find inspiration

Don't blindly jump into coding, the first thing a frontend developer as to do is find inspiration! You're not stealing here, but looking online at what works to reproduce a nice user experience.

⚠️ **Never start coding a page without knowing how it will look!**

To find inspiration you can use one of these resources:
- [pages.xyz](https://www.pages.xyz/)
- [Bootstrap themes](https://themes.getbootstrap.com/)

If you haven't found anything online you can use [this page](https://arthur-littm.github.io/startup-landing/) as inspiration.

## Mockup

In the coming weeks you will learn how to mockup your pages like a pro using [Figma](https://www.figma.com/), but for today you can use a pen and paper to design the different sections of your page.

If you're designing [this page](https://arthur-littm.github.io/startup-landing/), you should have something like this.

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/startup-landing-drawing.png" alt="" width="100%">
</div>

⚠️ If you're not 100% certain you have the right structure drawn, ask a teacher to confirm before starting to code!

## Specs

Build a landing page with the following elements:

- A **Hero / Banner** section presenting your product.
- A **How it works** section.
- A **Footer**.

## Further suggestions & resources

- [Flexbox](https://kitt.lewagon.com/knowledge/cheatsheets/flexbox)
- [Good google fonts pairs](https://fontpair.co/)
- [Startup illustrations](https://undraw.co/illustrations)
- [Icons](https://www.flaticon.com/)
- [Coolors](https://colorhunt.co/)

## Finished?

Once you've finished you can push your page to [Github pages](https://pages.github.com) once again and share it on you batch channel:

First, copy the project out of `fullstack-challenges` so we can track it as a seperate `git` project:

```bash
cp -r ../03-Landing-page/landing ~/code/<user.github_nickname>
cd ~/code/<user.github_nickname>/landing
```

Then, start tracking the project with `git` and push to a `gh-pages` branch:

```bash
git init
git add .
git commit -m "my landing page"
hub create
git push origin master # push to master first
# then puts to a `gh-pages` branch
git co -b gh-pages
git push origin gh-pages
```
