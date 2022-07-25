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
      backtrace_message = e.backtrace.first.gsub(/.*\/fullstack-challenges.*\d+-Cookbook/, '')
      relative_path = e.path.gsub(/.*\/fullstack-challenges.*\d+-Cookbook/, '')
      raise RequireError.new("#{backtrace_message} failed to find #{relative_path}")
    end
  end
end
