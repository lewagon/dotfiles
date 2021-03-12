require 'open3'
require 'objspace'

describe "interface.rb" do
  
  describe 'quit' do
    it 'should quit the application with a nice message: "See you next time"' do
      result = nil
      Open3.popen2('ruby ./lib/interface.rb') do |i, o, th|
        i.puts "quit"
        i.close

        result = o.read
      end

      expect(result).to include("~  Farming Diary  ~").once
      expect(result).to include("See you next time")
    end
  end

  describe 'corn' do

    it 'should create a `Corn` instance' do
      result = nil
      Open3.popen2('ruby ./lib/interface.rb') do |i, o, th|
        i.puts "corn"
        i.puts "quit"
        i.close
        result = o.read
      end

      expect(ObjectSpace.each_object(Corn).count).to eq 1
    end
  end

  describe 'rice' do

  end

  describe 'water' do

  end

  describe 'cow' do

  end

  describe 'chicken' do

  end

  describe 'feed' do

  end
end