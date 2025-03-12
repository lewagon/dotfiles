## Antecedentes y objetivos

Cuando construyes una aplicación, es posible que necesites mostrar algunos datos con gráficos. Para ello, generalmente usamos la biblioteca [_Chart.js_](https://www.chartjs.org/docs/latest).

Divirtámonos un poco y mostremos algunas estadísticas mundiales (proporción de género, población año tras año, comunidades religiosas en el mundo).

## Configuración

Ejecuta el servidor desde tu terminal usando:

```bash
serve
```

Y visita `localhost:8000`. Verás que estamos usando Bootstrap.

`Stimulus` ya está configurado en la parte superior de `index.html`.

Sin embargo, aún necesitas encargarte de instalar la parte de JavaScript tú mismo. En este ejercicio, crearemos un controlador separado para cada tipo de gráfico.

-  Importa y registra el controlador de Stimulus en `index.js`.
-  Crea tu archivo de controlador en la carpeta `controllers` y no olvides comenzar con el boilerplate del controlador de Stimulus.

Si tienes problemas para recordarlo, ¿qué tal si echas un vistazo a ejercicios anteriores?

## Especificaciones

Importaremos el complemento `Chart.js` con `importmap`. `Stimulus` ya está añadido en el boilerplate, pero necesitarás agregar `Chart.js` tú mismo (instrucciones a continuación).

Luego, utilizaremos el complemento para implementar 3 tipos diferentes de gráficos en el ejercicio:

-  un [gráfico de donut (doughnut)](https://www.chartjs.org/docs/latest/charts/doughnut.html)
-  un [gráfico de línea (line)](https://www.chartjs.org/docs/latest/charts/line.html)
-  un [gráfico polar](https://www.chartjs.org/docs/latest/charts/polar.html)

Echa un vistazo a la documentación para comprender cómo funciona cada tipo.

### 1. Prepara tu HTML

Hay 3 secciones distintas en tu HTML. En cada una, mostrarás cada tipo de gráfico como se indica. Notarás que en el archivo `index.html` hay 3 encabezados: "Proporción de Género", "Población Mundial" y "Comunidades Religiosas". Queremos poner el gráfico para cada uno de ellos cerca de su respectivo encabezado.

_Nota: La estructura HTML ya está configurada para ti, pero tómate un momento para mirar el archivo y asegurarte de entenderlo._

### 2. Configura `Chart.js` con `importmap`

Primero, agreguemos estas 2 líneas en la lista `importmap`:

```html
{
  "imports": {
    ...,
    "chart.js": "https://ga.jspm.io/npm:chart.js@4.2.0/dist/chart.js",
    "@kurkle/color": "https://ga.jspm.io/npm:@kurkle/color@0.3.2/dist/color.esm.js"
  }
}
```

`Chart.js` necesita otra dependencia llamada `@kurkle/color` para funcionar, por eso la estamos importando también.

Luego, en tu `index.js`, agrega las siguientes líneas al principio de tu página:

```javascript
import { Chart } from "chart.js";
import * as Chartjs from "chart.js";
```

Estas líneas importarán todas las funciones de la biblioteca.

Y agregamos esto un poco más abajo en la página:

```javascript
const charts = Object.values(Chartjs).filter(
  (chart) => chart.id !== undefined
);
Chart.register(...charts);
```

Estas líneas [cargan todas las funciones para cada tipo de gráfico que Chart.js tiene disponibles](https://www.chartjs.org/docs/latest/getting-started/usage.html).

### 3. Comprende el complemento de Chart.js

Este es un [gráfico de donut (doughnut)](https://www.chartjs.org/docs/latest/charts/doughnut.html). Lo utilizaremos para representar la proporción de género a nivel mundial.

Según el [INED](https://www.ined.fr/en/everything_about_population/demographic-facts-sheets/faq/more-men-or-women-in-the-world/), a partir de 2020, el número de hombres y mujeres en el mundo era aproximadamente igual. Más precisamente, de cada 1,000 personas, 504 son hombres (50.4`) y 496 son mujeres (49.6`).

Construyamos un objeto JavaScript para representar estos datos:

```javascript
const poblacionMundial = {
  hombres: 504,
  mujeres: 496,
};
```

Este objeto se utilizará para construir los arrays `labels` y `data`, que son necesarios para que Chart.js renderice el gráfico. Aquí hay un ejemplo de cómo debería verse la estructura de datos (con algunos datos de muestra aleatorios):

```javascript
data = {
    datasets: [{
        data: [300, 50, 100]
    }],

    // Estos labels aparecen en la leyenda y en las herramientas cuando pasas el cursor sobre diferentes arcos
    labels: [
        'Rojo',
        'Amarillo',
        'Azul'
    ]
};
```

Aquí hay un ejemplo de cómo podríamos construir un gráfico de barras con Chart.js usando esos datos:

```javascript
const labels = ['Rojo', 'Azul', 'Amarillo']
const data = [300, 50, 100]

new Chart(this.element, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Mi primer conjunto de datos',
      data: data,
      backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  }
});
```

Basándonos en nuestro objeto `poblacionMundial`, ¿cómo puedes construir un array `labels` que contenga `"hombres"` y `"mujeres"` y un segundo array `data` que contenga `504` y `496`?

Echa un vistazo a los métodos existentes en los objetos de JavaScript como `Object.keys()` en la [documentación de MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) para tener una idea de cómo crear arrays basados en un objeto.

### 4. Implementa la lógica

Ahora que tienes una mejor comprensión de cómo funciona el complemento, vamos a implementar la lógica.

Asegúrate de vincular tu controlador de Stimulus y definir el objetivo correcto para renderizar tu gráfico.

Cada gráfico tendrá un controlador de Stimulus separado. Llamémoslo `DoughnutChartsController`.

En la parte superior de la página, importa el complemento `Chart.js`:

```javascript
// lib/controllers/doughnut_charts_controller.js
import { Chart } from "chart.js";
```

En tu método `connect()`:
-  crea tus 2 arrays `labels` y `data`
-  crea tu instancia de `Chart` con el `type`, `data` y `datasets` correctos (siempre consulta la documentación al usar bibliotecas externas)
-  pasa colores de fondo a tus `datasets` para cada etiqueta

💡 Una pregunta clave a considerar es cuándo debe renderizarse el gráfico. ¿Debería ser justo al cargar la página? ¿O después de que el usuario haga clic o interactúe con algo? Recuerda que el método `connect()` en Stimulus se activa cada vez que el controlador se conecta a la página, generalmente en la carga inicial. Esto debería ayudarte a determinar dónde poner la mayor parte de tu código.

Si es necesario, agrega un poco de CSS para reducir el tamaño del gráfico.

Si necesitas algo más, consulta las alternativas de `options` para los gráficos de donut de Chart.js.

### 5. Implementa el gráfico de línea

Para el gráfico de línea, seguiremos el mismo proceso. Esta vez, implementaremos el crecimiento de la población mundial año tras año desde 2010.

Utilicemos esta [recurso](https://www.worldometers.info/world-population/world-population-by-year/).

Crea un objeto `worldPopulation` con la siguiente estructura:

```javascript
const worldPopulation = {
  2020: 7794798739,
  // ahora te toca completar el resto del objeto hasta 2010
};
```

Luego, utiliza este objeto para construir tus arrays `labels` y `data`. Luego, implementa la instancia de `Chart` para renderizar el gráfico de líneas.

### 6. Implementa el gráfico de área polar

Echemos un vistazo a la página de [Wikipedia](https://en.wikipedia.org/wiki/List_of_religious_populations) sobre poblaciones religiosas en el mundo.

Seleccionemos 10 de ellos y construyamos un objeto:

```javascript
const worldReligions = {
  cristianismo: 2382000000,
  // ahora te toca completar el resto del objeto
};
```

Luego, reutilicemos la misma lógica que antes para implementar el gráfico de área polar.
