# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    role { "visitor" }
    phone_number { Faker::PhoneNumber.phone_number }
    name { Faker::Name.name }
    date_of_birth { Faker::Date.birthday(min_age: 1, max_age: 90) }
  end
end