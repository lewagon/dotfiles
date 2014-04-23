require_relative '../models/user'
require_relative '../views/view'

class UserController
  
  def self.get_user
    while true
      puts "Hello Buddy ! login or signup ?"
      response = gets.chomp
      if response == "login"
        return self.login
      elsif response == "signup"
        return self.signup
      else
        puts "Did not understand ? [options: login or signup]"
      end
    end
  end
  
  def self.login
    while true
      puts "Hello Buddy ! here are the users :"
      View.print(User.all)
      puts "What's you id ?" 
      user = User.find(gets.chomp.to_i)
      if user
        return user
      else
        puts "Did not understand your id ? Sign-up if you have no account"
      end
    end
  end
  
  def self.signup
    puts "your name ?"
    name = gets.chomp
    puts "your email ?"
    email = gets.chomp
    User.create(name: name, email: email)
  end
  
end