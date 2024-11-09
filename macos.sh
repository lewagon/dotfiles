COMPUTER_NAME="jmschp-macbook"

osascript -e 'tell application "System Preferences" to quit'

# Ask for the administrator password upfront
sudo -v

# Keep-alive: update existing `sudo` time stamp until this script has finished
while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &

# Set computer name (as done via System Preferences → Sharing)
sudo scutil --set ComputerName "$COMPUTER_NAME"
sudo scutil --set HostName "$COMPUTER_NAME"
sudo scutil --set LocalHostName "$COMPUTER_NAME"
sudo defaults write /Library/Preferences/SystemConfiguration/com.apple.smb.server NetBIOSName -string "$COMPUTER_NAME"

###############################################################################
# System preferences                                                          #
###############################################################################

#################################
# General > Language and Region #
#################################

# First day of the week (Monday)
if [[ $(defaults read -globalDomain AppleFirstWeekday) ]]; then
  defaults write -globalDomain AppleFirstWeekday -dict-add gregorian -int 2
else
  defaults write -globalDomain AppleFirstWeekday -dict gregorian -int 2
fi

#################################
# Control Center                #
#################################

# Menu Bar Only > Siri > Show in menu bar
defaults write com.apple.Siri StatusMenuVisible -bool true

#################################
# Dock & Desktop               #
#################################

# Dock > Minimize windows into application icon
defaults write com.apple.dock minimize-to-application -bool true

# Dock > Show indicator for open applications
defaults write com.apple.dock show-process-indicators -bool true

# Automatically hide and show dock
defaults write com.apple.dock autohide -bool true

# Show suggested and recent apps in Dock
# Set default path for new windows.
# Computer     : `PfCm`
# Volume       : `PfVo`
# $HOME        : `PfHm`
# Desktop      : `PfDe`
# Documents    : `PfDo`
# All My Files : `PfAF`
# Other…       : `PfLo`
# For other paths, use `PfLo` and `file:///full/path/here/`
defaults delete com.apple.Dock recent-apps
defaults write com.apple.Dock show-recents -bool false

# Windows > Prefer tabs when opening documents - options are "manual" or "fullscreen" or "always"
defaults write NSGlobalDomain AppleWindowTabbingMode -string "always"

# Mission control > Automatically rearrange Spaces based on most recent use
defaults write com.apple.dock mru-spaces -bool false

# Mission control > Group windows by application
defaults write com.apple.dock expose-group-apps -bool true

#################################
# Keyboard                     #
#################################

# Keyboard > Delay until repeat
defaults write -globalDomain KeyRepeat -int 2

# Keyboard > Key repeat rate
defaults write -globalDomain InitialKeyRepeat -int 15

###############################################################################
# Calendar                                                                    #
###############################################################################

# View > Show Calendar List
defaults write com.apple.iCal CalendarSidebarShown -bool true

# Number of months in mini calendar
defaults write com.apple.iCal CalendarListMiniMonthVisibleMonths -int 3

# Settings > Turn on time zone support
defaults write com.apple.iCal "TimeZone support enabled" -bool true

# Settings > Show week numbers
defaults write com.apple.iCal "Show Week Numbers" -bool true

###############################################################################
# Finder                                                                      #
###############################################################################

# New finder window show
defaults write com.apple.finder NewWindowTarget -string "PfHm"

# Remove items from trash after 30 days
defaults write com.apple.finder FXRemoveOldTrashItems -bool false

# Keep folders on top in windows and desktop
defaults write com.apple.finder _FXSortFoldersFirst -bool true
defaults write com.apple.finder _FXSortFoldersFirstOnDesktop -bool true

# View > as List
# Four-letter codes for the other view modes: `icnv`, `clmv`, `Flwv`
defaults write com.apple.finder FXPreferredViewStyle -string "Nlsv"

# View > Show Path Bar
defaults write com.apple.finder ShowPathbar -bool true

# View > Show Status Bar
defaults write com.apple.finder ShowStatusBar -bool true
