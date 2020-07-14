# frozen_string_literal: true

class Api::V1::RegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token
  skip_before_action :authenticate_user!

  def create
    build_resource(sign_up_params)
    resource.skip_confirmation!
    resource.save
    if resource.persisted?
      sign_in(resource)
      render json: { user: resource, notice: "Your OneSquad account has been created!" }
    else
      render json: { error: resource.errors.full_messages.first }, status: :unprocessable_entity
    end
  end

  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
