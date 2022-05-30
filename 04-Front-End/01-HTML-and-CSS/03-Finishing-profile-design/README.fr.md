## Configuration

Comme précédemment, si tu n'as pas encore copié les fichiers de l'exercice précédent, copie ton profil depuis l'exercice précédent dans le dossier de cet exercice :

```bash
cp -r ../02-Fonts-and-colors/profile .
```

## Contexte et objectifs

Joue avec le modèle de boîte (box model) (`margin/border/padding/width/height`) en séparant les informations de ton profil avec différentes balises `<div>`. Utiliser ensuite des sélecteurs CSS avancés (id, class, grouping, sélecteurs descendants) pour affiner le design de ta page.

N'oublie pas de **forcer le rafraîchissement** de ton navigateur (`Ctrl/Cmd + Shift + R`) pour vider le cache si ta page n'affiche pas le code le plus récent !

## Spécfications

### Étape 1 : Modèle de boîte (box model)

Voici [l'objectif à atteindre](https://lewagon.github.io/html-css-challenges/03-box-model-and-selectors/).

- Commence avec la structure suivante pour ta page :

```html
<div class="container">
  <div class="card"></div>
  <div class="card"></div>
</div>
```

- La classe `<div class="container">` permet de centrer le contenu de la page dans un conteneur (container) en utilisant les marges à gauche et à droite pour éviter qu'il n'occupe 100 % de la fenêtre (ce qui ne serait pas esthétique).
- La classe `<div class="card">` sert à regrouper des informations dans une jolie carte (card) blanche.
- Ajoute des touches sympas à tes cards en utilisant des propriétés CSS comme `background`, `border`, `border-radius` et `box-shadow`. Reste simple, avec un fond blanc, des bords légèrement arrondis et des ombres subtiles (comme on l'a vu pendant le cours).

### Étape 2 : Sélecteurs

À chaque fois que tu veux **nommer** un élément de ta page, pose-toi les questions suivantes :
- Dois-je utiliser une `class` ou un `id` ? L'élément est-il unique ou réutilisable ?
- Quel nom dois-je choisir pour ma classe ? Respecte la convention `component-shape`
- Dois-je diviser mon design en plusieurs classes au lieu d'une seule grande classe ?

Voici un exemple de **mauvais** code CSS :

```css
#home-page-first-image {
  border-radius: 50%;
}

.home-card {
  text-align: center;
  background: white;
  padding: 30px;
  border: 1px solid lightgrey;
}
```

Et voici la **bonne version** :

```css
.img-circle {
  border-radius: 50%;
}

.text-center {
  text-align: center;
}

.card-white {
  background: white;
  padding: 30px;
  border: 1px solid lightgrey;
}
```

- Rendre une image circulaire et centrer les textes sont des **tâches de design très courantes**. Elles méritent une classe réutilisable dédiée, à ne pas mélanger avec d'autres classes ou ids !
- Ne te répète pas (don't repeat yourself) et essaie d'utiliser des **noms de classe génériques**.  Envisage chaque classe CSS comme un design réutilisable que tu peux appliquer partout sur ton site Web. Adopter cet état d'esprit est le plus difficile quand on débute en CSS.

## Suggestions et ressources supplémentaires

### Conteneur

Voici la méthode de centrage div pour le conteneur principal :

```css
.container {
  width: 500px;   /* Définit la largeur */
  margin: 0 auto; /* Définit automatiquement les marges à gauche/droite */
}
```

### Liste alignée

Pour créer tes listes d'icônes, tu vas devoir changer le comportement en bloc (`block`) des éléments de la liste en **les alignant**. Voici les règles CSS correspondantes :

```css
.list-inline > li {
  display: inline-block;
  padding: 0px 20px;
}
```

Même alignée, une liste `<ul>` dispose d'un espace de remplissage à gauche (`padding-left`) et de puces que tu devras aussi retirer pour que ta liste soit plus jolie.

```css
.list-inline {
  list-style: none;
  padding-left: 0px;
}
```

À partir de cet exercice, **tu dois impérativement utiliser l'inspecteur de ton navigateur Web (clique-droit puis "Inspect")** pour jouer avec ton CSS dans le navigateur et tester ton code avant de rédiger la version finale.

## Tu as terminé ?

Une fois que tu as terminé, tu peux pousser cet exercice et copier le contenu dans le dossier de l'exercice suivant avec cette commande :

```bash
# Pousser sur GitHub
git add .
git commit -m "Added div to my profile page"
git push origin master

# Copier ton profil dans le dossier de l'exercice suivant
cp -r profile ../04-Responsive-profile
```
