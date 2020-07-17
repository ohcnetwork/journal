class CreateVisits < ActiveRecord::Migration[6.0]
  def change
    create_table :visits, id: :uuid do |t|
      t.string :visitable_type
      t.uuid :visitable_id
      t.integer :user_id
      t.datetime :entry_at, :exit_at
    end
  end
end
