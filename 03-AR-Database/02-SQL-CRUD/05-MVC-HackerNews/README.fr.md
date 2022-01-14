## Contexte et objectifs

Dans les exercices précédents, on a créé des méthodes directement dans la classe de modèle, `Post`. Pour cela, on n'avait pas besoin de classe `Repository` comme quand on stocke des données dans un CSV, car la classe du modèle gère directement la relation avec la base de données. Génial, non ?

L'étape suivante consiste à insérer le nouveau code dans l'architecture MVC adéquate.

## Spécifications

Lance l’application Ruby avec :

```bash
ruby app.rb
```

Le routeur est déjà fourni. Tu as juste à :
- Mettre tout le code que tu as écrit dans les exercices précédents dans la classe `Post`
- Coder le contrôleur dans la classe `PostsController`
- Coder la vue dans la classe `PostsView`

Il n’y a pas de specs pour cet exercice (mais tu peux quand même utiliser rake pour `rubocop`) ; tu devras donc lancer l’application dans ton terminal pour tester tes méthodes de contrôleur. Pour t’assurer que la sauvegarde s’effectue, redémarre ton application et vérifie que tout est bien là. Tu peux aussi regarder directement dans le fichier de la base de données `db/posts.db` avec l’utilitaire de terminal `sqlite3` ou un outil comme SQLite Browser.

On te fournit le script `reset_db.rb` que tu peux exécuter avec :

```bash
ruby reset_db.rb
```

Cela supprimera toutes les données de la base de données et re-créera le schéma. Exécute-le une fois avant de lancer `ruby app.rb` pour que la base de données soit créée.
