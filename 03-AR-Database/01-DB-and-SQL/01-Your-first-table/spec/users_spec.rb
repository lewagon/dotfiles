require 'net/http'
require 'rexml/document'

describe "The schema in users.xml" do
  let(:doc) do
    xml = open(File.join(File.dirname(__FILE__), '../lib/users.xml'))
    REXML::Document.new(xml)
  end

  let(:tables) { doc.elements.collect("//table") { |table| table } }

  it "should only have a `users` table" do
    expect(tables.count).to eq(1)
    expect(users_table_exists?).to eq(true)
  end

  describe 'the `users` table' do
    let(:fields) { doc.elements.collect("//row") { |row| row }.map { |r| r['name'] } }

    it 'has the correct fields' do
      expect(fields.count).to eq(4)
      expect(fields.sort).to eq(%w(email first_name id last_name))
    end
  end

  def users_table_exists?
    !tables.first.nil? && tables.first['name'] == 'users'
  end
end
