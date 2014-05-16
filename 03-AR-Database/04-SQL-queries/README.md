## Background & Objectives

Now it is time to perform more complex SQL queries and especially `join` queries to read data from multiple tables with join criteria. To be an expert in `join` queries, [here it is](http://www.w3schools.com/sql/sql_join.asp)

## Specs

Complete the code in `join_queries.rb`. The methods in this file should enable to:

- Get all the tracks with the corresponding artist and album. Your output should be an array of arrays. **Tip**: you have to use two `join` sql statements. Ex:

```ruby
[
  ["Demain c'est loin", "IAM", "L'école du micro d'argent"],
  ["Back dans les Backs", "NTM", "Supreme NTM"]
]
```

- For each genre of music, find the stats, i.e. the number of tracks and the average song length (in minutes). **Tip**: you have to use a `group by` statement with aggregate 	functions ``count`` and ``avg``. Example:

```ruby
{
  category: "Rock",
  number_of_songs: 1297,
  avg_length: 4.7
}
```

- Find the top 5 artists, that made the most rock songs. **Tip**: you have to use multiple `join` statements, and aggregate `count`, `group by`, `order by` and `limit` statements.
