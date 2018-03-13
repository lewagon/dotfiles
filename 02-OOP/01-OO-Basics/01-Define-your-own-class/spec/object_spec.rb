classes = []

Dir.glob("lib/*.rb").each do |file|
  filename = file.split("lib/").last
  class_name = filename.split(".rb").first
  unless class_name == "interface"
    require filename
    classes <<  Object.const_get(class_name.split('_').collect(&:capitalize).join)
  end
end

describe "lib folder" do
  it "should have at least one file defining one class" do
    expect(classes.length).not_to eq 0
  end
end

classes.each do |klass|

  describe klass do
    it "should have an initializer taking at least one argument" do
      expect(klass.instance_method(:initialize).arity).not_to eq 0
    end

    it "should have at least one instance method" do
      expect(klass.instance_methods(false).length).not_to eq 0
    end
  end

end
