gem 'activerecord', '~> 7.1.3.2'
gem 'sqlite3', '~> 1.7.3'
# ^ fix the version of these two gems to avoid potential issues
#
require "sinatra"
require "sinatra/reloader" if development?
require "pry-byebug"
require "sqlite3"

DB = SQLite3::Database.new(File.join(File.dirname(__FILE__), "db/jukebox.sqlite"))

get "/" do
  # TODO: Gather all artists to be displayed on home page
  erb :home # Will render views/home.erb file (embedded in layout.erb)
end

# Then:
# 1. Create an artist page with all the albums. Display genres as well
# 2. Create an album pages with all the tracks
# 3. Create a track page with all the track info
