class AddOtpTokenToMerchants < ActiveRecord::Migration[6.0]
  def change
    add_column :merchants, :otp_token, :text
  end
end
