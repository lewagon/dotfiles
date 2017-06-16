## Notes

In exercice 3: Interacting with code, it's hard for the students to understand that in:

```
def number_of_rows(db, table_name)
  # TODO: count number of rows in table table_name
end
```

the syntax is

```
def number_of_rows(db, table_name)
  # TODO: count number of rows in table table_name
  db.execute("SELECT * from #{table_name}")
end
```

- Where does `db` comes from?
- What does execute do?

They maybe should be more guided toward this.
