class Animal
  attr_reader :name

  def initialize(name)
    @name = name
  end
end


class Cow < Animal
  attr_reader :milk

  def initialize(name)
    super(name)
    @milk = 0
  end

  def feed!
    @milk += 1
  end

  def talk
    "moo"
  end
end


class Chicken < Animal
  attr_reader :eggs

  def initialize(name, gender)
    super(name)
    @gender = gender
    @eggs = 0
  end

  def feed!
    @eggs += 1 if @gender == "female"
  end

  def talk
    case @gender
    when "male" then "cock-a-doodle-doo"
    when "female" then "cha-caw"
    end
  end
end
