module DemoModule

  class DemoClass  
    
    def self.introduce
      #TODO: choose return between 1, 2, 3
    end

    def introduce
      #TODO: choose return between 1, 2, 3
    end

  end
  
  def self.introduce
    #TODO: choose return between 1, 2, 3
  end

end

def get_the_tierce
  first = DemoModule::introduce
  second = DemoModule::DemoClass.introduce      
  third = DemoModule::DemoClass.new.introduce
  [first, second, third]
end

p get_the_tierce == [1, 2, 3] # => true