# Encoding: utf-8

require "spec_helper"
require "bugged_concatenate"

describe "#build_1984_title" do

  it "should fix the bugs after reading the error" do
    build_1984_title.must_equal "1984 GEORGE ORWELL"
  end

end