require 'rake'
require 'rake/testtask'

require 'minitest/autorun'
require 'minitest/pride'

task :default do
  describe "style.css" do
    it "should have your custom code (more than 5 lines!)" do
      value(File.open("buttons/css/components/button.css", "r").readlines.size > 5).must_equal true
    end
  end
end
