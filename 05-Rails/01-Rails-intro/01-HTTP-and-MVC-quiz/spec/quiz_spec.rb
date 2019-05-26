require 'quiz'

describe 'quiz' do
  describe '#http_stands_for' do
    it 'returns the correct answer' do
      correct_pattern = /hyper((\s?)|-)text transfer protocol/i
      expect(http_stands_for).to match(correct_pattern)
    end
  end

  describe 'http_requests_per_page' do
    it 'returns the correct answer' do
      expect(http_requests_per_page).to eq('There is one HTTP request per resource/file needed for a web page (HTML, CSS, JS, etc).')
    end
  end

  describe 'view_responsibility' do
   it 'returns the correct answer' do
      expect(view_responsibility).to eq('displays information to users')
    end
  end
end
