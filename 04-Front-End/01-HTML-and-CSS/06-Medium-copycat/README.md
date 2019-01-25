## Background and Objectives

Let's design a Medium article and deploy it with Github pages!

## Setup

Firstly, we will need to create all the files/folders we will need:

```bash
mkdir medium-article
touch medium-article/index.html
touch medium-article/style.css
```

No need for an images folder this time as we will use placeholders from [unsplash](https://source.unsplash.com/) instead.

## Specs

A Medium article looks [like this one](https://medium.com/le-wagon/web-design-for-engineers-2da68b62904f#.gjx5v834t) (upvote it!!!). We are going to code [a simplified version](https://lewagon.github.io/medium-copycat/).

Before you get started with the code, analyze the structure of the page and think about the different elements that make up the page, and start to think about the different classes you will need:
- A banner with a background image, containing a title and description
- A centered container (with left/right automatic margin) for the article's content
- Inside this container: headers, paragraphs and links
- Notice: container responsiveness + nice hover effect on links

## Further suggestions & resources

### Fancy Links

- Inspect Medium's css properties on links => we see that a class `is-targeted` is added on `hover` (with javascript), inspect its css (`background-image: linear-gradient ...`)
- Add a `linear-gradient` on `a`, and a darker one on `a:hover` to reproduce exactly Medium links.

### Container

- Center it with `width` and `margin: 50px auto`
- Container is not responsive yet:
  - Replace `width` by `max-width` (poor approach)
  - Add media queries (good approach)
  - Show how the media queries apply when you resize the browser

```css
/* Media queries */
@media(max-width: 900px) {
  .container {
    width: 700px;
  }
}
@media(max-width: 750px) {
  .container {
    width: 450px;
  }
}
@media(max-width: 500px) {
  .container {
    width: 350px;
  }
}
```

## Optional - Push to Github pages

If you want to, you can also push your medium article to Github Pages! If you choose to do so, we will again need to copy your work to a folder **outside** of fullstack challenges so we can track it with git as a seperate project:

```bash
cp -r ./medium-article ~/code/<user.github_nickname>/medium-article
cd ~/code/<user.github_nickname>/medium-article

git init
git add index.html style.css
git commit -m "My medium copycat"
hub create
git push
hub browse
```

Then, let's create the magic `gh-pages` branch:

```bash
git checkout -b gh-pages
git push origin gh-pages
```

Go to `http://USERNAME.github.io/medium-copycat` to your medium copycat article online!
