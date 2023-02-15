## Contexte et objectifs

On va créer un jeu JavaScript : la course du Wagon 🏎. Il s'agit d'un simple jeu où tu utilises ton clavier pour faire avancer un Wagon. Chaque joueur fera avancer son Wagon en appuyant sur une touche (par ex., `Q` pour le joueur 1, `P` pour le joueur 2)

L'objectif est d'en apprendre davantage sur JavaScript, le DOM et la gestion des événements asynchrones.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/wagon_race.gif)

## Spécifications

Ouvre le fichier `index.html`.

#### HTML

Tu vas commencer par construire un simple plateau à deux joueurs en HTML. Il existe plusieurs façons de faire, voici un exemple :

```html
<table class="racer-table">
  <tr id="player1-race">
    <td></td>
    <td class="active"></td>
    <td></td>
    <td></td>
    etc.
  </tr>
  <tr id="player2-race">
    <td></td>
    <td></td>
    <td></td>
    <td class="active"></td>
    etc.
  </tr>
</table>
```

#### CSS

Une fois que ton HTML est terminé, passe au CSS et crée le circuit de ta course ! Exemple :

```css
.racer-table td {
  height: 40px;
  width: 40px;
}
.racer-table td.active {
  background-repeat: no-repeat;
  background-size: 100%;
}
#player1-race td.active {
  background-image: url("images/player_1.png");
}
#player2-race td.active {
  background-image: url("images/player_2.png");
}
```

Tu mettras à jour la position d'un joueur en déplaçant la classe `active` d'un `td` au suivant. Bien entendu, il existe d'autres solutions pour mettre ce jeu en place. Utiliser une table et une classe CSS en est une. Assure-toi seulement d'être capable de produire « manuellement » toutes les vues du plateau dont tu pourrais avoir besoin.

L'idéal est de toujours en faire autant que possible avec le markup HTML et les classes CSS avant de passer à JavaScript. Les mauvais développeurs front-end passent beaucoup de temps à écrire de longues lignes de code JavaScript pour modifier des valeurs CSS, au lieu de rédiger des scripts courts qui jouent avec des classes CSS existantes.

#### JavaScript

Rédige tout ton code dans `lib/wagon_race.js`. On a besoin d'une nouvelle solution pour que JavaScript mette à jour l'état du plateau. Crée des fonctions JavaScript simples pour mettre à jour la position d'un joueur. Ici aussi, il y a plusieurs façons de faire. Voici un exemple :

- Supprime la classe `active` du `td` du joueur actuel et ajoute la classe au `td` suivant.
- Assure le suivi de l'indice de chaque joueur dans la table et augmente-le.


#### Lien avec le clavier

Cliquer sur un bouton n'est pas assez rapide, et ça ne te permet pas de jouer avec quelqu'un d'autre ! Jette un œil à l'événement `keyup` :

```js
document.addEventListener("keyup", event => console.log(event));
```

_Tu comprends pourquoi on utilise `keyup` au lieu de `keydown` ?_

##### Début et fin 🏁

Deux dernières choses :

- Trouve un moyen d'annoncer le vainqueur de la course
- Trouve un moyen de redémarrer le jeu
