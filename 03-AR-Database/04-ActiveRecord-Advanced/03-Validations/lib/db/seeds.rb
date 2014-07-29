require_relative '../config/application'
require_relative '../models/post'
require_relative '../models/user'

require 'faker'
require 'nokogiri'
require 'open-uri'

puts 'Seeding database...'

html_doc = Nokogiri::HTML(open("https://news.ycombinator.com/"))

posts = {}
ratings = []

html_doc.search('table table tr td.title a').each do |element|
  next if element.inner_text == 'More'
  posts[element.inner_text] = element.xpath('@href').first.value
end

html_doc.search('table table tr td.subtext').each do |element|
  ratings << (element.search('span').inner_text[0].to_i || 0)
end

10.times { User.create(name: Faker::Name.name, email: Faker::Internet.email) }

# Create fake news for each one
User.find_each do |user|
  index = rand(30)
  post_name = posts.keys[index]
  post_url = posts[post_name]
  post_rating = ratings[index]

  user.posts.create(name: post_name, date: Time.now, rating: post_rating, source_url: post_url)
end
