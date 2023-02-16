## Contexto y Objetivos

- Usar un paquete de la librería estándar
- Trabajar con la entrada de archivos CSV

Para poder leer archivos CSV y extraer los datos, puedes usar el paquete `csv` que viene con la librería estándar Ruby. El archivo CSV que se da como ejemplo en `lib/movies.csv` viene de [IMDB](http://www.imdb.com/boxoffice/alltimegross).

####  Librería Estándar Ruby

Esta librería incluye todos los paquetes útiles que están incorporados en la instalación de Ruby. Por ejemplo, el paquete [date](http://www.ruby-doc.org/stdlib-2.2.0/libdoc/date/rdoc/Date.html), si está incluido en tu programa Ruby, te permite manipular datos fácilmente. El paquete se carga al inicio de tu archivo Ruby con:

```ruby
require "date"
```

Hay muchos más paquetes útiles a disposición, así que no dejes de leerla!

## Especificaciones

- implementa `#most_successful` el cual devuelve las películas (de acuerdo con un cierto `number` que se le pasa como parámetro) ordenadas por `earnings` descendentes y publicadas antes de un año dado y las ganancias respectivas.
- **limitación**: la lista devuelta debe ser un arreglo (array) de películas. Cada película debe representarse con un hash con las llaves (keys) `name`, `year` y `earnings`. Por ejemplo: `{ name: "Avatar", year: 2009, earnings: 760505847 }`

## Sugerencias y recursos adicionales

- Asegúrate de especificar las opciones de codificación (`encoding`) correctas para poder leer el CSV.
Recuerda que algunos títulos se dan en francés con caracteres especiales 😉

