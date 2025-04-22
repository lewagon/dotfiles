## Debug Heroku

Tu as beaucoup avancé lors de la séance précédente. Si ton équipe n'a pas encore poussé tout le nouveau code mergé sur Heroku, c'est le moment de le faire (demande au membre de l'équipe en charge d'`heroku`) :

```zsh
git status # doit être propre. S'il ne l'est pas, versionne ton travail
git co master
git pull origin master
git push heroku master
```

Une fois que c'est fait, exécute `heroku open`, teste toutes les fonctionnalités et commence par corriger les bugs éventuels 👌

## Seed

Si tu n'as pas encore de seed, c'est le moment d'en créer une. Si tu en as déjà une, réfléchis à comment l'améliorer et l'enrichir. Plus ta seed sera riche et meilleure elle sera, plus ton app aura l'air vraie.

Dans le contexte des projets du Wagon, il pourrait être utile d'avoir une seed permettant de « réinitialiser » la base de données au point de départ de ta démo. Dans les projets « de la vie réelle », **ne code jamais de comportement destructif** dans une seed ⚠️ Et évite d'utiliser `User.destroy_all` par erreur 😱

Une fois que ta seed est prête et déployée en production, tu n'as plus qu'à exécuter 👇

```bash
heroku run rails db:seed
```
