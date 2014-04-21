require_relative 'config/application'
require_relative 'models/post'


# Seeding your database with fake data..
for i in (1..10)
  Post.create( {name: "post_#{i}", source_url: "https://news.ycombinator.com/#{i}"}, date: Time.now )
end


# Accessing your latest post..
puts "\n"
puts "Here is the latest post in you DB"
puts "\n"

latest_post = Post.last
puts "Name: #{latest_post.name}"
puts "Source URL: #{latest_post.source_url}"
formated_date = latest_post.date.strftime("%m/%d/%Y")  
puts "Date: #{formated_date}"


# Accessing all your posts..
puts "\n"
puts "Here are all the posts in your DB"
puts "\n"

Post.all.each do |post|
  puts "Name: #{post.name}"
  puts "Source URL: #{post.source_url}"
  formated_date = post.date.strftime("%m/%d/%Y")  
  puts "Date: #{formated_date}"
end



