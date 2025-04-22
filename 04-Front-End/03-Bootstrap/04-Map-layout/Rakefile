require 'rake'
require 'rake/testtask'

require 'minitest/autorun'
require 'minitest/pride'

task :default do
  describe "Exercise" do
    it "should have an index.html file" do
      value(File.exist?("index.html")).must_equal true
    end
  end
end
