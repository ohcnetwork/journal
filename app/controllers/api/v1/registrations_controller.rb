# frozen_string_literal: true

class Api::V1::RegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token
  skip_before_action :authenticate_user!

  def create
    build_resource(sign_up_params)
    resource.save
    if resource.persisted?
      sign_in(resource)
      render json: { user: resource }
    else
      render json: { errors: resource.errors }, status: :unprocessable_entity
    end
  end

  def sign_up_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end
