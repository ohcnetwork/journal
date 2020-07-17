# frozen_string_literal: true

json.entry_at visit.entry_at
json.exit_at visit.exit_at

json.visitable do |_json|
  _json.name visit.visitable.name
  _json.phone visit.visitable.phone_number
  _json.address visit.visitable.address
end
