## Contexte et objectifs

L'objectif de ce challenge est de créer une application Rails à deux modèles avec un restaurant et des avis anonymes.
Tu peux te référer au [guide Rails](http://guides.rubyonrails.org/getting_started.html#adding-a-second-model) pour voir un exemple similaire avec des articles et des commentaires.

## Générer l'application Rails

Tu vas utiliser les spécifications externes rédigées par le prof pour tester ton application Rails. C'est pour cela qu'on indique `-T`, ce qui signifie : ne génère pas les tests Rails intégrés. Voici la configuration dont tu as besoin :

```bash
cd ~/code/<user.github_nickname>
rails new rails-yelp-mvp --skip-active-storage --skip-action-mailbox -T
cd rails-yelp-mvp
git add .
git commit -m "rails new"
gh repo create
git push origin master
echo "gem 'rspec-rails', group: [ :test ]" >> Gemfile
echo "gem 'rails-controller-testing', group: [ :test ]" >> Gemfile
bundle install
git submodule add git@github.com:lewagon/fullstack-challenges-03-Rails-restaurant-reviews-specs.git spec
git add .
git commit -m "Prepare rails app with external specs"
```

Avant de commencer à coder ton application, suis [notre guide Frontend Rails](https://github.com/lewagon/rails-stylesheets/blob/master/README.md) pour t'assurer de pouvoir utiliser un formulaire simple, Bootstrap, et d'avoir un dossier de feuilles de style sympas (⚠️ Pour le moment, contente-toi de mettre en œuvre la section **configuration**, ne te lance pas dans **Bootstrap JS** ; on verra ça au prochain cours !).

### Tester ton code

Dès lors que tu ajoutes des migrations à ton application (par exemple, après un `rails g model ...`), n'oublie pas de lancer aussi les migrations **sur la base de données de test** utilisée dans les spécifications :

```bash
rails db:migrate RAILS_ENV=test  # If you added a migration
```

Ensuite, tester ton code est aussi simple qu'avec la bonne vieille commande

```bash
rake
```

Si tu as du mal à lancer `rake`, tu auras peut-être besoin d'exécuter `bin/rake`. Cela signifie que ton `$PATH` ne contient pas le dossier `./bin` ; tu peux corriger cela dans le fichier zshrc des répertoires cachés (consulte [notre configuration par défaut](https://github.com/lewagon/dotfiles/blob/master/zshrc#L16-L18))

## Spécifications

### Modèles

#### Schéma

- Un restaurant a un nom (`name`), une adresse (`address`), un numéro de téléphone (`phone_number`) et une catégorie (`category`), et peut avoir de nombreux avis.
- Un avis a une note (`rating`) et un contenu (`content`), et appartient à un restaurant.

Réfléchis bien avant de choisir le type de données, ta première idée ne sera pas forcément la bonne !

**Question** : Peux-tu dessiner ce simple schéma sur [db.lewagon.com](http://db.lewagon.com) ? Parles-en avec ton buddy.

#### Validation

- Un restaurant doit avoir un nom, une adresse et une catégorie.
- La catégorie du restaurant doit appartenir à cette liste fixe : `["chinese", "italian", "japanese", "french", "belgian"]`.
- Quand un restaurant est supprimé, tous ses avis doivent aussi être supprimés.
- Un avis doit appartenir à un restaurant.
- Un avis doit avoir un contenu et une note.
- La note associée à un avis doit être un nombre entre 0 et 5.

Valide tous les tests du modèle avant de passer à la définition des routes. Tu peux utiliser cette commande :

```bash
rspec spec/01_models
```
pour exécuter les tests de façon sélective dans le dossier `spec/01_models`.

Tu peux aussi tester ton code manuellement avec la console `rails console`. N'oublie pas de recharger (`reload!`) entre chaque modification de code !

```bash
rails c
> bristol = Restaurant.new(name: "Epicure", category: "french")
> bristol.valid?              # Should return false
> bristol.address = "75008 Paris"
> bristol.valid?              # Should return true
> bristol.save                # Insert into DB and set id
> yummy = Review.new(content: "yummy yummy", rating: 4)
> yummy.restaurant = bristol  # Set foreign key restaurant_id
> yummy.save
> bristol.reviews             # Should contain the yummy review
> yummy.restaurant            # Should return the bristol restaurant
```

### Seed

- Remplis la base de données de ton restaurant dans `db/seeds.rb` avec au moins 5 enregistrements de restaurant valides.
- Exécute `rails db:seed` pour lancer le script de la seed.

### Routes / Contrôleurs

Réfléchir aux routes dont tu as besoin est une étape très importante dans le processus de création de ton application Web. **Les routes doivent refléter exactement les stories utilisateur de ton produit**. On va définir les caractéristiques minimales de notre produit ici :

- Un visiteur peut voir la liste de tous les restaurants.

```
GET "restaurants"
```
- Un visiteur peut ajouter un nouveau restaurant et être redirigé vers la vue `show` de la page de ce nouveau restaurant.

```
GET "restaurants/new"
POST "restaurants"
```

- Un visiteur peut ajouter les détails d'un restaurant, avec tous les avis associés au restaurant.

```
GET "restaurants/38"
```

- Un visiteur peut ajouter un nouvel avis à un restaurant.

```
GET "restaurants/38/reviews/new"
POST "restaurants/38/reviews"
```

- Et voilà !


Dans notre MVP, un visiteur ne peut pas mettre à jour / supprimer un restaurant ou un avis. C'est le rôle de l'administrateur (**toi**). En tant que développeur, tu as le pouvoir de manipuler la base de données depuis la console `rails console` si tu veux mettre à jour / supprimer un enregistrement.

Il s'agit d'un MVP assez basique, mais tu dois juste comprendre que **chaque route incarne une story utilisateur**. Ne te contente pas de rédiger 7 routes CRUD à l'aveugle pour tous les modèles de ton application. C'est le meilleur moyen de t'embrouiller avec ton propre produit et d'oublier ce que le MVP est vraiment.

Maintenant, il est temps de coder toutes les routes dont tu as besoin pour créer ce produit !

**Astuce :** Pour gérer la route `GET "restaurants/38/reviews/new"`, tu auras besoin d'utiliser des [ressources imbriquées](http://guides.rubyonrails.org/routing.html#nested-resources).

### Vues

On va maintenant s'intéresser au frontend, car c'est ce que nos utilisateurs vont voir ! Suis [ce guide](https://github.com/lewagon/rails-stylesheets/blob/master/README.md) pour configurer ton frontend Rails si tu ne l'as pas fait au début du challenge (⚠️ Pour le moment, contente-toi de mettre en œuvre la section **configuration**, ne te lance pas dans **Bootstrap JS** ; on verra ça demain !).

#### Mises en page / Partials

N'oublie pas de refactoriser tes vues en utilisant des mises en page et des partials (vues partielles). Par exemple :

- La mise en page de l'applicaton peut inclure une barre de navigation Bootstrap avec des liens vers la liste de restaurants et le formulaire de création de restaurant.
- Les formulaires peuvent être placées dans une `partial` pour rendre ton HTML plus lisible.

#### Helpers

Quand tu utilises un helper ou objet d'aide Rails comme `link_to`, tu peux lui passer un hash d'attributs HTML. Cela te permet d'ajouter des classes CSS Bootstrap à tes liens. Exemple ci-dessous :

##### [link_to](http://apidock.com/rails/ActionView/Helpers/UrlHelper/link_to)

```erb
<%= link_to "See details", restaurant_path(restaurant), class: "btn btn-primary"%>
```

Cela génère le HTML suivant :

```html
<a href="/restaurants/3" class="btn btn-primary">See details</a>
```

##### [form_for](http://guides.rubyonrails.org/form_helpers.html)

Mais fais attention : les URL de tes avis sont maintenant imbriquées dans `/restaurants/:restaurant_id`. Cela signifie que tu ne peux pas utiliser `form_for` de la même façon qu'avec des ressources non imbriquées. Si tu écris :

```erb
<%= form_for(@review) do |f| %>
  <!-- [...] -->
<% end %>
```

Cela générera ce HTML :

```html
<form action="/reviews">
  <!-- [...] -->
</form>
```

Ce n'est pas ce qu'on veut, car **on n'a pas de route pour `POST "reviews"`**. À la place, tu devras utiliser la syntaxe des ressources imbriquées pour `form_for` :

```erb
<%= form_for [@restaurant, @review] do |f| %>
  <!-- [...] -->
<% end %>
```

Cela générera le formulaire HTML suivant :

```html
<form action="/restaurants/42/reviews">
  <!-- [...] -->
</form>
```

Cette URL est maintenant cohérente avec la route `POST "restaurants/:restaurant_id/reviews"` que tu as définie dans `routes.rb`. Super ! Si tu veux un peu plus d'infos sur ce sujet, jette un œil à [ce post](http://stackoverflow.com/questions/2034700/form-for-with-nested-resources).

**Astuce :** Installe la gem [simple_form](https://github.com/plataformatec/simple_form) pour obtenir des formulaires compatibles avec Bootstrap à la syntaxe plus légère.

### Améliore ton application

**Une fois que tu as terminé la première version de ton application d'avis de restaurants**, essaie de l'améliorer en intégrant ton formulaire d'avis à la vue de chaque restaurant. Tes nouvelles routes devraient ressembler à ce qui suit :

```
GET "restaurants"
GET "restaurants/new"
GET "restaurants/38"
POST "restaurants"
POST "restaurants/38/reviews"
```

Tu remarqueras qu'on s'est débarrassé de la route `GET "restaurants/38/reviews/new"`, car le formulaire d'avis est **désormais intégré à la vue `restaurants/show.html.erb`**. 🛏

Pour lancer les tests correspondant à cette version, exécute la commande `rspec -t refactoring`.
