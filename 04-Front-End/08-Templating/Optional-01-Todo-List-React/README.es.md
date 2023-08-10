## Antecedentes y objetivos

¡Bienvenido a tu primer ejercicio de React!

[React](https://reactjs.org/) es una biblioteca de JavaScript para construir interfaces de usuario. Es una biblioteca muy popular, utilizada por Facebook, Instagram, Netflix, Airbnb y muchas otras empresas. Las aplicaciones de React están compuestas por componentes: una parte de la interfaz de usuario que tiene su propia lógica y apariencia.

Aprenderás lo básico de React construyendo una aplicación de lista de tareas, con la cual podrás hacer lo siguiente:

- Ver todos tus elementos de la lista de tareas
- Agregar un elemento de la lista de tareas (opcional)
- Eliminar un elemento de la lista de tareas (opcional)

(Sí, ¡esta es la misma funcionalidad que en el desafío de Vue! 💪)

![](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/to-do-list-vue-user-flow.gif)

### Configuración

#### React

React utiliza una sintaxis especial llamada [JSX](https://react.dev/learn/writing-markup-with-jsx), que es un lenguaje de plantillas que nos permite escribir fácilmente expresiones de JavaScript dentro de nuestro HTML. La sintaxis es un poco diferente al JavaScript estándar (lo veremos enseguida). Lo bueno es que la sintaxis es bastante simple. Sin embargo, los navegadores no pueden leer archivos JSX de forma predeterminada. Por lo tanto, debemos convertirlos en archivos JS "normales" antes de poder ejecutarlos en el navegador.

Por lo general, los desarrolladores utilizan lo que se llama un **empaquetador** como [Webpack](https://webpack.js.org/) para procesar todos los archivos y convertirlos en JavaScript "normal" que los navegadores puedan leer. Esto requiere instalar muchas cosas adicionales, por lo que evitaremos esta complejidad solo por el bien de este desafío.

En su lugar, vamos a cargar algunos scripts externos que instalarán React y procesarán nuestros archivos por nosotros:

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

Las dos primeras bibliotecas son React en sí mismo. La tercera es Babel, que puede procesar nuestros archivos JSX por nosotros. Es posible que notes esta línea al final de nuestro archivo `index.html`:

```html
<script src="lib/to-do-list.jsx" type="text/babel"></script>
```

El `type="text/babel"` le indica a Babel que procese nuestro JavaScript. Entonces, deberíamos poder escribir JSX 💪 Puede que notes que estamos importando nuestros scripts de una manera ligeramente diferente en este desafío en comparación con los demás, porque esta configuración no es compatible con los import maps en este momento. Pero no te preocupes, esto no afectará el código que escribirás.

_[Nota: Esto significa que Babel convierte nuestro JSX en JS **dentro** del navegador del usuario. Esto no es eficiente porque idealmente convertiríamos todo de antemano. En otras palabras, esta configuración "ligera" es perfecta para propósitos de este desafío, pero una aplicación de producción real requeriría una configuración adicional.](https://babeljs.io/docs/babel-standalone#when-not-to-use-babelstandalone)_

Lanzaremos un servidor web local ejecutando:

```bash
serve
```

Luego, abre [`localhost:8000`](http://localhost:8000) en tu navegador. Si ves un mensaje sobre React, entonces tu proyecto está configurado con React.

## La aplicación de lista de tareas

### Calentamiento de React

Echa un vistazo al archivo `lib/to-do-list.jsx`.

```js
const App = () => {
  const message =
    "Si ves este mensaje en tu navegador, eso significa que React se ha montado correctamente! 🙌";

  return <div id="app">{message}</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
```

Se crea una instancia de React con la función `ReactDOM.render`. Programarás tu componente dentro de `App()`.

`ReactDOM.render` coloca los resultados del código de React en el DOM. No necesitarás cambiar esa línea, ya que conecta el código de React al elemento `<div id="root">` que ya está incluido en el archivo `index.html`.

Nuestra función `App()` es donde colocaremos la mayor parte del código. Es un [componente](https://react.dev/learn/your-first-component) en React, que es una función que devuelve HTML. Observa el código de la plantilla que coloca la variable de cadena `message` dentro de un `<div>` de esta manera:

```html
<div id="app">{message}</div>
```

Esto es sintaxis JSX. En esencia, solo debes agregar `{}` a tu HTML siempre que desees escribir una expresión de JavaScript. Por ejemplo, esto también funcionaría:

```html
<div id="app">La suma es {2 + 4}</div>
```

### 1. Ver todos los elementos de la lista de tareas

#### Datos

<details>
<summary markdown='span'>En una aplicación de React, ¿dónde colocamos los datos de los elementos de la lista de tareas?</summary>

Tienes los mismos elementos de la lista de tareas en un arreglo.

```js
[
  { title: "Codificar una lista de tareas", done: false },
  { title: "Desayunar", done: true },
  { title: "Hacer ejercicio", done: false },
  { title: "Regar las plantas", done: true },
];
```

Estos son datos que podrían cambiar con el tiempo. Por ejemplo, podríamos querer agregar o eliminar un elemento de nuestro arreglo de elementos de la lista de tareas en el futuro. ¿Cómo manejamos los datos cambiantes en React?

Utilizamos la función [`React.useState`](https://react.dev/reference/react/useState). Esta es una función de React, o, como le gusta llamarlo a la gente de React, un [hook](https://react.dev/reference/react), que nos permite definir variables cuyos valores podrían cambiar en nuestra aplicación.

Cambiamos nuestra función `App()` de la siguiente manera:

```js
const App = () => {
  const [todos, changeTodos] = React.useState([
    { title: "Codificar una lista de tareas", done: false },
    { title: "Desayunar", done: true },
    { title: "Hacer ejercicio", done: false },
    { title: "Regar las plantas", done: true },
  ]);

  return <div id="app"></div>;
};
```

Este código significa que ahora tendremos acceso a dos variables: `todos`, que es simplemente el arreglo de tareas, y `changeTodos`, que es una función que podemos llamar cuando nuestro arreglo cambie (por ejemplo, si queremos agregar o eliminar un elemento). Dado que de momento solo nos preocupamos por _leer_ nuestras tareas, no crear, editar o eliminarlas, no usaremos mucho `changeTodos` en este momento 😌

</details>

#### Representación de lista

<details>
<summary markdown='span'>¿Cómo renderizamos dinámicamente la lista?</summary>

En React, utilizas `{}` siempre que quieras poner JavaScript dentro de tu HTML. En JavaScript normal, si quisiéramos imprimir cada elemento de una lista, tendríamos que usar **iteración**. ¡Resulta que en React, puedes usar la iteración como en JavaScript normal! El operador más común es la función `map`. La razón de esto es que `map` retorna un arreglo (en este caso de elementos JSX), y JSX admite la adición de un arreglo de elementos al DOM.

Aquí tienes un ejemplo de cómo funciona:

```js
function App() {
  const [items, changeItems] = React.useState([
    "manzana",
    "plátano",
    "naranja",
  ]);

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default App;
```

</details>

Esto mostraría una lista de las 3 frutas 🍎

Tal vez te preguntes qué significa `key`. React prefiere que le des una clave única para cada elemento sobre el que iteras. Esto le ayuda a realizar un seguimiento si se agregan/eliminan elementos o si cambia el orden. Es similar a cómo asignamos un ID único a cada registro en la base de datos. No nos preocuparemos demasiado por esto hoy💆 Si estás interesado, lee más sobre [por qué React necesita claves](https://react.dev/learn/rendering-lists#why-does-react-need-keys). En este ejemplo, utilizaremos el índice del elemento en el arreglo.

¿Puedes usar este código de ejemplo como guía para averiguar cómo podrías mostrar cada elemento en `todos` en el DOM?

#### Vinculación de atributos

<details>
<summary markdown='span'>¿Cómo vinculamos `done` con la casilla de verificación?</summary>

React facilita la definición de atributos HTML en la sintaxis JSX:

```js
function App() {
  const shouldBeChecked = true;

  return <input type="checkbox" checked={shouldBeChecked} />;
}

export default App;
```

Todo lo que tenemos que hacer es utilizar `{}` para escribir JavaScript como valor de `checked` en nuestra casilla de verificación.

¿Puedes utilizar este principio para que tus casillas de verificación coincidan dinámicamente con el valor de `done` en cada una?

</details>

### 2. Agregar un to-do (Opcional)

<details>
<summary markdown='span'>¿Qué sucede cuando un usuario agrega un to-do?</summary>

1. El usuario completa el título del to-do.
2. El usuario hace clic en un botón.
3. El to-do se agrega y aparece en la lista.

Cuando se hace clic en el botón, la aplicación de React debe encargarse de obtener los datos y agregarlos a la lista. Crearemos una función en JavaScript llamada `addTodo()` para encargarse de todo esto.

Para hacer esto, crearemos una nueva variable `title` usando el hook `useState` que se actualizará cada vez que el usuario escriba en el campo de entrada (usando el evento `onChange`).

```js
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [title, setTitle] = React.useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const addTodo = () => {
    console.log("Agregando un to-do...");
    // TODO: agregar un nuevo to-do basado en el título al array `todos`
    setTitle("");
  };

  return (
    <div id="app">
      <h1>Lista de Tareas</h1>
      <form>
        <label htmlFor="todoTitle">Título:</label>
        <input
          type="text"
          id="todoTitle"
          value={title}
          onChange={handleTitleChange}
        />
        <button type="button" onClick={addTodo}>
          Agregar To-Do
        </button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

_Sugerencia: Potencialmente puedes usar el [operador de propagación](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax) de JavaScript para ayudarte en esta parte. El operador de propagación es útil si deseas tomar un array existente y generar un nuevo array con un elemento adicional. Aquí tienes un ejemplo de sintaxis:_

```js
const frutas = ["manzana", "plátano", "naranja"];
const frutasYVerduras = [...frutas, "pepino", "pimiento"];
// el valor de frutasYVerduras será ['manzana', 'plátano', 'naranja', 'pepino', 'pimiento']
```

</details>

#### Vinculación de eventos

`addTodo()` debe ser activado cuando se hace clic en el botón de agregar.

<details>
<summary markdown='span'>¿Cómo podemos vincular el evento de clic al botón?</summary>

Podemos usar el atributo `onClick` en nuestro elemento `<button>`.

```html
<button type="button" onClick="{addTodo}">Agregar To-Do</button>
```

¿Puedes ver el `console.log` que agregaste en tu método en la consola del navegador? Si es así, ¡entonces el evento está vinculado correctamente!

</details>

##### Pseudo-código para addTodo()

1. Construir un objeto to-do basado en la entrada del usuario.
2. Agregarlo a la lista de `todos`.

En React, si solo cambias el valor de `todos` como `todos = ALGO_DIFERENTE`, no funcionará. Deberás usar la función `changeTodos`.

Por ejemplo, el siguiente código establecería nuestros `todos` como un array vacío `[]`:

```js
changeTodos([]);
```

Ahora, en lugar de establecerlo como un array vacío, ¿puedes establecerlo como un nuevo array que contenga **todos los to-dos existentes** Y **el nuevo to-do que queremos agregar**?

</details>

### 3. Eliminar un to-do (Opcional)

Primero, asegúrate de agregar un botón de eliminar (delete) al elemento del to-do. Puedes usar el [botón de cierre de Bootstrap](https://getbootstrap.com/docs/5.0/components/close-button/) o el [ícono de basura de FontAwesome](https://fontawesome.com/search?q=trash&o=r).

El resto es muy similar a agregar un to-do. Aprovecha [la documentación de React](https://reactjs.org/docs/getting-started.html) para implementar los siguientes pasos:

1. Vincula un evento al botón de eliminar que active un método.
2. El método elimina el to-do de `todos`.

<details>
<summary markdown='span'>Pregunta y sugerencia</summary>

❓ ¿Cómo sabe este método qué to-do eliminar?
❓ ¿Cuál es el identificador único de cada to-do? Puedes usar esto para identificar qué to-do eliminar.

💡 Puedes pasar un argumento a un método.
💡 Tienes acceso a `index` en `map`.

</details>

## Avanzando

- [Documentación de React](https://es.reactjs.org/docs/getting-started.html)
- [Línea de aprendizaje oficial de React](https://beta.reactjs.org/learn) si te gustó este ejercicio y quieres profundizar después del bootcamp.
