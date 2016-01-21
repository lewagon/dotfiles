require_relative "spec_helper"

describe "GET /" do
  it "should display a list of artists, including Nirvana and Queen" do
    get '/'
    expect(last_response).to be_ok
    expect(last_response.body).to include("Nirvana")
    expect(last_response.body).to include("Queen")
  end
end

describe "GET /artists/110" do
  it "should display albums of Nirvana, Nevermind and From The Muddy Banks Of The Wishkah [Live]" do
    get '/artists/110'
    expect(last_response).to be_ok
    expect(last_response.body).to include("Nevermind")
    expect(last_response.body).to include("From The Muddy Banks Of The Wishkah [Live]")
  end
end

describe "GET /albums/164" do
  it "should display tracks of the album Nervermind from Nirvana" do
    get '/albums/164'
    expect(last_response).to be_ok
    expect(last_response.body).to include("Smells Like Teen Spirit")
    expect(last_response.body).to include("In Bloom")
  end
end

describe "GET /tracks/2003" do
  it "should display the track Smells Like Teen Spirit" do
    get '/tracks/2003'
    expect(last_response).to be_ok
  end
end
