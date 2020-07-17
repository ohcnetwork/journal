class CreateAdminUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :admin_users, id: :uuid do |t|
      t.string :name
      t.string :authentication_token
      t.timestamps
    end
  end
end
