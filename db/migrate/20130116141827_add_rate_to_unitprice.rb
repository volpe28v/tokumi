class AddRateToUnitprice < ActiveRecord::Migration
  def change
    add_column :unitprices, :rate, :float
  end
end
