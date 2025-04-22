## Contexte et objectifs

Nous voulons créer le jeu classique [Démineur](https://www.google.com/search?tbm=isch&q=minesweeper+windows) dans notre navigateur.

Un boilerplate est fourni pour te lancer, contenant :

- `index.html` : une grille 2x2 pour le jeu. Tu peux la rendre plus grande si tu veux !
- `minseweeper.css` : contient des classes que tu peux appliquer à tes cellules de tableau (`td`) pour afficher l'image qu'il faut pour chaque case. Ici, nous utilisons un fichier svg comme `background-image`. Ensuite, nous définissons la taille du fichier à 24 pixels (tu peux la rendre plus grande ou plus petite si tu veux)
- `lib/minesweeper.js` : c'est là que tu dois mettre ton code !

### Mise en place

Lançons un serveur web local en exécutant :

```bash
serve
```

Ensuite, ouvre [`localhost:8000`](http://localhost:8000) dans ton navigateur.

## Spécifications

Prends un peu de temps pour réfléchir aux règles du jeu. Comment commencer ?

- La grille de départ est 2x2, peut-être que tu devrais la rendre plus grande ?
- Qu'est-ce qui se cache derrière chaque case `unopened` ? Comment stocker cette information ?
- Que se passe-t-il quand on clique sur une case avec le bouton gauche ? le bouton droit ?
- Quand gagne-t-on ? Quand perd-on ?

### Aller plus loin

Si tu as terminé les bases, tu pourrais :

- Changer les images
- Ajouter un cadre et un petit smiley jaune en haut, qui met des lunettes de soleil quand le jeu est gagné, ou qui redémarre une nouvelle partie quand on clique dessus.
- Ajouter un chronomètre
