## Contexte et objectifs

Les e-mails constituent la pierre angulaire de n’importe quelle entreprise de SaaS (Software-as-a-Service, logiciel en tant que service) et il est impératif de savoir comment les manipuler du point de vue de la programmation.

Sur la plupart des sites Web, une adresse e-mail est la clé pour créer un compte. Si elle est mal orthographiée, l’utilisateur ne pourra pas récupérer son mot de passe. Les professionnels du marketing, quant à eux, ont besoin de communiquer avec leurs utilisateurs et de faire en sorte que leur base de données de coordonnées reste un ensemble fiable d’adresses e-mail valides.

## Le cadre

Supposons dans cet exercice que tu doives lancer une application dans quelques semaines. Tu informeras tout le monde de sa mise en ligne avec une grande campagne d’envoi d'emails. En attendant, tu as préparé une page de renvoi (landing page) pour collecter les adresses e-mail des visiteurs.

![Scénario](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-scenario.svg?sanitize=true)

## Spécifications

### Collecter des adresses e-mail valides

![Collecter des adresses e-mail valides](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step1.svg?sanitize=true)

Ta landing page est prête. Tu veux t’assurer que les visiteurs fournissent une adresse e-mail valide.

Écris la méthode `valid?` qui retourne le bon booléen en fonction de la validité de l’adresse e-mail :
- Identifie les différentes parties de l’adresse e-mail et rédige une expression régulière qui détecte le motif d’une adresse e-mail classique
- Rédige toi-même une expression régulière simple ; elle n’a pas besoin d’être parfaite (d’ailleurs, c’est impossible d’écrire une regex parfaite pour les adresses e-mail) !

**Attention :** Les expressions régulières ne sont pas suffisamment détaillées pour vérifier à 100 % la conformité des adresses e-mail, comme illustré dans [cette discussion Stack Overflow](https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression) et sur [ce site Web](https://uibakery.io/regex-library/email). Dans les environnements professionnels, il est préférable de faire appel à des services externes, comme celui fourni par [Sendgrid](https://sendgrid.com/solutions/email-api/email-address-validation-api/) ou [Mailgun](https://www.mailgun.com/email-validation/), car ils utilisent une vaste base de données et l’apprentissage automatique (machine learning) pour déterminer si une adresse est correcte.

### Motif d’une adresse e-mail

Chaque adresse e-mail est l’association d’un **nom d’utilisateur** et d’un **nom de domaine**. Elle suit le motif ci-dessous :

![Motif d’une adresse e-mail](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email.svg?sanitize=true)

#### À propos des noms de domaine

Le domaine de premier niveau ou TLD (Top-Level Domain) est le dernier groupe de caractères du nom de domaine, juste après le **point**, et il peut être choisi dans une liste standard. `.com` est un TLD très courant pour les sites Web commerciaux, mais tu as sans doute entendu parler de TLD historiques comme `.net` et `.org`.

Voici les principales catégories :
- gLTD (generic top-level domains) : domaines de premier niveau génériques (tels que `.com`, `.net`, `.org`)
- ccTLD (country code top-level domains) : domaines de premier niveau nationaux (tels que `.fr`, `.de`, `.jp`)

Mais il en existe [bien d’autres](https://fr.wikipedia.org/wiki/Liste_des_domaines_Internet_de_premier_niveau)

### Nettoyage de la base de données

![Nettoyage de la base de données](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step2.svg?sanitize=true)

Quelques jours ont passé et ta base de données est déjà pleine de coordonnées utiles. Ton équipe marketing obtient d’autres données auprès d’un professionnel afin d’élargir son audience. Avant de lancer la campagne d’envoi d'e-mails, tu dois nettoyer la base de données et retirer toute adresse e-mail invalide.

Écris la méthode `clean_database` :
- Elle prend un array d’adresses e-mail
- Elle retourne un array contenant uniquement les adresses e-mail valides

### Statistiques de base

![Statistiques de base](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step3.svg?sanitize=true)

Ta landing page contient un formulaire très simple pour collecter uniquement des adresses e-mail. Tu ne sais pas grand-chose au sujet de tes clients, mais tu peux déduire certaines informations de leur adresse e-mail. Tu décides de dresser des statistiques sur les TLD. **À partir de maintenant, tous les ensembles de données avec lesquels tu travailles ont été nettoyés pour toi.**

Écris la méthode `group_by_tld` qui retourne un Hash avec les adresses e-mail regroupées par TLD.

Exemple :

```ruby
{
 "com" => ["julien@mdn.com"],
 "de" => ["dimitri@berlin.de"],
 "fr" => ["kevin@yahoo.fr", "edward@gmail.fr"]
}
```

### Campagne d’envoi d'emails

![Campagne d’envoi d'e-mails](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step4.svg?sanitize=true)

Tu travailles maintenant le corps de l’e-mail et tu veux le personnaliser. Commencer un e-mail par "Dear customer" ne sonne pas très bien, tu préférerais extraire le nom d’utilisateur de l’adresse e-mail et commencer par "Dear Seb".

Écris une méthode `compose_email` qui :
- extrait le nom d’utilisateur, le domaine et le TLD de l’adresse e-mail
- retourne un hash au format ci-dessous :

```ruby
{
 username: seb,
 domain: lewagon,
 tld: com
}
```

### (Optionnel) Traduire avec des `locales`

Les statistiques que tu as dressées au sujet des TLD révèlent qu’un grand nombre de tes clients viennent d’Allemagne et de France. Tu commandes des traductions dans ces deux langues. Les traducteurs t’ont livré ceci :

```ruby
LOCALES = {
  en: {
    subject: "Our website is online",
    body: "Come and visit us!",
    closing: "See you soon",
    signature: "The Team"
  },
  fr: {
    subject: "Notre site est en ligne",
    body: "Venez nous rendre visite !",
    closing: "A bientot",
    signature: "L'équipe"
  },
  de: {
    subject: "Unsere Website ist jetzt online",
    body: "Komm und besuche uns!",
    closing: "Bis bald",
    signature: "Das Team"
  }
}
```

Écris la méthode `compose_translated_email` qui :
- extrait le nom d’utilisateur, le nom de domaine et le TLD de l’adresse e-mail
- déduit la langue parlée par l’utilisateur à partir du TLD
- remplace le texte par la traduction correspondante
- retourne un hash au format ci-dessous :

```ruby
{
 username: seb,
 domain: lewagon,
 tld: com,
 subject: "Our website is online",
 body: "Come and visit us!",
 closing: "See you soon",
 signature: "The Team"
}
```

**Astuce de refactorisation :** Si ta méthode a trop de lignes, tu peux la diviser en deux méthodes. Par exemple, en créant une méthode pour choisir la bonne traduction parmi les LOCALES, puis en l’utilisant dans `compose_translated_email` à chaque fois que tu as besoin qu’une phrase soit traduite.

```ruby
def translate(keyword, language)
 # TODO: return the translation
end

translate(:subject, :en)
# "Our website is online"

translate(:subject, :fr)
# "Notre site est en ligne"
```
