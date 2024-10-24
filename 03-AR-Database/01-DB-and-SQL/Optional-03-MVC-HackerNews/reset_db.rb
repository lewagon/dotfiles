gem 'activerecord', '~> 7.1.3.2'
gem 'sqlite3', '~> 1.7.3'
# ^ fix the version of these two gems to avoid potential issues

require "sqlite3"

dir = File.dirname(__FILE__)
db = SQLite3::Database.new(File.join(dir, "db/posts.db"))

db.execute('DROP TABLE IF EXISTS `posts`;')
create_statement = "
CREATE TABLE `posts` (
  `id`  INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` TEXT,
  `url` TEXT,
  `votes`  INTEGER
);"
db.execute(create_statement)
