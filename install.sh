for name in *; do
  if [ ! -d "$name" ]; then
    target="$HOME/.$name"
    if [ -e "$target" ]; then
      if [ ! -L "$target" ]; then
        echo "WARNING: $target exists but is not a symlink."
      fi
    else
      if [ "$name" != 'install.sh' ] && [ "$name" != 'README.md' ]; then
        echo "Symlinking to $target"
        ln -s "$PWD/$name" "$target"
      fi
    fi
  fi
done

# Setup a machine for Sublime Text 2
SUBLIME_USER_DIR=~/Library/Application\ Support/Sublime\ Text\ 2/Packages/User
SUBLIME_PREFERENCES_FILE=Preferences.sublime-settings
set -x
mv "$SUBLIME_USER_DIR/$SUBLIME_PREFERENCES_FILE" "$SUBLIME_USER_DIR/$SUBLIME_PREFERENCES_FILE.backup"
ln -s "$PWD/sublime2/$SUBLIME_PREFERENCES_FILE" "$SUBLIME_USER_DIR/$SUBLIME_PREFERENCES_FILE"