## Contexte et objectifs

- Comprendre la structure du dossier d’un exercice, et le lien vers ton compte GitHub.
- Apprendre à tester ton code en local avant d’envoyer ta solution.
- Apprendre les commandes git de base pour versionner les modifications de ton code et les pousser sur GitHub.
- Découvrir les caractéristiques de la plateforme Kitt.

Au cours de ces 9 semaines, tu travailleras à deux ou en groupe de 3 ou 4. Un buddy te sera assigné chaque jour selon l’algorithme du [tournoi toutes rondes](https://fr.wikipedia.org/wiki/Tournoi_toutes_rondes) mis en œuvre dans cette [gem](https://github.com/ssaunier/round_robin_tournament).

Avant de démarrer un nouveau challenge, et avant même de rédiger une seule ligne de code, **demandez-vous l’un à l’autre ce que l’exercice vous demande de faire**. Vous pourrez ensuite faire de la programmation en binôme sur un écran, ou travailler côte à côte, en vérifiant toutes les 10 minutes si l’autre a besoin d’aide.

Travailler à deux est une pratique courante en génie logiciel. Si tu travailles seul et te retrouves coincé, tu risques de perdre plusieurs heures à chercher le problème. Alors qu’avec un regard neuf, le problème sera identifié en quelques secondes. Ne sous-estime jamais cela !

## Exercice 1 : Le `rake`.

Accède au dossier des exercices à l’aide de la commande en haut de cette page.

- Exécute `rake`. Tout doit être en rouge (car tu n’as pas commencé à coder).

Ouvre le fichier `lib/wagon_start.rb` dans ton éditeur de texte. C’est là que tu devras éditer le code.

- Fais en sorte que la méthode `wagon_start` renvoie `"That's how it starts"`
- Dans le terminal, exécute `rake` et assure-toi que le résultat pour `#wagon_start` soit en vert et avec un bon style (**sans** offenses). Si ton style est mauvais, tu pourras quand même passer à l’exercice suivant. Mais si tu veux prendre de bonnes habitudes pour structurer ton code, veille à ce que tout soit en vert avant de continuer !
- Versionne (commit) tes modifications et fais pousse-les (push).
- Retourne sur Kitt et actualise la page. Ta solution devrait s’afficher à droite.

## Exercice 2 : Pratiquer les lignes de commande (Terminal)

Avant d’aller plus loin dans le dossier fullstack-challenges, on va commencer par travailler sur les lignes de commande que tu viens d’apprendre.

NB : **Tu n’as pas le droit d’utiliser le Finder (ou ton explorateur de fichiers) !**

### Dossier tmp

Pour commencer, on va créer tous nos fichiers dans un dossier nommé `tmp`.

- Va dans ton dossier personnel (`~`)
- Crée un dossier `tmp` dans ce dossier personnel
- Va dans le dossier `tmp`.

### Fichier README

- Dans le dossier `tmp`, crée un fichier nommé `README`
- Ouvre ce dossier `tmp` dans ton éditeur de texte. Écris du texte dans le fichier `README`.

### Dossier de niveau 1

- Crée un dossier `level-1` dans le dossier `tmp`.
- Va dans ce dossier et crée un fichier nommé `README-level1`
- Affiche le chemin où tu trouves

### Dossier de niveau 2

- Retourne au dossier parent
- À partir du dossier `tmp`, crée un dossier nommé `level-2` à l’intérieur du dossier `level-1`
- Toujours à partir du dossier `tmp`, crée un fichier nommé `configuration` à l’intérieur du dossier `level-2` (qui se trouve à l’intérieur de `level-1`)

### Jouer avec les fichiers

On va utiliser la commande `mv` pour déplacer ou renommer des dossiers et des fichiers.
Le moment est venu de te comporter comme un vrai développeur ou une vraie développeuse ! Utilise Google pour apprendre à effectuer les actions suivantes :
- Déplace ce fichier de configuration du dossier `level-2` au dossier `level-1`
- Va dans le dossier `level-1`
- Renomme le fichier `configuration` en `config`
- Affiche la liste de tous les fichiers
- Supprime le dossier `level-2`
- Supprime le fichier `config`

### Derniers mots

- Retourne dans ton dossier personnel (`~`)
- Détruis le dossier tmp
- Vide la fenêtre du terminal

Une fois que tu as terminé, tu peux jeter un œil aux liens ci-dessous.

## Aller plus loin

Si tu as terminé la configuration de ton ordinateur et les exercices, jette un œil à ces ressources :
- [fiche de rappel git](http://rogerdudler.github.io/git-guide/files/git_cheat_sheet.pdf)
- [fiche de rappel interactive](http://www.ndpsoftware.com/git-cheatsheet.html)
- Regarde [cette conférence TED](http://www.ted.com/talks/clay_shirky_how_the_internet_will_one_day_transform_government) sur l’utilisation de git/GitHub pour des projets courants (autres que de développement)
- Lis ce tutoriel et entraîne-toi : [En savoir suffisamment sur les lignes de commande pour être une menace](http://www.learnenough.com/command-line/)

