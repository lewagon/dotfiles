## Contexte et Objectifs

Dans cet exercice, nous allons examiner de plus près l'API Fork que nous avons vue pendant le cours. Le but est de devenir plus familier avec l'écriture de requêtes à des API, la lecture de la réponse et l'utilisation de cette réponse pour l'insérer dans HTML.

## Spécifications

Vous allez construire une application de recherche pour filtrer les restaurants de The Fork API.

L'objectif est d'implémenter dans `index.js` la logique de recherche, afin de filtrer par catégorie lorsqu'on clique sur "recherche".

Ouvre la page html dans ton navigateur avec:

```bash
serve
```

Tu devrais voir un formulaire avec toutes les différentes catégories de restaurants.

- Lorsque nous en sélectionnons un et cliquons sur _Rechercher_, la page **ne doit pas se recharger** et l'objectif est d'afficher la liste des restaurants filtrés à droite.
- Nous devrions voir un message indiquant qu'il n'y a pas de résultats s'il n'y a pas de restaurants pour cette catégorie.
- La liste doit être réinitialisée à chaque nouvelle recherche avant d'afficher les nouveaux restaurants.
- Tu peux utiliser la [**liste flush**](https://getbootstrap.com/docs/5.2/components/list-group/#flush) de Bootstrap pour afficher les restaurants. Mais n'hésite pas à être créatif si tu le souhaites !

```html
<div class="text-center">
  <img
    src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/the-fork-challenge-1.png"
    alt="The Fork Challenge demo"
    width="100%"
  />
</div>
```

## Lire la documentation

Nous utiliserons l'API Fork (https://the-fork-api.students.lewagon.co/). Comme toujours lorsque nous utilisons une nouvelle API, il est très important de lire d'abord la documentation pour trouver le **point final** dont nous avons besoin et comprendre comment construire notre requête.

## Refactoring

Une fois que la recherche fonctionne comme prévu, rendons le code plus lisible et évitons trop de niveaux d'indentation, comme nous l'avons fait dans le défi précédent.

Créons deux nouvelles fonctions pour extraire une partie de notre logique en dehors du rappel `addEventListener` :

- Tout d'abord, une méthode `insertResults` qui insérera les résultats dans notre liste. Quel paramètre doit lui être passé ?
- Ensuite, une méthode `buildSearchUrl` qui trouvera la catégorie choisie et construira l'URL dont nous avons besoin pour effectuer notre requête. Elle doit renvoyer l'**URL avec les paramètres de recherche**.

À la fin, ton code doit être facilement lisible et ne doit pas avoir plus d'un niveau d'indentation!

## Aller plus loin

Une fois que la recherche fonctionne pour une catégorie, ajoutons la localisation afin que nous puissions rechercher à la fois par catégorie et par emplacement 🎉

```html
<div class="text-center">
  <img
    src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/the-fork-challenge-2.png"
    alt="The Fork Challenge demo"
    width="100%"
  />
</div>
```
