# frozen_string_literal: true

json.merchants @merchants do |merchant|
  json.partial! "merchant", merchant: merchant
end