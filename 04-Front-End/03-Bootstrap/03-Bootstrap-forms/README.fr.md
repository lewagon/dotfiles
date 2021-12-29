## Contexte et objectifs

Créer un [formulaire d'inscription réactif](https://lewagon.github.io/bootstrap-challenges/10-Login-form/) (responsive).

**⚠️ Avant de commencer, lis attentivement toutes les instructions.⚠️**. Les formulaires sont parmi les composants les plus importants d'un site Web. Tu dois donc savoir comment les créer !

## La technique de l'offset dans une grille

Le meilleur moyen de rendre un formulaire réactif consiste à l'injecter dans une grille Bootstrap, dans une ligne possédant la classe d'alignement `justify-content-center`. **Souviens-toi** que chaque ligne (`.row`) est une flexbox et que l'on peut utiliser les mêmes astuces d'alignement que lorsqu'on a travaillé avec les flexbox pour rendre notre formulaire réactif.

```html
<div class="container">
  <div class="row justify-content-center">
    <div class="col-12 col-sm-4">
      <form action="">
        <!-- Le contenu de ton formulaire -->
      </form>
    </div>
  </div>
</div>
```

- Le formulaire s'affichera entièrement sur les appareils mobiles
- Sur les tablettes et les appareils plus grands, il sera centré (grâce à la classe d'alignement `justify-content-center`) et occupera 33 % de l'écran.
- Si tu veux, tu peux le rendre encore plus réactif (affichage plein écran sur les appareils mobiles, affichage centré sur une moitié d'écran sur les tablettes, affichage centré sur 33 % de l'écran sur les ordinateurs portables, etc).

## Formulaires HTML

Un formulaire (`<form>`) HTML est composé de différentes entrées `<input>` (une pour chaque champ du formulaire). Chaque entrée peut être associée à une étiquette `<label>`. Le bouton de soumissions du formulaire est aussi une entrée de `type="submit"`. Voici à quoi ressemble un formulaire :

```html
<form action="#">
  <label for="your-email">Your email</label>
  <input type="email" id="your-email" placeholder="bob@gmail.com">
  <input type="submit" value="Sign In">
</form>
```

1. Il existe différents types d'entrée ou `<input>` (`type="text"`, `type="email"`, `type="date"`, etc.)
2. Le `placeholder` est un exemple de texte qui disparaît quand l'utilisateur commence à écrire.
3. L'étiquette `for="something"` sera associée à l'entrée avec `id="something"`. On n'associe pas les étiquettes et les entrées simplement pour s'amuser. Les associer permet de pouvoir cliquer n'importe où sur l'étiquette pour pouvoir faire passer le curseur dans l'entrée associée (plutôt que d'avoir à cliquer dans la zone de texte). Ce qui permet d'offrir une bien meilleure expérience utilisateur !
4. L'attribut `value` nous donne le texte qui s'affiche sur le bouton de soumission.

Les listes dépliantes sont un peu différentes. **Elles ont leurs propres balises `<select>` et `<option>` pour chaque option de la liste**. Le HTML d'une liste dépliante ressemble à ça :


```html
<label for="favorite">What's your favorite language?</label>
<select id="favorite" name="language">
  <option value="ruby">Ruby</option>
  <option value="css">CSS</option>
  <option value="javascript">JavaScript</option>
</select>
```

## Classes de formulaire Bootstrap

On va maintenant parler des classes de formulaire Bootstrap :
- `.form-control` définit chaque entrée `<input>` ou sélection `<select>`, à l'exception du bouton de soumission.
- `.form-group` regroupe chaque entrée `<input>` ou sélection `<select>` avec l'étiquette `<label>` associée.

Exemple de formulaire Bootstrap **avec des étiquettes** :

```html
<form action="#">
  <div class="form-group">
    <label for="email">Your email</label>
    <input type="email" id="email" class="form-control">
  </div>
  <div class="form-group">
    <label for="password">Your password</label>
    <input type="password" id="password" class="form-control">
  </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

Exemple de formulaire Bootstrap **sans étiquette** :

```html
<form action="#">
  <div class="form-group">
    <input type="email" class="form-control">
  </div>
  <div class="form-group">
    <input type="password" class="form-control">
   </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

Maintenant, si tu veux un [formulaire en ligne](https://getbootstrap.com/docs/4.6/components/forms/#inline-forms), tu peux **ajouter la classe `.form-inline` au formulaire `<form>`** (comme la classe `.list-inline` pour une liste `<ul>`) :

```html
<form action="#" class="form-inline">
  <div class="form-group">
    <input type="email" class="form-control">
  </div>
  <div class="form-group">
    <input type="password" class="form-control">
   </div>
  <input type="submit" value="Sign In" class="btn btn-primary">
</form>
```

## Injecter une ligne `.form-row` dans le formulaire

Tu peux aussi injecter une ligne dans un formulaire en utilisant la classe `.form-row`. Voici un exemple pour avoir 2 entrées `<input>` sur la même ligne :

```html
<form>
  <div class="form-row">
    <div class="col-6 form-group">
      <label>First name</label>
      <input type="text" class="form-control" placeholder="First name">
    </div>
    <div class="col-6 form-group">
      <label>Last name</label>
      <input type="text" class="form-control" placeholder="Last name">
    </div>
  </div>
  <!-- rest of the form below -->
</form>
```

## À toi de jouer

- À ton tour de créer un [formulaire d'inscription responsive](http://lewagon.github.io/bootstrap-challenges/10-Login-form/).
- Essaie de personnaliser un peu ton design dans `components/form.css`.

N.B. : N'oublie pas de **forcer le rafraîchissement** de ton navigateur (`Cmd + Shift + R`) pour vider le cache si ta page n'affiche pas le code le plus récent !
