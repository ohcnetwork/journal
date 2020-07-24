class CreateLocalBodies < ActiveRecord::Migration[6.0]
  def change
    create_table :local_bodies, id: :uuid do |t|
      t.integer :district_id, :lb_type_csn
      t.string :lb_code, :lb_name_english, :lb_type, :district_name, :lb_name_full
    end
  end
end
