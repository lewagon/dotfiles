# Encoding: utf-8
require "open3"
require "spec_helper"

describe "#hop_hop_hop" do
  it "should still work" do
    result = Open3.popen2('ruby ./lib/refactor_gym_tonic.rb') { |_, o| o.read }
    result.must_equal <<-END.gsub(/^ +/, '')
      hop! One more time..
      hop! hop! One more time..
      hop! hop! hop! One more time..
      hop! hop! hop! hop! One more time..
      hop! hop! hop! hop! hop! One more time..
      hop! hop! hop! hop! hop! hop! One more time..
    END
  end
end
