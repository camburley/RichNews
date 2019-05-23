Rails.application.routes.draw do
  
  # Landing
  root to: 'pages#index'
  
  # Admin dashboard
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  
  # Signup
  match '/setting/page', to: 'setting#page_setting', via: [:get, :post]
  match '/setting/welcome-message', to: 'setting#update_welcome_message', via: [:get, :post]
  
  # Auth
  match '/auth/:provider/callback', to: 'sessions#create', via: [:get, :post]
  match '/auth/failure', to: redirect('/'), via: [:get, :post]
  match '/signout' => 'sessions#destroy', :as => :signout, via: [:get, :post]
  match '/signin' => 'sessions#new', :as => :signin, via: [:get, :post]
  
  # Publisher dashboard
  get '/dashboard', to: 'dashboard#dashboard'
  match '/send-message', to: 'dashboard#send_message', via: [:get, :post]
  match '/growth_tool', to: 'dashboard#growth_tool', via: [:get, :post]
  match '/scheduled', to: 'dashboard#scheduled', via: [:get, :post]
  
  # Messenger bot
  match '/webhook', :controller => 'messenger', :action => 'callback', :via => :post
  get '/webhook' => 'messenger#verify_callback'
end
