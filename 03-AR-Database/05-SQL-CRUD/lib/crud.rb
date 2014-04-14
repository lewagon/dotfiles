# method to create your db
def create_db
  # %q allows for multiline string in ruby 
  # this string sql should contain SQL code to create your db
  sql = %q{ 
  }
  db.execute(sql)
end

# method to create a post
def create_post(db, name, source_url, date, rating)
  # your code here
end

# method to delete a post
def delete_post(db, id)
  # your code here
end

# method to update a post
def update_post(db, id, description)
  # your code here
end

# method to delete all posts
def delete_posts(db)
  # your code here
end

# method to get all posts
def posts(db)
  # your code here
end
