# frozen_string_literal: true

FactoryBot.define do
  factory :admin_user do
    authentication_token { Faker::Number.hexadecimal(digits: 13) }
    name { Faker::Name.name }
  end
end