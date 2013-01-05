require 'spec_helper'

describe "shops/new" do
  before(:each) do
    assign(:shop, stub_model(Shop,
      :name => "MyString"
    ).as_new_record)
  end

  it "renders new shop form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => shops_path, :method => "post" do
      assert_select "input#shop_name", :name => "shop[name]"
    end
  end
end
