class PostsView
  def ask_for(stuff)
    puts "#{stuff}?"
    print "> "
    gets.chomp
  end

  def display(posts)
    posts.each do |post|
      puts "#{post.id} - #{post.title} - #{post.votes} votes - #{post.url}"
    end
  end
end
