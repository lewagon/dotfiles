begin
  require 'rubygems'
  require 'pry'
  require 'awesome_print'
  # if ENV['RAILS_ENV']
  #   require 'rails/console/app'
  #   include Rails::ConsoleMethods
  # end
rescue LoadError
end

if defined?(Rails)
  def toto
    puts "toto"
  end
end

if defined?(Pry)
  Pry.start
  exit
end
