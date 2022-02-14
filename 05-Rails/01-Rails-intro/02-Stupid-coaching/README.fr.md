## Configuration

Tu devrais déjà avoir Rails installé. Vérifions-le :

```bash
rails -v
# You should see your rails version here
```

Si ce n'est pas le cas, retourne à la section dédiée du setup [macOS](https://github.com/lewagon/setup/blob/master/macos.fr.md#installer-des-gems), [Windows](https://github.com/lewagon/setup/blob/master/windows.fr.md#installer-des-gems) ou [Ubuntu](https://github.com/lewagon/setup/blob/master/ubuntu.fr.md#installer-des-gems).

## Contexte et objectifs

Tu te souviens des premières semaines de Ruby ? Le terminal était la seule interface utilisateur. Mais ça, c'est du passé ! On va maintenant utiliser Rails, ce qui signifie que :

- L'interface utilisateur du programme est désormais ton **navigateur**
- La seule façon de communiquer avec ton application Rails consiste à envoyer des **requêtes HTTP**

Tu n'utiliseras pas `rake` ici. Et ne crée pas ton application Rails dans `fullstack-challenges`.

```bash
cd ~/code/<user.github_nickname>
rails new rails-stupid-coaching --skip-active-storage --skip-action-mailbox
cd rails-stupid-coaching
git add .
git commit -m "rails new"
gh repo create
```

```bash
git push origin master
```

On ajoute le flag `--skip-active-storage` pour éviter l'installation d'[Active Storage](https://edgeguides.rubyonrails.org/active_storage_overview.html). Active Storage facilite le chargement de fichiers dans un service de stockage cloud, mais il ajoute des routes inutiles à ton application et tu n'en as pas besoin pour le moment.

**Objectif** : créer une application Rails simple de 2 pages.

1. La première page consiste en un formulaire avec un champ « input », où un utilisateur peut taper une question à poser au coach.
1. Une fois qu'il a envoyé le formulaire, l'utilisateur est redirigé vers une autre page où il peut voir sa question et la réponse du coach.

C'est tout !

## Spécifications

Familiarise-toi avec [les bases de la ligne de commande Rails](http://guides.rubyonrails.org/command_line.html#command-line-basics). Pour cet exercice, tu dois au moins savoir :

- créer une nouvelle application Rails ;
- lancer un serveur Web pour ouvrir ton application localement ;
- générer un nouveau contrôleur à partir de la ligne de commande ;
- vérifier tes routes avec la commande `rails` correspondante.

### Lancer un serveur Rails

Tous les développeurs Web commencent par lancer un serveur et ouvrir un navigateur pour tester **en direct** les fonctionnalités qu'ils codent.
- Lance un serveur dans ton terminal.
- Ouvre [localhost:3000](http://localhost:3000) dans le navigateur Web de ton choix ! Tu devrais voir la page d'accueil de Rails.

À chaque fois que tu écris du code dans un fichier, enregistre-le et rafraîchis ton navigateur. Tu verras apparaître de nombreux messages d'erreur, mais il est important que tu apprennes à les connaître. Cela te permettra de comprendre le processus d'exécution de Rails et comment corriger ces erreurs !

### Générer un contrôleur

Pour commencer, on va générer un contrôleur `QuestionsController` que l'on utilisera pour nos deux pages. Tu te souviens de la commande `rails` à utiliser ?

### Afficher le formulaire : `/ask`

On veut afficher une page avec un formulaire (`<form>`) pour nos utilisateurs sur [localhost:3000/ask](http://localhost:3000/ask). Dans Rails, cela équivaut à une story utilisateur ; on a donc besoin de plusieurs fichiers HTML. Pour chaque action utilisateur dans Rails, on a besoin de coder **(i) une route, (ii) une action et (iii) une vue**. Tu te souviens du pattern MVC ?

**Route**

Rédige une route simple pour envoyer la requête HTTP `GET /ask` à l'action `ask` du contrôleur de questions. Pour rappel, voici le pattern d'une route codée dans Rails :

```ruby
verb "url", to: "controller#action"
```

**Contrôleur**

Maintenant que la **route** est codée, on va coder l'**action**. Ajoute une action `ask` à ton contrôleur `QuestionsController` ! A-t-on besoin de définir une variable d'instance ici ? On verra ça au moment de coder la vue !

Au passage, tu te rappelles comment afficher toutes tes routes dans le terminal ?

<details><summary markdown='span'>View solution
</summary>

```bash
rails routes
```
Tu dois voir apparaître ce qui suit :

```
Prefix Verb URI Pattern       Controller#Action
   ask GET  /ask(.:format)    questions#ask
```
</details>

**Vue**

Dernière étape de la création du formulaire : créer une vue ! Tu te souviens du dossier dans lequel tu dois la placer et du nom que tu dois lui donner ? C'est l'une des conventions de Rails : la [convention Action View](https://kitt.lewagon.com/camps/<user.batch_slug>/lectures/content/lectures/rails/rails-intro/index.html?title=Rails+Basics#/6/6). Rafraîchis la page sur [localhost:3000/ask](http://localhost:3000/ask). Si tu as nommé ton fichier correctement, tu devrais enfin voir une page sans erreur ! Pour le moment, elle est vide. On va ajouter le formulaire (`<form>`). Tu te souviens de la syntaxe ?

```html
<form action="???">
  <input type="text" name="???">
  <input type="submit" value="Ask!">
</form>
```

Le comportement natif d'une balise `<form>` consiste à générer la requête HTTP définie par les attributs `method` et `action`.
- L'attribut `method` contient le **verbe** HTTP (`GET` par défaut).
- L'attribut `action` contient l'**url** de la requête qu'elle déclenche à l'envoi.

Dans le champ `<input>`, l'attribut `name` te permet de définir la **clé** du paramètre correspondant.

Ici, on veut que le formulaire déclenche une **deuxième story utilisateur** : `answer`, qui devra avoir sa route sur `/answer`. Remplace les `???` ci-dessus et essaie d'envoyer le formulaire.

Tu dois obtenir une erreur de routage ou **routing error**. Et maintenant, on va coder la réponse !

### Afficher la réponse du coach : `/answer`

On va maintenant coder la logique de l'action `answer` (deuxième étape du parcours utilisateur). Pour cette deuxième story utilisateur, suis la même méthodologie que pour `1. Afficher le formulaire` :
- Code la **route**.
- Code l'**action** (dans le contrôleur).
- Code la **vue**.

Et assure-toi de rafraîchir régulièrement la page dans ton navigateur pour que le processus d'exécution de Rails te guide dans ton développement !

La vue `answer.html.erb` affichera la question que tu poses au coach et sa réponse. Le contrôleur devrait lire la question depuis `params` et calculer une variable d'instance `@answer` à afficher dans la vue. Voici deux requêtes que tu devrais maîtriser :

- [localhost:3000/answer?question=hello](http://localhost:3000/answer?question=hello)
- [localhost:3000/answer?question=what time is it?](http://localhost:3000/answer?question=what time is it?)

Si tu ne te souviens pas de la logique (médiocre) du coach, la voici :

1. Si le message est `I am going to work`, le coach répondra `Great!`.
2. Si le message contient un point d'interrogation `?` à la fin, le coach répondra `Silly question, get dressed and go to work!`.
3. Sinon, le coach répondra `I don't care, get dressed and go to work!`.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/hello_there.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/can_i_go.png)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/ask.png)

### Lien retour de `/answer` à `/ask`

- Ajoute un lien vers `/ask` dans la vue `answer.html.erb` en utilisant l'objet d'aide ou helper Rails `link_to`.

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/rails/stupid-coaching/bottom_link.png)

### Crée quelque chose de joli !

On n'a pas encore abordé l'aspect frontend d'un projet Rails, mais tu peux déjà commencer tout seul !

**Quelques mots à propos de SCSS**

[.scss](https://sass-lang.com/guide) est une extension de fichier qui te permet de rédiger plus facilement ton CSS ! Les navigateurs comprennent uniquement CSS. Rails **traite en amont** le fichier et le traduit en CSS « conventionnel ». Les principales caractéristiques `scss` que tu dois connaître sont les suivantes :

1. Variables

    ```scss
    // Définir une variable
    $gray: #F4F4F4;

    body {
      background: $gray; // Using this variable
    }
    ```

2. Imbrication

    ```scss
    .banner {
      background: red;
      h1 {
        font-size: 50px;
      }
    }
    ```

3. Chaînage

    ```scss
    a {
      color: grey;
      &:hover {
        color: black;
      }
    }
    ```

Dans quelques jours, tu apprendras également à organiser les feuilles de style en plusieurs fichiers, et à les charger en utilisant le mot-clé `import` !

Pour le moment, ouvre (ou crée) simplement le fichier `app/assets/stylesheets/questions.scss`. Tu peux directement coder du SCSS, l'enregistrer et recharger la page ! Essaie de faire en sorte que le design corresponde aux captures d'écran.

### Tests (optionnel)

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
class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :headless_chrome # Update this line
end
```

Tu es prêt ? Tu vas pouvoir commencer les tests Rails.

Dans le terminal, exécute la commande suivante pour créer le fichier test :

```bash
rails g system_test questions
```

Ouvre le fichier généré dans ton éditeur de texte et rédige ton premier test :

```ruby
# test/system/questions_test.rb
require "application_system_test_case"

class QuestionsTest < ApplicationSystemTestCase
  test "visiting /ask renders the form" do
    visit ask_url
    assert_selector "p", text: "Ask your coach anything"
  end
end
```

Exécute le test dans le terminal avec :

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

Une fois que la commande fonctionne, examines de plus près le scénario de test, tu peux le comprendre comme suit :

1. Va à la page `/ask`.
2. Assure-toi que la page a été générée et qu'on peut lire `Ask your coach anything`.

Super ! C'était ton premier test de fonctionnalités. Que va-t-on tester ensuite ? Réfléchis à ce que tu as fait _manuellement_ : tu as tapé du texte (avec différents scénarios), puis tu as cliqué sur le bouton « Ask ». On va maintenant le faire avec des tests !

```ruby
# test/system/questions_test.rb
require "application_system_test_case"

class QuestionsTest < ApplicationSystemTestCase
  # [...]

  test "saying Hello yields a grumpy response from the coach" do
    visit ask_url
    fill_in "question", with: "Hello"
    click_on "Ask"

    assert_text "I don't care, get dressed and go to work!"
  end
end
```

Cette syntaxe t'intrigue ? Il s'agit de la gem **capybara** ! Elle est très utile dans ce contexte de test, où l'on doit automatiser les clics sur des liens, des boutons ou des formulaires à remplir. Jette un œil à [son DSL](https://github.com/teamcapybara/capybara#the-dsl).

À ton tour ! ✌️ Essaie de coder d'autres scénarios dans tes tests système.

**Captures d'écran**

L'équivalent de `binding.pry` dans l'univers des tests consiste à prendre des captures d'écran. Ajoute la gem `launchy` au fichier `Gemfile` (dans le groupe `:test`) :

```ruby
# Gemfile
group :test do
  # [...]
  gem 'launchy'
end
```

Exécute ensuite `bundle install`. Dans ton code, tu n'as qu'à écrire ce qui suit :


```bash
take_screenshot
```

Cela prendra des captures d'écran dans le navigateur _Headless Chrome_, qui seront stockées dans le dossier `tmp/screenshots`.
