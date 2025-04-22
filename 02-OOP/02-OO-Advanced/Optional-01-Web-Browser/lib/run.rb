#!/usr/bin/env ruby -U

require_relative "browser"

browser = Browser.new

# Loop until user wants to exit
url = nil
while url != ""
  puts 'Where do you wanna go?'
  print "> "
  url = gets.chomp # Get URL from user (full url like 'http://www.google.fr')

  # Fetch page content and display it
  content = browser.fetch_content(url)
  puts content
  puts "\n--------------------\n"
end

puts 'bye bye!'
