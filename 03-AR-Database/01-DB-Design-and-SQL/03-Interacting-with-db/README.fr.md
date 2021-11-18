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
- [SQLStudio (gratuit)](http://sqlitestudio.pl/)
- [SQLite Browser (gratuit)](http://sqlitebrowser.org/)

### Windows

Copie les commandes suivantes dans ton terminal Ubuntu, ligne par ligne :

```bash
sudo apt update
sudo apt install -y sqlitebrowser
echo "export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):0" >> ~/.zshrc
source ~/.zshrc
```

Installe [Xming](https://sourceforge.net/projects/xming/) (décoche `Start Xming` à la fin du programme d’installation).

Lance XLaunch, en laissant les paramètres par défaut, mais **ajoute le paramètre optionnel suivant** `-ac`.

![xlaunch](https://raw.githubusercontent.com/lewagon/fullstack-images/master/oop/xlaunch.jpg)

Tu peux ouvrir ta base de données avec :

```bash
cd ~/code/your-github-username/fullstack-challenges/03-AR-Database/01-DB-Design-and-SQL/03-Interacting-with-db
sqlitebrowser lib/db/jukebox.sqlite
```

Si l’erreur `could not initialize SDL` s'affiche quand tu ouvres ta base de données, tu dois ajouter une exception à Windows Defender pour autoriser le trafic public entrant de Xming sur les protocoles UDP et TCP. Utilise cette [documentation](https://docs.microsoft.com/fr-fr/windows/security/threat-protection/windows-firewall/create-an-inbound-port-rule).

❓Dois-je utiliser la ligne de commande `sqlite3` ou l’un des outils visuels ci-dessus ? Les deux sont utiles ! Il est intéressant d’apprendre à manipuler la ligne de commande pour deux raisons. D’une part, une [interface en ligne de commande](https://fr.wikipedia.org/wiki/Interface_en_ligne_de_commande) te permet de te concentrer sur les requêtes SQL. D’autre part, une [interface graphique](https://fr.wikipedia.org/wiki/Interface_graphique) sera utile pour explorer le schéma d’une base de données (tables, colonnes, etc.). Essaie les deux !

## Spécifications

L’objectif de cet exercice est d’explorer la base de données Jukebox et de comprendre son schéma. Réponds aux questions suivantes :
- Quel est le schéma de la base de données ? (quelles sont les tables et les relations entre les tables)
- Utilise l’outil SQL Design pour dessiner le schéma de cette base de données.
- Combien de lignes chaque table contient-elle ? Quels sont les noms des colonnes pour chaque table ?

Utilise [db.lewagon.com](http://db.lewagon.com/) pour dessiner le schéma de Jukebox. Enregistre-le au format XML dans `jukebox.xml` et vérifie-le avec `rake`.
