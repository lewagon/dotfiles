IRB.conf[:SAVE_HISTORY] = 100

begin
  require 'rubygems'
  require 'pry'
rescue LoadError
end

if defined?(Pry)
  Pry.start
  exit
end
