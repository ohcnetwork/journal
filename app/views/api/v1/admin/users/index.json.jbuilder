# frozen_string_literal: true

json.users @users do |user|
  json.partial! "user", user: user
end
