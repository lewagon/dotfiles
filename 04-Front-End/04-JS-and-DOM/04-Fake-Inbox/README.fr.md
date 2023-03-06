## Contexte et objectifs

Pense à l'interface de la boîte de réception Gmail. As-tu besoin de rafraîchir la page pour qu'un nouvel e-mail s'affiche ? La réponse est **non**, bien entendu ! Des sites comme Gmail récupèrent régulièrement les nouveaux e-mails et les ajoutent en haut de la liste. Ce qui consiste à ajouter du nouveau contenu au _DOM_ **après** le chargement initial de la page.

Dans ce challenge, nous aurons 2 processus pour tester notre code :
- Dans le navigateur
- Dans le terminal

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

Maintenant, on va tester le code dans le navigateur (`rake` n'est plus disponible). Dans un autre onglet du terminal, exécute :

```bash
serve
```

et va sur [localhost:8000](http://localhost:8000).

Si tu `console.log` les résultats de `hasNewMessage()`, tu verras la fonction être appelée toutes les 1000 millisecondes. Pourquoi ? Cet appel de la fonction vient du fichier de test `inbox_examiner.js` à la ligne 43 !

## Tâches

- Code la méthode `appendMessageToDom(message)` qui prend un objet avec les clés objet (`subject`) et émetteur (`sender`) comme paramètres et ajoute une nouvelle ligne pour ce message au markup HTML. Examine le fichier `index.html` pour y trouver des exemples de lignes non lu (`unread`) et lu (`read`).
- Puis unis tout ensemble. Comme tu peux le voir au bas du fichier, la méthode `refresh` est appelée toutes les `1000` millisecondes. Code ta méthode `hasNewMessage()` et s'il y a un nouveau message, ajoute-le (`newMessage()`) en haut de la boîte de réception (`appendMessageToDom(message)`). Souviens-toi de mettre à jour le compteur dans le titre `h1`.
- (Facultatif) [Mets à jour le titre du document](https://developer.mozilla.org/en-US/docs/Web/API/Document/title) pour que le compte de messages non lus apparaisse dans le titre de ton onglet comme dans une vraie boîte de réception !

## Rake avec ton terminal

Le deuxième processus pour tester ton code est de lancer les tests dans le terminal. On va utiliser notre fameuse commande `rake` pour lancer les tests.

Pour ça, on utilisera [Node.js](https://nodejs.org/en/), pour exécuter du JavaScript dans le terminal. 

Tu devrais déjà avoir Node.js installé sur ton ordinateur avec une version supérieure à `10`. Vérifie en tapant:
  
```bash
node -v
# Tu devrais voir la version de node ici
```

Si ce n'est pas le cas, tu peux te référer à la section du setup dédiée pour [macOS](https://github.com/lewagon/setup/blob/master/macos.md#nodejs), [Linux](https://github.com/lewagon/setup/blob/master/ubuntu.md#nodejs) ou [Windows](https://github.com/lewagon/setup/blob/master/windows.md#nodejs).

Si lancer `rake` affiche une erreur, lance:
```bash
nvm list
```
puis choisis la version de Node.js la plus récente. Par exemple, si tu vois `v10.16.0`, lance:
```bash
nvm use 10.16.0
```

Une fois que l'exercice est entièrement vert (style + tests), **versionne et pousse** 🙏