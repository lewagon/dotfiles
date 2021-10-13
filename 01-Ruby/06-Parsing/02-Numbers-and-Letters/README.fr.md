Contexte et objectifs
---------------------

-   Te familiariser avec le format de parsing JSON
-   Apprendre à séparer les responsabilités de ton programme en
    plusieurs sous-méthodes

Spécifications
--------------

Si tu regardes la télévision française, tu as sans doute déjà vu [*Des
chiffres et des
lettres*](https://fr.wikipedia.org/wiki/Des_chiffres_et_des_lettres).

L’objectif de cet exercice est d’écrire une version simplifiée de ce jeu
depuis le terminal :

-   Tu reçois un ensemble aléatoire de lettres.
-   Tu dois former le mot anglais le plus long que tu puisses trouver en
    utilisant uniquement les lettres dans la grille.
-   Une fois que tu as saisi ta réponse, tu vois ton score, le temps que
    tu as mis et éventuellement un message d’erreur si tu as échoué.

Voici comment la méthode doit fonctionner quand tu exécutes
`ruby lib/interface.rb` :

```bash
********* Welcome to the longest word-game! *********
Here is your grid:
Q F M R K L I T P
*****************************************************
What is your longest word?
lift
******** Now your results ********
Your word: lift
Time Taken to answer: 12.07916
Your score: 3.194722666666667
Message: Well Done!
```

Ce challenge te permettra d’accéder à une API Web et de parser les
données JSON retournées par cette API !

**Contraintes** :

-   Tu devras utiliser l’API Wagon Dictionary. Voyons voir ce que l’on
    obtient de l’API lorsqu’on envoie un [mot anglais
    correct](https://wagon-dictionary.herokuapp.com/apple) et un [mot
    incorrect](https://wagon-dictionary.herokuapp.com/zzzz). Fais
    attention à la structure de l’URL.
-   Ta grille doit être une grille aléatoire où il est possible
    d’intégrer les mêmes caractères plusieurs fois.
-   Pense à vérifier que **1)** ton mot est un vrai mot anglais, et
    **2)** que toutes les lettres de ton mot apparaissent dans ta grille
    (souviens-toi que tu ne peux utiliser chaque lettre qu’une seule
    fois).
-   Si le mot n’est pas valide ou ne figure pas dans ta grille, le score
    sera de 0 (et devra s’accompagner d’un message au joueur expliquant
    pourquoi il n’a marqué aucun point).
-   Le score dépend du temps mis pour répondre et de la longueur du mot
    envoyé. Plus le mot est long et envoyé rapidement, plus le score
    sera élevé ! Tu es libre d’inventer tes propres règles de sanction !

Enseignements clés
------------------

-   Qu’est-ce qu’un JSON ? En quoi est-il similaire à la structure d’un
    hash Ruby ?
-   Comment peux-tu refactoriser ton code pour séparer les
    responsabilités de chaque méthode ?

Suggestions et ressources complémentaires
-----------------------------------------

Ce challenge n’est volontairement pas encadré. Voici quelques éléments
d’aide :

-   Écris le pseudocode pour déterminer comment procéder avant de te
    lancer dans le code
-   Tu peux installer l’extension [Json Formatter for
    Chrome](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en)
    pour t’aider à lire un JSON produit par une API (regarde [JSONView
    for Mozilla](https://addons.mozilla.org/fr/firefox/addon/jsonview/))
-   Utilise le pack `open-uri` de la librairie standard Ruby pour
    envoyer des requêtes HTTP à cette API et obtenir un résultat en
    JSON. Utilise le pack `json` pour parser les fichiers JSON
    retournés.
-   Pour tester l’intégration de la grille, essaie d’utiliser `Enumerable#all?`
