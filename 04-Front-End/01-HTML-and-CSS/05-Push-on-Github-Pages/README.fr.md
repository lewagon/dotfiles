## Configuration

Tu ne vas pas laisser ton profil dans `fullstack-challenges`, car tu vas le versionner avec `git` comme projet séparé. Copie ton profil dans un dossier indépendant et vas dedans :

```bash
cd ~/code/<user.github_nickname>/fullstack-challenges/04-Front-End/01-HTML-and-CSS/04-Responsive-profile
cp -r profile ~/code/<user.github_nickname>
cd ~/code/<user.github_nickname>/profile
```

## Création du dépôt GitHub

Tu peux **init**(ialiser) un dépôt git et versionner tes modifications :

```bash
git init
git add .
git commit -m "my profile page"
```

Puis nous allons utiliser le CLI GitHub (command line interface ou interface en ligne de commande) pour créer le dépôt GitHub associé. le CLI GitHub te permet d'intéragir avec GitHub via ton terminal.

### Utilisation du mode interactif de `gh`

```bash
gh repo create # this launches an interactive mode to create the GitHub repo
```
On va te demander de répondre à quelques questions pour savoir comment tu veux créer ton dépôt sur GitHub :

**What would you like to do?**
Sélectionne _Push an existing local repository to GitHub_, puisque tu as déjà créé ton dépôt local avec `git init`.

**Path to local repository (.)**
Appuie sur `ENTER` pour sélectionner l'option par défaut (.) qui est le dossier courant.

**Repository name (profile)**
Appuie sur `ENTER` pour sélectionner l'option par défaut (profile) qui est le nom du dossier courant. Si tu veux que ton dépôt GitHub ait un nom différent, saisie-le avant de presser `ENTER`.

**Description**
Appuie sur `ENTER` pour laisser ce champ vide pour le moment. Si tu souhaites ajouter une description à ton dépôt qui apparaitra sur GitHub, saisie-la avant de presser `ENTER`.

**Visibility**
Sélectionne _Public_ and appuie sur `ENTER` pour que ton dépôt soit visible par tout le monde.

**Add a remote? (Y/n)**
Appuie sur `Y` puis `ENTER`. Ajouter un _remote_ va ajouter un lien vers ton dépôt GitHub dans ton dépôt local git, afin que tu puisses pousser ton code sur GitHub avec git.

**What should the new remote be called? (origin)**
Appuie sur `ENTER` pour garder l'option par défaut (origin) qui est le nom standard du _remote_ principal.

**Would you like to push commits from the current branch to the "origin"? (Y/n)**
Appuie sur `Y` puis `ENTER` pour pousser tes commits depuis ton dépôt local git vers le dépôt GitHub que tu viens de créer.

### Utilisation de la commande simple de `gh`

Si tu souhaites plutôt créer un dépôt **publique** avec une commande simple, tu peux utiliser la commande suivante :

```bash
gh repo create --public --source=.
```

Avec gh, tu peux aussi ouvrir un dépôt GitHub dans ton navigateur depuis ton terminal :

```bash
gh repo view --web
```

Tu peux trouver plus d'informations à propos de gh dans [l'anti-sèche dédiée](https://kitt.lewagon.com/knowledge/cheatsheets/gh_cli).

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
