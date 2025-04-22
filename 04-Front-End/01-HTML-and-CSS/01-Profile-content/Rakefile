require 'rake'
require 'rake/testtask'

require 'minitest/autorun'
require 'minitest/pride'

task :default do
  describe "index.html" do
    it "should have your own profile HTML code" do
      value(File.open("profile/index.html", "r").readlines.size > 15).must_equal true
    end
  end
end
