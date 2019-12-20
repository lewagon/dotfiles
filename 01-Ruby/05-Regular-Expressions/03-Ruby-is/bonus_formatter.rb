RSpec::Support.require_rspec_core 'formatters/base_text_formatter'

class BonusFormatter < RSpec::Core::Formatters::DocumentationFormatter
  RSpec::Core::Formatters.register self, :dump_summary

  def dump_summary(notification)
    output.puts BONUS if notification.failure_count.zero?
    super notification
  end
end

BONUS = "
┌──────────────────────────────────────────────────┐
│                                                  │
│   Ruby is...                                     │
│                                                  │
│   A dynamic, open source programming language    │
│   with a focus on simplicity and productivity.   │
│   It has an elegant syntax that is natural       │
│   to read and easy to write.                     │
│                                                  │
│                                                  │
└──────────────────────────────────────────────────┘
"
