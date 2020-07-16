class CreateMerchants < ActiveRecord::Migration[6.0]
  def change
    create_table :merchants, id: :uuid do |t|
      t.string :name,         null: false
      t.string :phone_number, null: false
      t.text :address,        null: false

      t.timestamps
    end
  end
end
