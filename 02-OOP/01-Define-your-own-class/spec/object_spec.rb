classes = []

require "spec_helper"

Dir.glob("lib/*.rb").each do |file|
  filename = file.split("lib/").last
  class_name = filename.split(".rb").first
  require filename
  classes <<  Object.const_get(camelize(class_name))
end

describe "lib folder" do
  it "should have at least one file defining one class" do
    classes.length.wont_equal 0
  end
end

classes.each do |klass|

  describe klass do
    it "should have an initializer taking at least one argument" do
      klass.instance_method(:initialize).arity.wont_equal 0
    end

    it "should have at least one instance method" do
      klass.instance_methods(false).length.wont_equal 0
    end
  end

end