## Comment créer des branches

Le workflow que l'on utilise consiste à créer des **branches de fonctionnalités** : chaque branche correspond à une fonctionnalité, ou **une partie d'une fonctionnalité**. Dans l'idéal, tu ne devrais pas travailler plus d'une journée sur la même branche. Si le back-end et le front-end de base sont prêts, pousse-les et crée une nouvelle branche pour embellir la vue. Ta branche doit avoir un nom clair et descriptif, comme `restaurants-show`, `dashboard-page-front-end` ou `animated-menu-items`.

REMARQUE : Cela signifie aussi qu'**on ne doit jamais coder sur master**. Si tu te rends compte que tu as codé par accident sur master, ne t'inquiète pas ! Passe simplement à une branche existante ou crées-en une nouvelle, et les modifications qui n'ont pas encore été enregistrées te suivront. Tu peux revoir le flux git [ici](https://kitt.lewagon.com/knowledge/cheatsheets/git_advanced). Si tu as du mal à passer à une nouvelle branche, ouvre un ticket.

Une fois que tu penses avoir terminé ta fonctionnalité :

1. Pousse ta branche - demande à un membre de ton équipe de vérifier
2. Merge dans master - si ton code est approuvé par l'équipe
3. Informe ton équipe que master a été mis à jour - ils pourront ainsi récupérer la dernière version
4. Déploie sur Heroku - crash test / debug
5. Mets à jour le tableau kanban

Il est normal d'avoir à résoudre des conflits de temps à autre ; réduis les risques en poussant et mergeant régulièrement ton code !

## Déploiement continu

Le flux évoqué plus haut 👆 est appelé déploiement continu. L'idée est d'envoyer le code vers ton environnement de production le plus souvent possible. Dans l'idéal, à chaque fois qu'une PR est mergée dans `master`, la branche `master` doit alors être déployée en production. Cette approche présente les avantages suivants :
- Elle évite l'accumulation des problèmes techniques. En poussant et en testant régulièrement le nouveau code, tu identifieras tout de suite les bugs et tu sauras qu'ils viennent du code le plus récent. De cette façon, il sera beaucoup plus facile de trouver la source et de débuguer. À l'inverse, si tu attends que 5 PR ou plus aient été mergées pour pousser en production, tu auras beaucoup plus de mal à identifier la source des bugs.
- Le code arrive plus rapidement entre les mains de l'utilisateur. Cela signifie que, si le code a été mergé dans master, il est considéré comme « terminé » et doit être donné à l'utilisateur pour qu'il s'en serve. Cela signifie également que tu recevras plus rapidement un retour de l'utilisateur. Tu pourras coder et itérer plus facilement afin de fournir à ton utilisateur le meilleur produit possible. (Dans ton MVP, tu devras agir en tant que développeur et utilisateur 😉)

## Onglets de navigateur

Tu sais désormais que coder, c'est avoir 100 onglets ouverts en même temps dans ton navigateur 😂. Pour améliorer tes chances de réussite, épingle (fais un clic droit sur l'onglet et sélectionne « épingler ») les onglets suivants dans ton navigateur afin de pouvoir y accéder facilement pendant que tu codes :
- [Cours Kitt](https://kitt.lewagon.com/knowledge/lectures)
- [Messages d'erreur fréquents dans Rails](https://github.com/Eschults/useful_stuff#pgerror-fatal-myapp_development-does-not-exist)
- [Tutoriels](https://kitt.lewagon.com/knowledge/tutorials)
- [Fiches d'aide](https://kitt.lewagon.com/knowledge/cheatsheets)

## Seed

Il peut être utile de démarrer avec des données de base sur lesquelles tout le monde peut travailler, tout particulièrement les membres de l'équipe en charge des fonctionnalités READ. Commence par créer une seed basique.

