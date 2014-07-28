require_relative 'config/application'
require_relative 'models/post'

def ask(prompt)
  print "#{prompt} "
  gets.to_s.chomp
end

def create_post
  name = ask('Name:')
  source_url = ask('Source url:')
  rating = ask('Rating:')
  created_at = Time.now

  # TODO: use your model to create a new Post
end

def get_posts
  # TODO: use your model to get all posts
  posts = ??

  puts '-' * 50
  puts '%-3s %-15s %-20s %-30s %s' % ['#', 'Name', 'Source URL', 'Created At', 'Rating']

  posts.each do |post|
    puts '%-3d %-15s %-20s %-30s %d' % [post.id, post.name, post.source_url, post.created_at, post.rating]
  end

  puts '-' * 50
end

def delete_posts
  # TODO: use your model to remove all posts
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
