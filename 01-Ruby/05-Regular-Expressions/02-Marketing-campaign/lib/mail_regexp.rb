def valid?(email)
  # TODO: return true if the email is valid, false otherwise
end

def clean_database(emails)
  # TODO: return an array with the valid emails only
end

def group_by_tld(emails)
  # TODO: return a Hash with emails grouped by TLD
end

def compose_mail(email)
  # TODO: return a Hash with username, domain and tld extracted from email
end

def compose_translated_email(email)
  # TODO: return a Hash with username, domain and tld extracted from email
  # TODO: translate subject, body, closing and signature, according to TLD
end
