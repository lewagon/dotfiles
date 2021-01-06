require "join_queries"

DATABASE_PATH = File.join(File.dirname(__FILE__), '../lib/db/jukebox.sqlite')

describe 'Join Query method' do
  let(:db) { SQLite3::Database.new(DATABASE_PATH) }

  describe 'detailed_tracks' do
    it 'returns an Array' do
      expect(detailed_tracks(db)).to be_a Array
    end

    it 'should return 3503 tracks' do
      expect(detailed_tracks(db).length).to eq 3503
    end

    it 'should return the first track correctly (track name, album title, artist name)' do
      first_track = detailed_tracks(db).first
      expect(first_track[0]).to eq("For Those About To Rock (We Salute You)")
      expect(first_track[1]).to eq("For Those About To Rock We Salute You")
      expect(first_track[2]).to eq("AC/DC")
    end

    it 'should return details for each track' do
      tracks = detailed_tracks(db)
      tracks.each do |track|
        expect(track.length).to eq 3
      end
    end
  end

  describe 'stats_on' do
    it 'returns a Hash' do
      expect(stats_on(db, "Rock")).to be_a Hash
    end

    it 'computes stats for Rock' do
      rock_stats = stats_on(db, 'Rock')
      expect(rock_stats).to eq({ category: "Rock", number_of_songs: 1297, avg_length: 4.73 })
    end

    it 'computes stats for Jazz' do
      jazz_stats = stats_on(db, 'Jazz')
      expect(jazz_stats).to eq({ category: "Jazz", number_of_songs: 130, avg_length: 4.86 })
    end

    it 'computes stats for Heavy Metal' do
      heavy_metal_stats = stats_on(db, 'Heavy Metal')
      expect(heavy_metal_stats).to eq({ category: "Heavy Metal", number_of_songs: 28, avg_length: 4.96 })
    end
  end

  describe 'top_five_artists' do
    it 'returns an Array' do
      expect(top_five_artists(db, 'Rock')).to be_a Array
    end

    it 'returns the TOP 5 artists for Rock' do
      top_5_rock = top_five_artists(db, 'Rock')
      expect(top_5_rock[0]).to eq [ 22, 'Led Zeppelin', 114 ]
      expect(top_5_rock[1]).to eq [ 150, 'U2', 112 ]
      expect(top_5_rock[2]).to eq [ 58, 'Deep Purple', 92 ]
      expect(top_5_rock[3]).to eq [ 90, 'Iron Maiden', 81 ]
      expect(top_5_rock[4]).to eq [ 118, 'Pearl Jam', 54 ]
    end

    it 'only returns 5 artists, no more or less' do
      expect(top_five_artists(db, 'Rock').length).to eq 5
    end

    it 'returns the TOP 5 artists for Pop' do
      top_5_pop = top_five_artists(db, 'Pop')
      expect(top_5_pop[0]).to eq [ 150, 'U2', 23 ]
      expect(top_5_pop[1]).to eq [ 21, 'Various Artists', 14 ]
      expect(top_5_pop[2]).to eq [ 252, 'Amy Winehouse', 11 ]
      # Only 3 artists have POP songs in the DB.
    end
  end
end
