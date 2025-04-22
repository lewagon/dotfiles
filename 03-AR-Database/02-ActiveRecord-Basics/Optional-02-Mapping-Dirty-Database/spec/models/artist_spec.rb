require "spec_helper"

describe "Artist" do
  it "has a primary key" do
    artist = Artist.first
    expect(artist.id).to eq 1
  end

  it "has a name" do
    artist = Artist.first
    expect(artist.name).to eq "AC/DC"
  end

  it "has many albums" do
    artist = Artist.first
    expect(artist).to respond_to :albums
    expect(artist.albums.first.title).to eq("For Those About To Rock We Salute You")
  end

  it "has many tracks" do
    artist = Artist.first
    expect(artist).to respond_to :tracks
    expect(artist.tracks.size).to eq(18), 'AC/DC has 18 tracks!'
  end

  it "is valid if name is present" do
    expect(Artist.new(name: "")).to be_invalid
  end
end