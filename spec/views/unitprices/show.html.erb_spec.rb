require 'spec_helper'

describe "unitprices/show" do
  before(:each) do
    @unitprice = assign(:unitprice, stub_model(Unitprice,
      :price => 1,
      :amount => 2,
      :unit => 1.5,
      :product_id => 3,
      :shop_id => 4
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    rendered.should match(/2/)
    rendered.should match(/1.5/)
    rendered.should match(/3/)
    rendered.should match(/4/)
  end
end
