# Encoding: utf-8
require 'csv'

def most_successfull(number, max_year, file_name)
  #TODO: return the number most successfull movies max_year
  h = csv_to_hash(file_name)
  h.select{ |k, v| k.to_i < max_year}.sort_by{ |k, v| v[1] }[0..number-1].map{|movie_desc| movie_desc.flatten }
end


def csv_to_hash(file_name)
	hash = Hash.new { |hash, key| hash[key] = [] }
	CSV.foreach(file_name, encoding: "ISO8859-1") do |row|
	hash[row[1]] = [row[0], row[2]]
	end
	hash
end
