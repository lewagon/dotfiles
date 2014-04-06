# Encoding: utf-8
require 'spec_helper'
require 'open3'
require 'compute_name'

describe '#name_from_terminal' do

    it 'should print out the computed full name' do
      result = nil

      Open3.popen2('ruby ./lib/interface.rb') do |i, o, th|
        # Send first name
        i.puts "Jean"
        # Send middle name
        i.puts "Michel"
        # Send last name
        i.puts "Sardou"
        i.close

        result = o.read
      end

    name = compute_name("Jean", "Michel", "Sardou")
    result.must_match /(?:\w|\s)#{name}/
  end
end
