require "sqlite3"
db = SQLite3::Database.new("lib/db/jukebox.sqlite")

def artist_count(db)
  # TODO: use `db` to execute an SQL query against the database.
end

def number_of_rows(db, table_name)
  # TODO: count number of rows in table table_name
end

def sorted_artists(db)
  # TODO: return array of artists' names sorted alphabetically
end

def love_tracks(db)
  # TODO: return array of love songs
end

def long_tracks(db, min_length)
  # TODO: return an array of tracks' names verifying: duration > min_length (minutes) sorted by length (ascending)
end

def albums_per_artist(db)
  # TODO: return an array of arrays with the artist's name and the number of albums they have, sorted alphabetically
  query = <<~SQL
    SELECT artists.name, COUNT(*) as album_count
    FROM artists
    JOIN albums ON artists.id = albums.artist_id
    GROUP BY artists.name
    ORDER BY artists.name
  SQL

  db.execute(query)
end
