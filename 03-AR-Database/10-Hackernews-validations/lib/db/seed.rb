require_relative "../config/application"
require_relative "../models/post"
require_relative "../models/user"
 
 
puts "Seeding database..."
 
# Scraping Hacker news
html_file = open("https://news.ycombinator.com/")
html_doc = Nokogiri::HTML(html_file)
 
posts = {}
ratings = []

html_doc.search('table table tr td.title a').each do |element|
  posts[element.inner_text] = element.xpath('@href').first.value unless element.inner_text == "More"
end

html_doc.search('table table tr td.subtext').each do |element|
  el = element.search('span').inner_text[0].to_i || 0 # handle no-rating case
  ratings << el
end

# Creating fake users
1.upto(10) { User.create(name: Faker::Name.name, email: Faker::Internet.email) }

# Create fake news for each one
User.all.each do |user|
  index = rand(30)
  post_name = posts.keys[index]
  post_url = posts[post_name]
  post_rating = ratings[index]
  
  user.posts.create(name: post_name, date: Time.now, rating: post_rating, source_url: post_url)
end