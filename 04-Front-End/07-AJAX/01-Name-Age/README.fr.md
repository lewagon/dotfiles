## Contexte et Objectifs

Dans cet exercice, tu vas jouer avec l'[API du Dictionnaire Gratuit](https://dictionaryapi.dev/). Cette API te permettra d'obtenir des définitions pour un mot particulier.

Pour ce faire, tu devras mettre en place une requête `GET` vers l'API afin de récupérer la définition du mot et l'afficher dans le DOM.

## Spécifications

Comme d'habitude, lance ton serveur avec `serve` dans le terminal et rends-toi sur `localhost:8000`.

Dans le fichier `lib/index.js`, mets en œuvre la requête `GET` vers l'API en utilisant `fetch` dans la fonction `displayDefinition()`. La logique pour capturer et stocker le `mot` est déjà implémentée, afin que tu puisses te concentrer sur la requête AJAX.

Tu dois utiliser l'URL suivante pour faire la requête vers l'API :

```
https://api.dictionaryapi.dev/api/v2/entries/fr/MOT
```

Par exemple, cette URL récupèrera les définitions du mot "chat" :

```
https://api.dictionaryapi.dev/api/v2/entries/fr/chat
```

L'API te fournira de nombreuses définitions différentes pour le mot. Ne t'inquiète pas, ton objectif est **uniquement d'afficher la toute première définition**. Pour cela, tu devras faire attention à la structure des données renvoyées par l'API 🤔 Qu'est-ce qu'un `Array` ; qu'est-ce qu'un `Object` ; quelles sont les clés et valeurs ?

Une fois la requête terminée, mets à jour le contenu de la page pour afficher la définition. Le résultat doit aller dans le `<p id="definition">`.

Bonne définition !
