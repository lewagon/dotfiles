require "spec_helper"

describe "MediaType" do
  it "has a name" do
    media_type = MediaType.first
    expect(media_type.name).to eq "MPEG audio file"
  end

  it "has many tracks" do
    media_type = MediaType.first
    expect(media_type).to respond_to :tracks
    expect(media_type.tracks.size).to eq 3034
  end
end