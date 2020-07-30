# frozen_string_literal: true

FactoryBot.define do
  factory :visit do
    association :visitable, factory: :merchant
    association :user, factory: :user
  end
end