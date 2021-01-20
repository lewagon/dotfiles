# 03-Iterators-Blocks/04-HTML-generator/
def tag(tag_name, attributes = nil)
  # TODO: Build HTML tags around content given in the block
  #       The method can be called with an optional HTML attribute inputted as [attr_name, attr_value]
  if attributes.nil?
    "<#{tag_name}>#{yield}</#{tag_name}>"
  else
    "<#{tag_name} #{attributes.first}=\"#{attributes.last}\">#{yield}</#{tag_name}>"
  end
end

# <div class="kitt-container"><a href="https://kitt.lewagon.com"><h2>KITT</h2></a></div>
