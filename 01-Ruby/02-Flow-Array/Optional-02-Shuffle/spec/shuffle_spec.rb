require "shuffle"

describe '#shuffle' do
  it 'should return an array' do
    expect(shuffle([])).to be_a Array
  end

  it 'should sort an array randomly' do
    a = (1..100).to_a
    b = shuffle(a)
    expect(b).not_to be_nil
    expect(b.length).to eq a.length
    expect(a).not_to eq b
    (1..100).to_a.each do |element|
      expect(b).to include(element)
    end
  end
end
