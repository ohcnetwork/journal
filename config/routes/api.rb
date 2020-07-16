namespace :api, defaults: { format: :json }  do
  namespace :v1 do
    resources :users, only: [:show]
    resources :merchants, only: [:create]
    resources :qr_codes, only: [:show]
  end
end
