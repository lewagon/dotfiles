require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec)

desc "Look for style guide offenses in your code"
task :rubocop do
  sh "rubocop --format simple || true"
end

task default: [:rubocop, :spec]
