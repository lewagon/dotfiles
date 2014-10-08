require 'open3'

describe "Interface" do

  let(:result) do
    result = ""
    Open3.popen2('ruby ./lib/interface.rb') do |i, o, th|
      i.puts "Alice"
      i.puts "charlie"
      i.puts "Bob"
      i.puts ""
      i.close

      result = o.read
    end
    result
  end

  it "should display the number of students" do
    expect(result).to match(/3 students/)
  end

  it "should display the student list" do
    expect(result).to match(/Alice, Bob and charlie/)
  end
end