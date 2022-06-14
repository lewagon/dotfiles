## Background and Objectives

Let's design a [Medium article](https://lewagon.github.io/medium-copycat/) and deploy it with GitHub pages!

## Setup

Firstly, we will need to create all the files and folders we will need:

```bash
mkdir medium-article
touch medium-article/index.html
touch medium-article/style.css
```

No need for an images folder this time as we will use placeholders from [unsplash](https://source.unsplash.com/) instead.

## Specs

A Medium article looks [like this one](https://medium.com/le-wagon/from-bootstrapping-to-building-a-brand-that-scales-26b0eda92ddb). We are going to code [a simplified version](https://lewagon.github.io/medium-copycat/).

Before you get started with the code, analyze the structure of the page and think about the different elements that make up the page. Think about the different classes you will need, and even better draw html structure on paper (it will help you code it). These are the elements we will need:
- A banner with a background image, containing a title and description
- A centered container (with left/right automatic margin) for the article's content
- Inside this container: headers, paragraphs and links
- Notice: container responsiveness + nice hover effect on links

## Further suggestions & resources

### Fancy Links

- Inspect the links in the [Medium example](https://lewagon.github.io/medium-copycat/) => we see how on `hover` the css changes (`background-image: linear-gradient ...`)?
- Add a `linear-gradient` on `a`, and a darker one on `a:hover` to reproduce those fancy links.

### Container

- Center it with `width` and `margin: 50px auto`
- Container is not responsive yet:
  - Replace `width` by `max-width` (poor approach)
  - Add media queries (good approach)

Here is an example of how you would re-size the container on any screen 992px wide or less:

```css
/* Media queries */
@media(max-width: 992px) {
  .container {
    width: 700px;
  }
}
```

Make sure to resize the container for all other screen sizes (`576px`, `768px`, `992px` and `1200px`).

## Optional - Push to GitHub pages

If you want to, you can also push your medium article to GitHub Pages! If you choose to do so, we will again need to copy your work to a folder **outside** of fullstack challenges so we can make it a separate git repository:

```bash
cp -r ./medium-article ~/code/<user.github_nickname>/medium-article
cd ~/code/<user.github_nickname>/medium-article

git init
git add index.html style.css
git commit -m "My medium copycat"
gh repo create --public --source=.
git push
gh repo view --web
```

Then, let's create the magic `gh-pages` branch:

```bash
git checkout -b gh-pages
git push origin gh-pages
```

Go to `http://<user.github_nickname>.github.io/medium-article/` to see your medium copycat article online!
