require "singleton"

class FakeMailer
  include Singleton

  attr_reader :email_sent, :recipient

  def initialize
    reset
  end

  def reset
    @email_sent = 0
    @recipient = ""
  end

  def mail(email, subject)
    puts "[MAILER] Sending email to #{email} - #{subject}"
    @email_sent += 1
    @recipient = email
  end
end
