class AddTempIdForMerchants < ActiveRecord::Migration[6.0]
  def change
    add_column :merchants, :temp_id, :text 
  end
end
