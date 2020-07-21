# frozen_string_literal: true

require "test_helper"

class Api::V1::LocalBodiesControllerTest < ActionDispatch::IntegrationTest
  def test_create
    get api_v1_local_bodies_path
    assert_response :success
  end
end