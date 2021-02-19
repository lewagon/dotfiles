class RoutesSet
  class Route
    attr_reader :verb, :path, :controller_name, :controller_action

    def initialize(verb, path, controller_name, controller_action)
      @verb, @path, @controller_name, @controller_action = verb, path, controller_name, controller_action
    end

    def to_s
      "#{verb} '#{path}', to: '#{controller_name}##{controller_action}'"
    end
  end
end
