class UpdateFieldsOnUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :email
    remove_column :users, :first_name
    remove_column :users, :last_name

    add_column :users, :name, :string, null: false
    add_column :users, :phone_number, :string, null: false
    add_column :users, :date_of_birth, :date, null: false

    add_index :users, :phone_number, unique: true
    add_index :users, [:phone_number, :date_of_birth], unique: true
  end
end
