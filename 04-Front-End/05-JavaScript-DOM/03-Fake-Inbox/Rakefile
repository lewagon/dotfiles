task :eslint do
  system "../../node_modules/.bin/eslint lib/*.js"
end

task :mocha do
  system "../../node_modules/.bin/mocha spec/*.js"
end

task :webpack do
  system "../../node_modules/.bin/webpack-dev-server"
end

task default: [:eslint, :mocha]
