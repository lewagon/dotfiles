# Encoding: utf-8

require "spec_helper"
require "compute_name"

describe "#compute_name" do
  it 'returns a String' do
    compute_name('', '', '').must_be_instance_of String
  end

  it 'concatenates all parameters together' do
    compute_name('Jean', 'Michel', 'Saurin').must_equal 'Jean Michel Saurin'
  end

end
