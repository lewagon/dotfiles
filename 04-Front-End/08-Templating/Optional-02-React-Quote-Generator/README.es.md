## Antecedentes y objetivos

¡Más React en este ejercicio!

[React](https://reactjs.org/) es una biblioteca de JavaScript para construir interfaces de usuario. Es una biblioteca muy popular, utilizada por Facebook, Instagram, Netflix, Airbnb y muchas otras empresas. Las aplicaciones de React están compuestas por componentes: una pieza de la interfaz de usuario que tiene su propia lógica y apariencia.

En este ejercicio, construirás una aplicación Generadora de Citas utilizando las citas de esta [API](https://type.fit/api/quotes). Aprenderás cómo:

- Importar y utilizar React en nuestro proyecto
- Crear un componente de React
- Renderizar componentes en nuestra aplicación

## Configuración

Necesitamos React, así que debemos importar el framework de React y [React DOM](https://reactjs.org/docs/react-dom.html). Por último, los componentes de React a menudo se escriben en JSX, pero como no tenemos un compilador en nuestro proyecto, lo haremos a la manera de Rails e importaremos [htm](https://github.com/developit/htm), que nos permite escribir un syntax similar a JSX en JavaScript plano.

En la cabecera de nuestro proyecto, ya tenemos estos paquetes:

```html
<script
  type="application/javascript"
  src="https://unpkg.com/react@17.0.0/umd/react.production.min.js"
></script>
<script
  type="application/javascript"
  src="https://unpkg.com/react-dom@17.0.0/umd/react-dom.production.min.js"
></script>
<script
  type="application/javascript"
  src="https://unpkg.com/babel-standalone@6.26.0/babel.js"
></script>
```

## Nuestro primer componente

Nuestro archivo `lib/index.jsx` ya está configurado para renderizar un componente `App`:

```js
const App = () => {
  const message =
    "Si ves este mensaje en tu navegador, significa que React se montó correctamente. 🙌";

  return <div id="quoteGeneratorContainer">{message}</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
```

¡Ahora vamos a lanzar nuestro servidor! ¡Deberías ver un mensaje de que React se montó correctamente! 🥳

## Generador de Citas

Ahora que nuestra aplicación está ejecutándose y se ha creado nuestro primer componente pequeño, ¡construyamos nuestra aplicación!

### Componente Quote

Creemos un componente `Quote` en el archivo `lib/index.jsx` (debes colocarlo antes del componente `App`). Este componente será una tarjeta de cita, con la cita y el autor. Utilizaremos un elemento `div` para crear la tarjeta, y utilizaremos un elemento `p` para la cita y un elemento `span` para el autor.

```js
const Quote = () => {
  return (
    <div>
      <p>
        <span>“</span>
        La genialidad es un uno por ciento de inspiración y un noventa y nueve por
        ciento de transpiración.
        <span>“</span>
      </p>
      <span>- Thomas Edison</span>
    </div>
  );
};
```

### Componente App

Ahora editemos el componente `App` para renderizar el componente `Quote`.

```js
const App = () => {
  return (
    <div id="quoteGeneratorContainer">
      <Quote />
    </div>
  );
};
```

¡Recarga la página y deberías ver nuestra cita aparecer! 🥳

Mejoremos el componente `App` para renderizar las citas y también tener un botón para obtener una nueva cita. Utilizaremos un elemento `div` para el contenedor y un elemento `button` para el botón.

```js
const App = () => {
  return (
    <div id="quoteGeneratorContainer">
      <div className="container">
        <Quote />
        <button className="btn btn-primary mt-3">Más inspiración</button>
      </div>
    </div>
  );
};
```

Agreguemos algo de estilo (en `style.css`) a nuestro contenedor y elemento raíz para que nuestras citas se vean bien:

```css
#root {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e6cba1;
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
}

.container {
  width: 550px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 40px;
  font-size: 1.3rem;
}
```

Recarga la página. ¡Nuestra aplicación debería verse mejor!

### Obteniendo las citas

Una cita está bien, ¡pero sería mejor si pudiéramos obtener una selección de citas de la API! Utilizaremos la función `fetch` para hacerlo. Crearemos un hook `useEffect` para obtener las citas cuando el componente se monte. Almacenaremos las citas en un estado `quotes`, y utilizaremos el hook `useState` para hacerlo.

**Recursos:**

- [`React.useState`](https://beta.reactjs.org/reference/react/useState) nos permite agregar una variable de estado a nuestro componente. Aquí almacenaremos el array de citas, con un array vacío `[]` como valor predeterminado.
- [`React.useEffect`](https://beta.reactjs.org/reference/react/useEffect) nos permite salir de React, para utilizar un sistema externo, en este caso una API, en nuestro componente.

```js
// [...]
const App = () => {
  const [quotes, setQuotes] = React.useState([]);
  console.log("Citas: ", quotes);

  React.useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) => setQuotes(data));
  }, []);

  return (
    <div id="quoteGeneratorContainer">
      <div className="container">
        <Quote />
        <button className="btn btn-primary mt-3">Más inspiración</button>
      </div>
    </div>
  );
}
```

Revisa la consola, ¡deberías ver las citas cargadas en el componente `Quote`! Ahora están guardadas en el estado de nuestro componente `Container`.

Creemos una función para obtener una cita aleatoria dentro del array. Ya hemos visto cómo obtener un número aleatorio en JavaScript durante la lección de HTTP y API. Utilizaremos la función `Math.random` para obtener un número aleatorio entre 0 y 1, y lo multiplicaremos por la longitud del array para obtener un índice aleatorio.

```js
// [...]

const getRandomQuote = (quotes) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

// [...]
```

También necesitamos agregar un estado adicional a nuestra aplicación para poder establecer una cita y saber cuál estamos mostrando actualmente.

Podemos añadirlo con:

```js
const [currentQuote, setCurrentQuote] = React.useState(null); // Añade esta línea
```

Ahora tenemos un estado `currentQuote`, `null` de forma predeterminada porque las citas aún no se han cargado.

Creemos otra función `getNewQuote()` que obtenga una cita aleatoria y la establezca como la cita actual.

```js
const getNewQuote = (quotes) => {
  const newQuote = getRandomQuote(quotes);
  setCurrentQuote(newQuote);
};
```

Utilicémoslo desde `React.useEffect`, una vez que tengamos todas las citas disponibles, para tener una cita aleatoria cuando carguemos la página:

```js
console.log("currentQuote: ", currentQuote);
React.useEffect(() => {
  fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((data) => {
      setQuotes(data);
      getNewQuote(data);
    });
}, []);
```

¡Ahora tenemos una cita aleatoria cuando cargamos la página! 🎉 Pero aún no aparece en nuestra página, solo podemos verla en la consola.

En lugar de nuestra cita codificada en duro en el componente `Quote`, usemos la cita almacenada en el estado `currentQuote`.

```js
const Quote = ({ quote }) => {
  return (
    <div className="quote">
      <p className="quote-text">
        <span>“</span>
        {quote.text}
        <span>“</span>
      </p>
      <span className="quote-author">- {quote.author}</span>
    </div>
  );
};
```

y pasemos la cita al componente como una `prop`. En ReactJS, las `props` son un tipo de objeto donde se almacena el valor de los atributos de una etiqueta. En nuestro caso, pasaremos la `currentQuote` como una `prop` al componente `Quote`.

```js
// components/App.js
// [...]

const App = () => {
  // [...]
  return (
    <div className="container">
      <Quote quote={currentQuote} />
      <button className="btn btn-primary mt-3">Más inspiración</button>
    </div>
  );
};
```

Recarga la página. Aún obtenemos un error porque la `currentQuote` es `null` al principio, e intentamos acceder a las propiedades `text` y `author` de `null`.

Podemos solucionarlo agregando una condición al componente `Quote`, para mostrar un mensaje de carga si la cita es `null`:

```js
const Quote = ({ quote }) => {
  if (quote === null) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="quote">
      <p className="quote-text">
        <span>“</span>
        {quote.text}
        <span>“</span>
      </p>
      <span className="quote-author">- {quote.author}</span>
    </div>
  );
};
```

Ahora recarga la página, ¡y verás una cita aleatoria!

### Agregar un botón para obtener una nueva cita aleatoria

Ya hemos agregado un botón en nuestro componente App, así que agreguemos una función cuando hagamos clic en él para obtener una nueva cita.

Para hacerlo, podemos vincular nuestra función existente `getNewQuote` al evento `onClick` del botón:

```js
const App = () => {
  // [...]
  return (
    <div className="container">
      <Quote quote={currentQuote} />
      <button
        className="btn btn-primary mt-3"
        onClick={() => getNewQuote(quotes)}
      >
        Más inspiración
      </button>
    </div>
  );
};
```

Ahora haz clic en el botón para ver una nueva cita aleatoria cada vez. 🚀

## Agrega estilo

Siéntete libre de jugar con el estilo de la aplicación para que se vea aún mejor o ¡agrega un título! 💅

## Continuando

- [Documentación de React](https://reactjs.org/docs/getting-started.html)
- [Tutorial oficial de React](https://beta.reactjs.org/learn) si te gustó este ejercicio y quieres profundizar después del bootcamp.
