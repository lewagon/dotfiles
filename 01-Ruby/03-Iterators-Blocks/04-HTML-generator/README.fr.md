## Contexte et objectifs

Dans cet exercice, on va continuer à s’entraîner avec les blocs. On va coder une autre méthode à appeler avec un bloc, mais cette fois-ci on verra comment les blocs permettent d'imbriquer des appels de méthodes, et en quoi cela peut être utile avec un exemple de la vie réelle. On apprendra également à définir des méthodes avec un deuxième paramètre facultatif, ce qui arrive souvent !

## Spécifications

Implémente la méthode `#tag` qui crée des balises HTML autour du contenu qu’on lui passe dans le bloc. Exemple :

```ruby
tag("h1") do
 "Some Title"
end
#=> "<h1>Some Title</h1>"
```

Cette méthode accepte un deuxième paramètre facultatif (regarde la section ci-dessous sur les arguments avec une valeur par défaut), ce qui permet de passer un array avec un attribut HTML et sa valeur, comme `["href", "www.google.com"]`.

```ruby
tag("a", ["href", "www.google.com"]) do
 "Google it"
end
#=> '<a href="www.google.com">Google it</a>'
```

Tu auras peut-être besoin de savoir que pour inclure un symbole `"` à l’intérieur d’une string délimitée par des guillemets doubles,
tu dois **échapper** ce caractère avec une barre oblique inversée (backslash) `\"`.

Ce qu’il y a de bien avec cette méthode, c’est que tu peux imbriquer des appels de méthodes :

```ruby
tag("a", ["href", "www.google.com"]) do
 tag("h1") do
 "Google it"
 end
end
# => '<a href="www.google.com"><h1>Google it</h1></a>'
```

Pratique, non ?

### Arguments avec une valeur par défaut

Dans Ruby, tu peux attribuer une valeur par défaut à un argument. Ainsi, si aucune valeur n’est fournie pour l’argument, la valeur par défaut sera utilisée. Exemple :

```ruby
def sum(a, b, c = 0)
 return a + b + c
end

sum(3, 6, 1) # => 10
sum(4, 2) # => 6
```

Dans cet exemple, la valeur du troisième argument sera `0` si on appelle une `sum` avec deux arguments seulement.
