require "tag"

describe "#tag" do
  it "should return the correct html for any example without an attribute" do
    html_string = tag("h1") do
      "Hello world"
    end
    expect(html_string).to eq "<h1>Hello world</h1>"
  end

  it "should return the correct html for an example with one attribute" do
    html_string = tag("h1", ["style", "color: red"]) do
      "Hello world"
    end
    expect(html_string).to eq '<h1 style="color: red">Hello world</h1>'
  end

  it "should return the correct html string for a nested configuration" do
    html_string = tag("div", ["class", "kitt-container"]) do
      tag("a", ["href", "https://kitt.lewagon.com"]) do
        tag("h2") do
          "KITT"
        end
      end
    end
    expect(html_string).to eq '<div class="kitt-container"><a href="https://kitt.lewagon.com"><h2>KITT</h2></a></div>'
  end
end
