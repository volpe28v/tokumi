class AddStarToUnitprice < ActiveRecord::Migration
  def change
    add_column :unitprices, :star, :boolean
  end
end
