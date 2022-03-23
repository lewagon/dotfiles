## Contexte et objectifs

On va créer un [article Medium](https://lewagon.github.io/medium-copycat/) et le déployer avec GitHub Pages !

## Configuration

On doit d'abord créer tous les fichiers et les dossiers dont on va avoir besoin :

```bash
mkdir medium-article
touch medium-article/index.html
touch medium-article/style.css
```

Cette fois-ci, inutile de créer un dossier avec les images, car on va utiliser les images de [unsplash](https://source.unsplash.com/) à la place.

## Spécifications

Un article Medium ressemble [à ça](https://medium.com/le-wagon/from-bootstrapping-to-building-a-brand-that-scales-26b0eda92ddb). On va coder [une version simplifiée](https://lewagon.github.io/medium-copycat/).

Avant de te lancer dans le code, analyse la structure de la page et réfléchis aux différents éléments qui la composent et aux différentes classes dont tu vas avoir besoin. Tu peux même dessiner la structure HTML sur papier (ça t'aidera à la coder). Voici les éléments dont on va avoir besoin :
- Une bannière avec une image de fond, contenant un titre et une description
- Un conteneur centré (avec une marge à gauche/droite automatique) pour le contenu de l'article
- À l'intérieur de ce conteneur : des titres, des paragraphes et des liens
- Et aussi : un conteneur réactif (responsive) + un effet de survol sympa sur les liens

## Suggestions et ressources supplémentaires

### Liens

- Examine les liens dans l'[exemple Medium](https://lewagon.github.io/medium-copycat/) => Tu vois comment le CSS change au survol (`hover`) (`background-image: linear-gradient ...`) ?
- Ajoute un dégradé linéaire (`linear-gradient`) sur `a`, et un autre plus sombre `a:hover` pour reproduire ces liens.

### Conteneur

- Centre-le avec `width` et `margin: 50px auto`
- Le conteneur n'est pas encore responsive :
  - Remplace `width` par `max-width` (mauvaise approche)
  - Ajoute des medias queries (bonne approche)

Voici un exemple de comment redimensionner le conteneur sur n'importe quel écran de largeur inférieure ou égale à 992px :

```css
/* Media queries */
@media(max-width: 992px) {
  .container {
    width: 700px;
  }
}
```

Assure-toi de bien redimensionner le conteneur pour toutes les autres tailles d'écran (`576px`, `768px`, `992px` et `1200px`).

## Facultatif - Pousser sur GitHub Pages

Si tu le souhaites, tu peux aussi pousser ton article Medium sur GitHub Pages ! Pour ce faire, tu vas encore devoir copier ton travail dans un dossier **en dehors** de fullstack challenges pour en faire un dépôt git séparé :

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

Crée ensuite la branche magique `gh-pages` :

```bash
git checkout -b gh-pages
git push origin gh-pages
```

Va sur `http://<user.github_nickname>.github.io/medium-article/` pour voir ta copie d'article Medium en ligne !
