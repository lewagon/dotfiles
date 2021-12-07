## Configuration

On va maintenant apporter la touche finale à ton profil. Si tu ne l'as pas déjà fait, copie ton profil dans le dossier de cet exercice :

```bash
cp -r ../03-Finishing-profile-design/profile .
```

## Contexte et objectifs

## Rendre ta page réactive (responsive) avec des media queries

Ton profil est terminé, mais que se passe-t-il si tu réduis la taille de la fenêtre de ton navigateur ? Ta page n'est pas encore **réactive** (responsive) 😱.

Pour créer un design responsive, tu peux ajouter des media queries (littéralement des requêtes médias) à ton CSS. Pour utiliser les media queries, le `<head>` de ton html doit contenir la ligne suivante 👇

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Cela permet à ta page de détecter la largeur de l'écran de l'appareil que tu utilises.

Les media queries fonctionnent un peu comme une déclaration `if` en Ruby. En gros, **tu peux définir des règles CSS qui s'appliqueront uniquement si la fenêtre est plus petite qu'une largeur donnée**. Par exemple, pour créer un conteneur « responsive », tu peux procéder comme suit :


```css
@media (max-width: 960px) {
  /* Pour un écran < 960px, cette classe CSS s'applique */
  .container {
    width: 700px;
  }
}

@media (max-width: 720px) {
  /* Pour un écran < 720px, cette classe CSS s'applique */
  .container {
    width: 500px;
  }
}

@media (max-width: 540px) {
  /* Pour un écran < 540px, cette classe CSS s'applique */
  .container {
    width: 300px;
  }
}
```

Essaie de redimensionner ta fenêtre pour bien comprendre le fonctionnement des media queries.

### ⚠️⚠️⚠️ Fais attention à l'ordre de tes media queries ⚠️⚠️⚠️

Comme pour les déclarations `if` en Ruby, l'ordre est important ! Si plusieurs conditions sont `true`, la dernière règle CSS sera appliquée.
