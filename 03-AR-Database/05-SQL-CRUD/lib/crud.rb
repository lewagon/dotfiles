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

def get_posts(db)
   #TODO: list all posts
end

def get_post(db, id)
  #TODO: get a specific post
end

def update_post(db, id, name)
	#TODO: update a post's name in your db
end

def delete_posts(db)
  #TODO: delete a post in your db
end

def delete_post(db, id)
  #TODO: delete a specific post in your db
end