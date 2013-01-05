require 'spec_helper'

describe "unitprices/edit" do
  before(:each) do
    @unitprice = assign(:unitprice, stub_model(Unitprice,
      :price => 1,
      :amount => 1,
      :unit => 1.5,
      :product_id => 1,
      :shop_id => 1
    ))
  end

  it "renders the edit unitprice form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => unitprices_path(@unitprice), :method => "post" do
      assert_select "input#unitprice_price", :name => "unitprice[price]"
      assert_select "input#unitprice_amount", :name => "unitprice[amount]"
      assert_select "input#unitprice_unit", :name => "unitprice[unit]"
      assert_select "input#unitprice_product_id", :name => "unitprice[product_id]"
      assert_select "input#unitprice_shop_id", :name => "unitprice[shop_id]"
    end
  end
end
