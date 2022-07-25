class RequireError < LoadError
end

begin
  require "controller"
  require "cookbook"
  require "recipe"
  require "view"
rescue LoadError => e
  describe "LoadError Check" do
    it 'requires files with no errors' do
      absolute_path_pattern = /.*\/fullstack-challenges.*\d+-Cookbook\//
      backtrace_message = e.backtrace.first.gsub(absolute_path_pattern, '')
      relative_path = e.path.gsub(absolute_path_pattern, '')
      raise RequireError.new("#{backtrace_message} failed to find #{relative_path}")
    end
  end
end
