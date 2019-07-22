RSpec::Support.require_rspec_core 'formatters/base_text_formatter'

class BonusFormatter < RSpec::Core::Formatters::DocumentationFormatter
  RSpec::Core::Formatters.register self, :dump_summary

  def dump_summary(notification)
    output.puts BONUS if notification.failure_count.zero?
    super notification
  end
end

BONUS = "

        _=====_                               _=====_
       / _____ \\                             / _____ \\
     +.-'_____'-.---------------------------.-'_____'-.+
    /   |     |  '.                       .'  |  _  |   \\
   / ___| /|\\ |___ \\                     / ___| /_\\ |___ \\
  / |      |      | ;  __           _   ; | _         _ | ;
  | | <---   ---> | | |__|         |_:> | ||_|       (_)| |
  | |___   |   ___| ;                   ; |___       ___| ;
  |\\    | \\|/ |    /  _     ___      _   \\    | (x) |    /|
  | \\   |_____|  .','\" \"', |___|  ,'\" \"', '.  |_____|  .' |
  |  '-.______.-' /       \\      /       \\  '-._____.-'   |
  |               |       |------|       |                |
  |              /\\       /      \\       /\\               |
  |             /  '.___.'        '.___.'  \\              |
  |            /                            \\             |
   \\          /                              \\           /
    \\________/                                \\_________/


"
