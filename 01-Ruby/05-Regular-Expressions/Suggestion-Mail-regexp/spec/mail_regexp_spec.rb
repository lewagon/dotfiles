require "mail_regexp"

describe "#valid?" do
  it "should return true with a valid email" do
    expect(valid?("boris@lewagon.com")).to be true
  end

  it "should return false with an invalid email" do
    expect(valid?("borislewagon.com")).to be false
  end
end

describe "#clean_database" do
  it "should return a table with only the valid emails" do
    emails = [
      "thomasgmail.com",
      "kevin@yahoo.fr",
      "edward@gmail.fr",
      "elsa@",
      "julien@mdn.fr",
      "dimitri@berlin.de"
    ]
    expect(clean_database(emails)).to eq ["kevin@yahoo.fr", "edward@gmail.fr", "julien@mdn.fr", "dimitri@berlin.de"]
  end

 
end

describe "#extract_data" do
  it "should return a Hash with all the informations stored in the email" do
    expect(extract_data("seb@lewagon.fr")).to eq ({ email:"seb@lewagon.fr", name:"seb", domain:"lewagon", tld:"fr" })
  end
end

describe "#compose_mail" do
  it "should return a Hash with the message informations in french for a .fr mail" do
    email = compose_mail({ email: "julien@lewagon.fr", name: "julien", domain: "lewagon", tld: "fr" })
    expect(email).to eq ({
                                email: "julien@lewagon.fr",
                                name: "Julien",
                                welcome: "Bienvenue",
                                message: "Notre site est en ligne.",
                                visit: "Venez nous rendre visite !",
                                cheers: "A bientot",
                                signature: "L'Equipe"
                              })
    display_email(email)
  end
  
  it "should return a Hash with the message informations in german for a .de mail" do
    email = compose_mail({ email: "dimitri@lewagon.fr", name: "dimitri", domain: "lewagon", tld: "de" })
    expect(email).to eq ({
                                email: "dimitri@lewagon.fr",
                                name: "Dimitri",
                                welcome: "Willkommen",
                                message: "Unsere Website ist jetzt online.",
                                visit: "Komm und besuche uns!",
                                cheers: "Prost",
                                signature: "Das Team"
                              })
    display_email(email)
  end

  it "should return a Hash with the message informations in english for any other ccTlD mail" do
    email = compose_mail({ email: "boris@lewagon.com", name: "boris", domain: "lewagon", tld: "com" })
    expect(email).to eq ({
                                email: "boris@lewagon.com",
                                name: "Boris",
                                welcome: "Welcome",
                                message: "Our website is now online.",
                                visit: "Come and visit us!",
                                cheers: "Cheers",
                                signature: "The Team"
                              })
    display_email(email)
  end
end



def display_email(message)
  puts <<-HEREDOC

    ┌──────────────────────────────────────────┐
    │  ===================================== x │
    │                                          │
    │                                          │
    │  To: #{message[:email].ljust(36)}│
    │  Subject: #{message[:welcome].ljust(31)}│
    │                                          │
    │  ──────────────────────────────────────  │
    │                                          │
    │                                          │
    │  #{message[:name].ljust(40)}│
    │                                          │
    │  #{message[:message].ljust(40)}│
    │  #{message[:visit].ljust(40)}│
    │                                          │
    │  #{message[:cheers].ljust(40)}│
    │  #{message[:signature].ljust(40)}│
    │                                          │
    │                                          │
    │                                          │
    └──────────────────────────────────────────┘


  HEREDOC
end