First let's create a new project for your profile page (you are not going to keep it in the `fullstack-challenges` folder).


```
$ cd ~/code/$GITHUB_USERNAME
$ mkdir profile
```

Copy paste your `index.html`, `style.css` files and `images` folder in this new `profile` folder. Then let's install the `hub` gem, which will enable you to create Github repo from your terminal!

```
$ gem install hub
```

You can now init a git repo, commit changes, and create the associated Github repo.

```
$ cd profile
$ git init
$ git add .
$ git commit -m "my profile page"
$ hub create
```

To check the Github repo you can run

```
$ hub browse
```

### Magic `gh-branch`

Github Pages is based on a magic branch, with the name `gh-pages`. When Github detects this branch, it puts your website online, how cool! Let's create this magic branch and push it.

```
$ git co -b gh-pages
$ git push origin gh-pages
```

Now you can look at your masterpiece at the url `http://GITHUB_USERNAME.github.io/profile`. Share it on Slack with your buddies!
