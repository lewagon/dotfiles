## Contexte et objectifs

Tu bois un verre avec un entrepreneur français et il te dit : "J’ai une super idée : j’aimerais que les gens recommencent à parler le louchébem !" Et il a besoin de ton aide 😊

### Un peu d’histoire

- À l’origine, le louchébem était l’argot des bouchers parisiens. Lis [cet article](https://fr.wikipedia.org/wiki/Largonji_et_loucherbem) pour en savoir un peu plus.
- C’est très simple : tu prends un mot de français normal comme **"PATRON"**. Tu prends le premier groupe de consonnes (toutes les lettres avant la première voyelle) et tu le remplaces par un "L". Puis, tu places ce premier groupe de consonnes à la fin du mot, suivi d’un des suffixes du louchébem, par ex. -EM. **"PATRON" devient ainsi "LATRONPEM".** Facile, non ? 😉
- Interroge-toi sur les grands problèmes qui se poseront lors de la création de ton traducteur (choix du suffixe final, comment traiter le début des mots, différents scénarios pour une entrée de données…)

### Rédige le pseudocode

Le pseudocode est surtout utilisé pour communiquer l’essence d’un algorithme sans entrer dans les détails d’une syntaxe propre à un langage. Un bon développeur est capable de prendre du pseudocode bien écrit et de le traduire en code fonctionnel dans le langage de son choix.

- Rédige le pseudocode de ton traducteur de louchébem.
- Commence petit avec un programme ne pouvant traduire qu’un seul mot de français en louchébem
- Puis essaie d’inclure des phrases.

Savais-tu que les expressions populaires françaises comme "larfeuille", "loufiah", "loucedé" ou "loufoque" sont en fait des expressions de louchébem ?

## Spécifications

- **contrainte** : les mots composés d’une seule lettre comme "a" ne doivent pas être traduits
- **contrainte** : pour les mots qui commencent par une consonne ("chat", "trou"), tu devras prendre le premier *groupe de consonnes* (toutes les lettres avant la première voyelle) et le placer à la fin, ajouter un `l` au début du mot et ajouter un suffixe à la fin ("chat" doit donner "latchem" ou "latchoc")
- **contrainte**: les mots qui commencent par une voyelle ne changent pas, mais tu dois quand même ajouter un `l` au début du mot et un suffixe à la fin ("atout" doit donner "latoutoc" ou "latoutic")
- **contrainte** : le suffixe aléatoire doit être l’un des suivants : `["em", "é", "ji", "oc", "ic", "uche", "ès"]`
- **perfectionnement** : dans l’idéal, ton programme doit être en mesure de traduire n’importe quelle phrase complexe, indépendamment de la ponctuation

## Suggestions et ressources complémentaires

- À ce stade, on connaît tous la méthode `#split`, mais savais-tu qu’il est également possible de passer un motif de string en argument de la méthode `split` ? Ne t’inquiète pas, on abordera bientôt les Expressions régulières, mais pour le moment, essayons avec `"hello, friend!!".split(/\b/)` dans IRB. Tu comprends pourquoi elle sera utile au perfectionnement de l’exercice ? 😉
- Ton pseudocode doit suivre [ces principes](http://www.cs.cornell.edu/courses/cs211/2000fa/materials/using_pseudo_code.htm)

