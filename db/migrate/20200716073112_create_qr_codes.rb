class CreateQrCodes < ActiveRecord::Migration[6.0]
  def change
    create_table :qr_codes, id: :uuid do |t|
      t.string  :qr_coded_id
      t.string  :qr_coded_type
      t.text :svg
      
      t.timestamps
    end

    add_index :qr_codes, [:qr_coded_type, :qr_coded_id]
  end
end
