# TODO: return true is the email is valid, false otherwise
def valid?(email)
  return email.match(/^([^@]+)@([^@]+)\.(\w+)$/) ? true : false
end

# TODO: return a Hash with email, name, domain and tld
def extract_data(email)
  match_data = email.match(/^(?<name>\w+)@(?<domain>\w+).(?<tld>\w+)$/)
  return {
    email: email,
    name: match_data[:name],
    domain: match_data[:domain],
    tld: match_data[:tld]
  }
end

# TODO: return a table with only the valid emails
def clean_database(emails)
  emails.select { |email| valid?(email) }
end


LOCALES = {
  en: {
    welcome: "Welcome",
    message: "Our website is now online.",
    visit: "Come and visit us!",
    cheers: "Cheers",
    signature: "The Team"
  },
  fr: {
    welcome: "Bienvenue",
    message: "Notre site est en ligne.",
    visit: "Venez nous rendre visite !",
    cheers: "A bientot",
    signature: "L'Equipe"
  },
  de: {
    welcome: "Willkommen",
    message: "Unsere Website ist jetzt online.",
    visit: "Komm und besuche uns!",
    cheers: "Prost",
    signature: "Das Team"
  }
}

def compose_mail(email_data)
  if LOCALES[email_data[:tld].to_sym].nil?
    language = :en
  else
    language = email_data[:tld].to_sym
  end
  return {
    email: email_data[:email],
    name: email_data[:name].capitalize,
    welcome: LOCALES[language][:welcome],
    message: LOCALES[language][:message],
    visit: LOCALES[language][:visit],
    cheers: LOCALES[language][:cheers],
    signature: LOCALES[language][:signature]
  }
end
