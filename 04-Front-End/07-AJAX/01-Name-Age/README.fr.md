## Contexte et objectifs

Dans ce challenge, tu vas jouer avec [l'API agify](https://agify.io/). Cette API te permet de prédire ton âge en fonction de ton prénom.

Pour cela, tu vas devoir implémenter une requête `GET` sur l'API agify. Tu vas ensuite afficher le résultat de la requête dans le DOM.

![Highlights Gif](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/your-age-from-your-name.gif)

## Spécifications

Comme d'habitude, lance ton server avec `serve` depuis ton terminal et va sur `localhost:8000`.

Dans ton fichier `index.html`, tu dois coder dans la fonction `displayAge()` une requête `GET` sur l'API agify, en utilisant `fetch`. La logique pour capturer et stocker le `firstName` est déjà implémentée, tu peux donc te concentrer sur la requête ajax.

Tu dois utiliser l'url suivante pour faire la requête à l'API :

```
https://api.agify.io?name=THE_FIRST_NAME
```

Par exemple, cette URL prédira l'âge de la personne dont le prénom est `michael` :

```
https://api.agify.io?name=michael
```

Une fois la requête terminée, mets à jour le contenu de la page pour afficher l'âge. Le résultat doit aller dans le `<p id="your-age">`. Essaie d'afficher un message avec une phrase comme "Tu as 30 ans".

Bon agifying !
