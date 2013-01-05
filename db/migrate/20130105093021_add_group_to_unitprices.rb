class AddGroupToUnitprices < ActiveRecord::Migration
  def change
    add_column :unitprices, :group, :integer

  end
end
