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

  describe "#hair_length=" do
    it "casanova may have his haircut" do
      casanova.must_respond_to :hair_length=
    end
  end

  describe "#hair_length" do
    it "casanova does not hide his hair_length" do
      casanova.must_respond_to :hair_length
    end
    it "casanova does not lie on his hair_length" do
      casanova.hair_length.must_equal 20
    end
  end

end
