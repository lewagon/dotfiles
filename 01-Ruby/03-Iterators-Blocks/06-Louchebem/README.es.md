## Contexto y Objetivos

Estás tomándote un trago con un emprendedor francés y él/ella te dice “¡Tengo una idea increíble: quiero hacer que la gente vuelva a hablar louchebem!” Ahora tienes que ayudarlo/s 😊

## Un poco de historia

* Louchébem es una jerga francesa que originalmente hablaban los carniceros parisinos. Lee [este artículo](https://en.wikipedia.org/wiki/Louch%C3%A9bem) para obtener un poco más de información al respecto.
* Es muy simple, consideremos una palabra normal francesa como **"PATRON"**. Sustituyes el segundo grupo de consonantes (las letras antes de la primera vocal) por “L”. Luego mueves ese primer grupo de consonantes hacia el final de la palabra, seguido de uno de los sufijos Louchébem e.g. -EM. **Así que "PATRON" se convierte en "LATRONPEM".** Fácil, ¿no? 😉
* Pregúntate cuáles serán los problemas principales durante la creación del traductor (la selección del sufijo final, cómo manejar el inicio de las palabras, los escenarios que habrán en una entrada de datos determinada ...).

### Escribe el pseudocódigo

El pseudocódigo se utiliza principalmente para comunicar la esencia de un algoritmo sin entrar en los detalles de una sintaxis determinada. Un/a buen/a programador/a puede tomar un pseudocódigo bien escrito y traducirlo a código funcional en el lenguaje de su preferencia.

* Escribe el pseudocódigo de tu traductor Louchébem.
* Empieza por algo simple como un programa que solo pueda traducir una sola palabra francesa a Louchébem.
* Luego llevalo a oraciones.

¿Sabías que las expresiones francesas populares:  "larfeuille", "loufiah", "loucedé", o "loufoque" son expresiones Louchébem?

## Especificaciones

- **limitación**: No debes traducir palabras de una letra (monolíteras).
- **limitación**: Cuando la palabra comience con una consonante ("chat", "trou"), tendrás que tomar el primer **grupo de consonantes** (todas las letras antes de la primera vocal) y moverlo al final de la palabra ("chat" debe resultar en "latchem", o "latchoc").
- **limitación**: No debes modificar las palabras que empiecen con vocales pero debes agregar `l` al inicio de las mismas y un sufijo al final  ("atout" debe resultar en  "latoutoc" o  "latoutic").
- **limitación**: El sufijo aleatorio debe ser uno de los siguientes: `["em", "é", "ji", "oc", "ic", "uche", "ès"]`.
- **mejora**: Idealmente tu programa debería ser capaz de traducir cualquier oración complicada, sin importar su puntuación.

## Sugerencias y recursos adicionales

- Ya todos conocemos el método `#split` pero ¿sabías que también puedes pasar un patrón de string como argumento del método `split` ? Por ahora no te preocupes por eso ya que pronto veremos Expresiones Regulares. Mientras tanto, intentemos con `"hello, friend!!".split(/\b/)` en irb, ¿Te das cuenta de lo útil que será para mejorar el ejercicio posteriormente? 😉
- Tu pseudocódigo debe seguir [estos principios](http://www.cs.cornell.edu/courses/cs211/2000fa/materials/using_pseudo_code.htm)
