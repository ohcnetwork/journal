# frozen_string_literal: true

Rails.application.routes.draw do
  def draw(routes_name)
    instance_eval(File.read(Rails.root.join("config/routes/#{routes_name}.rb")))
  end

  draw :devise
  draw :api

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
