## Contexte et objectifs

Supposons que tu aies envie de garder la ligne tout en apprenant à coder :) Tu as une super idée : rédiger une méthode rapide pour calculer le nombre de calories d’une commande d'un restaurant. On va se servir du tableau ci-dessous comme d’un résumé de la carte du restaurant en question:

<table class="table">
  <thead>
    <tr>
      <th>Item</th>
      <th>Calories</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Hamburger</td>
      <td>250</td>
    </tr>
    <tr>
      <td>Cheese Burger</td>
      <td>300</td>
    </tr>
    <tr>
      <td>Veggie Burger</td>
      <td>540</td>
    </tr>
    <tr>
      <td>Vegan Burger</td>
      <td>350</td>
    </tr>
    <tr>
      <td>Sweet Potatoes</td>
      <td>230</td>
    </tr>
    <tr>
      <td>Salad</td>
      <td>15</td>
    </tr>
    <tr>
      <td>Iced Tea</td>
      <td>70</td>
    </tr>
    <tr>
      <td>Lemonade</td>
      <td>90</td>
    </tr>
  </tbody>
</table>

Tu as besoin de stocker ces informations dans une [constante](https://www.rubyguides.com/2017/07/ruby-constants/) Ruby pour créer une sorte de base de données.
Voici un exemple de `Hash` - `AGE_OF_STUDENTS` qui contient des étudiants et leur âge :

```ruby
AGE_OF_STUDENTS = {
  "Laura" => 23,
  "Peter" => 20,
  "Mary" => 27
}
```

Lis la documentation sur les [Hashes](https://ruby-doc.org/core-2.7.5/Hash.html).
Tu vas t’en servir tout le temps, alors apprends à les aimer 😊

**Pour cet exercice, utilise des `Strings` pour tes clés, plutôt que des `Symbols`. C’est plus simple**

## Spécifications

- Crée une méthode `poor_calories_counter` qui retourne le nombre total de calories pour les trois éléments de ta commande.
- **contrainte** : ta méthode doit utiliser un hash (ça va de soi !)
- **contrainte** : ta méthode doit utiliser **nos valeurs caloriques données** !

Exemple : `poor_calories_counter("Cheese Burger", "Sweet Potatoes", "Iced Tea")` doit retourner `600`.

## Enseignements clés

- Qu’est-ce qu’un hash ? - Comment l’utilise-t-on ?
- Comment récupérer une valeur stockée dans un `Hash` ?
