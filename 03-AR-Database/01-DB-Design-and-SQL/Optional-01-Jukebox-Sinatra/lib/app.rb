require "sinatra"
require "sinatra/reloader" if development?
require "pry-byebug"
require "better_errors"
require "sqlite3"

configure :development do
  use BetterErrors::Middleware
  BetterErrors.application_root = File.expand_path('..', __FILE__)
end

DB = SQLite3::Database.new(File.join(File.dirname(__FILE__), "db/jukebox.sqlite"))

get "/" do
  # TODO: Gather all artists to be displayed on home page
  erb :home # Will render views/home.erb file (embedded in layout.erb)
end

# Then:
# 1. Create an artist page with all the albums. Display genres as well
# 2. Create an album pages with all the tracks
# 3. Create a track page with all the track info
