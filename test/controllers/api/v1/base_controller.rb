# frozen_string_literal: true

class Api::V1::BaseController < ApplicationController
  include ActionController::BasicImplicitRender

  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  respond_to :json
end