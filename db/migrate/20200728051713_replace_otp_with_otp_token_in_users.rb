class ReplaceOtpWithOtpTokenInUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :otp
    add_column :users, :otp_token, :text
  end
end
