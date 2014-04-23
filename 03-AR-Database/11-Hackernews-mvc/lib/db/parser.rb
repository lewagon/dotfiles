module MarmitonScraper
  def self.get_response(url)
    response = open(url)
    doc = Nokogiri::HTML(File.open(response))
  end
    
  def self.extract_recipes(ingredient, difficulty = 1)
    url = "http://www.marmiton.org/recettes/recherche.aspx?aqt=#{ingredient}&dif=#{difficulty}"
    recipes = []
    get_response(url).search('.m_search_result').each do |element|
      recipe = {}
      recipe[:difficulty] = difficulty
      recipe[:name] = element.search('.m_search_titre_recette > a').inner_text      
      element.search('.m_search_result_part4').inner_text.to_s.match(/Préparation : (\d+) min Cuisson : (\d+) min (.{150})/)
      recipe[:length] = $1.to_i + $2.to_i
      recipe[:description] = $3.to_s + "..."   
      
      recipes << recipe
    end
    recipes
  end
end
