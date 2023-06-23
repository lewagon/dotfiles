## Contexto y Objetivos

El objetivo de este desafío es practicar con más plantillas de lenguaje de WeChat

## Especificaciones


### 1. Configura una página más en tu aplicación

Usa el archivo de configuración `app.json` para agregar nuevamente una nueva ruta dentro del arreglo (array) `pages:[]`:

```
"pages/stories/stories"
```

### 2. Crea un pequeño título para empezar

Vamos a usar nuevamente el mismo [Componente Banner](https://uikit.lewagon.com/documentation#banners) que usamos en nuestra página de inicio y a ¡mejorar el encabezado! También podemos usar el `inline CSS` nuevamente para personalizar su tamaño ... e.g 100px de alto.

### 3. Luego una card para nuestras historias ....

Nos será útil tener el componente card para mostrar nuestras historias FMC: cada card tendrá **contenido** y **autor**.

Una vez más podemos ahorrar tiempo usando [el componente card de Le Wagon](https://uikit.lewagon.com/documentation#card_product) (aunque no necesitamos una imagen de producto).

Una historia será suficiente porque solo estamos trabajando con una plantilla.

### 4. Introducción de enlazado de datos

WXML es mucho más que HTML: ¡es un **lenguaje de plantillas** que nos permite [inyectar variables JavaScript e inclusive bucles a través de nuestros datos locales](https://developers.weixin.qq.com/miniprogram/en/dev/framework/view/wxml/data.html)! La magia ocurre cuando usas la siguiente sintaxis: `{{variable or operation}}`.

La llamamos la **sintaxis de bigote** 👨‍🦰 y está relacionada con JS y HTML en ambos sentidos...

**De JS a WXML ➡️**

- Almacena ‘Who is here?’ dentro de una variable `text` en la página de datos de `stories.js`.


```js
//stories.js
Page({
  data: {
    text: 'Who is here?'
  }
})
```

- Muestra el texto dentro de tu página `stories.wxml`


```html
<!— stories.wxml -->
<view>{{text}}</view>
```

Cualquier cadena de datos (string) almacenada dentro de `text` se mostrará dinámicamente en tu vista 🤓.

**De WXML a JS ⬅️**

- Crea el botón con el atributo "bindtap" y un nombre de función como valor.


```html
<!— stories.wxml -->
<button bindtap="clickMe">{{text}}</button>
```

- Define esta nueva función en tu objeto Page:

```js
//stories.js
Page({
  clickMe: function() {
    this.setData({ text: "Hello World" })
  }
})
```

¡Bien hecho! Ahora tienes un botón provocando un evento "bindtap" en el nivel lógico (el archivo JavaScript file) y una función que configura nuevamente los datos locales a otra cadena de caracteres (string)... renderizada immediatamente en la vista.

⚠️ ¡No rompas el objeto Page! **Cada par clave-valor (key-value) está unido con una coma.** Fijate como el objeto Page contiene varias claves (keys) suministradas por el framework: `onReady`, `onShow` etc. Las llamamos [funciones de estilo de vida (lifestyle)](https://developers.weixin.qq.com/miniprogram/en/dev/framework/app-service/page.html).


### Acción adicional:

Transforma tu `<navigator>` de la página de inicio en un elemento `<button>` llamando a esta función sobre  **bindtap**:

```js
//landing.js
goToStoriesPage: function() {
  wx.navigateTo({
    url: '/pages/stories/stories'
  })
}
```
