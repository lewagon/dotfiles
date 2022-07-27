## Contexte et objectifs

On va maintenant créer une application à 3 modèles ! Et tu l'auras deviné, on va introduire une relation `n:n`. Qu'est-ce qu'on va créer ? Un gestionnaire de cocktails, pour stocker tes recettes de cocktails préférées.

## Générer l'application Rails

[yarn](https://yarnpkg.com) doit déjà être installé. Vérifie avec :

```bash
yarn -v
# Tu devrais voir la version de yarn ici
```

Sinon, retourne à la section dédiée de la configuration [macOS](https://github.com/lewagon/setup/blob/master/macOS.md#yarn), [Linux](https://github.com/lewagon/setup/blob/master/UBUNTU.md#yarn) ou [Windows](https://github.com/lewagon/setup/blob/master/WINDOWS.md#yarn).

**Remarque** : Tu devrais maintenant pouvoir exécuter ces étapes sans cette fiche d'aide ! N'oublie pas la base de données `-d postgresql` (on en parlera demain). 😉

```bash
cd ~/code/<user.github_nickname>
rails new rails-mister-cocktail -d postgresql --skip-action-mailbox -T
cd rails-mister-cocktail
```

On doit ensuite créer la base de données postgresql pour cette nouvelle application Rails.

```bash
rails db:create
```

On va maintenant configurer git, créer un dépôt sur Github et pousser notre squelette.

```bash
git add .
git commit -m "rails new"
gh repo create --public --source=.
git push origin master
```

On va importer les spécifications du prof pour évaluer notre progression avec `rake`.

```bash
echo "gem 'rspec-rails', group: [ :test ]" >> Gemfile
echo "gem 'rails-controller-testing', group: [ :test ]" >> Gemfile
bundle install
rails db:migrate
rails db:test:prepare
git submodule add https://github.com/lewagon/fullstack-challenges-04-Rails-mister-cocktail-specs.git spec
git add .
git commit -m "Prepare rails app with external specs"
```

Tu pourras tester ton code avec :

```bash
rails db:migrate RAILS_ENV=test  # If you added a migration
rspec spec/models                # Launch tests
```

Avant de commencer à coder, n'oublie pas de configurer ton application Rails pour le front-end. Comme dans le cours de ce matin, on va ajouter Bootstrap.

```bash
yarn add bootstrap @popperjs/core
```

Ajoute cette ligne dans `config/initializers/assets.rb`

```rb
Rails.application.config.assets.paths << Rails.root.join("node_modules")
```

Et on va ajouter les gems dont on a besoin :

```ruby
# Gemfile
gem "autoprefixer-rails"
gem "font-awesome-sass", "~> 6.1"
gem "simple_form", github: "heartcombo/simple_form"
gem "sassc-rails" # Uncomment this line
```

```bash
bundle install
rails generate simple_form:install --bootstrap
```

Puis on va télécharger les feuilles de style du Wagon :

```bash
rm -rf app/assets/stylesheets
curl -L https://github.com/lewagon/stylesheets/archive/master.zip > stylesheets.zip
unzip stylesheets.zip -d app/assets && rm stylesheets.zip && mv app/assets/rails-stylesheets-master app/assets/stylesheets
```

Enfin, on va importer la librairie JS Bootstrap:

```js
// app/javascript/packs/application.js
import "bootstrap";
```

N'oublie pas de versionner (`commit`) et pousser (`push`) régulièrement ton travail.

## Spécifications

### 1 - Modèles

Va sur [db.lewagon.com](http://db.lewagon.com) et dessine le schéma avec ton buddy. Les tables
dont on a besoin sont `cocktails`, `ingredients` et `doses`. Réfléchis aux relations entre les tables et à qui stocke les *références*. 😉

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/db.png)

**Important**
N'utilise pas `rake` mais :

```bash
rspec spec/models
```

pour exécuter uniquement les tests dans le dossier `spec/models`. Assure-toi que tout soit en vert avant de passer à la partie applicative du challenge.

#### Attributs

- Un **cocktail** a un nom (par ex. : `"Mint Julep"`, `"Whiskey Sour"`, `"Mojito"`).
- Un **ingrédient** a un nom (par ex. : `"lemon"`, `"ice"`, `"mint leaves"`).
- Une **dose** correspond à la quantité nécessaire de chaque ingrédient dans un cocktail (par ex., **6 cl** de citron sont nécessaires pour le Mojito). Chaque dose fait référence à un cocktail et un ingrédient, et s'accompagne d'une description.

#### Validation

- Un cocktail doit avoir un nom unique.
- Un ingrédient doit avoir un nom unique.
- Une dose doit avoir une description, un cocktail et un ingrédient, et les associations [cocktail, ingrédient] doivent être uniques.

#### Associations

- Un cocktail a plusieurs doses.
- Un cocktail a plusieurs ingrédients en doses.
- Un ingrédient a plusieurs doses.
- Une dose appartient à un ingrédient.
- Une dose appartient à un cocktail.
- Tu ne peux pas supprimer un ingrédient s'il est utilisé dans au moins un cocktail.
- Quand tu supprimes un cocktail, tu dois supprimer les doses associées (mais pas les ingrédients, car ils peuvent être liés à d'autres cocktails).

### 2 - Générer une seed des ingrédients

**Notre application ne permettra pas aux utilisateurs de créer des ingrédients**.
À la place, on va générer une seed statique d'ingrédients parmi lesquels l'utilisateur pourra choisir.
Voici un exemple de seed :

```ruby
# db/seeds.rb
Ingredient.create(name: "lemon")
Ingredient.create(name: "ice")
Ingredient.create(name: "mint leaves")
```

**Optionnel** : Amuse-toi et utilise de vrais ingrédients avec [cette liste JSON](http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list) (avec les librairies Ruby `open-uri` et `json`).

### 3 - Routes, contrôleur et vues pour les cocktails

**Important**
N'utilise pas `rake` pour coder la partie applicative. On va maintenant lancer `rails s` dans le terminal et ouvrir un navigateur sur [http://localhost:3000/](http://localhost:3000/). Rédige toujours ton code en silos :

- Commence par la **route**,
- puis code le **contrôleur**,
- et enfin code la **vue** et rafraîchis ton navigateur.

Une fois que ta fonctionnalité est prête (et a l'air de fonctionner), passe à la suivante. Et ainsi de suite !

Une fois que tu as terminé **tout** le challenge, utilise `rake` pour t'assurer qu'il répond aux spécifications.

**Fonctionnalités**
Une fois encore, tu dois avoir une idée précise des fonctionnalités de ton application pour créer tes routes. Voici la liste des fonctionnalités :

- Un utilisateur peut voir la liste des cocktails

```
GET "cocktails"
```

- Un utilisateur peut voir les détails d'un cocktail donné, avec la dose nécessaire pour chaque ingrédient

```
GET "cocktails/42"
```

- Un utilisateur peut créer un nouveau cocktail

```
GET "cocktails/new"
POST "cocktails"
```

### 4 - Routes, contrôleur et vues pour les doses

- Un utilisateur peut ajouter une nouvelle dose (association ingrédient/description) à un cocktail existant.
- Consulte la [documentation](https://github.com/heartcombo/simple_form#associations) `simple_form` à propos de `f.association` pour créer facilement une sélection dépliante de notre liste d'ingrédients.

```
GET "cocktails/42/doses/new"
POST "cocktails/42/doses"
```

- Un utilisateur peut supprimer une dose qui appartient à un cocktail existant. Comment crée-t-on un lien de suppression ?

```
DELETE "doses/25"
```

A-t-on besoin d'un contrôleur `IngredientsController` ?

### 5 - Mise en page au fil de l'eau

On va maintenant créer un chouette front-end ! Pour cela, on va jouer avec le CSS 😊 Est-ce que tu rejoindras le Hall of Fame ? Jette un œil à [dribbble](https://dribbble.com/) ou [onepagelove](https://onepagelove.com/) pour trouver l'inspiration.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/index_1.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/index_2.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/index_3.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/index_4.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/show_1.png)

N'oublie pas que tu peux avoir des images locales dans le dossier `app/assets/images`. Encore mieux : tu peux demander à l'utilisateur une `image_url` au moment de l'envoi du cocktail.

### 6 - Formulaire de nouvelle dose sur la page d'affichage d'un cocktail (optionnel)

Essaie de placer le « formulaire de nouvelle dose » sur la page du cocktail, pas sur une page séparée. Qu'est-ce que cela change dans les routes ? Et dans les contrôleurs ?

### 7 - Select2 sur le menu dépliant des ingrédients (optionnel)

On va essayer d'ajouter un paquet npm à notre application Rails ! Reporte-toi aux diapos pour voir comment ajouter `select2` au menu dépliant des ingrédients.

### 8 - Ajouter des avis sur ces délicieux cocktails ! (optionnel)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/mister_cocktail_d1/show_2.png)

### 9 - Aller plus loin

- Ajouter la possibilité de rechercher des cocktails et ajouter `typed.js` au champ de recherche « input ».
- Ajouter des animations [animate on scroll](https://michalsnik.github.io/aos/) quand on fait défiler l'index des cocktails.
