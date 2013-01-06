class AddDefaultAmountAndDefaultGroupAndDefaultPriceToProduct < ActiveRecord::Migration
  def change
    add_column :products, :default_amount, :float

    add_column :products, :default_group, :integer

    add_column :products, :default_price, :integer

  end
end
