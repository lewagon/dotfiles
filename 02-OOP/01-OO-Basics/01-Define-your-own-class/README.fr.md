## Contexte et objectifs

Appréhender les concepts de la programmation orientée objet en écrivant ta première classe.

## Spécifications

Avant de créer ta classe, crée un fichier dans le répertoire `lib` pour tester ta classe à mesure que tu avances (créer de nouvelles instances, appeler des méthodes d’instance et afficher les résultats sur le terminal). Appelle ce fichier `interface.rb`.

Choisis ensuite un objet du monde réel que tu aimerais modéliser. Des restaurants, des véhicules, des utilisateurs, des jeux, des recettes… *À toi de choisir !*

Une fois que tu as fait ton choix, crée un fichier dans le répertoire `lib` portant le nom de ton objet. Par exemple, si tu as choisi de modéliser des restaurants, crée le fichier `restaurant.rb` :

```bash
touch lib/restaurant.rb
```

Tu peux maintenant supprimer sans crainte le fichier `.gitkeep`. Ce fichier est uniquement là pour que git puisse voir le dossier qui sinon serait vide.

## Convention

**Fais attention** à ton fichier de classe et au nom de ta classe. Pense à utiliser `lower_snake_case(.rb)` pour le nom de fichier et `UpperCamelCase` pour le nom de la classe dans la définition de la classe. **Les deux noms doivent être au singulier !** Souviens-toi que la classe est la structure qui te permet de créer plein de restaurants différents (avec `.new`).

### Quelles sont les propriétés internes de tes objets ?

Quelles sont les caractéristiques d’un restaurant ? D’un utilisateur ? D’un jeu ? Sélectionne quelques caractéristiques de ta classe que tu souhaites modéliser. Elles seront tes **variables d’instance**, parfois appelées **propriétés**.

### Définis le constructeur

`initialize` est la méthode d’instance utilisée quand tu appelles `new` sur ta classe. Exemple :

```ruby
# lib/car.rb
class Car
  def initialize(model, brand, kilometers)
    @model = model
    @brand = brand
    @kilometers = kilometers
  end
end
```

Définis la méthode `initialize` sur la classe que tu as choisie !

Pour la tester, tu peux créer un fichier `lib/interface.rb` et appeler le constructeur `.new` sur ta classe avec les bons arguments, par ex. :

```ruby
# lib/interface.rb
require_relative "car"

second_hand_panda = Car.new("Panda 4x4", "Renault", 30_000)
new_testarossa    = Car.new("Testarossa", "Ferrari", 0)
```

### Définis une méthode d’instance

Le moment est venu d’ajouter un **comportement** à ta classe avec une **méthode d’instance**.

Voici un exemple de comment utiliser la méthode d’instance `starts` sur la classe `Car` :

```ruby
# lib/interface.rb
require_relative "car"

car = Car.new("T", "Ford", 0)
car.start
```
