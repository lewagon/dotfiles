## Contexte et objectifs

Félicitations pour avoir atteint le dernier exercice optionnel ! Tu as sûrement remarqué durant la session que les parenthèses `()`, les crochets `[]` et les accolades `{}` peuvent casser ton code si elles ne sont pas appariées correctement. Imagine si nous avions un moyen de relire le code et de vérifier s'il ne manque pas une parenthèse fermante par exemple. En fait, faisons-le maintenant !

## Spécifications

Le but de cet exercice est de coder une méthode qui prends une string de parenthèses et détermine si leur ordre est valide. La méthode doit retourner `true` si la string est valide est `false` sinon.

En plus de parenthèses ouvrantes `(` et fermantes `)`, la string en entrée peut contenir n'importe quels caractères ASCII. De plus, la string en entrée peut être vide ou ne pas contenir de parenthèse du tout.

Ne traite pas les crochets `[]` et les accolades `{}` pour le moment. Nous nous en occuperons dans la seconde partie de l'exercice !

Après avoir fini cette partie de l'exercice, tu dois faire passer la première partie du `rake`.

## Exemples

```ruby
"()"              =>  true
")(()))"          =>  false
"("               =>  false
"(())((()())())"  =>  true
```

## Différents types de parenthèses

Allons un peu plus loin et introduisons plus de complexité.

La string d'entrée sera composée de parenthèses `()`, de crochets `[]` ou d'accolades `{}`.

Mets à jour la méthode `valid_brackets?` pour faire passer tous les tests.

## Exemples

```ruby
"(){}[]"   =>  true
"([{}])"   =>  true
"(}"       =>  false
"[(])"     =>  false
"[({})](]" =>  false
```
