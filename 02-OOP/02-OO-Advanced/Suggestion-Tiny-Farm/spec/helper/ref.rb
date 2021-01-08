class Ref
  attr_reader :label, :product, :icon, :bg, :roof

  def initialize(attributes = {})
    @label = attributes[:label]
    @product = attributes[:product]
    @icon = attributes[:icon]
    @bg = attributes[:bg]
    @roof = attributes[:roof]||false
  end
end
