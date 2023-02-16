## Background & Objectives

Now it's time for something more complex. We'll be using `JOIN` queries to read data from multiple tables. To acquire instant Jedi skills in `JOIN` queries, [read this](http://stackoverflow.com/questions/17946221/sql-join-and-different-types-of-joins) - the picture is really helpful. If you speak French, you can also [read this one](http://sql.sh/cours/jointures).

## Specs

Complete the code in `join_queries.rb`. Each method takes a `db` argument, which is an instance of `SQLite3::Database` on which you can call the `execute` method. Exactly like in the previous exercise.

### Detailed Tracks

- Implement `detailed_tracks` to get all the tracks with the corresponding artist name and album titles.
- Your output should be an array of arrays. **Hint:** you will have to use two `JOIN` sql statements.

This method should return an array of tracks. Each element of this array would be an array as well: first element being the track title, second element the track album name, third element the track's artist name.

### Statistics

For each genre of music, find the stats, i.e. the number of tracks and the average song length (in minutes).

The method should return a Hash of statistics:

```ruby
stats_on(db, "Rock")
# => {
# category: "Rock",
# number_of_songs: 1297,
# avg_length: 4.7
# }
```

### Top 5

Find the top 5 artists that made the most songs in a given genre. This method should return an array of arrays with this artist id, the artist name and the number of songs of the given genre for each artist.

```ruby
top_five_artists(db, 'Rock')
# => [
# [ 22, 'Led Zeppelin', 114 ], # Led Zeppelin has 114 Rock songs.
# [ 150, 'U2', 112 ]
# etc.
# ]
```
