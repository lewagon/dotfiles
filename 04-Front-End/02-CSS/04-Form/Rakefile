require 'rake'
require 'rake/testtask'

require 'minitest/autorun'
require 'minitest/pride'

task :default do
  describe "form.html" do
    it "should have your own form" do
      (File.open("form.html","r").readlines.size > 20).must_equal true
    end
  end
end