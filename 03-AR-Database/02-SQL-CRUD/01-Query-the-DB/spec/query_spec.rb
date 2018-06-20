require 'query'
require 'pry-byebug'


DATABASE_PATH = File.join(File.dirname(__FILE__), '../lib/db/jukebox.sqlite')

describe '#all_artists' do


  let(:db) { SQLite3::Database.new(DATABASE_PATH) }

  it 'returns the right number of records' do
    expect(all_artists(db)&.count).to eq(275)
  end

  it 'returns all the correct ids' do
    all_ids = (1..275).to_a
    expect(all_artists(db)&.map(&:first)).to eq(all_ids)
  end

  it 'returns all the fields from artists table' do
    record = all_artists(db).sample
    expect(record.size).to eq(2)
  end
end
