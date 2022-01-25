require 'rake'
require 'rake/testtask'
require 'minitest/autorun'
require 'minitest/pride'

task :default do
  describe "index.html" do
    it "should change some HTML" do
      value(File.open("index.html", "r").readlines.size == 67).must_equal false
    end
  end
end
