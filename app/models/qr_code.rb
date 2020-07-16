# frozen_string_literal: true

class QrCode < ApplicationRecord
  belongs_to :qr_coded, polymorphic: true

  def self.generate(model)
    payload = { type: model.class.name.downcase, id: model.id }.to_json
    qrcode = RQRCode::QRCode.new(payload)

    svg = qrcode.as_svg(
      offset: 0,
      color: "000",
      shape_rendering: "crispEdges",
      module_size: 6,
      standalone: true
    )
    QrCode.create(qr_coded: model, svg: svg)
  end
end
