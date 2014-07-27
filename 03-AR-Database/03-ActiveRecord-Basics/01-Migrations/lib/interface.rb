require_relative 'config/application'

DB = ActiveRecord::Base.connection

def ask(prompt)
  print "#{prompt} "
  gets.to_s.chomp
end

def create_post
  name = ask('Name:')
  source_url = ask('Source url:')
  rating = ask('Rating:')
  date = Time.now

  DB.execute('TODO: write the insertion SQL query')
end

def get_posts
  posts = DB.execute('TOTO: write the SQL query to get all posts')

  puts '-' * 50
  puts '%-3s %-15s %-16s %s' % %w[# Name Source\ URL Rating]

  posts.each do |post|
    puts '%-3d %-15s %-16s %s' % post
  end

  puts '-' * 50
end

def delete_posts
  DB.execute('TODO: write a query to delete all posts')
end

while true
  puts 'Hey you, what do you want to do today? Enter <task_id>'
  puts '1. Create a post'
  puts '2. Read your posts'
  puts '3. Delete all posts'
  puts '4. Exit'

  case ask('>').to_i
  when 1 then create_post
  when 2 then get_posts
  when 3 then delete_posts
  when 4 then break
  end
end
