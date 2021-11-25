## Configuration

Tu ne vas pas laisser ton profil dans `fullstack-challenges`, car tu vas le versionner avec `git` comme projet séparé. Copie ton profil dans un dossier indépendant et vas dedans :

```bash
cd ~/code/<user.github_nickname>/fullstack-challenges/04-Front-End/01-HTML-and-CSS/04-Responsive-profile
cp -r profile ~/code/<user.github_nickname>
cd ~/code/<user.github_nickname>/profile
```

## Création du dépôt GitHub

Tu peux **init**(ialiser) un dépôt git, versionner tes modifications et créer le dépôt GitHub associé :

```bash
git init
git add .
git commit -m "my profile page"
gh repo create # cela crée le dépôt associé sur GitHub !
```

Pour ouvrir le dépôt GitHub depuis ton navigateur, tu peux exécuter :

```bash
gh repo view --web
```

## GitHub Pages

[GitHub Pages](https://pages.github.com/) est un service de GitHub qui permet de déployer facilement n'importe quel **site Web statique** en 10 secondes (statique == même contenu pour tous les utilisateurs). Il est basé sur une branche "magique", appelée `gh-pages`. Quand GitHub détecte cette branche, il met ton site Web en ligne. Génial, non ? On va donc créer cette branche magique et la pousser. ✨🌿✨

```bash
git co -b gh-pages
git push origin gh-pages # on pousse la branche gh-pages, pas master !
```

Tu peux maintenant visiter l'URL `http://<user.github_nickname>.github.io/profile/` (il s'agit de l'URL créée automatiquement par GitHub) et jeter un œil à ton chef-d'œuvre en ligne ! Partage le lien sur Slack avec tes camarades.

À partir de maintenant et jusqu'à la fin de la journée, tu peux travailler dans ton répertoire `~/code/<user.github_nickname>/profile` ET sur la branche `gh-pages`. Cela signifie que toutes les mises à jour de ton profil peuvent être poussées sur `http://<user.github_nickname>.github.io/profile/` à l'aide des commandes git :

```bash
git add .
git commit -m "make my profile prettier"
git push origin gh-pages
```

## Envoi de ton code à Kitt

Comme tu n'as pas travaillé dans le dossier `fullstack-challenges`, ton travail n'a pas été envoyé à Kitt. Si tu veux que ton exercice apparaisse comme terminé sur Kitt, tu peux procéder comme suit :

```bash
cd ~/code/<user.github_nickname>/fullstack-challenges/04-Front-End/01-HTML-and-CSS/05-Push-on-Github-Pages
cp -r ~/code/<user.github_nickname>/profile .
rm -rf profile/.git
git add .
git commit -m "Submitting my work to Kitt"
git push origin master
```
