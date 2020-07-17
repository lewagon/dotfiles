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


describe "#group_by_tld" do
  it "should return a Hash with the emails addresses grouped by TLD" do
    expect(group_by_tld(["kevin@yahoo.fr", "edward@gmail.fr", "julien@mdn.com", "dimitri@berlin.de"])).to eq ({"com"=>["julien@mdn.com"], "de"=>["dimitri@berlin.de"], "fr"=>["kevin@yahoo.fr", "edward@gmail.fr"]})
  end
end


describe "#compose_mail" do
  it "should return a Hash with all the informations stored in the email" do
    expect(compose_mail("seb@lewagon.fr")).to eq ({ username: "seb", domain: "lewagon", tld: "fr" })
    expect(compose_mail("dimitri@lewagon.de")).to eq ({ username: "dimitri", domain: "lewagon", tld: "de"})
  end
end

describe "#compose_mail_translated" do
  it "should return a Hash with the message informations in french for a .fr mail" do
    email = compose_mail_translated("julien@lewagon.fr")
    expect(email).to eq ({
                                username: "julien",
                                domain: "lewagon",
                                tld: "fr",
                                subject: "Notre site est en ligne",
                                body: "Venez nous rendre visite !",
                                closing: "A bientot",
                                signature: "L'équipe"
                              })
    display_email(email)
  end
  
  it "should return a Hash with the message informations in german for a .de mail" do
    email = compose_mail_translated("dimitri@berlin.de")
    expect(email).to eq ({
                                username: "dimitri",
                                domain: "berlin",
                                tld: "de",
                                subject: "Unsere Website ist jetzt online",
                                body: "Komm und besuche uns!",
                                closing: "Bis bald",
                                signature: "Das Team"
                              })
    display_email(email)
  end

  it "should return a Hash with the message informations in english for any other ccTlD mail" do
    email = compose_mail_translated("boris@lewagon.com")
    expect(email).to eq ({
                                username: "boris",
                                domain: "lewagon",
                                tld: "com",
                                subject: "Our website is online",
                                body: "Come and visit us!",
                                closing: "See you soon",
                                signature: "The Team"
                              })
    display_email(email)
  end
end



def display_email(message)
  email = "#{message[:username]}@#{message[:domain]}.#{message[:tld]}"
  puts <<-HEREDOC

    ┌──────────────────────────────────────────┐
    │  ===================================== x │
    │                                          │
    │                                          │
    │  To: #{email.ljust(36)}│
    │  Subject: #{message[:subject].ljust(31)}│
    │                                          │
    │  ──────────────────────────────────────  │
    │                                          │
    │                                          │
    │  Dear #{message[:username].capitalize.ljust(35)}│
    │                                          │
    │  #{message[:body].ljust(40)}│
    │                                          │
    │  #{message[:closing].ljust(40)}│
    │  #{message[:signature].ljust(40)}│
    │                                          │
    │                                          │
    │                                          │
    └──────────────────────────────────────────┘


  HEREDOC
end