require "browser"

BONUS = <<-eos

                _________________
               /                /|
              /                / |
             /________________/ /|
          ###|      ____      |//|
         #   |     /   /|     |/.|
        #  __|___ /   /.|     |  |_______________
       #  /      /   //||     |  /              /|                  ___
      #  /      /___// ||     | /              / |                 / \\ \\
      # /______/!   || ||_____|/              /  |                /   \\ \\
      #| . . .  !   || ||                    /  _________________/     \\ \\
      #|  . .   !   || //      ________     /  /\\________________  {   /  }
      /|   .    !   ||//~~~~~~/   0000/    /  / / ______________  {   /  /
     / |        !   |'/      /9  0000/    /  / / /             / {   /  /
    / #\\________!___|/      /9  0000/   /  / / /_____________/___  /  /
   / #     /_____\\/        /9  0000/   /  / / /_  /\\_____________\\/  /
  / #                      ``^^^^^^    /   \\ \\ . ./ / ____________   /
 +=#==================================/     \\ \\ ./ / /.  .  .  \\ /  /
 |#                                   |      \\ \\/ / /___________/  /
 #                                    |_______\\__/________________/
 |                                    |               |  |  / /
 |                                    |               |  | / /
 |                                    |       ________|  |/ /________
 |                                    |      /_______/    \\_________/\\
 |                                    |     /        /  /           \\ )
 |                                    |    /OO^^^^^^/  / /^^^^^^^^^OO\\)
 |                                    |            /  / /
 |                                    |           /  / /
 |                                    |          /___\\/
 |hectoras                            |           oo
 |____________________________________|

------------------------------------------------

eos

describe "Browser" do
  let (:browser) { Browser.new }

  it "should implement a fetch_content method" do
    expect(browser).to respond_to :fetch_content
  end

  describe "#fetch_content" do
    let(:content) { browser.fetch_content("http://motherfuckingwebsite.com/") }

    it 'should return a String' do
      expect(content).to be_kind_of(String)
    end

    it "should return a string for http://motherfuckingwebsite.com/" do
      expect(content).to match /This is a motherfucking website/
    end

    it "should not contain HTML tags" do
      expect(content).not_to match /<body>/
    end
  end
end
