## Tâches = Fonctionnalités

Les projets ont pour objectif d'**apprendre quelque chose à tout le monde**. Le but n'est pas de rester coincé dans une case front-end ou back-end, mais de veiller à ce que chacun ait une vision d'ensemble. C'est pourquoi, au moment de répartir les tâches au sein de ton équipe, il est préférable de les diviser en **fonctionnalités**, dont les membres de l'équipe se chargeront du back-end au front-end.

Le flux des fonctionnalités est donc le suivant :
`route > action du contrôleur > vue AVEC CSS initial (ou complet)`

## Dépendances

Pour décider de la répartition des tâches, tu dois d'abord déterminer quelles fonctionnalités (le cas échéant) dépendent d'autres fonctionnalités.
Au moment du remplissage de ton tableau kanban, essaie de déterminer ces dépendances afin que tous les membres de ton équipe en aient une idée claire (la présence d'une route imbriquée ou _nested route_ est une bonne indication d'une dépendance). Envisage également d'ajouter une étiquette à la card de cette fonctionnalité dans le tableau kanban.

Comment gérer les dépendances des fonctionnalités :
- Si tu as suffisamment de stories utilisateur, attribue à chacun une fonctionnalité sans dépendance.
- Tu peux aussi commencer par une fonctionnalité clé dont d'autres fonctionnalités dépendent, et faire du pair programming dessus jusqu'à ce que tu sois en mesure de la diviser en plusieurs tâches.
- Divise les tâches entre front-end et back-end pendant le développement des fonctionnalités dépendantes, puis reprends la création des fonctionnalités.
