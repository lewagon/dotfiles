require "open3"

describe "#hop_hop_hop" do
  it "should still work" do
    result = Open3.popen2('ruby ./lib/welcome_closure.rb') { |_, o| o.read }
    expect(result).to eq <<-END.gsub(/^ +/, '')
      Welcome felix, you are the first here!
      Welcome estelle, join your 1 friend
      Welcome cedric, join your 2 friends
      Welcome fred, join your 3 friends
    END
  end
end