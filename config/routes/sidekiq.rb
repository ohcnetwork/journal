# frozen_string_literal: true

authenticate :user, ->(u) { u.super_admin? } do
    namespace :superadmin do
      root to: "users#index"
      resources :users
    end
  end