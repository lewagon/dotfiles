require "spec_helper"

describe "Track" do
  let(:track) { Track.first }

  it "has a name" do
    expect(track.name).to eq "For Those About To Rock (We Salute You)"
  end

  it "has a composer" do
    expect(track.composer).to eq "Angus Young, Malcolm Young, Brian Johnson"
  end

  describe "#seconds" do
    it "should return the rounded number of seconds for the track" do
      expect(track.seconds).to eq 344
    end
  end

  describe "#artist" do
    it "should return the artist for a given track" do
      expect(track.artist.name).to eq "AC/DC"
    end
  end

  it "belongs to an album" do
    expect(track.album.title).to eq "For Those About To Rock We Salute You"
  end

  it "belongs to a media type" do
    expect(track.media_type.name).to eq "MPEG audio file"
  end

  it "belongs to a genre" do
    expect(track.genre.name).to eq "Rock"
  end
end