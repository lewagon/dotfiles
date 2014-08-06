task :default

task :api do
  require_relative 'api'

  puts
  puts '*' * 100
  puts
  puts 'The API will start now and will be accessible on http://localhost:4567'
  puts 'You can kill it by typing CTRL-C'
  puts
  puts '*' * 100
  puts

  API.run!
end
