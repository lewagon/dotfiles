## Setup

We don't want to keep your profile within `fullstack-challenges` because we want to version it with `git` as a separate project. So let's copy your profile as an independent folder and jump into it:

```bash
cd ~/code/<user.github_nickname>/fullstack-challenges/04-Front-End/01-HTML-and-CSS/04-Responsive-profile
cp -r profile ~/code/<user.github_nickname>
cd ~/code/<user.github_nickname>/profile
```

## Create the Github repo

You can **init**(ialize) a git repository, commit your changes, and create the associated Github repo:

```bash
git init
git add .
git commit -m "my profile page"
gh repo create # this creates the associated repo on Github!
```

To open the Github repo from your browser you can run:

```bash
gh repo view --web
```

## Github Pages

[Github Pages](https://pages.github.com/) is a sub-service of Github that makes it easy to deploy any **static website** in 10 seconds (static == not a Rails app). It is based on a "magic" branch, called `gh-pages`. When Github detects this branch, it puts your website online. Awesome right? Let's create this magic branch and push it. ✨🌿✨

```bash
git co -b gh-pages
git push origin gh-pages # we push the gh-pages branch, not master!
```

Now you can build the URL `http://<user.github_nickname>.github.io/profile/` (this is the URL built automatically by Github) and have a look at your masterpiece online! Share the link on Slack with your buddies.

From now and until the end of the day, you can keep working in your `~/code/<user.github_nickname>/profile` directory AND on the `gh-pages` branch. This means any updates of your profile can be pushed on `http://<user.github_nickname>.github.io/profile/` through usual git commands:

```bash
git add .
git commit -m "make my profile prettier"
git push origin gh-pages
```

## Submit your code to Kitt

As you weren't in `fullstack-challenges` your work won't be submitted on Kitt, if you want to mark this challenge as complete you can do the following:

```bash
cd ~/code/<user.github_nickname>/fullstack-challenges/04-Front-End/01-HTML-and-CSS/05-Push-on-Github-Pages
cp -r ~/code/<user.github_nickname>/profile .
rm -rf profile/.git
git add .
git commit -m "Submitting my work to Kitt"
git push origin master

```
