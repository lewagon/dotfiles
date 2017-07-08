## Background & Objectives

Now it is time to perform more complex SQL queries and especially `join` queries to read data from multiple tables with join criteria. To be an expert in `join` queries, [read this](http://stackoverflow.com/questions/17946221/sql-join-and-different-types-of-joins). If you speak French, you can also [read this one](http://sql.sh/cours/jointures).

## Specs

Complete the code in `join_queries.rb`. Each method takes a `db` argument, which is an instance
of `SQLite3::Database` on which you can call the `execute` method.

### Detailed Tracks

Implement `detailed_tracks` to get all the tracks with the corresponding artist name and album titles.
Your output should be an array of arrays. **Hint:** you have to use two `JOIN` sql statements.
Your method should return something like this:

```ruby
detailed_tracks(db)
# => [
#      ["Demain c'est loin", "L'école du micro d'argent", "IAM"],
#      ["Back dans les bacs", "Supreme NTM", "NTM"]
#    ]
```

### Statistics

For each genre of music, find the stats, i.e. the number of tracks and the average song length (in minutes).

**Hint:** you have to use a `GROUP BY` statement with aggregate SQL functions such as `COUNT` and `AVG`.

The method should return a Hash of statistics, for example:

```ruby
stats_on(db, "Rock")
# => {
#      category: "Rock",
#      number_of_songs: 1297,
#      avg_length: 4.7
#    }
```

### Top 5

Find the top 5 artists that made the most songs in a given genre.

```ruby
top_five_artists(db, 'Rock')
# => [
#      [ 'Led Zeppelin', 114 ],  # Led Zeppelin has 114 Rock songs.
#      [ 'U2',           112 ]
#      # etc.
#    ]
```

## Tools

You can also use a **SQLite viewer** application to read the SQLite database, explore the schema and even **run SQL queries**.

- [  SQLite Pro (Paying, 7 days trial)](https://www.sqlitepro.com/)
- [SQLStudio (Free)](http://sqlitestudio.pl/?act=download)
- [SQLite Browser (Free)](http://sqlitebrowser.org/)

