## Contexte et objectifs

SQLite est une base de données simple qui dépend d’un seul fichier autonome. Pour en savoir plus, consulte la page [fr.wikipedia.org/wiki/SQLite](https://fr.wikipedia.org/wiki/SQLite).

L’objectif de ce premier exercice est d’utiliser la ligne de commande pour lire et interroger une base de données fournie, appelée `jukebox.sqlite`.

Le challenge consiste à dessiner le schéma de la base de données sur [db.lewagon.com](http://db.lewagon.com/), à l’enregistrer comme un fichier XML et à exécuter `rake` !

### Configuration

Commence par vérifier que `sqlite3` est bien installé sur ton ordinateur :

```bash
sqlite3 --version
```

Si ce n’est pas le cas, tu peux l’installer en exécutant :
- macOS : `brew install sqlite`
- Ubuntu : `sudo apt-get install sqlite3 libsqlite3-dev`

Tu peux ouvrir la base de données fournie en exécutant :  pour lui adresser des requêtes :

```bash
sqlite3 lib/db/jukebox.sqlite
```

Tu es maintenant dans la console interactive `sqlite3` et tu peux écrire tes requêtes SQL. Pour sortir de la console `sqlite3`, utilise `.quit` ou `Ctrl + D`.

## Outils

Tu peux aussi utiliser une application **SQLite viewer** pour lire la base de données SQLite, explorer le schéma et même **exécuter des requêtes SQL**.

- [SQLite Pro (macOS uniquement, logiciel payant mais la version d’essai semble illimitée)](https://www.sqlitepro.com/)
- [SQLite Browser (gratuit, macOS uniquement)](http://sqlitebrowser.org/)
- [SQLite Online (gratuit)](https://sqliteonline.com/)
- [SQLStudio (gratuit)](http://sqlitestudio.pl/)

### Windows

Si tu ne souhaites pas utiliser la ligne commande `sqlite3`, tu peux télécharger la version Windows de [SQLStudio](http://sqlitestudio.pl/).
Ouvre et décompresse le dossier téléchargé et double-clique sur SQLiteStudio pour ouvrir l'application.

Celle-ci ne peut pas accéder aux fichiers contenu dans le système WSL donc il nous faut d'abord copier le fichier de database que tu souhaites ouvrir dans un de tes dossiers Windows.

Pour cela, deux options :

Depuis la ligne de commande, exécute `cp lib/db/jukebox.sqlite /mnt/c/Users/<ton nom Windows>/Downloads/`.

Ou manuellement : exécute `explorer.exe .` dans ta ligne de commande afin d'ouvrir l'explorateur de fichier. Localise la database (dans `lib/db`) et copie le fichier `jukebox.sqlite`. Dans le même explorateur de fichier, rends-toi dans un dossier Windows et copie le fichier de database. Nous te conseillons d'aller dans `Documents` et d'y créer un dossier `databases` dans lequel tu peux copier `jukebox.sqlite` et les futures databases que tu souhaiteras ouvrir.

Ouvre SQLStudio et sélectionne ce fichier (dans notre exemple, dans Documents/databases), et appuye sur Ouvrir.

Dernière étape, clique sur `Database` dans la barre d'outils et `Connect to the database` pour ouvrir la connection à la base de données `jukebox`. Tu peux désormais visualiser toutes les tables de la base ou exécuter des requêtes SQL depuis `Tools` et `Open SQL Editor`!

❓Dois-je utiliser la ligne de commande `sqlite3` ou l’un des outils visuels ci-dessus ? Les deux sont utiles ! Il est intéressant d’apprendre à manipuler la ligne de commande pour deux raisons. D’une part, une [interface en ligne de commande](https://fr.wikipedia.org/wiki/Interface_en_ligne_de_commande) te permet de te concentrer sur les requêtes SQL. D’autre part, une [interface graphique](https://fr.wikipedia.org/wiki/Interface_graphique) sera utile pour explorer le schéma d’une base de données (tables, colonnes, etc.). Essaie les deux !

## Spécifications

L’objectif de cet exercice est d’explorer la base de données Jukebox et de comprendre son schéma. Réponds aux questions suivantes :
- Quel est le schéma de la base de données ? (quelles sont les tables et les relations entre les tables)
- Utilise l’outil SQL Design pour dessiner le schéma de cette base de données.
- Combien de lignes chaque table contient-elle ? Quels sont les noms des colonnes pour chaque table ?

Utilise [db.lewagon.com](http://db.lewagon.com/) pour dessiner le schéma de Jukebox. Enregistre-le au format XML dans `jukebox.xml` et vérifie-le avec `rake`.
