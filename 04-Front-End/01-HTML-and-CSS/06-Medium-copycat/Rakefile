require 'rake'
require 'rake/testtask'

require 'minitest/autorun'
require 'minitest/pride'

task :default do
  describe "index.html" do
    it "should have your own medium article HTML code" do
      value(File.open("medium-article/index.html", "r").readlines.size > 10).must_equal true
    end
  end

  describe "style.css" do
    it "should have your custom code (more than 5 lines!)" do
      value(File.open("medium-article/style.css", "r").readlines.size > 5).must_equal true
    end
  end
end
