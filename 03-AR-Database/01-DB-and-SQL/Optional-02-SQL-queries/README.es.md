## Contexto y Objetivos

Ya es hora de que hagamos algo más complejo. Vamos a usar consultas `JOIN` para leer datos de diversas tablas. Para desarrollar habilidades de Jedi en consultas `JOIN` [lee esto](http://stackoverflow.com/questions/17946221/sql-join-and-different-types-of-joins) - verás que la imagen es realmente útil. Si hablas francés también puedes [leer este otro](http://sql.sh/cours/jointures).

## Especificaciones

Completa el código en `join_queries.rb`. Cada método toma un argumento `db` el cual es una instancia de `SQLite3::Database` sobre la cual puedes llamar al método `execute`. Exactamente como hiciste en el ejercicio anterior.

### Detalle de canciones

- Implementa `detailed_tracks` para obtener todas las canciones con el artista correspondiente y los títulos de los álbumes.
- Tu resultado debe ser un arreglo (array) de arreglos. **Pista:** tendrás que usar dos declaraciones sql `JOIN`.

Este método debe devolver un arreglo (array) de canciones. Cada elemento de dicho arreglo será un arreglo también: el primer elemento será el título de la canción, el segundo será el nombre del álbum y el tercero el nombre del artista.

### Estadísticas

Encuentra las estadísticas de cada género musical e.g. el número de canciones y la duración promedio (en minutos).

El método debe devolver un Hash de estadísticas.

```ruby
stats_on(db, "Rock")
# => {
#      category: "Rock",
#      number_of_songs: 1297,
#      avg_length: 4.7
#    }
```

### Top 5

Encuentra el top 5 de artistas que produjeron más canciones en un género dado. Este método debe devolver un arreglo (array) de arreglos con el id y el nombre del artista así como el número de canciones de un género dado para cada uno de ellos.

```ruby
top_five_artists(db, 'Rock')
# => [
#      [ 22,  'Led Zeppelin', 114 ],  # Led Zeppelin has 114 Rock songs.
#      [ 150, 'U2',           112 ]
#      # etc.
#    ]
```
