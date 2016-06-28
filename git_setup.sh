echo "Type in your first and last name (no accent or special characters - e.g. 'ç'): "
read full_name

echo "Type in your email address (the one used for your GitHub account): "
read email

git config --global user.email $email
git config --global user.name $full_name

git add .
git commit --message "My identity for @lewagon in the gitconfig"
git push origin master

git remote add upstream git@github.com:lewagon/dotfiles.git

GITHUB_NICKNAME=$(git remote get-url --push origin | cut -d ":" -f 2 | cut -d "/" -f 1)
GITHUB_EMAIL=$(curl -s https://api.github.com/repos/${GITHUB_NICKNAME}/dotfiles/commits/`git rev-parse HEAD` | jq -r '.commit.author.email')
GIT_EMAIL=$(git config --global user.email)

if [ ${GITHUB_EMAIL} = ${GIT_EMAIL} ]
then
  echo "👌 Awesome, all set."
else
  echo "⚠️  Mismatch! Your GitHub email is ${GITHUB_EMAIL} whereas your git email is ${GIT_EMAIL}"
  echo "You should run these commands to fix it:"
  echo "  git config --global user.email ${GITHUB_EMAIL}"
  echo "  git commit --amend --author '${full_name}<${GITHUB_EMAIL}>'"
  echo "  git push --force origin master"
fi
