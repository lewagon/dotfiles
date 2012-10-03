for name in *; do
  if [ ! -d "$name" ]; then
    target="$HOME/.$name"
    if [ "$name" != 'install.sh' ] && [ "$name" != 'README.md' ]; then
      if [ -e "$target" ]; then           # Does the config file already exist?
        if [ ! -L "$target" ]; then       # as a pure file?
          mv "$target" "$target.backup"   # Then backup it
          echo "-----> Moved your old $target config file to $target.backup"
        fi
      fi

      if [ ! -e "$target" ]; then
        echo "-----> Symlinking your new $target"
        ln -s "$PWD/$name" "$target"
      fi
    fi
  fi
done

# Setup a machine for Sublime Text 2
SUBLIME_USER_DIR=~/Library/Application\ Support/Sublime\ Text\ 2/Packages/User
SUBLIME_PREFERENCES_FILE=Preferences.sublime-settings
if [ ! -e "$SUBLIME_USER_DIR/$SUBLIME_PREFERENCES_FILE.backup" ]; then
  mv "$SUBLIME_USER_DIR/$SUBLIME_PREFERENCES_FILE" "$SUBLIME_USER_DIR/$SUBLIME_PREFERENCES_FILE.backup"
  echo "-----> Old sublime preferences file backuped to $SUBLIME_USER_DIR/$SUBLIME_PREFERENCES_FILE.backup"
fi

if [ ! -L "$SUBLIME_USER_DIR/$SUBLIME_PREFERENCES_FILE" ]; then
  ln -s "$PWD/sublime2/$SUBLIME_PREFERENCES_FILE" "$SUBLIME_USER_DIR/$SUBLIME_PREFERENCES_FILE"
fi