# frozen_string_literal: true

json.visits @visits do |visit|
  json.partial! "route_map_visit", visit: visit
end
