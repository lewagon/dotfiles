require_relative "crud"
require 'sqlite3'

def ask_and_get(param)
  puts "What is the #{param} of your piece of news?"
  gets.chomp
end

db_path = "db/news.sqlite"
db = SQLite3::Database.new(db_path)
create_db() # creates the database

while true

  puts "Hey you, what do you want to do today? Enter <task_id>"
  puts "1. Create a post"
  puts "2. Delete all posts"
  puts "3. Read your posts"
  puts "4. Exit"

	choice =  gets.chomp.to_i
	
	case choice
  when 1
    name = ask_and_get("name")
    url = ask_and_get("source url")
    rating = ask_and_get("rating")
    #TODO: create a news post
	when 2
    #TODO: delete all posts
  when 3
    #TODO: get your posts
	else 
	  break
	end 
	
end