scope "api/v1" do
  devise_for :users, skip: [:sessions, :registrations], controllers: { registrations: "registrations", omniauth_callbacks: 'api/v1/omniauth_callbacks' }
  devise_scope :user do
    post 'login', to: 'api/v1/sessions#create', as: :user_session
    post "signup" => "api/v1/registrations#create"
    delete 'logout', to: 'api/v1/sessions#destroy', as: :destroy_user_session
  end
end