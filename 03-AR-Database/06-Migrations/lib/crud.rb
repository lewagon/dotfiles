def create_post(db, post)
  db.execute("INSERT INTO posts (name, source_url, date, rating) VALUES ('#{post[:name]}', '#{post[:source_url]}', '#{post[:date]}', '#{post[:rating]}')")
end

def get_posts(db)
  db.execute("SELECT * FROM posts")
end

def get_post(db, id)
  db.execute("SELECT * FROM posts where id = #{id}")
end

def update_post(db, id, name)
	db.execute("UPDATE posts SET name = '#{name}' WHERE id = #{id}")
end

def delete_posts(db)
  db.execute("DELETE FROM posts")
end

def delete_post(db, id)
  db.execute("DELETE FROM posts WHERE Id = #{id}")
end