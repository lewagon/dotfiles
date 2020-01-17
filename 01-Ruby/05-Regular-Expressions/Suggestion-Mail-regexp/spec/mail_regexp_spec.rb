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


describe "#extract_data" do
  it "should return a Hash with all the informations stored in the email" do
    expect(extract_data("seb@lewagon.fr")).to eq ({ username:"seb", domain:"lewagon", tld:"fr" })
  end
end

describe "#compose_mail" do
  it "should return a Hash with the message informations in french for a .fr mail" do
    email = compose_mail({ username: "julien", domain: "lewagon", tld: "fr" })
    expect(email).to eq ({
                                email: "julien@lewagon.fr",
                                username: "Julien",
                                subject: "Notre site est en ligne",
                                body: "Venez nous rendre visite !",
                                cheers: "A bientot",
                                signature: "L'équipe"
                              })
    display_email(email)
  end
  
  it "should return a Hash with the message informations in german for a .de mail" do
    email = compose_mail({ username: "dimitri", domain: "lewagon", tld: "de" })
    expect(email).to eq ({
                                email: "dimitri@lewagon.de",
                                username: "Dimitri",
                                subject: "Unsere Website ist jetzt online",
                                body: "Komm und besuche uns!",
                                cheers: "Prost",
                                signature: "Das Team"
                              })
    display_email(email)
  end

  it "should return a Hash with the message informations in english for any other ccTlD mail" do
    email = compose_mail({ username: "boris", domain: "lewagon", tld: "com" })
    expect(email).to eq ({
                                email: "boris@lewagon.com",
                                username: "Boris",
                                subject: "Our website is online",
                                body: "Come and visit us!",
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
    │  To: #{(message[:username]).ljust(36)}│
    │  Subject: #{message[:subject].ljust(31)}│
    │                                          │
    │  ──────────────────────────────────────  │
    │                                          │
    │                                          │
    │  #{message[:username].ljust(40)}│
    │                                          │
    │  #{message[:body].ljust(40)}│
    │                                          │
    │  #{message[:cheers].ljust(40)}│
    │  #{message[:signature].ljust(40)}│
    │                                          │
    │                                          │
    │                                          │
    └──────────────────────────────────────────┘


  HEREDOC
end