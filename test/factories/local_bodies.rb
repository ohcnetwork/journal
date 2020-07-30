# frozen_string_literal: true

FactoryBot.define do
  factory :local_body do
    district_id { Faker::Number.between(from: 1, to: 14) }
    lb_type_csn { Faker::Number.between(from: 1, to: 5) }
    lb_code { Faker::Alphanumeric.alphanumeric(number: 6) }
    lb_name_english { Faker::Address.community }
    lb_type { ["Block Panchayat", "Muncipality", "District", "Corporation", "Grama Panchayat"]. sample }
    district_name { Faker::Address.city }
    lb_name_full { Faker::Address.secondary_address }
  end
end