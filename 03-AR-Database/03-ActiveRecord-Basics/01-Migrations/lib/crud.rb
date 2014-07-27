DB = ActiveRecord::Base.connection

def db_create_post(post)
  DB.execute("INSERT INTO posts (name, source_url, created_at, rating) VALUES ('#{post[:name]}', '#{post[:source_url]}', '#{post[:created_at]}', '#{post[:rating]}')")
end

def db_get_posts
  DB.execute('SELECT * FROM posts')
end

def db_delete_posts
  DB.execute('DELETE FROM posts')
end
