## Contexto y Objetivos

La gema `faker` es interesante pero te imaginas poder importar los datos **reales** de Hacker News? ¡Pues sí, es posible! Lo podemos hacer gracias a su [API](https://github.com/HackerNews/API).

## Setup

Vamos a usar [rest-client](https://github.com/rest-client/rest-client) para llamar a la API de Hacker News. Primero instala la gema en tu laptop:

```bash
gem install rest-client
```

Te recordamos que puedes usar la secuencia  `drop` `create` `migrate` `seed` para testear tu seed.

```bash
rake db:drop db:create db:migrate db:seed
```

Una vez que hayas terminado tu seed puedes ver las filas que acabas de insertar con `rake db:seed` usando las consultas SQL que ya conoces:

```bash
sqlite3 db/development.sqlite3
sqlite> .mode columns
sqlite> .headers on
sqlite> SELECT * FROM posts;
```

## Especificaciones

Abre el archivo `db/seeds.rb` y escribe el código necesario para insertar **10** posts (**NO 100**, de lo contrario nos prohibirán usar su API) y recuperar los datos de la API de Hacker News.

Puedes llamar al endpoint de la API [https://hacker-news.firebaseio.com/v0/topstories.json](https://hacker-news.firebaseio.com/v0/topstories.json). Te dará un arreglo (array) de los números de identificación (ids) de los 100 posts más recientes. Luego, llama a la API para recuperar los detalles de los primeros 10 posts (¡NO 100!).

Por ejemplo, si te interesa obtener los detalles del post `20916749`, debes llamar a [https://hacker-news.firebaseio.com/v0/item/20916749.json](https://hacker-news.firebaseio.com/v0/item/20916749.json).
