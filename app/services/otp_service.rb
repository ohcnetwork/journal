# frozen_string_literal: true

class OtpService
  AppKey = ENV["SMS_API_KEY"]

  attr_reader :phone_number

  def initialize(phone_number)
    @phone_number = phone_number
  end

  def send_url
    @_send_url ||= "https://passadmin.coronasafe.network/api/v1/sms/send-otp"
  end

  def verify_url
    @_verify_url ||= "https://passadmin.coronasafe.network/api/v1/sms/verify-otp"
  end

  def send!
    params = {
      "phoneNumber" => phone_number,
      "appKey" => AppKey
    }

    response = post!(send_url, params)
    JSON.parse(response.body)["data"]["token"] rescue false
  end

  def verify!(otp, token)
    params = {
      "phoneNumber" => phone_number,
      "token" => token,
      "otp" => otp,
      "appKey" => AppKey
    }

    response = post!(verify_url, params)
    JSON.parse(response.body)["meta"]["success"] rescue false
  end

  def post!(url, params)
    Net::HTTP.post_form(URI.parse(url), params)
  end
end
