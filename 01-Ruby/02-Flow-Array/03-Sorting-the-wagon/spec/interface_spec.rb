require "open3"

describe "Interface" do
  let(:result_one) do
    result_one = ""
    Open3.popen2("ruby ./lib/interface.rb") do |i, o, th|
      i.puts "Alice"
      i.puts "charlie"
      i.puts "Bob"
      i.puts ""
      i.close

      result_one = o.read
    end
    result_one
  end

  let(:result_two) do
    result_two = ""
    Open3.popen2("ruby ./lib/interface.rb") do |i, o, th|
      i.puts "Alice"
      i.puts "charlie"
      i.puts "daniel"
      i.puts "Bob"
      i.puts ""
      i.close

      result_two = o.read
    end
    result_two
  end

  let(:result_three) do
    result_three = ""
    Open3.popen2("ruby ./lib/interface.rb") do |i, o, th|
      i.puts "Alice"
      i.puts ""
      i.close

      result_three = o.read
    end
    result_three
  end

  context "when the input has 3 students" do
    it "should display the number of students" do
      expect(result_one).to match(/3 students/)
    end

    it "should display the student list, properly formatted" do
      expect(result_one).to match(/Alice, Bob and charlie/)
    end
  end

  context "when the input has 4 students" do
    it "should display the number of students" do
      expect(result_two).to match(/4 students/)
    end

    it "should display the student list, properly formatted" do
      expect(result_two).to match(/Alice, Bob, charlie and daniel/)
    end
  end

  context "when the input has 1 student" do
    it "should display the number of students" do
      expect(result_three).to match(/1 student/)
    end

    it "should display the student list, properly formatted" do
      expect(result_three).to match(/^Alice$/)
    end
  end
end
