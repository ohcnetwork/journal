# frozen_string_literal: true

json.meeting_types @meeting_types do |meeting_type|
  json.id meeting_type.id
  json.name meeting_type.name
  json.duration meeting_type.duration
  json.description meeting_type.description
  json.link meeting_type.link
end
