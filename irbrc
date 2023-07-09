begin
  require 'rubygems'
  require 'pry'
  if ENV['RAILS_ENV']
    require 'rails/console/app'
    include Rails::ConsoleMethods
  end
rescue LoadError
end
if defined?(Pry)
  Pry.start
  exit
end
