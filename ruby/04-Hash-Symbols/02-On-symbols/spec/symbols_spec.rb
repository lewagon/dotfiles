require "symbols"
require "spec_helper"

describe "quizz" do
  it "answers are not all correct" do
    all_answers = are_identical_symbols_same_objects? &&
                  !are_identical_strings_same_objects?
    all_answers.must_equal true
  end
end

describe "#convert_string_to_symbol" do
  it "should return the symbolized version" do
    convert_string_to_symbol("foo").must_equal :foo
    convert_string_to_symbol("bar").must_equal :bar
  end
end

describe "#convert_symbol_to_string" do
  it "should return the stringified version" do
    convert_string_to_symbol(:foo).must_equal "foo"
    convert_string_to_symbol(:bar).must_equal "bar"
  end
end

describe "#me" do
  let(:me_hash) { me }

  it "should tell your age" do
    me_hash.must_be_instance_of Hash
    me_hash[:age].wont_be_empty
  end

  it "should tell your name" do
    me_hash.must_be_instance_of Hash
    me_hash[:name].wont_be_empty
  end
end

describe "#fruits" do
  let(:the_fruits) { fruits }

  it "should be an array" do
    the_fruits.must_be_instance_of Array
    the_fruits.first.must_be_instance_of String
  end
end