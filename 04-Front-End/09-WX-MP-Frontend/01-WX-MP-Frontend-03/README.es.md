## Contexto y Objetivos

El objetivo de este desafío es practicar atributos WXML avanzados para hacer vistas dinámicas

## Especificaciones

Queremos mostrar mas de una historia en nuestra página de historias (**stories page**) sin repetir el mismo markup WXML.

### 1. ¡Empieza por los datos!

- En `stories.js`, localiza la clave del dato (data key) en la parte superior. Agrega un arreglo (array) de `stories` dentro.

```js
//stories.js
data: {
  stories: []
}
```

- Cada historia será un **nuevo objeto** almacenado en el arreglo (array) `stories`.
- Cada historia tendrá un **contenido** y un **nombre**.

```js
{ content: "Building a mini program is fun!!! FMC.", name: "Yinghui" },
```

Te recomendamos crear 2-5 historias. Luego de guardar estos datos locales de manera segura puedes ver una vista previa en la pestaña **AppData** de la consola ("debugger").¡Todo lo que está almacenado aquí está disponible en nuestra plantilla WXML!

### 2. La lista render

Ahora podemos renderizar nuestra lista de historias usando el atributo de control [`WX:FOR`](https://developers.weixin.qq.com/miniprogram/en/dev/framework/view/wxml/list.html).

En tu página de historias **stories.wxml**::

- Envuelve tu componente card en un elemento `<view>` o `<block>` (son equivalentes, solo contenedores)
- Usa el atributo de control `wx:for` para repetir este elemento de contenedor para cada ítem del arreglo (array) de tus historias
- Usa `wx:for-item` para especificar el nombre de la variable del elemento actual del arreglo (array)
- Usa algo de la sintaxis de bigote (`{{mustache}}`) dentro de tu card para mostrar el contenido (**content**) y el nombre (**name**) de las claves (keys) de tus historias!

### 3. Con condiciones

¿Y si **no tuviéramos historias que mostrar**? ¡No se vería bien mostrar una página en blanco!,¿no? 😱

Podemos usar el atributo de control [`WX:IF`](https://developers.weixin.qq.com/miniprogram/en/dev/framework/view/wxml/conditional.html) para anticipar esta situación.

- Haz una card con un mensaje de bienvenida: "*There's nothing here yet!*"
- ¡Renderiza esta card SI el arreglo (arreglo) ``stories`` está vacío!

👉 Consejo: un arreglo (array) vacío tiene una longitud igual a 0.
