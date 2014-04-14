require 'sqlite3'

# opens the database
database_path = "db/jukebox.sqlite"
db = SQLite3::Database.new(database_path)

def number_of_rows(db, table_name)
  #TODO: count number of rows in table
end

def sorted_artists(db)
  #TODO: return array of artist names sorted alphabetically 
end

def love_tracks(db)
  #TODO: return array of love songs
end

def long_tracks(db, min_length)
  #TODO: return tracks with duration > min_length minutes
end

puts "There are #{number_of_rows(db,"Artist")} artists"
puts "There are #{number_of_rows(db,"Track")} tracks"
puts "There are #{number_of_rows(db,"Album")} albums"
puts "There are #{number_of_rows(db,"Genre")} genres"
puts "There are #{number_of_rows(db,"MediaType")} media types"
