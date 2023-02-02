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

  describe "#albums" do
    it "returns the list of albums for a given genre (without duplicates)" do
      genre = Genre.first
      expect(genre).to respond_to :albums
      expect(genre.albums.size).to eq 117
      expect(genre.albums.last.title).to eq "Every Kind of Light"
    end
  end

  describe "#artists" do
    it "returns the list of artists for a given genre (without duplicates)" do
      genre = Genre.first
      expect(genre).to respond_to :artists
      expect(genre.artists.size).to eq 51
      expect(genre.artists.last.name).to eq "The Posies"
    end
  end
end
