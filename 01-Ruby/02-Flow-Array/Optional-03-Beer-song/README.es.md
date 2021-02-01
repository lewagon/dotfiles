## Especificaciones

Escribe el código de un programa que imprima las letras de una canción [99 Bottles of Beer](https://lyricsplayground.com/alpha/songs/numbers/99bottlesofbeeronthewall.html).

Tomará como argumento el número inicial de botellas dado a través de línea de comando al ejecutar el programa. El programa deberá funcionar de la siguiente manera:

```bash
ruby lib/beer_song.rb 5

5 bottles of beer on the wall, 5 bottles of beer!
Take one down, pass it around, 4 bottles of beer on the wall!
4 bottles of beer on the wall, 4 bottles of beer!
Take one down, pass it around, 3 bottles of beer on the wall!
3 bottles of beer on the wall, 3 bottles of beer!
Take one down, pass it around, 2 bottles of beer on the wall!
2 bottles of beer on the wall, 2 bottles of beer!
Take one down, pass it around, 1 bottle of beer on the wall!
1 bottle of beer on the wall, 1 bottle of beer!
Take one down, pass it around, no more bottles of beer on the wall!
```

### Pista

* Puedes pasarle argumentos al programa desde la línea de comando usando [ARGV](http://ruby.about.com/od/rubyfeatures/a/argv.htm)
* ¡Espero que hayas notado el cambio de bottl<strong>es</strong> a bottl<strong>e</strong> cuando sólo queda una botella!

### Un poco de contexto sobre ARGV

Cada programa Ruby que creas corre dentro de otro programa. El intérprete de Ruby. Y ese intérprete también corre dentro de otro programa: tu sistema operativo. Estos niveles de programas se llaman el ambiente y hay muchas maneras de intercambiar información entre el ambiente y el programa.

Una de ellas es por medio de la constante ARGV la cual viene predefinida en todos los programas Ruby. Es un array de strings que representa los argumentos de la línea de comando.

**testing_argv.rb**

```ruby
puts "*** Command line arguments ***"
p ARGV
```

Ahora córrelo en la Terminal de las siguientes maneras:

```bash
ruby testing_argv.rb un deux trois

*** Command line arguments ***
["un", "deux", "trois"]
```

```bash
ruby testing_argv.rb "un et deux" trois

*** Argumentos de la línea de comandos ***
["un et deux", "trois"]
```
