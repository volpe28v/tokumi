class CreateUnitprices < ActiveRecord::Migration
  def change
    create_table :unitprices do |t|
      t.integer :price
      t.integer :amount
      t.float :unit
      t.integer :product_id
      t.integer :shop_id

      t.timestamps
    end
  end
end
