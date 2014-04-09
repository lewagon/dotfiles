# Encoding: utf-8

require "spec_helper"
require "shuffle"

describe '#shuffle' do
  it 'should return an array' do
    shuffle([]).must_be_instance_of Array
  end

  it 'sorts an array in a random way' do
    a = [1, 2, 3, 4]
    b = shuffle(a)
    a.wont_equal b
  end
end
