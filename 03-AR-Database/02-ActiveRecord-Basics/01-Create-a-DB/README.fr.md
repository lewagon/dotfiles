## Contexte et objectifs

- T’entraîner à utiliser ta première tâche `rake` pour créer ta base de données.
- Souviens-toi que tu as désormais des tâches rake à ta disposition pour manipuler ta base de données :

```bash
rake db:create # Crée ta base de données
rake db:drop # Détruit toute ta base de données
rake db:migrate # Exécute toute migration n’ayant pas encore été jouée
rake db:version # Récupère le numéro de version du schéma actuel
rake db:seed # Remplit ta base de données avec un échantillon de données
rake db:timestamp # Te donne un timestamp pour le nom de ton fichier de migration
```

## Spécifications

Avant de commencer à modifier la **structure** du schéma de base de données, entraîne-toi à créer une base de données. Ne t’embête pas à créer des tables et ne t’inquiète pas d’avoir des modèles. Pour le moment, contente-toi de créer la base de données !

## Enseignements clés

Comprendre ce que chacune des tâches `rake` listées ci-dessus permet de faire, et utiliser la bonne tâche pour créer ta base de données.
