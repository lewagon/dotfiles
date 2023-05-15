## Contexte et objectifs

Les applications dans le terminal sont cool, mais sais-tu ce qui l'est encore plus ? Les applications web ! Essayons de porter notre Cookbook vers une nouvelle application web en utilisant la gemme `sinatra`.

## Quelques mots sur Sinatra

Sinatra est ce que nous appelons un "microframework" web. C'est en fait un mini Rails, qui suit également le modèle **MVC**.
Le fichier `app.rb` agit comme le contrôleur. La couche routeur est gérée par Sinatra.
Nous avons déjà créé une méthode de contrôleur pour gérer la racine de l'application web. Sinatra fait correspondre l'URL du navigateur à la bonne méthode dans `app.rb`. Jette un coup d'œil à la [doc routage] (http://www.sinatrarb.com/intro.html#Routes) pour plus d'informations.

Pour en savoir plus sur Sinatra, suis notre [tutoriel] (https://github.com/lewagon/sinatra-101). Suis attentivement les étapes [setup](https://github.com/lewagon/sinatra-101#setup), [sinatra app](https://github.com/lewagon/sinatra-101#sinatra-app) et [views](https://github.com/lewagon/sinatra-101#views) avant de démarrer ton application web Cookbook.

## Specs

Dans notre application web, nous utiliserons nos classes `Recipe` et `Cookbook` telles que nous les avons laissées plus tôt. Nous n'aurons pas besoin des classes `Router` et `Controller`.

### Index

A la racine de votre application web (à l'url `/`), tu dois afficher les recettes de ton Cookbook dans une liste non ordonnée.

En dessous de la liste des recettes, ajoute un lien de navigation (`<a>`) vers l'url `/new`, que nous utiliserons pour l'histoire utilisateur `create`.

### Create

Créer une nouvelle recette se fait en deux étapes dans le contexte de notre application web. Nous avons besoin d'une étape pour afficher un formulaire. Nous utiliserons une requête HTTP `GET /new` pour afficher le formulaire.

Le `<form>` sera l'équivalent du `gets` dans le terminal. Nous avons besoin de champs pour le nom de la recette, sa description, et tout autre champ que vous jugerez utile d'ajouter. Envoyer ce formulaire devrait déclencher la requête HTTP suivante :

```
POST /recipes
```

Cette requête devrait déclencher du code dans `app.rb` pour ajouter la recette dans le livre de cuisine.
A la fin de ce code, trouve un moyen de **rediriger** l'utilisateur vers la base url `/` de ton application web (l'index).

### Destroy

Dans l'index, ajoute un lien `destroy` à côté du nom et de la description de la recette.
En cliquant sur ce lien, la recette sera supprimée du livre de cuisine et tu seras **redirigé** vers l'index.

### Aller plus loin

Quand tu auras réussi à coder ces 3 user stories, continue et essaie d'implémenter les actions plus difficiles `import` et `mark as done` !

Bon Sinatra !
