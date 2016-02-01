task :jslint do
  system "node_modules/jslint/bin/jslint.js application.js"
end

task :mocha do
  system "node_modules/mocha/bin/mocha spec/*.js"
end

task default: [:jslint, :mocha]
