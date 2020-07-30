# frozen_string_literal: true

FactoryBot.define do
  factory :merchant do
    phone_number { Faker::PhoneNumber.phone_number }
    name { Faker::Name.name }
    address { Faker::Address.full_address }
    association :local_body
  end
end