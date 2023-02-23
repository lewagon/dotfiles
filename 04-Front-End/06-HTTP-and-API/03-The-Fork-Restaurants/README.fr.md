## Contexte et objectifs

Dans ce challenge, nous allons examiner de plus près l'API The Fork que nous avons vue pendant le cours. Le but est de se familiariser avec les requêtes API, la lecture de la réponse et l'utilisation de cette réponse pour l'insérer dans le HTML.

## Spécifications

Tu vas créer une application de recherche des restaurants de [The Fork API](https://the-fork-api.students.lewagon.co/).

Tu vas devoir implémenter la logique de recherche dans `index.js`, afin de pouvoir filtrer les restaurants par catégorie quand on clique sur *Search*.

Lance ton serveur locale avec :

```bash
serve
```

Tu devrais voir un formulaire avec toutes les différentes catégories de restaurants.

- Lorsque l'on choisit une catégorie et clique sur `Search`, la page ne **doit pas se recharger** et le but est de voir la liste des restaurants filtrés sur la droite.
- Un message indiquant qu'il n'y a pas de résultats doit apparaître s'il n'y a pas de restaurants pour cette catégorie.
- La liste doit être réinitialisée avant d'afficher les résultats d'une nouvelle recherche.
- Tu peux utiliser les listes Bootstrap avec la classe [**flush list**](https://getbootstrap.com/docs/5.2/components/list-group/#flush) pour afficher les restaurants. Mais n'hésite pas à être créatif si tu le souhaites !

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/the-fork-challenge-1.gif" alt="The Fork Challenge demo" width="100%">
</div>

## Lis la documentation

Nous allons utiliser the [Fork API](https://the-fork-api.students.lewagon.co/), donc comme toujours lorsque nous utilisons une nouvelle API, il est très important de commencer par lire la documentation pour trouver le **`endpoint` dont tu auras besoin**, et comprendre comment construire la requête.

## Refactorisation

Lorsque la recherche fonctionnera comme prévu, tu peux rendre le code plus lisible et éviter trop de niveaux d'indentation, comme dans le précédent challenge.

Créé deux nouvelles fonctions pour extraire une partie de la logique en dehors du callback `addEventListener` :

- Premièrement, une méthode `insertResults` qui va insérer les résultats dans notre liste. Quel paramètre doit lui être passé ?
- Deuxièmement, une méthode `buildSearchUrl` qui va trouver la catégorie choisie puis construire l'URL dont nous avons besoin pour faire notre requête. Elle doit renvoyer l'URL complétée par les paramètres de la requête de recherche.

A la fin, ton code doit être facilement lisible et ne plus avoir qu'un niveau d'indentation !

## Bonus (facultatif)

Une fois que ta recherche fonctionne pour une catégorie choisie, tu peux ajouter la recherche par lieu, pour pouvoir rechercher à la fois par ces deux critères à la fois 🎉.

<div class="text-center">
  <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/the-fork-challenge-2.gif" alt="The Fork Challenge demo" width="100%">
</div>
