#!/bin/zsh

sudo -v

asdf plugin add alias
asdf plugin add nodejs
asdf plugin add python
asdf plugin add rust
asdf plugin add ruby

asdf install $(asdf nodejs resolve lts --latest-available)
asdf global nodejs $(asdf nodejs resolve lts --latest-available)

asdf install python $(asdf latest python)
asdf install python 2.7.18
asdf global python $(asdf latest python) 2.7.18

asdf install rust $(asdf latest rust)
asdf global rust $(asdf latest rust)

asdf install ruby $(asdf latest ruby)
asdf global ruby $(asdf latest ruby)
