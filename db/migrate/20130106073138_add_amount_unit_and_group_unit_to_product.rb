class AddAmountUnitAndGroupUnitToProduct < ActiveRecord::Migration
  def change
    add_column :products, :amount_unit, :string

    add_column :products, :group_unit, :string

  end
end
