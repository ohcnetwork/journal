# frozen_string_literal: true

class Api::V1::QrCodesController < Api::V1::BaseController
  skip_before_action :authenticate_user!

  def show
    qr_code = QrCode.find_by(id: params[:id])
    if qr_code
      render json: { svg: qr_code.svg }
    else
      respond_with_error "Not Found!", 404
    end
  end
end
