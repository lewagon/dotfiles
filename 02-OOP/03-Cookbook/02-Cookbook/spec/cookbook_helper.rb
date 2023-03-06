class CookbookHelper
  class RequireError < LoadError; end

  def initialize(params = {})
    @file_name = params[:file_name]
    @class_name = params[:class_name]
  end

  def file_exist?
    File.exist?("#{__dir__}/../lib/#{@file_name}.rb")
  end

  def require_error(e)
    absolute_path_pattern = Regexp.new(__dir__.gsub(/\/spec\z/, ""))
    backtrace_message = e.backtrace.first.gsub(absolute_path_pattern, '')
    relative_path = e.path.gsub(absolute_path_pattern, '')
    RequireError.new("#{backtrace_message} failed to find #{relative_path}")
  end

  def class_defined?
    Object.const_defined?(@class_name)
  end

  def file_and_class_valid?
    file_exist? && class_defined?
  end
end
