# frozen_string_literal: true

class Api::V1::LocalBodiesController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token!

  def index
    render json: LocalBody.formatted
  end
end
