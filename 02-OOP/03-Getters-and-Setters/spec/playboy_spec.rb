# Encoding: utf-8

require "spec_helper"
require "playboy"

describe Playboy do
  
  let(:casanova) { Playboy.new("Giacomo Casanova", "Italian") }
  
  describe "#nationality" do 
    it "you should be able to ask for casanova's nationality" do
      casanova.must_respond_to :nationality
    end
    it "you cannot change casanova's nationality.. he's Italian" do
      casanova.wont_respond_to :nationality=
    end
    it "asking casanova for his nationality should return Italian" do 
      casanova.nationality.must_equal "Italian"
    end
  end
  
  describe "#conquests" do 
    it "you should be able to ask for casanova's conquests" do
      casanova.must_respond_to :conquests      
    end
    it "you cannot impose casanova a conquest" do
      casanova.wont_respond_to :conquests=      
    end
    it "asking casanova for his conquest should return all ladies he met" do 
      casanova.meets("Giullia")
      casanova.meets("Louisia")
      casanova.conquests.must_equal ["Giullia", "Louisia"]     
    end
    
  end
  
  describe "#status=" do 
    it "you should be able to change casanova's status to warn other ladies" do
      casanova.must_respond_to :status=
    end
  end
  
  describe "#status" do 
    it "you should be able to see casanova's marital status" do
      casanova.must_respond_to :status
    end
    it "asking casanova for his status should return his current marital status" do
      casanova.status.must_equal "single"
    end
  end

end
