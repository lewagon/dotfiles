## Tu aprendizaje

Este día está dividido en **cuatro desafíos**. Al completarlos todos deberás ser capaz de hacer tu primer Mini Programa WeChat hoy: _"F*** My Code"._

¿Has escuchado de [Fmylife.com](https://fmylife.com)? Los visitantes comparten historias personales de algún problema en el que han estado. Cada mensaje termina con "FML". Vamos a hacer una copia del mismo pero sobre sus nuevas vidas como programadores 😆.

¡Luego de cada una de las demostraciones hechas por tu profesor/a principal, escribirás tu propia solución al desafío!

**Desafíos matinales**

1. Crear una Página de Inicio para darle la bienvenida a los usuarios
2. Crear una Página de Historias para mostrar nuestras historias FMC
3. Mejorar la página de historias con WXML avanzado

**Desafíos de la tarde**

4. Crear una Página de Posts y usa datos globales
5. Opcional: Usar cache
6. Opcional: Hacer el inicio de sesión (login) de los usuarios

---

### Desafíos 1: Creación de una Página de Inicio para darle la bienvenida a los usuarios


## Contexto y Objetivos

El objetivo de este primer desafío es entender la estructura básica de una aplicación y en particular el nivel de vista escrito en WXML/WXSS.

## Especificaciones

### 1. Configura de tu aplicación

Crea un nuevo Mini Programa WeChat y llamalo FMC. Usando su archivo de configuración `app.json`, personaliza la **barra de navegación** con un mejor nombre y estilo.

### 2. Usa el arreglo (array) de Pages

Usa el archivo de configuración `app.json` para agregar una nueva ruta dentro del arreglo (array) `pages:[]`:

```
"pages/landing/landing"
```

⚠️ Alerta: ¡No olvides separar cada ruta con una coma! Si rompes el arreglo (array) `pages:[]`, se romperá tu aplicación ...

Cuando guardes este archivo, el IDE de WeChat generará una carpeta nueva de página por ti.¡Todos los archivos que están dentro son una plantilla para tu uso! 👏.

### 3. Crea una página de inicio rápidamente

Esta ventana le dará la bienvenida a los usuarios y explicará el concepto detrás de tu aplicación FMC.¡Recuerda que quieres dar una buena primera impresión!

Ahorra tiempo transformado los [Componentes del Banner de la Interfaz de Usuario (UI) de Le Wagon](https://uikit.lewagon.com/documentation#banner) en una página de inicio.

**Consejo**: Los Mini Programas WeChat Mini NO PUEDEN cargar una imagen de fondo (`background-image`) CSS con un archivo local (`local file`) dentro de tu directorio...
Es una restricción del framework para *hacer que tu aplicación se mantenga ligera.*¡En cambio debes cargar un archivo remoto (`remote file`) 🌏 y esto debe hacerse por medio de HTTPs!

Usemos algo de `inline CSS` en el atributo style="":


```
<view class="banner" style="height: 100vh; background-image: linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(https://www.lewagon.com/api/v1/cities/shenzhen/cover?width=1200);">
</view>
```

