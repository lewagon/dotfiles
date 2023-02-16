## Contexto y Objetivos

En este desafío aprenderás cómo **usar el global storage** para enviar datos de una página a otra.

¡También descubrirás nuevos componentes como un **formulario** y una **tab bar** para navegacion!

## Especificaciones

### 1. De Global a Local

Cada Page (e.g `stories.js`) tiene sus propios datos **locales** por separado que renderiza a su vista.

Afortunadamente, toda la App (`app.js`) comparte un *global* data storage que podemos acceder desde todos lados. Ahí es donde vas a querer almacenar todo lo que vas a reutilizar. ¡Por ejemplo: la información de tu usuario/a!

Aunque la [documentación que está aquí](https://developers.weixin.qq.com/miniprogram/en/dev/framework/app-service/app.html) dice muy poco al respecto, ten en cuenta que WXML no puede acceder al *global* data storage* directamente.¡Primero tendrás que pasar por el *local* data!

```js
//app.js
App({
  globalData: {
    userInfo: { nickName: "salmon", gender: 1 }
  }
})
// setting globalData
```

```js
//page.js
let app = getApp() // register the app instance

Page({
  data: { userInfo: app.globalData.userInfo }
})
// take from app.globalData and set the local data
```

```html
<!-- index.wxml -->
<view>Hello {{userInfo.nickName}}</view>
<!-- display our local data →
```

Siguiendo esa lógica vas a:

- Usar `App.js` para agregar un **globalData** storage con nuestro arreglo (array) `stories`
- En la parte superior de `stories.js`, usa getApp() para obtener una instancia de tu App
- En **onShow function** dentro de tu `stories.js`, resetea tu **local storage** para igualar al globalData storage.

```js
Page({

      ...

      data: {
        stories: []
      }

      onShow: function () {
        this.setData({
          stories: app.globalData.stories
        })
      }

      ...

    })
```

**Revisa la vista nuevamente.**

¡Si todo está bien, tu bucle **WX:FOR** todavía renderiza todas tus historias!

### 2. Post de nuevas historias

**Agrega una nueva ruta** a tu aplicación para dejar que los usuarios/as puedan publicar (POST) una nueva historia FMC.

- Edita tu archivo `app.json` para agregar una nueva página "post".
- Siguiendo en `app.json`, ¡crea un nuevo 'tabBar'! Lo usaremos para navegar entre nuestras 2 pestañas principales: **stories** a la izquierda y **post** a la derecha. Revisa la [ documentación de la configuracion](https://developers.weixin.qq.com/miniprogram/en/dev/framework/config.html) para implementar el objeto tabBar correctamente.

**Testealo ahora!** en tu simulador. Ahora debes poder pasar de una pestaña a otra. Tómate tu tiempo para [ponerle un buen icono](https://www.iconfont.cn/)?

**Vamos al diseño del formulario** 🎨

- En tu página de vista `post.wxml`, usa el componente [formulario](https://developers.weixin.qq.com/miniprogram/en/dev/component/form.html) y su atributo **bindsubmit**.
- Vamos a necesitar dos entradas ([inputs]) (https://developers.weixin.qq.com/miniprogram/en/dev/component/input.html) (nombre (name) y contenido (content)) y por supuesto ¡un botón para enviar (submit) el formulario!

¿Sabes cómo **recibir los datos de este formulario** dentro del nivel lógico `post.js`?¡Se hace por medio del `bindsubmit` de tu formulario!

Crea una función llamada **formSubmit**. Dicha función recibe el argumento `event` con todos los datos de tu formulario 😉.

```js
Page({
  ...
  formSubmit: function (event) {
    console.log(event.detail.value.name)
    console.log(event.detail.value.content)
  }
  ...
})
```

Ahora **implementa la función**:

- tomando los valores de las entradas (inputs) de tu formulario
- guardándolos dentro del *`globalData`* de tu App
- enviando al/la usuario/a de vuelta a la página de historias gracias a la API [`wx.switchTab`](https://developers.weixin.qq.com/miniprogram/en/dev/api/ui-navigate.html#wxswitchtabobject)

*👉 *Consejo: recuerda cómo hemos usado `getApp()` para obtener una instancia de la App dentro de la página!*

**¡Testea una y otra vez!** ¡Usa console.log en cada paso! 🤓
