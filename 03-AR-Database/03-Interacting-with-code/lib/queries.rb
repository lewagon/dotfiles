require 'sqlite3'

# opens the database
DATABASE_PATH = "db/jukebox.sqlite"
db = SQLite3::Database.new(DATABASE_PATH)

def number_of_rows(db, table_name)
  #TODO: count number of rows in table table_name
end

def sorted_artists(db)
  #TODO: return array of artists' names sorted alphabetically 
end

def love_tracks(db)
  #TODO: return array of love songs
end

def long_tracks(db, min_length)
  #TODO: return tracks verifying: duration > min_length (minutes)
end