def valid?(email)
  # TODO: return true is the email is valid, false otherwise
  email.match?(/^([^@]+)@([^@]+)\.(\w+)$/)
end

def clean_database(emails)
  # TODO: return an array with the valid emails only
  emails.select { |email| valid?(email) }
end

def group_by_tld(emails)
  # TODO: return a Hash with emails grouped by TLD
  emails.group_by { |email| email.match(/.(\w+)$/)[1] }
end

def compose_mail(email)
  # TODO: return a Hash with username, domain and tld extracted from email
  match_data = email.match(/^(?<name>\w+)@(?<domain>\w+).(?<tld>\w+)$/)
  return {
    username: match_data[:name],
    domain: match_data[:domain],
    tld: match_data[:tld]
  }
end


LOCALES = {
  en: {
    subject: "Our website is online",
    body: "Come and visit us!",
    cheers: "Cheers",
    signature: "The Team"
  },
  fr: {
    subject: "Notre site est en ligne",
    body: "Venez nous rendre visite !",
    cheers: "A bientot",
    signature: "L'équipe"
  },
  de: {
    subject: "Unsere Website ist jetzt online",
    body: "Komm und besuche uns!",
    cheers: "Prost",
    signature: "Das Team"
  }
}

def translate(word, language)
  if LOCALES[language.to_sym].nil?
    translations = LOCALES[:en]
  else
    translations = LOCALES[language.to_sym]
  end
  return translations[word]
end

def compose_mail_translated(email_data)
  language = email_data[:tld].to_sym
  return {
    email: "#{email_data[:username]}@#{email_data[:domain]}.#{email_data[:tld]}",
    username: email_data[:username].capitalize,
    subject: translate(:subject, language),
    body: translate(:body, language),
    cheers: translate(:cheers, language),
    signature: translate(:signature, language)
  }
end
