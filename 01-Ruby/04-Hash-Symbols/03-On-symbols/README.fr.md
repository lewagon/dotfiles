## Contexte et objectifs

### À débattre avec le reste de ta classe

- Quelles sont les différences entre une String et un Symbol ?
- Quand dois-tu utiliser l’une plutôt que l’autre ?
- En termes de mémoire, quel est le comportement de chacun ?

### Synthèse technique

La compréhension des symboles peut s’avérer difficile pour les débutants sur Ruby. En règle générale, les symboles et les strings ou chaînes de caractères sont assez similaires, mais :

Si tu utilises une string comme identifiant unique de ton programme, plutôt que pour son contenu, envisage alors d’utiliser un Symbol.

C’est pour cette raison que de nombreuses clés de hachage sont des symboles, car elles servent surtout à identifier des choses et ne sont pas simplement du texte. Voici un exemple :

```ruby
fox = { color: "red", species: "mammal" }
```

`:color` et `:species` sont ici utilisés comme des identifiants ; on utilise donc des symboles. La valeur du texte a été choisie pour qu’une personne puisse rapidement comprendre ce que les clés représentent.

Remarque : de temps en temps, tu pourras aussi tomber sur cette autre (vieille) syntaxe :

```ruby
fox = { :color => "red", :species => "mammal" }
```

Lis [cette réponse de Stack Overflow](http://stackoverflow.com/a/8189435/197944/) si tu veux vraiment connaître les nuances entre les Strings et les Symbols. Le concept de **mutabilité** est important ici.

## Spécifications

Regarde le fichier `lib/symbols.rb`. Il contient un quiz vrai/faux et quelques méthodes pour tester ta capacité à utiliser des symboles plutôt que des strings.

## Enseignements clés

Pour chaque exemple, quel type d’objet dois-tu utiliser ?

```ruby
{ "temperature" => "10 deg", "pressure" => "10 bar" }
# or
{ temperature: "10 deg", pressure: "10 bar" }
```

```ruby
user_name = :bob
# or
user_name = "bob"
# or
"user_name" = "bob"
# or
:user_name = :bob
```
