## Contexte et objectifs

Avant de commencer à travailler sur l'application de recettes, on va définir la classe `Recipe` (le **Modèle** dans le pattern **MVC**).

## Spécifications

### Modèle

Tu dois toujours commencer par ton modèle. Le plus important dans ton application, ce sont les données. Et les modèles te permettent de manipuler toutes sortes de données.

Commence par créer un nouveau fichier `recipe.rb` (dans le dossier `lib`) pour définir une classe `Recipe`. Elle doit avoir deux variables d’instance : `@name` et `@description`. On doit pouvoir lire la valeur des variables d'instance `@name` et `@description` en appelant les méthodes `name` and `description`.

Une fois définie, teste manuellement ton modèle avant de lancer `rake`. Charge ton modèle dans la console `irb` en tapant `require_relative 'lib/recipe'` puis crée une nouvelle instance de `Recipe` en tapant `recipe = Recipe.new("chocolate cake", "a delicious chocolate cake")`. Cela devrait retourner une instance de `Recipe` avec les bonnes valeurs pour `@name` et `@description` quand on appelle `recipe` et afficher les bonnes valeurs pour `name` et `description` quand on appelle `recipe.name` et `recipe.description`.
