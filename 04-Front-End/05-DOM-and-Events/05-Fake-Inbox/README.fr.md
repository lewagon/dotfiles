## Contexte et objectifs

Pense à l'interface de la boîte de réception Gmail. As-tu besoin de rafraîchir la page pour qu'un nouvel e-mail s'affiche ? La réponse est **non**, bien entendu ! Des sites comme Gmail récupèrent régulièrement les nouveaux e-mails et les ajoutent en haut de la liste. Ce qui consiste à ajouter du nouveau contenu au _DOM_ **après** le chargement initial de la page.

## Spécifications

On n'a pas encore abordé AJAX, alors on va simuler la récupération d'e-mails. On t'a fourni un squelette dans `lib/inbox.js` pour que tu puisses commencer.

- Code la méthode `hasNewMessage()` qui a une probabilité de 20 % de retourner `true` (le reste du temps, elle retourne `false`).
- Code la méthode `newMessage()` qui doit retourner un objet aléatoire (à savoir un nouvel e-mail) avec les clés objet (`subject`) et émetteur (`sender`). Par exemple :

```js
{
  sender: 'GitHub Team',
  subject: 'Welcome to GitHub'
}
```

ou

```js
{
  sender: 'Arnold Schwarzenegger',
  subject: "I'm Back"
}
```

Tu peux lancer `rake` sur ces 2 méthodes.

Maintenant, on va tester le code dans le navigateur (`rake` n'est plus disponible). Dans un autre onglet du terminal, exécute :

```bash
rake webpack
```

et va sur [localhost:8080](http://localhost:8080).

## Tâches

- Code la méthode `appendMessageToDom(message)` qui prend un objet avec les clés objet (`subject`) et émetteur (`sender`) comme paramètres et ajoute une nouvelle ligne pour ce message au markup HTML. Examine le fichier `index.html` pour y trouver des exemples de lignes non lu (`unread`) et lu (`read`).
- Puis unis tout ensemble. Comme tu peux le voir au bas du fichier, la méthode `refresh` est appelée toutes les `1000` millisecondes. Code ta méthode `hasNewMessage()` et s'il y a un nouveau message, ajoute-le (`newMessage()`) en haut de la boîte de réception (`appendMessageToDom(message)`). Souviens-toi de mettre à jour le compteur dans le titre `h1`.
- (Facultatif) [Mets à jour le titre du document](https://developer.mozilla.org/en-US/docs/Web/API/Document/title) pour que le compte de messages non lus apparaisse dans le titre de ton onglet comme dans une vraie boîte de réception !

