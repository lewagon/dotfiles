# Vim Cheat Sheet

Ctrl + i --> indentation

Ctrl + n --> set/unset relative number

## Plugin Vim Rails

Action | Snippet |
--- | --- |
In a model file go to the schema | `:R` |
In a model file go to the test | `:A` |
Ouvrir le model dans les tests | `:RVmodel` |
Ouvrir les routes | `:Einit` |
Met le code dans une partial | `:Extract name` |
Create model | `:Emodel name!` |
Aller dans le controlleur | `:Econ names` |
Create controller | `:Generate controller Blog` |
Console | `:Rails console` |
Aller dans les vues | `:Eview floder/files` |
Related files | `:R` |
Faire tourner les tests | `:Rails` |

## Plugin Vim Commentary

Action | Snippet |
--- | --- |
comment line | `gcc` |
comment paragraph | `gcap` |
comment specific line | `:7,17Commentary` |

## Plugin Vim Surround

Action | Snippet |
--- | --- |
Change surrounding `"` to `'` | `cs"'` |
Change surrounding line with a tag | `ysst` |
Delete surrounding tag | `dst` |
Change surrounding tag by other tag | `cstt` |
Change surrounding word with `"` | `csiw"` |
Surrounding word with `"` | `ysiw"` |
In visual mode | `s` |

## Plugin Vim Tabularize

Before always select lines in visual mode

Action | Snippet |
--- | --- |
Aligner avec une regex | `:Tabularize /regex` |
Aligner avec une regex | `:Tab /regex` |
Aligner après un égale | `:Tab /=.*` |
Aligner après un égale | `\=` |
Aligner du css | `\:` |

## Plugin NerdTree

Action | Snippet |
--- | --- |
Close parent node | `x` |
Go to last child | `J` |
Go to first child | `K` |
Go to parent | `p` |
Open and split | `i` |
Open and vertical split | `s` |
Open NerdTree | `:NERDTreeToggle` |
Open NerdTree | `ctrl + g` |
Refresh the current directory with new files | `r` |
Refresh the NerdTree directory with new files | `R` |