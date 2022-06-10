## Contexte et objectifs

Avant de voir à quoi ressemble une application Rails avec les fonctionnalités CRUD de base, on va revenir sur quelques-uns des principes abordés hier avec les routes, les contrôleurs et les vues.

## Spécifications

Prends le fichier `lib/quiz.rb`. Il contient un quiz avec quelques méthodes pour tester tes connaissances Rails. Assure-toi que chacune des méthodes retourne les bonnes informations pour passer le quiz !
⚠️ Essaie d'y répondre avant de lancer `rake`.

### Question 1

Retourne une `String` avec la commande que tu exécuterais dans ton terminal pour lancer un serveur Rails et consulter ton application en développement sur `http://localhost:3000`.

### Question 2

Tu vas voir trois variables définies avec les trois étapes à suivre pour ajouter une nouvelle page à ton application Rails. Ajoute ces variables à l'`Array` retourné pour que ces étapes apparaissent dans le bon ordre.

### Question 3

Si tu veux ajouter une page "À propos" à ton application Rails, tu vas devoir ajouter une nouvelle route. Retourne une `String` avec la ligne que tu ajouterais à ton fichier `config/routes.rb` pour consulter ta page sur `localhost:3000/about` (tu devras spécifier le contrôleur et l'action d'une façon ou d'une autre).

### Question 4

Retourne une `String` avec la commande que tu exécuterais dans le terminal pour générer un contrôleur `pages` avec une action `about`.

### Question 5

Retourne une `String` avec le chemin de fichier (depuis la racine de ton application Rails) vers la vue correspondant à l'action du contrôleur générée à la question ci-dessus (l'action `about`, dans le contrôleur `pages`).


## Apprentissages clés

- Étapes pour ajouter une nouvelle page à ton application Rails
- Comment génère-t-on de nouveaux contrôleurs dans notre application ?
- Quelles sont les conventions à respecter quand on travaille avec Rails ?
