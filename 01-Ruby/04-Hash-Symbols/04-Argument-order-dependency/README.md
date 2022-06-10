## Background & Objectives

The order in which arguments are called in a method can often be a source of errors - you have to get it exactly right. This is **order dependency**, and it's a pain.

The great thing about using a hash instead is that it eliminates this dependency. The order no longer matters, because the code just searches for the key and then takes its associated value.

## Specs

- Implement `#better_refrain` to break the argument order dependency in `#refrain`

## Key learning points

- Do you **really** understand why the `#better_refrain` is a more flexible implementation? Try explaining it to your buddy.
