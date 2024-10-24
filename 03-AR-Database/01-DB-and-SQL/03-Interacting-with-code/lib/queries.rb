gem 'activerecord', '~> 7.1.3.2'
gem 'sqlite3', '~> 1.7.3'
# ^ fix the version of these two gems to avoid potential issues

require "sqlite3"

def artist_count(db)
  # TODO: use `db` to execute an SQL query against the database.
  # Should return an integer of the number of artists.
end

def number_of_rows(db, table_name)
  # TODO: count number of rows in table table_name.
  # Should return an integer of the number of rows.
end

def sorted_artists(db)
  # TODO: return array of artists' names sorted alphabetically.
  # Should return an array of strings sorted alphabetically.
end

def love_tracks(db)
  # TODO: return array of love songs' names.
  # Should return an array of strings (track names).
end

def long_tracks(db, min_length)
  # TODO: return an array of tracks' names verifying: duration > min_length (minutes) sorted by length (ascending).
  # Should return an array of strings.
end

def albums_per_artist(db)
  # TODO: return an array of arrays, each containing the artist's name and the number of albums they have
end
