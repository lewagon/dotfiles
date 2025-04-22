require "spec_helper"

describe "Album" do
  it "has a title" do
    album = Album.first
    expect(album.title).to eq "For Those About To Rock We Salute You"
  end

  it "belongs to an artist" do
    album = Album.first
    expect(album).to respond_to :artist
    expect(album.artist.name).to eq("AC/DC")
  end

  it "has many tracks" do
    album = Album.first
    expect(album).to respond_to :tracks
    expect(album.tracks.size).to eq 10
  end

  it "is invalid if title is not present" do
    expect(Album.new(title: "", artist: Artist.first)).to be_invalid
  end

  it "is invalid if artist is not present" do
    expect(Album.new(title: "fake title", artist: nil)).to be_invalid
  end

  it "is valid if title and artist are present" do
    expect(Album.new(title: "fake title", artist: Artist.first)).to be_valid
  end
end
