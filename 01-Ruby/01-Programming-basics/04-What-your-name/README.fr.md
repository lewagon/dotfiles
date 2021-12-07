## Contexte et objectifs

- Vérifier encore une fois ta connaissance des méthodes et des variables.
- Apprendre à utiliser l’interpolation de string.
- Comprendre la différence entre les guillemets simples (**single** quotes `'`) et les guillemets doubles (**double** quotes `"`).

## Spécifications

### Calcul du nom

- Implémente la méthode `compute_name` définie dans le fichier `lib/compute_name.rb`. À partir de `first_name`, `middle_name` et `last_name`, elle doit retourner le nom complet de la personne.
- **contrainte** : Tu dois utiliser l’**interpolation de string** avec `#{}` pour former ce nom complet.

### Programme interactif

Le fichier `lib/interface.rb` contient un programme pour interagir avec un utilisateur. Essaie avec :

```bash
ruby lib/interface.rb
```

En supposant que tu as saisi "Boris", puis "Alexandre" et enfin "Papillard", le programme doit imprimer un message personnalisé ressemblant à `Hello, Boris Alexandre Papillard!`.

- **contrainte** : ton programme `interface.rb` doit bien entendu utiliser la méthode `compute_name` définie dans l’autre fichier.
- **perfectionnement** : tu peux améliorer ton `custom_message` en ajoutant d’autres informations comme le nombre de caractères du nom complet (exemple : `Boris Alexandre Papillard has got 25 characters, including spaces`), ou d’autres détails très importants…

## Enseignements clés

Pose-toi encore une fois ces questions et assure-toi d’être capable de répondre à toutes :

### À propos des variables

- Quelles sont les variables utilisées dans ton code ?
- Où affecte-t-on des valeurs à ces variables et où les utilise-t-on ?
- Quel est la portée (scope) d’une variable ?

### À propos des méthodes

- Quelle est la méthode utilisée dans ton programme ? Où est-elle définie ?
- Où appelles-tu cette méthode et avec quels arguments ?
- Quel est le flux d'éxecution (execution flow) de ton programme lorsque tu essaies de le lire, ligne par ligne ?

### À propos des strings

- Qu’est-ce que l’interpolation de string ? Quelle est la syntaxe à utiliser pour "insérer" une expression Ruby dans une string ?
- Quelle est la différence entre les guillemets simples (single quotes `'`) et les guillemets doubles (double quotes) `""` lorsqu’on utilise l’interpolation de string ?

## Suggestions et ressources complémentaires

- Pour obtenir une réponse ou des données de l’utilisateur depuis le terminal, tu dois utiliser la méthode [gets](http://www.ruby-doc.org/docs/Tutorial/part_02/user_input.html). Tu auras également besoin de [chomp](https://ruby-doc.org/core-2.5.3/String.html#method-i-chomp) la string obtenue
- Pour imprimer une question sur le terminal, tu dois utiliser la méthode [puts](https://ruby-doc.org/core-2.7.5/IO.html#method-i-puts)

