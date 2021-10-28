## Contexte et objectifs

- Travailler avec des fichiers texte
- Créer un analyseur de texte en utilisant un hash

### Lire un fichier en Ruby

Tu peux lire un fichier, ligne par ligne, avec

```ruby
File.open("my/file/path", "r").each_line do |line|
 # Do something with the line variable
end
```

## Spécifications

Exécute la méthode `most_common_words` qui retourne le nombre d’occurrences des mots les plus fréquents dans un fichier texte. Par exemple, si on prend la Bible comme texte source :

```ruby
most_common_words('source-text.txt', 'stop_words.txt', 3)
#=> { 'lord' => 8722, 'God' => 7380, 'Jesus' => 2617 }
```

REMARQUE : ne tiens pas compte de la ponctuation (exemple : `Seb’s` doit être comptabilisé comme `Seb` dans ton décompte final des occurrences).

### Laisse de côté le superflu

Ajoute un filtre à ta méthode pour te débarrasser des [mots vides](http://en.wikipedia.org/wiki/Stop_words) comme les articles, les pronoms ou les prépositions ("a", "the", "is", etc.) Tu disposes d’un fichier texte `stop_words.txt` qui contient des mots vides en anglais. Utilise ce fichier dans ton programme.

### Fais preuve de créativité

Copie-colle le texte que tu veux dans le fichier source pour tester ton programme (discours politique, extrait de livre, ta chanson préférée, etc.)
