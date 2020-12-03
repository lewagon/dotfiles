## Contexto y Objetivos

Google Chrome es muy popular hoy en día, ¿no? Creemos el nuestro, un buscador de línea de comando. La idea es preguntarle al usuario una URL, ir a recuperar el contenido y luego mostrarlo.

## Especificaciones

Crea una clase `Browser` en el archivo `lib/browser.rb` para que al correr el siguiente script, puedas obtener un buscador cool e interactivo de línea de comando:

```bash
./lib/run.rb
```

Analiza el programa que te damos en  `lib/run.rb` para que entiendas cuáles son los métodos tu clase `Browser` debe exponer. **Solo queremos mostrar** el texto de las páginas web, no el markup como `<h1>`, `<p>`, etc.

## Sugerencias adicionales

Tal vez quieras utilizar [OpenURI](http://www.ruby-doc.org/stdlib-2.2.0/libdoc/open-uri/rdoc/OpenURI.html) y [Nokogiri](http://www.rubydoc.info/github/sparklemotion/nokogiri). Para asegurarte que estas gemas ya las tienes instaladas, solo corre lo siguiente:

```bash
gem install nokogiri
```
