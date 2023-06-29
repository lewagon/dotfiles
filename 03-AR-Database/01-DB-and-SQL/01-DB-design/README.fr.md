## Contexte et objectifs

L'objectif de ce premier défi est de se familiariser avec la conception de bases de données, une compétence **cruciale** pour rendre votre backend maintenable, flexible et efficace. Pour créer nos bases de données, nous utiliserons le [SQL Designer] (http://db.lewagon.com), un outil que nous utiliserons plusieurs fois au cours du bootcamp.

## Specs

### Design de notre première table

Commençons par créer une table pour stocker les utilisateurs. La table doit contenir les colonnes suivantes
- First name
- Last name
- Email

Utilise le [SQL Designer] (http://db.lewagon.com) pour ajouter la table `users` avec les colonnes spécifiées ci-dessus. Pour vérifier ta solution, clique sur "Save / Load", puis "Save XML", copiez/collez le code XML généré dans `lib/users.xml`. Tu peux ensuite utiliser `rake` pour vérifier ta solution.

NOTE : Rappelle-toi que chaque table a besoin d'une colonne `id` !

### Design de la base de données de surveys

Continuons à partir de notre table `users` pour construire une base de données `surveys`. Il existe de nombreuses façons de construire une base de données d'enquête et de sondages, mais commençons par construire un système de base avec des utilisateurs, des questions, des réponses et des enquêtes.

Voici les exigences de notre système :
- L'application gère plusieurs `users` (que nous avons déjà).
- Un utilisateur peut créer plusieurs `surveys`, mais une enquête n'est créée que par un seul utilisateur.
- Une enquête comporte plusieurs `questions`.
- Une question a plusieurs `answers` possibles.
- Lorsqu'un utilisateur répond à une question, il ne peut choisir qu'une seule réponse. Celles-ci sont stockées en tant que `user_answers`.

### Design du schéma

Utilisons à nouveau le [SQL Designer] (http://db.lewagon.com) pour concevoir un schéma de base de données pour une application d'enquête qui répond aux exigences ci-dessus. Pour vérifier ta solution, clique sur "Save / Load", puis "Save XML", copie/colle le code XML généré dans `lib/survey.xml`. Tu peux ensuite utiliser `rake` pour vérifier ta solution.

## Points clés de l'apprentissage

- Sais-tu ce qu'est un schéma ?
- Quelle est la relation entre les tables ?
- Peux-tu dessiner le schéma de la base de données derrière Facebook ? Airbnb ? Prends une feuille et essaye de deviner les différentes tables !
