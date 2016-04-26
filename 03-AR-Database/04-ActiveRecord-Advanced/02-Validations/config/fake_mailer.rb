require "singleton"

class FakeMailer
  include Singleton

  attr_reader :email_sent

  def initialize
    reset
  end

  def reset
    @email_sent = 0
  end

  def mail(email, subject)
    puts "[MAILER] Sending email to #{email} - #{subject}"
    @email_sent += 1
  end
end
