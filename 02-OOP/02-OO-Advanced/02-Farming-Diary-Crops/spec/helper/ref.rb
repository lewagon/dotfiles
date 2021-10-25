class Ref
  attr_reader :label, :product, :icon, :bg, :roof, :items, :count

  def initialize(attributes = {})
    @label = attributes[:label]
    @product = attributes[:product]
    @icon = attributes[:icon]
    @bg = attributes[:bg]
    @roof = attributes[:roof]||false
    @items = select_instances(@label)
    @count = @items.length
  end

  def is_a_class?(class_name)
    Object.const_defined?(class_name)
  end
  
  def select_instances(class_name)
    is_a_class?(class_name) ? ObjectSpace.each_object(Object.const_get(class_name)).to_a : []
  end

  def get_icon(item)
    item.class.name == @label ? @icon : @bg
  end

  def get_product(item)
    item.respond_to?(@product) ? item.send(@product) : 0
  end

  def product_count
    if @count > 0 && @items.any? { |item| item.respond_to?(@product) }
      @items.reduce(0) { |sum, item| sum + get_product(item) }
    else
      0
    end
  end

  def nice_product
    @product.to_s
  end
end
