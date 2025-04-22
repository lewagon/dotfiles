## Contexte et objectifs

Les méthodes destructives modifient le **récepteur** (l’objet sur lequel elles sont appelées).
Elles peuvent être dangereuses. Par **convention**, on ajoute donc un point d’exclamation `!` à la fin.

## Spécifications

- Implémente `#horse_racing_format!` qui modifie l’array pris comme argument pour le rendre plus accessible au présentateur de la course
- **contrainte** : La méthode doit inverser l’array, ajouter la position du cheval avant son nom et un point d’exclamation après son nom.

Exemple : `["Abricot du Laudot", "Black Caviar", "Brigadier Gerard"]` doit devenir `["3-Brigadier Gerard!", "2-Black Caviar!", "1-Abricot du Laudot!"]` après mise en forme.
C’est le seul format que le présentateur comprendra !

**🤔 Astuce :** N’hésite pas à ouvrir le fichier dans le dossier `spec` et à **lire le code des tests** pour comprendre ce qui se passe. C’est le code qui s’exécute quand tu lances `rake` depuis ton terminal.

## Suggestions et ressources complémentaires

- Inutile de te rappeler que tu dois utiliser des itérateurs destructifs dans ta méthode 😊

## Enseignements clés

Tu t’en es sans doute déjà rendu compte, une méthode ne sert pas seulement à retourner le résultat d’un calcul… Une méthode peut également servir à effectuer des actions sur des objets pour les modifier. Assure-toi de maîtriser les notions suivantes avant de passer à la suite :
- Qu’est-ce que l’id d’un objet ? Tape `"something".object_id` dans IRB pour le savoir.
- Qu’est-ce qu’une égalité d’objet ? Quand tu utilises `a==b` dans une condition, testes-tu l’égalité d’objet ? Que testes-tu exactement ?
