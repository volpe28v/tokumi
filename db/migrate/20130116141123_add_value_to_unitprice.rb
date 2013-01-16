class AddValueToUnitprice < ActiveRecord::Migration
  def change
    add_column :unitprices, :value, :float
  end
end
