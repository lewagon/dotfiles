begin
  require 'rubygems'
  require 'pry'
  require 'irb/ext/save-history'
rescue LoadError
end

if defined?(Pry)
  Pry.start
  exit
end

IRB.conf[:SAVE_HISTORY] = 200
IRB.conf[:HISTORY_FILE] = "#{ENV['HOME']}/.irb-history"
