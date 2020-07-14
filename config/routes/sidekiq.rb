authenticate :user, ->(u) { u.super_admin? } do

    ActiveAdmin.routes(self)
    namespace :superadmin do
      root to: "users#index"
      resources :users
    end
  end