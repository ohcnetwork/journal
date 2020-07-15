# frozen_string_literal: true

class Api::V1::SessionsController < Devise::SessionsController
  before_action :set_password_in_params

  skip_before_action :require_no_authentication
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def create
    user = User.find_for_database_authentication(phone_number: params[:phone_number])
    if user.blank?
      create_new_user_and_sign_in
    elsif invalid_password?(user)
      respond_with_error "Incorrect phone_number, date of birth combination", 401
    else
      sign_in_and_render_user(user)
    end
  end

  def destroy
    sign_out(resource_name)
    reset_session
    respond "We'll see you around"
  end

  private
    def set_password_in_params
      params[:password] = "#{params[:phone_number]}-#{params[:date_of_birth]}"
    end

    def invalid_password?(user)
      existing = "#{user.phone_number}-#{user.date_of_birth}"
      incoming = "#{params[:phone_number]}-#{Date.parse(params[:date_of_birth])}"
      !(existing == incoming)
    end

    def user_params
      params[:session].permit(:name, :phone_number, :date_of_birth)
    end

    def sign_in_and_render_user(user)
      sign_in(user)
      binding.pry
      render json: { user: user }
    end

    def create_new_user_and_sign_in
      user = User.new(user_params)
      if user.save
        sign_in_and_render_user(user)
      else
        respond_with_error "While creating new user: ", 422, user.errors.messages
      end
    end
end
