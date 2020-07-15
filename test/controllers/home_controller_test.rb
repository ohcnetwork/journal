# frozen_string_literal: true

require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  def test_index_renders_message
    get "/"
    assert_response :success
  end
end
