require "spec_helper"

describe "Genre" do
  it "has a name" do
    genre = Genre.first
    expect(genre.name).to eq "Rock"
  end

  it "has many tracks" do
    genre = Genre.first
    expect(genre).to respond_to :tracks
    expect(genre.tracks.size).to eq 1297
  end

  describe "#artists" do
    it "returns the list of artists for a given genre" do
      genre = Genre.first
      expect(genre).to respond_to :artists
      expect(genre.artists.size).to eq 51
      expect(genre.artists.last.name).to eq "The Posies"
    end
  end
end