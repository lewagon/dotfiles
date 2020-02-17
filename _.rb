require 'io/console'
begin
  require "colored"
  require "octokit"
rescue LoadError
  puts "Could not find all needed gems. Please run `bundle install` and retry"
  exit
end

require "json"
require "open-uri"

REQUIRED_RUBY_VERSION = "2.6.3"
REQUIRED_GIT_VERSION = "2.0"
MINIMUM_AVATAR_SIZE = 2 * 1024
GITHUB_AUTHORIZATION_NOTE = 'Le Wagon setup check'.freeze

$all_good = true

def check(label, &block)
  puts "Checking #{label}..."
  result, message = yield
  $all_good = $all_good && result
  puts result ? "[OK] #{message}".green : "[KO] #{message}".red
end

def check_all
  check("shell") do
    if ENV["SHELL"].match(/zsh/)
      [ true, "Your default shell is zsh"]
    else
      [ false, "Your default shell is #{ENV["SHELL"]}, but should be zsh"]
    end
  end
  check("ruby version") do
    if RUBY_VERSION == REQUIRED_RUBY_VERSION
      [ true, "Your default ruby version is #{RUBY_VERSION}" ]
    else
      details = `type -a ruby`
      [ false, "Your default ruby version is #{RUBY_VERSION}, but should be #{REQUIRED_RUBY_VERSION}. Did you run `rbenv global #{REQUIRED_RUBY_VERSION}`?\n#{details}---" ]
    end
  end
  check("git version") do
    version_tokens = `git --version`.gsub("git version", "").strip.split(".").map(&:to_i)
    required_version_tokens = REQUIRED_GIT_VERSION.split(".").map(&:to_i)
    if version_tokens.first == required_version_tokens.first && version_tokens[1] >= required_version_tokens[1]
      [ true, "Your default git version is #{version_tokens.join(".")}"]
    else
      [ false, "Your default git version is outdated: #{version_tokens.join(".")}"]
    end
  end
  check("GitHub setup") do
    begin
      groups = `ssh -T git@github.com 2>&1`.match(/Hi (?<nickname>.*)! You've successfully authenticated/)
      git_email = (`git config --global user.email`).chomp
      nickname = groups["nickname"]

      client = Octokit::Client.new
      client.login = nickname
      puts "Please type in your GitHub password (login: '#{nickname}'):"
      print "> "
      client.password = STDIN.noecho { |stdin| stdin.gets.chomp }
      puts "\nThanks. Asking some infos to GitHub..."
      # TODO(ssaunier): https://github.com/octokit/octokit.rb#two-factor-authentication

      authorization =
        client.authorizations.find { |a| a[:note] == GITHUB_AUTHORIZATION_NOTE } ||
        client.create_authorization(
          scopes: ['user:email'],
          note: GITHUB_AUTHORIZATION_NOTE)
      client.access_token = authorization["token"]

      avatar_url = client.user[:avatar_url]
      emails = client.emails.map { |email| email[:email] }
      client.delete_authorization(authorization[:id])

      if emails.include?(git_email)
        content_length = `curl -s -I #{avatar_url} | grep 'Content-Length:'`.strip.gsub("Content-Length: ", "").to_i
        if content_length >= MINIMUM_AVATAR_SIZE
          [ true, "GitHub email config is OK. And you have a profile picture 📸"]
        else
          [ false, "You don't have any profile picture set.\nIt's important, go to github.com/settings/profile and upload a picture right now."]
        end
      else
        [ false,
          "Your git email is '#{git_email}' and is not listed in https://github.com/settings/emails\n" +
          "Run `git config --global user.email george@abitbol.com` to set your git email address. With your own!"]
      end
    rescue Octokit::Unauthorized => e
      puts "Wrong GitHub password, please try again 🙏     Details: #{e.message}"
      exit 1
    end
  end
  check("git editor setup") do
    editor = `git config --global core.editor`
    if editor.match(/subl/i)
      [ true, "Sublime Text is your default git editor"]
    else
      [ false, "Ask a teacher to check your ~/.gitconfig editor setup. Right now, it's `#{editor.chomp}`"]
    end
  end
  check("ruby gems") do
    if (`which rspec`) != "" && (`which rubocop`) != ""
      [ true, "Everything's fine"]
    else
      [ false, "Rspec and Rubocop gems aren't there. Did you run the `gem install ...` command?"]
    end
  end
end

def outro
  if $all_good
    puts ""
    puts "🚀  Awesome! Your laptop is now ready for 9 weeks of hard work :)".green
    puts "Now it's time to onboard on the Alumni platform 👉  kitt.lewagon.com/onboarding"
  else
    puts ""
    puts "😥  Bummer! Something's wrong, if you're stuck, ask a teacher.".red
  end
end

check_all
outro
