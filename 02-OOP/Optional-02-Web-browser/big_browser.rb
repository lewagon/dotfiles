class Browser
  # Your code goes here
end


class Page
  # and here ;)
end


Browser.start do |b|
  # Loop until user wants to exit
  while true
    puts 'Where do you wanna go?' 
    url = gets.chomp # Get URL from user (full url like 'http://www.google.fr')

    break if url == 'exit'

    # Fetch page content and display it
    page = b.get(url)
    page.display
    puts "\n------------\n"
  end
  
  puts 'bye bye!'
end
