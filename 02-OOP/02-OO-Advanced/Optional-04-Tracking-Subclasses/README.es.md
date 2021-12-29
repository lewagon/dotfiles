## Contexto y Objetivos

Practiquemos un poco la herencia. En Ruby, puedes llamar ancestros (`ancestors`) sobre una Clase para obtener una lista de todos sus padres. Échale un vistazo a [esta pregunta](http://stackoverflow.com/questions/19045195/understanding-ruby-class-and-ancestors-methods) y a la respuesta recomendada en Stack Overflow para entender el concepto de jerarquía de clase.

## Especificaciones

Para este ejercicio, queremos hacer lo contrario. Tenemos una clase madre (`Mother`) que debe poder llamar a sus descendientes. Digamos que tienes dos clases: hija (`Daughter`) e hijo (`Son`) con el método de clase teléfono (`phone`). Luego:

```ruby
Mother.phone_kids
# => should call Daughter.phone and Son.phone
```

Las especificaciones te suministran dos clases hijos de Madre (`Mother`), así que solo debes implementar el método de clase `phone_kids`. Tal vez necesites el método [`inherited`](https://ruby-doc.org/core-2.7.5/Class.html#method-i-inherited) de `Class`.
