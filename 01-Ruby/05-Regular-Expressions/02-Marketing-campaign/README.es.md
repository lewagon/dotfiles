## Contexto y Objetivos

Los correos electrónicos son el alma de cualquier negocio Software como un Servicio (SaaS - software as a service). Es super importante ser capaz de manipularlos programáticamente.

En la mayoría de las páginas web, los correos electrónicos son claves en la creación de cuentas. Si se deletrea mal, el/la usuario/la no podrá recuperar su clave de acceso. Desde la perspectiva del comerciante, es necesario comunicarse con los/as usuarios/as y mantener una base de datos de contactos fiable con correos electrónicos válidos.

## Contexto
En este desafío asumimos que lanzarás una aplicación en algunas semanas. ¡Informarás a todo el mundo por medio de una campaña de correo electrónico tan pronto la página web esté en línea! Mientras tanto usarás una página de inicio que has creado para recolectar direcciones de correo electrónico.

![Escenario](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-scenario.svg?sanitize=true)


## Especificaciones
### Recolectar direcciones de correo electrónico válidas

![Recolectar direcciones de correo electrónico válidas](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step1.svg?sanitize=true).

Tu página de inicio está lista. Ahora quieres asegurarte de que las personas que la visiten envíen una dirección de correo electrónico válida.

Escribe el método `valid?` que devuelva el booleano adecuado dependiendo de la validez de la dirección de correo electrónico:
- identifica las distintas partes de una dirección de correo electrónico y escribe una expresión regular que coincida con la dirección de correo electrónico clásica.
- escribe una expresión regular simple ¡No es necesario que sea perfecta (es imposible escribir una regexp perfecta para direcciones de correo electrónico)!

**Advertencia:** Las expresiones regulares no son lo suficientemente detalladas para validar la conformidad de las direcciones de correo electrónico al 100% como verás en [esta discusión en Stackoverflow](https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression) y en [esta pagina web](https://uibakery.io/regex-library/email). En el entorno profesional, se le da preferencia a servicios externos como el que provee [Sendgrid](https://sendgrid.com/solutions/email-api/email-address-validation-api/) o [Mailgun](https://www.mailgun.com/email-validation/) ya que usan una gran base de datos y el aprendizaje automático (machine learning) para determinar si una dirección es válida.


#### Patrón de una dirección de correo electrónico

Toda dirección de correo electrónico es una asociación de un **usuario** con un **nombre de dominio**. La misma sigue el siguiente patrón:

![Patrón de una dirección de correo electrónico](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email.svg?sanitize=true)


##### Nombres de dominio

El Dominio de Nivel Superior, también conocido como TLD es el último grupo de caracteres del nombre de dominio, justo después del **punto** y se puede escoger a partir de una lista estándar. Uno muy común en páginas web comerciales es `.com` pero también debes haber escuchado de los históricos TLDs como `.net` y `.org`.

Las categorías principales son:

- gTLD: dominios genéricos (generic top-level domains ) como `.com`, `.net`, `.org`)
- ccTLD: dominios de nivel superior para países (country code top level domain) como `.fr`, `.de`, `.jp`.

Pero hay [muchos más](https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains)


### Limpieza de la base de datos

![Limpia la base de datos](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step2.svg?sanitize=true)

Ya han pasado algunos días y tu base de datos ya contiene algunos contactos útiles. Tu equipo de mercadeo obtiene más data por medio de un profesional para ampliar la audiencia. Antes de lanzar la campaña de correo electrónico debes limpiar la base de datos para excluir cualquier dirección de correo electrónico inválida.

Escribe el método  `clean_database`:
- toma un arreglo (array) de direcciones de correo electrónico
- devuelve un arreglo (Array) con únicamente direcciones válidas.

### Estadística básica

![Arma la estadística](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step3.svg?sanitize=true)

Tu página de inicio tiene un formulario simple que solo obtiene las direcciones de correo electrónico de los contactos. No sabes mucho de tus clientes pero puedes deducir información a partir de las direcciones de correo electrónico. Decides armar la estadística de Dominios de Nivel Superior (TLDs - Top Level Domains).

Escribe el método `group_by_tld` que devuelva un Hash con las direcciones de correo electrónico agrupadas por TLD.

Ejemplo:

```ruby
{
  com:  ["julien@mdn.com"],
  de: ["dimitri@berlin.de"],
  fr: ["kevin@yahoo.fr", "edward@gmail.fr"]
}
```


### Campaña de correo electrónico

![Campaña de correo electrónico](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step4.svg?sanitize=true)

Ahora estás trabajando en el cuerpo del email y quieres personalizarlo. Empezar con “Dear customer” no se ve bien así que vas a extraer el nombre de usuario de la dirección de correo electrónico y comenzar con “Dear Seb”.

Escribe el método `compose_email`  que:
 - extraiga el nombre de usuario, dominio y TLD de la dirección de correo electrónico
- devuelva un `Hash` con el siguiente formato:

```ruby
{
  username: seb,
  domain: lewagon,
  tld: com
}
```

### (Opcional) Traduce con `locales`

La estadística que armaste sobre Dominios de Nivel Superior (TLDs) muestra que muchos de los clientes son de Alemania y Francia. Por lo tanto pides la traducción a esos dos idiomas. Los traductores te han dado lo siguiente:

```ruby
LOCALES = {
  en: {
    subject: "Our website is online",
    body: "Come and visit us!",
    closing: "See you soon",
    signature: "The Team"
  },
  fr: {
    subject: "Notre site est en ligne",
    body: "Venez nous rendre visite !",
    closing: "A bientot",
    signature: "L'équipe"
  },
  de: {
    subject: "Unsere Website ist jetzt online",
    body: "Komm und besuche uns!",
    closing: "Bis bald",
    signature: "Das Team"
  }
}
```

Escribe el método `compose_translated_email`:
- extrae el nombre de usuario, dominio y TLD de la dirección de correo electrónico
- deduce el idioma del usuario a partir del TLD
- sustituye las partes del texto con la traducción correspondiente
- devuelve un `Hash` con el siguiente formato:


```ruby
{
  username: seb,
  domain: lewagon,
  tld: com,
  subject: "Our website is online",
  body: "Come and visit us!",
  closing: "See you soon",
  signature: "The Team"
}
```
