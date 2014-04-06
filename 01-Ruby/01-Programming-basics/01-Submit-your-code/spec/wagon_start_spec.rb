# Encoding: utf-8

require "spec_helper"
require "wagon_start"

describe "#wagon_start" do

  it "should return the exact message 'That's how it starts'" do
    response = wagon_start
    response.must_equal "That's how it starts"
  end

end