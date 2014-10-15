# Encoding: utf-8

require "playboy"

describe Playboy do

  let(:casanova) { Playboy.new("Giacomo Casanova", "Italian") }

  describe "#nationality" do
    it "you should be able to ask for casanova's nationality" do
      expect(casanova).to respond_to :nationality
    end
    it "you cannot change casanova's nationality.. he's Italian" do
      expect(casanova).not_to respond_to :nationality=
    end
    it "asking casanova for his nationality should return Italian" do
      expect(casanova.nationality).to eq "Italian"
    end
  end

  describe "#conquests" do
    it "you should be able to ask for casanova's conquests" do
      expect(casanova).to respond_to :conquests
    end
    it "you cannot impose casanova a conquest" do
      expect(casanova).not_to respond_to :conquests=
    end
    it "asking casanova for his conquest should return all ladies he met" do
      casanova.meets("Giullia")
      casanova.meets("Louisia")
      expect(casanova.conquests).to eq ["Giullia", "Louisia"]
    end

  end

  describe "#hair_length=" do
    it "casanova may have his haircut" do
      expect(casanova).to respond_to :hair_length=
    end
  end

  describe "#hair_length" do
    it "casanova does not hide his hair_length" do
      expect(casanova).to respond_to :hair_length
    end
    it "casanova does not lie on his hair_length" do
      expect(casanova.hair_length).to eq 20
    end
  end

end
