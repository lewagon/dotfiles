## Background & Objectives
The order in which arguments are called in a method can often be a source of errors. Hence, for passing a list of options for instance, many methods use a hash instead of passing the different option's values one by one in an ordered way.. As the hash bracket `{}` are optional on the final argument of a method, it makes method call a bit magic !!


## Specs
- Implement `#better_refrain` that breaks the argument order dependency in `#refrain`