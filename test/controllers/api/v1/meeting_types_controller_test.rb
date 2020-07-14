# frozen_string_literal: true

require "test_helper"

class Api::V1::MeetingTypesControllerTest < ActionDispatch::IntegrationTest
  def test_valid_meeting_type
    user = users :admin
    sign_in user
    post api_v1_meeting_types_url, params: { meeting_type: { name: "Product Demo",
                                                             duration: "2",
                                                             description: "Some description",
                                                             user: user } }
    assert_response :success
    assert_equal "Meeting type created successfully.", JSON.parse(response.body)["notice"]
  end

  def test_invalid_meeting_type_name
    user = users :admin
    sign_in user
    post api_v1_meeting_types_url, params: { meeting_type: { name: nil,
                                                             duration: "2",
                                                             description: "Some description",
                                                             user: user } }
    assert_response :unprocessable_entity
  end

  def test_invalid_meeting_type_duration
    user = users :admin
    sign_in user
    post api_v1_meeting_types_url, params: { meeting_type: { name: "Product Demo",
                                                             duration: nil,
                                                             description: "Some description",
                                                             user: user } }
    assert_response :unprocessable_entity
  end

  def test_valid_meeting_type_update
    user = users :admin
    sign_in user
    meeting_type = meeting_types :retro
    new_name = "Project Planning"
    new_duration = "4"
    new_description = "New description"
    patch api_v1_meeting_type_url(meeting_type), params: { meeting_type: { name: new_name,
                                                                           duration: new_duration,
                                                                           description: new_description,
                                                                           user: user } }
    assert_response :ok
    assert_equal "Meeting type updated successfully.", JSON.parse(response.body)["notice"]
  end

  def test_invalid_meeting_type_update
    user = users :admin
    sign_in user
    meeting_type = meeting_types :retro
    new_name = nil
    new_duration = "6"
    patch api_v1_meeting_type_url(meeting_type), params: { meeting_type: { name: new_name,
                                                                           duration: new_duration } }
    assert_response :unprocessable_entity
  end

  def test_destroy_meeting_type
    user = users :admin
    sign_in user
    meeting_type = meeting_types :retro
    assert_difference "MeetingType.count", -1 do
      delete api_v1_meeting_type_url(meeting_type)
    end
    assert_response :ok
    assert_equal "Meeting type deleted successfully.", JSON.parse(response.body)["notice"]
  end

  def test_destroy_meeting_type_failure
    user = users :admin
    sign_in user
    meeting_type = meeting_types :retro
    sign_out user
    assert_difference "MeetingType.count", 0 do
      delete api_v1_meeting_type_url(meeting_type)
    end
    assert_equal "You need to sign in or sign up before continuing.", JSON.parse(response.body)["error"]
    assert_response :unauthorized
  end

  def test_index_when_user_is_logged_in
    user = users :admin
    sign_in user
    get api_v1_meeting_types_url
    assert_equal "index", @controller.action_name
    assert_response :success
  end
end
