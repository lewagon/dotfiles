## Contexte et objectifs

L'objectif de ce challenge simple est de manipuler les balises HTML de base et de créer une card (carte) de profil avec des titres, du texte, des listes et des images.

## Configuration

Va sur ton profil (`profile`) et crée un répertoire `images` pour stocker toutes tes photos :

```bash
cd profile
mkdir images
code .
```

## Serveur local

Tu peux lancer un serveur Web local en saisissant la commande suivante dans ton terminal (assure-toi simplement de bien être dans le dossier de l'exercice) :

```bash
serve
```

(il a été défini dans un [alias](https://github.com/lewagon/dotfiles/blob/f894306fd81502f1fe513dd253e3129f4b56874d/aliases#L7))

- Tu peux maintenant consulter tes fichiers sur [http://localhost:8000](http://localhost:8000)
- ⚠️ Les navigateurs modernes mettent en cache le **fichier** retourné par une **url** donnée. Ils gardent en mémoire une version de ton HTML (`http://localhost:8000`), de ton CSS (`http://localhost:8000/style.css`) et même de tes images (`http://localhost:8000/images/logo.png`) ! Parfois, la version la plus ancienne est conservée et ton nouveau code n'est pas pris en compte. Pour régler ce problème, utilise `Cmd + Shift + R` pour forcer le rafraîchissement (**hard refresh**) de ta page (et vider le cache en même temps) 👌

## Spécifications

Crée un profil HTML simple avec les éléments suivants (utilise les bonnes balises HTML) :

- une photo de toi
- un titre et un sous-titre avec ton nom et l'intitulé de ton poste (tu peux mettre programmeur maintenant 💻)
- une description de toi
- un bouton
- une liste de liens vers tes réseaux sociaux

Et comme une image vaut mille mots, [voici ce que tu dois créer pendant ce challenge](https://lewagon.github.io/html-css-challenges/01-profile-content-new/)

## Suggestions et ressources complémentaires

### Trouver de **bonnes** images

Prépare le fichier de l'image de ton profil avant de commencer à coder. Pour cet exercice, tu peux utiliser ta **photo de profil Facebook** et l'enregistrer dans le dossier `images`.

### Conseils HTML

- N'oublie pas les balises de base du squelette : `<html>`, `<body>`, `<head>`.
- N'oublie pas de donner un titre (`<title>`) à ta page dans la section `<head>`, et d'ajouter d'autres métadonnées importantes comme `<meta charset="utf-8">`.
- Tu peux aller sur [Font Awesome](https://fontawesome.com/icons) pour trouver des icônes sympas (par ex., pour tes réseaux sociaux). Cette librairie est super pratique, car toutes les icônes sont des **polices**, de sorte que tu peux facilement les redimensionner, changer leur couleur et même ajouter des animations ! Pour importer Font Awesome, ajoute simplement ce lien à ton `<head>`:

```html
<!-- Fontawesome Stylesheet -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.1.2/css/all.css">
```

- Tu peux utiliser l'attribut `target="_blank"` sur tes liens pour qu'ils s'ouvrent dans de nouveaux onglets quand on clique dessus.

## L'indentation, sinon rien

**Prends ton temps pour réaliser soigneusement l'indentation de ton HTML**. Le code HTML est très imbriqué, bien plus que Ruby. Sans indentation, c'est game over pour ton code !

Quel code est plus facile à comprendre ?

Celui-ci :

```html
<ul>
    <li><a href="#">
        <i class="fab fa-facebook-f"></i> Facebook
  </a>
</li><li>
  <a href="#">
    <i class="fab fa-linkedin-in"></i> Linkedin
      </a></li>
<li>  <a href="#">
  <i class="fab fa-twitter"></i> Twitter
    </a>
  </li>
    </ul>
```

Ou celui-ci :

```html
<ul>
  <li>
    <a href="#">
      <i class="fab fa-facebook-f"></i> Facebook
    </a>
  </li>
  <li>
    <a href="#">
      <i class="fab fa-linkedin-in"></i> Linkedin
    </a>
  </li>
  <li>
    <a href="#">
      <i class="fab fa-twitter"></i> Twitter
    </a>
  </li>
</ul>
```

Indente ton HTML ! Ton code doit ressembler à une [formation de canards en V](https://upload.wikimedia.org/wikipedia/commons/0/0b/Eurasian_Cranes_migrating_to_Meyghan_Salt_Lake.jpg) 🦆🦆🦆 !

## Tu as terminé ?

Une fois que tu as terminé, tu peux pousser cet exercice et copier le contenu dans le dossier de l'exercice suivant avec cette commande :

```bash
# Pousser sur GitHub
git add .
git commit -m "Added content to my profile page"
git push origin master

# Copier ton profil dans le dossier de l'exercice suivant
cp -r ../profile ../../02-Fonts-and-colors
```
