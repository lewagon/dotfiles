## Contexte et objectifs

L’héritage est un concept fondamental de la programmation orientée objet. Il nous permet de « transférer » des méthodes en définissant des sous-classes (enfants) qui héritent de superclasses (parents). Une classe enfant héritera des méthodes de ses parents.

Souviens-toi que la façon dont on dit à une classe enfant d’hériter d’un parent ressemble à ça :

```ruby
class ChildClass < ParentClass
end
```

## Spécifications

### Héritage de la classe `Dog`

- On a créé une classe `Dog` avec une méthode d’instance : `bark`.
- On a également créé une classe `GermanShepherd` qui est vide.
- Modifie la définition de la classe `GermanShepherd`, de façon à ce qu’elle ait les méthodes d’instance et le comportement de la classe `Dog`.
- Le code ci-dessous, par exemple, devrait fonctionner :

```ruby
german_shepherd = GermanShepherd.new
german_shepherd.bark # => "woof woof"
```

REMARQUE : N’ajoute pas de code dans le corps de la classe `GermanShepherd` !

## Enseignements clés

- Quelle syntaxe doit-on utiliser si on veut qu’une classe hérite d’une autre ?
