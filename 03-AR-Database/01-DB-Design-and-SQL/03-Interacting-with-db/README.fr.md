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

Tu peux aussi utiliser l'[extension VS Code SQLite](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite) pour lire la base de données SQLite, explorer son schema and même **exécuter des requêtes SQL**. Cette extension a dû être installée le jour du setup. Si ce n'est pas le cas, tu peux retrouver les instructions aux pages [macOS](https://github.com/lewagon/setup/blob/master/macos.md#vscode_extensions), [Windows](https://github.com/lewagon/setup/blob/master/windows.md#vscode_extensions) ou [Ubuntu](https://github.com/lewagon/setup/blob/master/ubuntu.md#vscode_extensions).

### L'extension VS Code SQLite - Parcourir la base de données

Il y a différentes commandes que vous pouvez utiliser avec cette extension afin de parcourir et interroger votre base de données sqlite. Pour commencer à taper des commandes, souvenez-vous d’ouvrir votre palette de commande en tapant Cmd / Ctrl + Shift + p. Vous devriez voir une petite fenêtre de texte s'ouvrir sur votre éditeur où vous pouvez taper n’importe quelle commande.
Afin de parcourir la base de données, nous allons lancer la commande Open Database en suivant les différente étapes :

Ouvrez votre palette de commande avec Cmd / Ctrl + Shift + p.
Tapez SQLite: Open Database
Cliquez sur le chemin d’accès à la base de données qui pointe vers votre base de données.
Vous devriez voir un onglet SQL EXPLORER  avec votre base de données chargée ! Maintenant vous pouvez ouvrir votre base de données et la parcourir avec toutes les tables existantes ! Vous pouvez également cliquer sur l’icône triangle pour avoir une représentation plus visuelle de vos tables. 🙌
Essayez-le avec la table tracks.

<iframe src="https://player.vimeo.com/video/690525143?h=75949ff5a2" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Spécifications

L’objectif de cet exercice est d’explorer la base de données Jukebox et de comprendre son schéma. Réponds aux questions suivantes :
- Quel est le schéma de la base de données ? (quelles sont les tables et les relations entre les tables)
- Utilise l’outil SQL Design pour dessiner le schéma de cette base de données.
- Combien de lignes chaque table contient-elle ? Quels sont les noms des colonnes pour chaque table ?

Utilise [db.lewagon.com](http://db.lewagon.com/) pour dessiner le schéma de Jukebox. Enregistre-le au format XML dans `jukebox.xml` et vérifie-le avec `rake`.
