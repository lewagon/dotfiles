require 'yaml'

desc "Check default syllabus for wrong exercises path"
task :check do
  syllabus = YAML.load_file('syllabus.yml')
  syllabus['default']['weeks'].each do |week|
    week['days'].each do |day|
      day['exercises'].each do |exercise|
        path = exercise['path']
        raise Errno::ENOENT.new("Exercise path not found: #{path}") unless File.exists?(path)
      end
    end
  end
  puts "👌  All good!"
end

task :generate do
  paths = Dir.glob("*").select { |e| File.directory?(e) }.reject { |e| e == "00-Setup" }
  days = []
  paths.each do |path|
    Dir.glob("#{path}/*").select { |e| File.directory?(e) }.each do |day|
      days << {
        "number" => 0,
        "path" => day,
        "exercises" => Dir.glob("#{day}/*").select { |e| File.directory?(e) }.map { |e| { "path" => e } }
      }
    end
  end
  puts ({
    "weeks" => {
      "number" => 0,
      "days" => days
    }
  }.to_yaml)
end

task default: :check
