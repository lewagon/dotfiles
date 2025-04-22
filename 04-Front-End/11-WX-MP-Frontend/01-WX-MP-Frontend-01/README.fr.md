## Ta journée

Cette journée est divisée en **quatre challenges**. En terminant tous les challenges, tu devrais être en mesure d'envoyer ton premier mini programme WeChat aujourd'hui : _"F*** My Code"._

As-tu entendu parler de [Fmylife.com](https://fmylife.com) ? Les visiteurs de ce site partagent des anecdotes personnelles de problèmes cocasses qu'ils ont rencontrés. Chaque message se termine par "FML" ou "VDM" (vie de merde). On va en faire une copie, mais à propos de votre nouvelle vie de programmeurs 😆

Après chaque démo du prof principal, tu rédigeras ta propre solution au challenge !

**Challenges du matin**

1. Créer une page d'accueil pour souhaiter la bienvenue aux utilisateurs
2. Créer une page Anecdotes pour afficher nos anecdotes FMC
3. Améliorer la page Anecdotes avec du WXML avancé

**Challenges de l'après-midi**

4. Créer une page de publication et utiliser des données globales
5. Facultatif : Utiliser le cache
6. Facultatif : Créer l'écran de connexion des utilisateurs

---

### Challenge 1 : Créer une page d'accueil pour souhaiter la bienvenue aux utilisateurs

## Contexte et objectifs

L'objectif de ce premier challenge est de comprendre la structure de base d'une application, tout particulièrement la couche vue rédigée en WXML/WXSS.

## Spécifications

### 1. Configure ton application

Crée un nouveau mini programme WeChat, que tu appelleras FMC. À l'aide du fichier de configuration `app.json`, personnalise la **barre de navigation** en améliorant le nom et le style.

### 2. Utilise l'array Pages

Utilise le fichier de configuration `app.json` pour ajouter un nouveau chemin à l'intérieur de l'array `pages:[]` :

```
"pages/landing/landing"
```

⚠️ Attention : N'oublie pas de séparer chaque chemin par une virgule ! Si tu brises l'array `pages:[]`, ton application ne fonctionnera pas...

Une fois que tu auras enregistré ce fichier, l'IDE de WeChat générera un nouveau dossier de pages pour toi. Tous les fichiers à l'intérieur contiennent du texte standard à utiliser ! 👏


### 3. Créer une page d'accueil rapide

Cette fenêtre accueillera tes utilisateurs et leur expliquera le concept derrière l'application FMC. Essaie de faire une grande première impression !

Gagne du temps en transformant le [composant Bannière de l'UI du Wagon](https://uikit.lewagon.com/documentation#banner) en page d'accueil rapide.

**Conseil** : Les mini programmes WeChat NE PEUVENT PAS charger d'image de fond (`background-image`) CSS avec un fichier local (`local file`), à l'intérieur de ton répertoire...
C'est une restriction du framework, pour que *ton application reste légère.* Tu dois donc charger un fichier distant (`remote file`) 🌏 au travers de HTTP !

On va utiliser `inline CSS` avec l'attribut style="" :


```
<view class="banner" style="height: 100vh; background-image: linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(https://www.lewagon.com/api/v1/cities/shenzhen/cover?width=1200);">
</view>
```

