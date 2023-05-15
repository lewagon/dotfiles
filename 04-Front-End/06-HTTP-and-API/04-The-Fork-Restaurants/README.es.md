## Antecedentes y objetivos

En este desafío, examinaremos más de cerca la API de Fork que vimos durante la conferencia. El objetivo es familiarizarnos más con cómo hacer solicitudes a la API, cómo leer la respuesta y cómo usar esta respuesta para insertarla en HTML.

## Especificaciones

Construirás una aplicación de búsqueda para filtrar los restaurantes de [The Fork API](https://the-fork-api.students.lewagon.co/).

Tu objetivo es implementar en `index.js` la lógica de búsqueda, para que podamos filtrar por categoría al hacer clic en buscar.

Abre la página html en tu navegador con:

```bash
serve
```

Deberías ver un formulario con todas las diferentes categorías de restaurantes.

- Cuando seleccionamos uno y hacemos clic en Buscar, la página no debe recargarse y el objetivo es mostrar la lista de los restaurantes filtrados a la derecha.
- Deberíamos ver un mensaje que indique que no hay resultados en caso de que no haya restaurantes para esa categoría.
- La lista debe reiniciarse cada vez que haces una nueva búsqueda antes de mostrar los nuevos restaurantes.
- Puedes usar el flush list de Bootstrap para mostrar los restaurantes. ¡Pero si lo deseas, siéntete libre de ser creativo!

```html
<div class="text-center">
  <img
    src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/the-fork-challenge-1.png"
    alt="The Fork Challenge demo"
    width="100%"
  />
</div>
```

## Leer la documentación

Usaremos la API de Fork, así que como siempre que usamos una nueva API, es muy importante leer primero la documentación para encontrar el punto final que necesitamos, y comprender cómo construir nuestra solicitud.

## Refactorización

Una vez que la búsqueda funcione como se espera, hagamos que el código sea más legible y evitemos demasiados niveles de indentación, como lo hicimos en el desafío anterior.

Creemos dos nuevas funciones para extraer algo de nuestra lógica del callback addEventListener:

- En primer lugar, un método insertResults que insertará los resultados en nuestra lista. ¿Qué parámetro se le debe pasar?
- En segundo lugar, un método buildSearchUrl que buscará la categoría elegida y construirá la URL que necesitamos para hacer nuestra consulta. Debería devolver la URL agregada con los parámetros de búsqueda.

¡Al final, tu código debería ser fácilmente legible y no tener más de 1 nivel de indentación!

## Ir más allá

Una vez que la búsqueda funcione para una categoría, agreguemos la ubicación para que podamos buscar tanto por categoría como por ubicación 🎉

```html
<div class="text-center">
  <img
    src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/the-fork-challenge-2.png"
    alt="The Fork Challenge demo"
    width="100%"
  />
</div>
```
