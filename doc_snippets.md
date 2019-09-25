1. SnippetsEmu Features
  * Basic Snippets
  * Named Tags
  * Tag Commands
  * Buffer Specific Snippets
  * Filetype Specific Snippets
2. SnippetsEmu Options
  * Start and End Tags
  * Element Delimiter
3. Detailed
  * Advanced Tag Command Examples
4. SnippetsEmu Contact Details
5. Contributors
6. SnippetsEmu Known Bugs
7. Troubleshooting

# SNIPPETSEMU FEATURES

SnippetsEmu attempts to emulate several of the snippets features of the OS X editor TextMate, in particular the variable bouncing and replacement behaviour.
Simple usage is built up around the following functionality:

* Basic Snippet
* Named Tags
* Executable Snippet
* Buffer Specific Snippets

## Basic Snippet

A basic snippet can save you a lot of typing. Define a word trigger and on insertion it will be expanded to the full snippet. SnippetsEmu allows the user to define markers within the larger piece of text which will be used to place the cursor upon expansion.

The command used to define a snippet is 'Snippet'. Basic Syntax:

```
:Snippet trigger_name The cursor will be placed here: <{}> Trailing text
```

In insert mode typing 'trigger_name<Tab>' will remove 'trigger_name' and replace it with the text: 'The cursor will be placed here:  Trailing text'. The cursor will be placed between the two spaces before the word 'Trailing'

NOTE: All text should be entered on the same command line. The formatting of this document may mean that examples are wrapped but they should all be entered on a single line.

## Named tags

Instead of the simple '<{}>' tags used for cursor placement a user can define named tags. When the value of a named tag is changed then all other tags with that name will be changed to the same value.

E.g.

```
:Snippet trigger My name is <{forename}> <{surname}>. Call me <{forename}>.
```

In insert mode typing 'trigger<Tab>' will place the cursor inside the '<{forename}>' tag. Whatever is entered inside the tag will replace the other similarly named tag at the end of the line after the user presses 'Tab'. If no value is entered for a named tag then the tag's name will be used instead. This is one way of defining default values.

Using the above example, entering 'trigger<Tab>' and pressing 'Tab' twice will result in the following text:

```
My name is forename surname. Please call me forename.
```

## Tag commands

Tags can contain commands. Commands can be any Vim function, including user defined functions. A common example is performing substitutions. E.g.

```
:Snippet trigger My name is <{name}>.  I SAID: MY NAME IS <{name:substitute(@z,'.','\u&','g')}>!
```

The value entered in the <{name}> tag will be passed to the command in the second <{name}> tag in the @z register (any value already in @z will be preserved and restored). The substitute command will change the entered value to be in upper case. I.e. Entering 'trigger<Tab>' and typing 'Tycho<Tab>' will result in the following text: >

```
My name is Tycho. I SAID: MY NAME IS TYCHO!
```

There is a set of special variables which can be included in snippets. These will be replaced before the snippet's text is inserted into the buffer. The list of available variables is detailed below:

* SNIP_FILE_NAME - The current file name (from 'expand("%")')
* SNIP_ISO_DATE - The current date in YYYY-MM-DD format.

In addition to tag commands it is also possible to define commands which will be executed before the snippet is inserted into the buffer. These are defined within double backticks. E.g.

```
:Snippet date The current date is ``strftime("%c")``
```

Commands are standard Vim commands and will be 'exec'uted and the command output substituted into the text.

## Buffer Specific Snippets

The Snippet command defines buffer specific snippets. This is the recommended option when using filetype specific snippets. It is possible to define 'global' snippets which will act across all buffers. These can be defined using the legacy 'Iabbr' command (note the capital 'I'). E.g

```
Iabbr for for <{var}> in <{list}>:<CR><{}>
```

The preferred practice for defining filetype specific snippets is to include them in files named `<filetype>_snippets.vim` and for these files to be placed in the `~/.vim/after/ftplugin directory` (or `vimfiles\after\ftplugin` under Windows). When a file of a specific type is loaded so will all of the defined snippets. The 'after' directory is used to ensure that the plugin has been loaded. It is also recommended that the following is included at the top of the file: >

```
if !exists('loaded_snippet') || &cp
  finish
endif
```

This will stop errors being generated if the plugin has not loaded for any reason.

Users wishing to add their own filetype snippets should add them to a separate file to ensure they are not lost when upgrading the plugin. Naming the files

```
<filetype>_mysnippets.vim or similar is the preferred practice.
```

When loading the plugin will search for all files named `*_snippets.vim`. These will be added to the 'Snippets' menu which is available in Normal mode. Selecting options from the menu will source the file and hence load any snippets defined within it.

```
[range]CreateSnippet
```

The CreateSnippet command allows the simple creation of snippets for use within your own file. Without a range the current line will be used. When passed a range then all the lines in the range will be converted for use in a command.

Snippets created by the command will be added to a scratch buffer called 'Snippets'. The current value of an empty tag (snip_start_tag.snip_end_tag, '<{}>' by default) will be added to the unnamed register and so can be inserted with appropriate paste commands.

```
[range]CreateBundleSnippet
```

CreateBundleSnippet works exactly like CreateSnippet but the resulting text will be suitable for including in one of the included bundles. The unnamed register will include the text '"st.et."' so start and end tag agnostic empty tags can be included.

# SNIPPETSEMU OPTIONS

## Start and End Tags

By default the start and end tags are set to be '<{' and '}>'. These can be changed by setting the following variables in vimrc:

```
g:snip_start_tag
g:snip_end_tag
```

They can be also changed for a specific buffer by setting the following:

```
b:snip_start_tag
b:snip_end_tag
```

## Element Delimiter

The value of snip_elem_delim is used to separate a tag's name and its command. By default it is set to ':' but can be set as above either globally or for a specific buffer using the following variables:

```
    g:snip_elem_delim
    b:snip_elem_delim
```

## Remapping the default jump key ~

The trigger key is mapped to Tab by default. Some people may wish to remap this if it causes conflicts with other plugins. The key can be set in your <.vimrc> by setting the 'g:snippetsEmu_key' variable. An example

```
let g:snippetsEmu_key = "<S-Tab>"
```

Snippets will now be triggered by Shift-Tab rather than just Tab. NB, this example may not work in all terminals as some trap Shift-Tab before it gets to Vim.

# DETAILED EXPLANATIONS

## Valid Tag Names

Tag names cannot contain whitespace unless they are enclosed in quotes.

Valid Examples:

```
<{validName}>
<{"valid name"}>
<{tagName:command}>
<{"Tag Name":command}>
```

Invalid Examples:

```
<{invalid name}>
<{Tag Name:command}>
<{:command}>
```

## Advanced Tag Command Examples

Commands in tags can be as complex as desired. Readability is the main limitation as the command will be placed in the document before execution.

The preferred method for defining complex commands is to hide the functionality in a user function. Example:

```
function! Count(haystack, needle)
    let counter = 0
    let index = match(a:haystack, a:needle)
    while index > -1
        let counter = counter + 1
        let index = match(a:haystack, a:needle, index+1)
    endwhile
    return counter
endfunction

function! PyArgList(count)
    if a:count == 0
        return "(,)"
    else
        return '('.repeat('<{}>, ', a:count).')'
    endif
endfunction

Snippet pf print "<{s}>" % <{s:PyArgList(Count(@z, '%[^%]'))}><CR><{}>
```

The above snippet will expand 'pf' to 'print "<{s}>" ...'. The user then enters a format string. Once the string is entered the Count and PyArgList functions are used to generate a number of empty tags.

The above represents once of the limitations of the plugin. Due to the way tags are identified it is not possible to include empty tags in another tag's command. The only way to generate empty tags is to return them from a function as in the above example. For other examples see the included bundles.

The included bundles are not defined in the 'preferred style'. In order to accommodate users who wish to redefine the default tags all snippet definitions are 'executed' with the 'exec' command. E.g.

```
exec "Snippet test This isn't the right way to ".st.et." define snippets"
```

Executing the command allows 'st' and 'et' to be used in place of start and end tags. 'st' and 'et' are defined elsewhere in the bundle file.

# SNIPPETSEMU CONTACT DETAILS

To contact the author please email:

F <dot> Ingram <dot> lists <at> gmail <dot> com

The author welcomes corrections to this documentation, example snippets and bug reports.

The plugin is also currently hosted at Google Code: http://code.google.com/p/snippetsemu

Bug reports can also be posted on the hosting site: http://code.google.com/p/snippetsemu/issues/list

# SNIPPETSEMU TROUBLESHOOTING

Problem:    Bundles are not loading.
Answer:     Ensure that you have filetype plugins turned on.  Include the following in your vimrc:

```
filetype plugin on
```
