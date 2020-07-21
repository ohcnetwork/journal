# frozen_string_literal: true

json.user do |_json|
  _json.name @user.name
end
json.visits @visits do |visit|
  json.partial! "route_map_visit", visit: visit
end
