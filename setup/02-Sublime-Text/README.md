## Sublime Text - Your text editor

Go to [this page](http://www.sublimetext.com/2) and download Sublime Text 2.

### Package control

We will install its package manager right away to install addons. Launch Sublime Text, then open the console via the `View > Show Console` menu. Then you need to [copy paste some code](https://sublime.wbond.net/installation#st2) in the console.

### Preferences

Go to `Preferences > Settings - Users` and edit the file to have at least this configuration:

```json
{
  "tab_size": 2,
  "translate_tabs_to_spaces": true,
  "detect_indentation": false,

  "trim_trailing_white_space_on_save": true,
  "draw_white_space": true,
  "use_tab_stops": true,

  "show_minimap": false,
  "rulers": [ 80 ],

  "folder_exclude_patterns":
  [
    "node_modules",
    "tmp",
    "log",
    ".svn",
    ".git",
    ".hg",
    "CVS",
    "_site",
    ".idea",
    ".bundle",
    ".tmp",
    ".sass-cache"
  ]
}

```