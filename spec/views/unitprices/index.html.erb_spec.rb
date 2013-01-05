require 'spec_helper'

describe "unitprices/index" do
  before(:each) do
    assign(:unitprices, [
      stub_model(Unitprice,
        :price => 1,
        :amount => 2,
        :unit => 1.5,
        :product_id => 3,
        :shop_id => 4
      ),
      stub_model(Unitprice,
        :price => 1,
        :amount => 2,
        :unit => 1.5,
        :product_id => 3,
        :shop_id => 4
      )
    ])
  end

  it "renders a list of unitprices" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 1.5.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
    assert_select "tr>td", :text => 4.to_s, :count => 2
  end
end
