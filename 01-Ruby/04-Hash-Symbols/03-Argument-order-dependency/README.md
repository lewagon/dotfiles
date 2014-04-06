## Background & Objectives
The order in which arguments are called in a method can often be a source of errors. Hence, for passing a list of options for instance, many methods use a hash instead of passing the different option's values one by one in an ordered way.. As the hash bracket `{}` are optional on the final argument of a method, it makes method call a bit magic !!


## Specs
- Implement `#better_refrain` that breaks the argument order dependency in `#refrain`

## Learning Badges
- Do you **really** understand why the `#better_refrain` is a more flexible implementation ?
- In Rails, you will come across many ruby methods that take hash arguments because they are very convenient. First, they break the argument order dependency as we've seen. In addition, they have a very lexical flavor and calling methods quickly becomes as natural as writing in english. 
- Consider for instance a Rails expression like `link_to "Sign In", action: "new", controller: "sessions", class: "blue-lnk"`. Could we suspect that it's just a basic method call with hash arguments ? If you are curious, go and see for yourself [the doc on link_to](http://api.rubyonrails.org/classes/ActionView/Helpers/UrlHelper.html#method-i-link_to) to see its various signatures.