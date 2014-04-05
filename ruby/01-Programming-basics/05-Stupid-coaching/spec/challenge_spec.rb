# Encoding: utf-8

require "spec_helper"
require "coach_answer"

describe "#coach_answer" do

  it 'returns a String' do
    coach_answer("Hello Coach !").must_be_instance_of String
  end

  it 'answers back when you tell him something' do
    coach_answer("Hello Coach !").must_equal "I don't care son, get dressed and go to work !"
  end

  it 'answers back when you ask him something' do
    coach_answer("Hello Coach ?").must_equal "Silly question, get dressed and go to work !"
  end

  it 'does not answer back when you tell him you are going to work' do
    coach_answer("I am going to work right now SIR !").must_equal ""
  end
end
