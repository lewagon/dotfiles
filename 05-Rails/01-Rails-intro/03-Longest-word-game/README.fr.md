## Contexte et objectifs

On va maintenant coder le jeu « Le mot le plus long » avec une interface Web sympa ! Certains d'entre vous le connaissent peut-être déjà.

Avant d'attaquer l'exercice, [lis les règles](https://github.com/lewagon/fullstack-challenges/tree/master/01-Ruby/06-Parsing/02-Numbers-and-Letters).

⛔️ Si tu as déjà travaillé sur cet exercice, essaie de ne pas copier/coller la solution, mais de la re-rédiger en partant de zéro.

## Configuration

Tu n'utiliseras pas `rake` ici. Et ne crée pas ton application Rails dans `fullstack-challenges`, mais dans le répertoire suivant (malheureusement, Kitt n'affichera plus ton score) :

```bash
cd ~/code/<user.github_nickname>
rails new rails-longest-word-game --skip-active-storage --skip-action-mailbox
cd rails-longest-word-game
git add .
git commit -m "rails new"
gh repo create --public --source=.
git push origin master
```

## Spécifications

Réfléchis à l'UI du jeu. De quoi a-t-on besoin ?

1. D'une page pour afficher les paramètres du jeu (des lettres au hasard), avec un formulaire où l'utilisateur pourra taper un mot. Et d'un bouton pour envoyer le formulaire.
2. D'une page pour recevoir le formulaire, calculer le score de l'utilisateur et l'afficher.

### Construction de routes et contrôleur

En utilisant la bonne commande, génère le contrôleur `GamesController` avec deux actions, `new` et `score`. L'action `new` servira à afficher une nouvelle grille aléatoire et un formulaire. Le formulaire sera envoyé (avec `POST`) à l'action `score`.

Ouvre ton fichier `routes.rb` et modifie les routes générées automatiquement par la commande précédente. À la fin, `rails routes` doit retourner quelque chose ressemblant à ceci :

```bash
Prefix Verb URI Pattern      Controller#Action
   new GET  /new(.:format)   games#new
 score POST /score(.:format) games#score
```

### Générer une nouvelle partie

Jette un œil à ton ancien code Ruby. Comment as-tu généré un `Array` de 10 lettres au hasard ? Dans l'action `new` du `GamesController`, crée une nouvelle variable d'instance `@letters` pour stocker ces lettres de l'alphabet prises au hasard. Puis affiche-les dans la vue. Tu devrais obtenir quelque chose ressemblant à ce qui suit :

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/new_game.png)

### Envoyer un mot

On a besoin d'ajouter un formulaire sous les lettres, pour que l'utilisateur puisse saisir une suggestion de mot et l'envoyer.

Il doit envoyer la requête (`POST`) à l'action `/score` dans le `GamesController`.

Nous allons aussi désactiver pour le moment une fonctionalité qui "ajaxifie" les requêtes `post` envoyées depuis une formulaire. La balise HTML `form` doit avoir ce format :

```html
<form action="TODO" method="TODO" data-turbo="false">
  <!-- ... -->
</form>
```

Ajoute la ligne ci-dessous à ton formulaire `form` :

```erb
<%= hidden_field_tag :authenticity_token, form_authenticity_token %>
```

Un champ « input » masqué est créé avec un `authenticity_token` qui veille à ce que la requête `POST` vienne de ton site Web et pas d'un autre. Lis [ce fil Stack Overflow](https://stackoverflow.com/questions/941594/understanding-the-rails-authenticity-token) si tu veux en savoir plus sur le [CSRF](https://fr.wikipedia.org/wiki/Cross-site_request_forgery) et pourquoi Rails ajoute cette couche de sécurité par défaut !

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/new_game_with_form.png)

### De l'autre côté du formulaire

On va vérifier que le formulaire est bien configuré en examinant ce qu'on obtient dans `params`. Il existe deux méthodes pour cela : la première consiste à ajouter `raise` dans le code de ton contrôleur :

```ruby
# app/controllers/games_controller.rb

# [...]
  def score
    raise
  end
```

Va sur la page `/new` page, tape un mot et envoie le formulaire. Tu devrais obtenir une erreur **RuntimeError** de la part de Rails, avec une console en bas. Saisis `params` pour inspecter ce qui a été envoyé :

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/raise.png)

Un autre moyen consiste à ajouter soit le mot-clé `binding.break`, `binding.b` ou `debugger` comme point d'arrêt dans le code de ton contrôleur et de déclencher la requête en soumettant le formulaire. Cela ouvrira session de débogage dans le processus `rails s` de ton terminal. Tu pourras alors taper `next` pour exécuter la ligne suivante ou `continue` pour afficher la vue finale:

```bash
Started POST "/score" for 127.0.0.1 at 2022-08-16 14:42:49 +0200
Processing by GamesController#score as HTML
  Parameters: {"authenticity_token"=>"[FILTERED]", "letters"=>"I G U E Z Y T H E W", "word"=>"toto"}
[8, 17] in ~/code/lewagon/rails-longest-word-game/app/controllers/games_controller.rb
     8|     @letters += Array.new(5) { (('A'..'Z').to_a - VOWELS).sample }
     9|     @letters.shuffle!
    10|   end
    11|
    12|   def score
=>  13|     debugger
    14|   end
    15|
    16|   private
    17|
=>#0  GamesController#score at ~/code/lewagon/rails-longest-word-game/app/controllers/games_controller.rb:13
  #1  ActionController::BasicImplicitRender#send_action(method="score", args=[]) at ~/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/actionpack-7.0.3/lib/action_controller/metal/basic_implicit_render.rb:6
  # and 68 frames (use `bt' command for all frames)
(rdbg)
```

### Calculer le score

On va maintenant coder la logique `GamesController#score`. A-t-on toutes les informations sous la main ? A-t-on besoin de passer d'autres informations au travers de la requête `POST` ? Jette un œil à la balise [`hidden_field_tag`](http://api.rubyonrails.org/v5.1/classes/ActionView/Helpers/FormTagHelper.html#method-i-hidden_field_tag).

On veut maîtriser trois scénarios :

1. Le mot ne peut pas être créé à partir de la grille d'origine.
2. Le mot est valide d'après la grille, mais ce n'est pas un mot anglais valide.
3. Le mot est valide d'après la grille et est un mot anglais valide.

(Tu peux utiliser [cette API](https://dictionary.lewagon.com/) pour vérifier si un mot est valide.)

En bas des résultats, ajoute un lien (`link_to`) pour retourner à la page d'une nouvelle partie.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/cant_be_built.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/not_english_word.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/longest-word-game/congrats.png)

### Rajoute du style à ton application

Installe Bootstrap en copiant-collant la balise `link` [de la documentation](https://getbootstrap.com/docs/5.1/getting-started/introduction/#css) dans le `head` du layout :

```erb
<!-- app/views/layouts/application.html.erb -->
<!-- [...] -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
```

Écris ton propre CSS dans le fichier `app/assets/stylesheets/application.css`.

Essaye de faire correspondre le style aux captures d'écran 🎨

### Ajouter le score (optionnel)

L'utilisateur va jouer plusieurs parties ; il est donc logique de stocker chaque score et de l'ajouter à un total. On peut avoir une règle selon laquelle le score de chaque partie correspond au nombre de lettres dans chaque mot valide (mais tu peux faire preuve de créativité et prendre le carré du nombre de lettres, par exemple).

Aujourd'hui, on ne va pas s'intéresser à la base de données ; on n'a donc pas ActiveRecord pour stocker des informations et les récupérer entre deux requêtes HTTP. Dans Rails, il existe un autre mécanisme pour enregistrer les informations **d'un ensemble** de requêtes HTTP : la [session](http://guides.rubyonrails.org/action_controller_overview.html#session).

Essaie d'utiliser une session Rails pour stocker, calculer et afficher un score final.

### Test (optionnel)

⚠️ Saute cette section si tu ne te sens pas encore à l'aise avec la mécanique de Rails. Tu pourras y revenir plus tard dans la journée après l'exercice Le mot le plus long.

Commence par supprimer le fichier `test/controllers/questions_controller_test.rb` s'il a été généré. On va procéder à des [**tests système**](http://guides.rubyonrails.org/testing.html#system-testing). L'objectif de ce genre de tests est d'automatiser les tests manuels des actions suivantes : « rédiger du code / aller au navigateur / recharger la page / vérifier si tout fonctionne ». Tout ce que tu faisais manuellement dans le navigateur peut être effectué _via_ du code !

Pour les tests système, on va utiliser _Headless Chrome_. Il s'agit d'un navigateur sans interface utilisateur, adapté à ce genre de tests automatisés. Avant de lancer tes tests système, vérifie qu'une version **récente** de Chrome est installée sur ton système (pas Chromium). Il est disponible pour macOS et Ubuntu.

Tu peux ensuite ouvrir le fichier suivant et remplacer **tout** son contenu par :

```ruby
# test/test_helper.rb
ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  fixtures :all
end

Capybara.register_driver :headless_chrome do |app|
  options = Selenium::WebDriver::Chrome::Options.new(args: %w[no-sandbox headless disable-gpu window-size=1400,900])
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end
Capybara.save_path = Rails.root.join('tmp/capybara')
Capybara.javascript_driver = :headless_chrome
```

Puis dans le fichier suivant, **actualise** cette ligne :

```ruby
# test/application_system_test_case.rb
require "test_helper"
class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :headless_chrome # Update this line
end
```

Tu es prêt ? Tu vas pouvoir commencer les tests Rails.

Dans le terminal, exécute la commande suivante pour créer le fichier test :

```bash
rails g system_test games
```

Super ! Un tout nouveau fichier a été créé dans ` test/system/games_test.rb` ! Que va-t-on tester ?

1. Le fait d'aller à une nouvelle (`/new`) page du jeu affiche une grille aléatoire.
1. Tu peux remplir le formulaire avec un mot au hasard, cliquer sur le bouton pour jouer et obtenir un message indiquant que le mot n'est pas dans la grille.
1. Tu peux remplir le formulaire avec un mot composé d'une consonne, cliquer pour jouer et obtenir un message indiquant que le mot n'est pas un mot anglais valide.
1. Tu peux remplir le formulaire avec un mot **valide** (c'est difficile à cause du caractère aléatoire du jeu !), cliquer pour jouer et obtenir un message de félicitations.

On va faire le premier test ensemble :

```ruby
# test/system/games_test.rb
require "application_system_test_case"

class GamesTest < ApplicationSystemTestCase
  test "Going to /new gives us a new random grid to play with" do
    visit new_url
    assert test: "New game"
    assert_selector "li", count: 10
  end
end
```

Lance le test dans le terminal avec :

```bash
rails test:system
```

⚠️ Si l'erreur `Webdrivers::BrowserNotFound: Failed to find Chrome binary` s'affiche, installe Chrome :

```bash
 # macOS
brew install --cask google-chrome

# Ubuntu
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb
rm -rf google-chrome-stable_current_amd64.deb
```

et relance les tests avec `rails test:system`.

Avec ce test, je consulte la nouvelle (`/new`) URL et je m'assure d'obtenir 10 lettres pour jouer.

À ton tour maintenant ! Essaie de coder les trois autres tests en utilisant les méthodes `fill_in` et `click_on`.
