## Contexte et objectifs

- Apprendre à chercher la bonne méthode dans la documentation Ruby.
- Te familiariser avec IRB pour tester de nouvelles méthodes et te les approprier.

IRB est une boucle de lecture-évaluation-impression [REPL](http://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) pour Ruby. Elle fonctionne comme ceci :

1.  Le **R** (première lettre de l’acronyme anglais REPL - Read) lit l’expression écrite par l’utilisateur ; il peut s’agir de n’importe quelle expression Ruby valide comme `"Hello"`, `2+2`, `"hello".upcase`…
2.  Le **E** (deuxième lettre de l’acronyme anglais REPL - Evaluate) évalue le résultat de l’expression.
3.  Le **P** (troisième lettre de l’acronyme anglais REPL - Print) imprime ce résultat.
4.  Le **L** (dernière lettre de l’acronyme anglais REPL - Loop) revient en boucle au point 1 et attend une nouvelle saisie de la part de l’utilisateur.

- **Teste les lignes suivantes** dans IRB :

```ruby
"A string object".class
19.class
[1, 2, 3].class
"A string object".upcase
"A string object".downcase
[1, 2, 3].shuffle
```

Dans Ruby, tout (une chaîne de caractères, un nombre entier ou décimal, un tableau…) est un objet. On peut appeler des méthodes sur ces objets. Ces méthodes sont appelées des **méthodes d’instance**, car elles peuvent uniquement être appelées sur les instances d’une classe. L’objet sur lequel on appelle la méthode est le **récepteur**.

## Spécifications

Trouve les bonnes méthodes Ruby dan [la classe String](http://ruby-doc.org/core-2.5.3/String.html), [la classe Integer](http://ruby-doc.org/core-2.5.3/Integer.html) et [la classe Array](http://ruby-doc.org/core-2.5.3/Array.html) à utiliser pour faire passer les tests en vert.

Coder implique d’être malin et de savoir où et comment chercher l’info dont tu as besoin ! Souvent, le plus difficile est de bien formuler la question que tu poses à Google. Pour trouver les méthodes utiles à ce challenge, utilise :

- Google et [Stack Overflow](http://stackoverflow.com/)
- [La documentation Ruby](http://ruby-doc.org) si tu as déjà une petite idée de la méthode que tu cherches.

Une fois que tu penses avoir trouvé la méthode dont tu as besoin, et que tu penses savoir comment t’en servir, utilise IRB pour tester cette méthode sur quelque chose ! Les tests sur IRB représentent une étape clé pour les débutants.

## Enseignements clés

Es-tu capable de répondre aux questions suivantes ? Si ce n’est pas le cas, alors tu n’es pas prêt à passer à la suite !

- Combien de classes intégrées à Ruby connais-tu ? Lesquelles ?
- Quelle est la syntaxe pour appeler une méthode sur un objet de ces classes ?
- Quelle doit être la toute première étape lorsque tu cherches à effectuer une opération standard (trier un array, mettre un mot en majuscules, etc.) ?
- Quelle est la deuxième étape à effectuer pour vérifier que tu as bien compris la méthode que tu as trouvée ?
