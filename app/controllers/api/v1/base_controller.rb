# frozen_string_literal: true

class Api::V1::BaseController < ApplicationController
  respond_to :json

  private

    def respond_with_error(message, status = 500)
      render json: { error: message }, status: status
    end

    def respond_with_errors(message, status = 422, errors = nil)
      response = { error: message }
      response.merge!({ errors: errors }) if errors.present?
      render json: response, status: status
    end

    def log_exception(exception)
      Rails.logger.info exception.class.to_s
      Rails.logger.info exception.to_s
      Rails.logger.info exception.backtrace.join("\n")
    end
end
