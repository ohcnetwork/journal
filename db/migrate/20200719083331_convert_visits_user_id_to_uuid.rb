class ConvertVisitsUserIdToUuid < ActiveRecord::Migration[6.0]
  def change
    add_column :visits, :uuid, :uuid

    change_table :visits do |t|
      t.remove :user_id
      t.rename :uuid, :user_id
    end
  end
end
