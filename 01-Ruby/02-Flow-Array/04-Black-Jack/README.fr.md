Contexte et objectifs
---------------------

Cet exercice a pour objectif de valider des concepts fondamentaux que tu as déjà vus et qui sont communs à la plupart des langages de programmation :

-   Lire des données entrées par un·e utilisateur·rice / Imprimer un résultat pour un·e utilisateur·rice
-   Variables et méthodes
-   Flow de programmes et structures de contrôle
-   Manipulation de strings et d’arrays

### Black Jack - Règles

On va exécuter une version *simplifiée* du Black Jack :

-   Le joueur commence sans aucune carte (score de 0)
-   Le croupier commence avec un score entre `16` et `21`
-   À chaque tour, le joueur peut :
-   Tirer une carte d’une valeur aléatoire entre `1` et `11`. Cette valeur sera ajoutée à son score.
    -Tirer une autre carte, ou conserver son score actuel et arrêter de jouer.
-   Au final, il existe 5 possibilités :
-   Si le score du joueur est \> à 21, il perd (`"Lose"`).
-   Si le score du joueur est de 21, il a un `"Black Jack"` et gagne.
-   Si le score du joueur est \> au score du croupier, le joueur gagne (`"Win"`).
-   Si le score du joueur est \< au score du croupier, le joueur perd (`"Lose"`).
-   Si le score du joueur est == au score du croupier, il y a `"Push"`. Le joueur récupère sa mise.

Spécifications
--------------

### `black_jack.rb`

-   Exécute la méthode `#pick_bank_score` qui retourne un score aléatoire pour le croupier entre 16 et 21.
-   Exécute `#pick_player_card` qui retourne une valeur de carte aléatoire entre 1 et 11.

### `croupier.rb`

-   Exécute la méthode `#state_of_the_game` qui crée un message avec les scores du croupier et du joueur.
-   Exécute la méthode `#end_game_message` à appeler à la fin du jeu et qui contient le résultat du jeu (victoire/échec/push).

### `interface.rb`

-   Exécute la méthode principale pour lancer une partie de Black Jack depuis le terminal. Elle doit fonctionner comme ceci :

``` {.bash}
ruby lib/interface.rb

Card? 'y' or 'yes' to get a new card
> yes
Your score is 6, bank is 17

Card? 'y' or 'yes' to get a new card
> yes
Your score is 16, bank is 17

Card? 'y' or 'yes' to get a new card
> yes
Your score is 19, bank is 17

Card? 'y' or 'yes' to get a new card
> no
You beat the bank! You win.
```

тЪая╕П L’exercice n’est terminé que quand `rake` est complètement vert ! Tu dois t’assurer de pouvoir jouer en exécutant `ruby lib/interface.rb` ЁЯШЙ

Enseignements clés
------------------

-   Quelles sont les différentes façons de créer des boucles ?
-   Quelles sont les différentes structures de condition disponibles ?
-   Qu’est-ce que l’interpolation de string ?

Suggestions et ressources complémentaires
-----------------------------------------

-   Tu peux utiliser la [classe Random](http://www.ruby-doc.org/core-2.5.3/Random.html).
-   Quand tu exécutes une boucle, tu as besoin d’une condition pour arrêter le jeu à un moment donné.

