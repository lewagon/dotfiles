require_relative "route"

class RoutesSet
  def self.draw(&block)
    set = new
    set.instance_eval(&block)

    return set
  end

  %i(get post delete patch put).each do |http_verb|
    define_method http_verb do |path, to_controller|
      controller_name, controller_action = to_controller[:to].split("#")
      path = path.gsub(/^\//, "")

      route = Route.new(http_verb, path, controller_name, controller_action)
      @routes << route
    end
  end

  def root(to_controller)
    # NOOP
  end

  attr_reader :routes

  def initialize
    @routes = []
  end

  def to_s
    @routes.map(&:to_s).sort.join("\n")
  end
end
