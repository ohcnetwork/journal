namespace :api, defaults: { format: :json }  do
  namespace :v1 do
    resources :meeting_types, only: [:index, :create, :update, :destroy]
  end
end
