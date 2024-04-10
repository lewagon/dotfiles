## Challenge Advice

If a student didn't finish Watch List Block 1, that's absolutely OK. The challenge for Block 2 is much shortly and mostly consists of copying the setup for Cloudinary and Heroku from lecture. So, please advise students who have not finished Block 1 to continue from where they left off in the previous session.

If, however, a student is quite lost or missed Block 1 altogether, you can advise them to start from the solution manual for Block 1 like so:

```bash
cd ~/code/$GITHUB_USERNAME
mv rails-watch-list rails-watch-list-day-one # If they have an existing repo
git clone --branch day-one git@github.com:lewagon/rails-watch-list.git
cd rails-watch-list
git checkout master
git merge --no-ff day-one
rm -rf .git && git init
git add .
git commit -m 'init from correction'
gh repo create rails-watch-list-day-two --public --source=. # can also name rails-watch-list if they haven't already created this repo
git push origin master
```

Happy deploying 🚀
