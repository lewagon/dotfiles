## Contexte et objectifs

Les [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) sont de retour ! Bonne nouvelle, ce sont exactement les mêmes expressions que celles que tu as découvertes pendant la semaine 2 🙌

La seule différence est le mode de test intégré en JavaScript (par rapport à Ruby).

## Spécifications

Ouvre le fichier `lib/valid_email.js`. Code la fonction `valid`, qui prend un paramètre `email` (de type `string`) et retourne un `boolean`: `true` si l'adresse e-mail fournie est valide, `false` si elle n'est pas valide. Par exemple :

- `valid('boris.lewagon.org')` doit retourner `false`
- `valid('boris@lewagon.org')` doit retourner `true`

**Commence** par trouver une `RegExp` qui passe tous les tests !

Pour cela, tu peux ouvrir le fichier `spec/valid_email_spec.js` et copier-coller les adresses e-mail testées dans la zone de texte `Your test string` sur [rubular](http://rubular.com/).

**Ensuite**, trouve un moyen de tester cette `RegExp` en utilisant JavaScript dans la fonction `valid` et retourne le bon booléen !

Teste ton code en lançant régulièrement `rake`.
