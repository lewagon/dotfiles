## Contexte et objectifs

Dans ce petit challenge pour s'échauffer, on va revenir sur la façon de lier un événement du DOM à une action en JavaScript !

C'est toujours le même processus en 3 étapes :

- **Sélectionner** l'élément que tu souhaites rendre interactif
- **Écouter** l'élément sur l'événement
- Écrire le **callback** (le code qui s'exécute quand l'événement se produit)

## Spécifications

Lance ton serveur Web local avec :

```bash
serve
```

Ouvre [`localhost:8000`](http://localhost:8000) dans ton navigateur.

Tu devrais voir apparaître un gros bouton vert disant `Click me!`. L'objectif de ce challenge est d'afficher une [`alert`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) disant `Thank you!` quand tu cliques dessus.

Ouvre le fichier `lib/index.js` et suis le pseudo-code !

Il n'y a pas de test pour cet exercice, mais on vérifiera ton style ! Lance `rake`.
