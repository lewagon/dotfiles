task :eslint do
  system "../../node_modules/.bin/eslint lib/select.js"
end

task :mocha do
  # For Kitt to trigger tests.
end

task :webpack do
  system "../../node_modules/.bin/webpack-dev-server"
end

task default: [:eslint]
