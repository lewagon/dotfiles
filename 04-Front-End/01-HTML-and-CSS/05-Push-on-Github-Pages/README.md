## Setup

We don't want to keep your profile within `fullstack-challenges` because we want to version it with `git` as a separate project. So let's copy your profile as an independent folder and jump into it:

```bash
cd ~/code/<user.github_nickname>/fullstack-challenges/04-Front-End/01-HTML-and-CSS/04-Responsive-profile
cp -r profile ~/code/<user.github_nickname>
cd ~/code/<user.github_nickname>/profile
```

## Create the GitHub repo

You can **init**(ialize) a git repository and commit your changes.

```bash
git init
git add .
git commit -m "my profile page"
```

Then we will use the GitHub CLI (Command line interface) to create the associated GitHub repo. The GitHub CLI allows you to interact with GitHub through your terminal. For now we will be creating public repositories, but you can find more options [on the official documentation](https://cli.github.com/manual/).

```bash
gh repo create # this launches an interactive mode to create the GitHub repo
```
You will be asked to answer few questions regarding how you wish to create your repository on GitHub:

**What would you like to do?**
Select _Push an existing local repository to GitHub_, since you've already created your local repository with `git init`.

**Path to local repository (.)**
Type `ENTER` so it selects the default option (.) which is the current folder.

**Repository name (profile)**
Type `ENTER` to select the default option (profile) which is the name of the current folder. If you want your GitHub repository to have a different name, type it in before pressing `ENTER`.

**Description**
Type `ENTER` to leave it empty for now. If you want to give your repository a description, type it in before pressing `ENTER`.

**Visibility**
Select _Public_ and type `ENTER` so that your repository is visible by everyone.

**Add a remote? (Y/n)**
Type `Y` then `ENTER`. Adding a remote is going add a link to your GitHub repository in your local git repository, so you can push your code to GitHub via git.

**What should the new remote be called? (origin)**
Press `ENTER` to keep the default option (origin) which is the standard name of the main remote.

**Would you like to push commits from the current branch to the "origin"? (Y/n)**
Type `Y` then `ENTER` to push your commits from your local git repository to your newly created GitHub repo.

![gh cli menu](https://github.com/lewagon/fullstack-images/blob/master/frontend/gh-repo-create.png?raw=true)

If you wish to create a **public** repository with a single command, then you can just use the following command:

```bash
gh repo create --public --source=.
```

With gh, you can also open a GitHub repo in your browser from your terminal:

```bash
gh repo view --web
```

You can find more information about gh in [the dedicated cheatsheet.](https://kitt.lewagon.com/knowledge/cheatsheets/gh_cli)

## GitHub Pages

[GitHub Pages](https://pages.github.com/) is a GitHub service that makes it easy to deploy any **static website** in 10 seconds (static == same content for all users). It is based on a "magic" branch, called `gh-pages`. When GitHub detects this branch, it puts your website online. Awesome right? Let's create this magic branch and push it. ✨🌿✨

```bash
git co -b gh-pages
git push origin gh-pages # we push the gh-pages branch, not master!
```

Now you can visit the URL `http://<user.github_nickname>.github.io/profile/` (this is the URL built automatically by GitHub) and have a look at your masterpiece online! Share the link on Slack with your buddies.

From now and until the end of the day, you can keep working in your `~/code/<user.github_nickname>/profile` directory AND on the `gh-pages` branch. This means any updates of your profile can be pushed on `http://<user.github_nickname>.github.io/profile/` through usual git commands:

```bash
git add .
git commit -m "make my profile prettier"
git push origin gh-pages
```

## Submit your code to Kitt

As you weren't working in the `fullstack-challenges` folder, your work hasn't been submitted on Kitt. If you want to mark this challenge as complete on Kitt you can do the following:

```bash
cd ~/code/<user.github_nickname>/fullstack-challenges/04-Front-End/01-HTML-and-CSS/05-Push-on-Github-Pages
cp -r ~/code/<user.github_nickname>/profile .
rm -rf profile/.git
git add .
git commit -m "Submitting my work to Kitt"
git push origin master
```
