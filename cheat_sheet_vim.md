# Vim Shortcut

- (Plugin Vim Rails)[#plugin-vim-rails]
- (Plugin Vim Commentary)[#plugin-vim-commentary]
- (Plugin Vim surround)[#plugin-vim-surround]
- (Plugin Vim tabularize)[#plugin-vim-tabularize]
- (Plugin Vim fugitive)[#plugin-vim-fugitive]

---

### Plugin Vim Rails

Action | Snippet |
--- | --- |
In a model file go to the schema | `:R` |
In a model file go to the test | `:A` |
Ouvrir le model dans les tests | `:RVmodel` |
Ouvrir les routes | `:Einit` |
Met le code dans une partial | `:Extract name` |
Create model | `:Emodel name!` |
Aller dans le controlleur | `:Econ names` |
Aller dans le controlleur avec un vertical split | `:Vcon names` |
Create controller | `:Generate controller Blog` |
Console | `:Rails console` |
Aller dans les vues | `:Eview floder/files` |
Related files | `:R` |
Faire tourner les tests | `:Rails` |

### Plugin Vim Commentary

Action | Snippet |
--- | --- |
Comment line | `gcc` |
Comment paragraph | `gcap` |
Comment specific line | `:7,17Commentary` |

### Plugin Vim Surround

Action | Snippet |
--- | --- |
Change surrounding `"` to `'` | `cs"'` |
Change surrounding line with a tag | `ysst` |
Delete surrounding tag | `dst` |
Change surrounding tag by other tag | `cstt` |
Change surrounding word with `"` | `csiw"` |
Surrounding word with `"` | `ysiw"` |
In visual mode | `s` |

### Plugin Vim Tabularize

Before always select lines in visual mode

Action | Snippet |
--- | --- |
Aligner avec une regex | `:Tabularize /regex` |
Aligner avec une regex | `:Tab /regex` |
Aligner après un égale | `:Tab /=.*` |
Aligner après un égale | `\=` |
Aligner du css | `\:` |

### Plugin Vim Fugitive

Action | Snippet |
--- | --- |
Git status | `:G` |
Afficher la différence | `:Gdiffsplit` |
Faire un commit | `:Gcommit` |
Faire un push | `:Gpush` |

More infos [here](https://github.com/tpope/vim-fugitive)

### Plugin NerdTree

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

### Normal mode in Vim

Verb | Command |
--- | --- |
delete | `d` |
change | `c` |
select (visually) | `v` |
yank (copy) | `y` |
indent | `>` or `<` |

Nouns | Command |
--- | --- |
inner word | `iw` |
inner tag | `it` |
innner quote | `i"` |
inner paragraph | `ip` |
inner a sentence | `as` |

Exemple:

* `ctL` --> change to L
* `c/other` --> change to "other"
* `ci6j` --> change inside 6 lines

### Move in Vim

Action | Command |
--- | --- |
Aller dans le fichier | `gf` |
Next Tab | `gt` |
Previous Tab | `gT` |

### Control in Vim

* Ctrl + i --> indentation
* Ctrl + n --> set/unset relative number
* Ctrl + g --> open NerdTree
* Ctrl + o --> revenir en arrière
* Ctrl + a --> incrémente le premier nombre
* Ctrl + x --> décrémente le premier nombre
* Ctrl + e --> Scroll up 1 line
* Ctrl + y --> Scroll down 1 line
* Ctrl + u --> Scroll up half screen
* Ctrl + d --> Scroll down half screen
* Ctrl + b --> Scroll up 1 full page
* Ctrl + f --> Scroll down 1 full page

#### Window

* Ctrl + w puis s --> split windows with same file
* Ctrl + w puis v --> split windows vertically
* Ctrl + w puis q --> Close window

### Command mode in Vim

Action | Command |
--- | --- |
Open and edit file in a new tab | `:tabe name` |
Merging file to current on | `:r file` |
Ouvre le fichier en vertical split | `:vsp name.rb` |
Ouvre le fichier en split | `:sp name.rb` |

#### Multi-lines

Action | Command |
--- | --- |
Déplacer les lignes 40 à 50 à la 30 | `:40,50m30` |
Copier les lignes 30 à 40 | `:30,70y` |
Supprimez les lignes 40 à 50 | `:16,20d` |
#
## Visual mode in Vim

Action | Command |
--- | --- |
Cacher les lignes selectionnées | `zf` |
Cursor on top | `zt` |
Cursor on middle | `zz` |
Cursor on bottom | `zb` |
