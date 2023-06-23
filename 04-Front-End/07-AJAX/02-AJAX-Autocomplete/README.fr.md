## Contexte et objectifs

Dans ce deuxième exercice AJAX, on va construire une entrée avec fonction d'auto-remplissage. Qu'est-ce que c'est ? Va sur [Google](https://www.google.com/) pour obtenir un exemple : dès que tu commences à taper **un** caractère dans le champ de saisie, on te propose des suggestions d'auto-remplissage en dessous.

On va chercher à créer une entrée avec auto-remplissage avec des **mots du dictionnaire**.

## Spécifications

Lance ton serveur Web local avec :

```bash
serve
```

Trois fichiers doivent être mis à jour :

- `index.html` - l'entrée est déjà en place, mais la liste d'auto-remplissage `ul` contient de faux éléments que tu peux supprimer
- `style.css` - ajoute du style
- `lib/index.js` - là, tu vas commencer de zéro !

Pour obtenir des suggestions, tu peux utiliser l'API suivante :

```bash
GET https://wagon-dictionary.herokuapp.com/autocomplete/:stem
```

Ici, tu vas remplacer `:stem` par les caractères saisis par l'utilisateur. Dès que l'utilisateur saisira un nouveau caractère (`keyup`, par exemple ?), tu déclencheras un nouvel appel AJAX. Si tu examines ton onglet "Réseau" dans l'inspecteur Chrome, tu devrais voir quelque chose comme ce qui suit :

```bash
https://wagon-dictionary.herokuapp.com/autocomplete/u
https://wagon-dictionary.herokuapp.com/autocomplete/un
https://wagon-dictionary.herokuapp.com/autocomplete/und
https://wagon-dictionary.herokuapp.com/autocomplete/unde
https://wagon-dictionary.herokuapp.com/autocomplete/under
etc.
```

Quand tu recevras le JSON de l'API, ton travail sera de mettre à jour la liste `ul#results` avec des suggestions !

Une fois que tu as le comportement de base, n'hésite pas à améliorer l'aspect de la liste  `ul#results` 🎨 🎨 😋
