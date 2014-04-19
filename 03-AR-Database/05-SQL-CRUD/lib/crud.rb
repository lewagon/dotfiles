require 'sqlite3'

def create_scheme(db)
  #TODO: create your db scheme
  sql = %q{ 
  }  # %q allows for multiline string in ruby 
  db.execute(sql)
end

def create_post(db, post)
  #TODO: add a new post to your db
end

def delete_post(db, id)
  #TODO: delete a post in your db
end

def update_post(db, id, description)
  #TODO: update a post in your db
end

def delete_posts(db)
  #TODO: delete all posts
end

def list_posts(db)
  #TODO: list all posts
end
