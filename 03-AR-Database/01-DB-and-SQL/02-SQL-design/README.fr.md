## Contexte et objectifs

L’objectif de ce deuxième challenge est de te familiariser avec le design de base de données, une compétence **essentielle** pour que ton back-end soit facile à maintenir, flexible et efficace.

## Spécifications

### Concevoir la base de données d’un sondage

Il existe de nombreuses façons de créer une base de données pour un sondage, mais on va commencer par construire un système basique avec des utilisateurs, des questions, des réponses et des sondages.

Voici les contraintes du système :
- L’application gère plusieurs `users` (utilisateurs).
- Un utilisateur peut créer de nombreux `surveys` (sondages), mais un sondage est créé par un utilisateur seulement.
- Un sondage comporte plusieurs `questions`.
- Une question a plusieurs `answers` (réponses) possibles.
- Quand un utilisateur répond à une question, il ne peut choisir qu’une seule réponse. Celles-ci sont stockées comme `user_answers`.

### Concevoir le schéma

Conçois un schéma de base de données pour une application de sondage répondant aux contraintes. Pour cela, tu dois utiliser le [SQL Designer](http://db.lewagon.com). Pour vérifier ta solution, clique sur "Save / Load", puis "Save XML" et copie-colle le code XML généré dans `lib/survey.xml`. Ensuite, utilise `rake` pour terminer la vérification.

## Enseignements clés

- Qu’est-ce qu’un schéma ?
- Quelle est la relation entre des tables ?
- Saurais-tu dessiner le schéma de base de données derrière Facebook ? Airbnb ? Prends une feuille et essaie !
