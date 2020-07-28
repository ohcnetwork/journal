# frozen_string_literal: true

module OtpVerifiable
  def send_otp!
    if sms_sending_enabled?
      token = OtpService.new(phone_number).send!
      update!(otp_token: token)
    end
  end

  def valid_otp?(otp)
    if sms_sending_enabled?
      OtpService.new(phone_number).verify!(otp, self.otp_token)
    elsif (Rails.env.development? || Rails.env.test?)
      otp == "1947" # for testing in development mode without sending OTP
    else
      false
    end
  end
end