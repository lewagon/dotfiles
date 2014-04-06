require 'open3'
require "spec_helper"

describe "Interface" do

  let(:result) do
    result = ""
    Open3.popen2('ruby ./lib/interface.rb') do |i, o, th|
      i.puts "ALICE"
      i.puts "CHARLIE"
      i.puts "BOB"
      i.puts ""
      i.close

      result = o.read
    end
    result
  end

  it "should display the number of students" do
    result.must_match(/3 students/)
  end

  it "should display the student list" do
    result.must_match(/ALICE, BOB and CHARLIE/)
  end
end