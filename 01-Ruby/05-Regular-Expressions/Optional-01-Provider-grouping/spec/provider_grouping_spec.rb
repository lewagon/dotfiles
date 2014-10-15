require "provider_grouping"

describe "The method group_mails" do
  it "should render an empty hash if provided with empty array" do
    expect(group_mails([])).to eq({})
  end

  it "should group emails by provider" do
    user_emails = %w(bob@yahoo.fr roger57@hotmail.fr bigbox@yahoo.fr \
                      boris@lewagon.org monsieur.olivier@gmail.com \
                      monsieur.mack@gmail.com)
    result = {
        "yahoo" => ["bob@yahoo.fr", "bigbox@yahoo.fr"],
        "hotmail" => ["roger57@hotmail.fr"],
        "lewagon" => ["boris@lewagon.org"],
        "gmail" => ["monsieur.olivier@gmail.com", "monsieur.mack@gmail.com"]
    }

    expect(group_mails(user_emails)).to eq result

  end
end

describe "The method provider?" do
  it "should return true if provider asked is correct" do
    expect(provider?("seb@gmail.com", "gmail")).to eq true
  end

  it "should return false if provider asked is not correct" do
    expect(provider?("seb@gmail.com", "hotmail")).to eq false
  end
end