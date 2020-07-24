class AddLbCodeToMerchants < ActiveRecord::Migration[6.0]
  def change
    add_column :merchants, :lb_code, :string
  end
end
