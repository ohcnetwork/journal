# frozen_string_literal: true

json.meeting_type do
  json.id @meeting_type.id
  json.link @meeting_type.link
end

json.notice "Meeting type created successfully."
