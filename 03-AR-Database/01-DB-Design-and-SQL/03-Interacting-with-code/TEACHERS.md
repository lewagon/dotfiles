## Notes

It's hard for the students to understand that in:

```
def number_of_rows(db, table_name)
  # TODO: count number of rows in table table_name
end
```

the syntax 

```
def number_of_rows(db, table_name)
  # TODO: count number of rows in table table_name
  db.execute("SELECT * from #{table_name}")
end
```

is expected. Where does `db` comes from?