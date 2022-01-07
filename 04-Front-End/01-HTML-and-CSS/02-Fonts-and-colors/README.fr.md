## Configuration

On va continuer à créer ton profil. Si tu ne l'as pas déjà fait, copie ton profil dans le dossier de cet exercice et ajoute un fichier CSS dedans :

```bash
cp -r ../01-Profile-content/profile . # n'oublie pas le point à la fin !
cd profile
touch style.css
```

## Contexte et objectifs

Ajoute des règles CSS simples pour les **polices** et les **couleurs** de ton profil.

N'oublie pas de **forcer le rafraîchissement** de ton navigateur (`Ctrl/Cmd + Shift + R`) pour vider le cache si ta page n'affiche pas le code le plus récent !

## Spécifications

[Voici un exemple](https://lewagon.github.io/html-css-challenges/02-fonts-colors-new/) de ce que tu dois créer. Et voici une liste des règles CSS à rédiger :

### Corps (body)

Choisis une couleur de fond (`background-color`), un style de police (`font-family`), une couleur (`color`), une taille de police (`font-size`) et une hauteur de ligne (`line-height`) pour le corps (`<body>`). **Si tu définis ces règles de police au niveau du corps, elles s'appliqueront à toutes les balises de texte de base** (`<p>`, `<li>`, etc.).

### Titres (headers)

- Choisis une couleur (`color`) et un style de police (`font-family`) pour les titres (`<h1>`, `<h2>`, `<h3>`)
- Choisis une taille de police (`font-size`) et une hauteur de ligne (`line-height`) harmonieuses pour les titres
- Conseil : les **petits titres** sont plus élégants. Si tu examines n'importe quel site Web ([Medium](https://medium.com/), [Airbnb](https://www.airbnb.com), etc.), tu verras que la taille de police (`font-size`) des titres est plutôt réduite.

### Liens

- Change la couleur (`color`) et la décoration de texte (`text-decoration`) de tous les liens
- Ajoute des effets de survol (hover) des liens en utilisant la pseudo-classe `a:hover`

## Suggestions et ressources supplémentaires

- Trouve l'inspiration sur [Coolors](http://coolors.co/) ou [Color hunt](http://colorhunt.co/) pour le choix de ta palette de couleurs
- Choisis tes polices sur [Google Fonts](https://www.google.com/fonts)
- Sur Google Fonts, **Open Sans** est la police standard pour le corps (`body`). **Raleway**, **Varela**, **Poppins**, **Roboto** sont de bonnes options pour `h1`, `h2`, `h3`.

Par exemple, si tu veux utiliser Open-Sans et Poppins (avec des épaisseurs différentes), tu peux ajouter ceci en haut de ta feuille `style.css` :

```css
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&family=Poppins:wght@300;400;500;700");
```

Tu peux ensuite l'appliquer au reste de ton CSS :

```css
body {
  font-family: 'Open Sans', sans-serif;
  font-weight: 300; /* if you want the light version */
}
```

**N'hésite pas à choisir d'autres polices sur Google Fonts. Fais preuve de créativité 😎🌈 !**

## Tu as terminé ?

Une fois que tu as terminé, tu peux pousser cet exercice et copier son contenu dans le dossier de l'exercice suivant avec cette commande :

```bash
# Pousser sur gihtub
git add .
git commit -m "Added fonts & colors to my profile page"
git push origin master

# Copier ton profil dans le dossier de l'exercice suivant
cp -r profile ../03-Finishing-profile-design
```
