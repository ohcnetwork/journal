# frozen_string_literal: true

json.visits @visits do |visit|
  json.partial! "visit", visit: visit
end
