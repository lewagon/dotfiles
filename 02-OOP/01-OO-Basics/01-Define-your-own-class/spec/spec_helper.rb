require 'minitest/autorun'
require 'minitest/pride'

def camelize(str)
   str.split('_').map {|w| w.capitalize}.join
end
