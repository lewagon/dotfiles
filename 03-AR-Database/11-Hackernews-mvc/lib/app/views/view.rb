class View
  def self.show(array_of_recipes)
    array_of_recipes.each do |recipe|
      puts "#{recipe[:id]}".center(4) + "#{recipe[:name]}"
    end 
  end

  def self.delete(name)
    puts "You deleted #{name}"
  end

  def self.add(name)
    puts "You added #{name} to your todo list"
  end
  
  def self.print(users)
    users.each do |user|
      puts user
    end
  end
end