Rails.application.routes.draw do
  devise_for :users
  # , controllers: {
  #   registrations: "registrations",
  #   sessions: "sessions"
  # }
  root to: "pages#home"
  get 'home', to: 'pages#home', as: :home
  get "about", to: "pages#about", as: :about
  get "random", to: "pages#random", as: :random
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  resources :users
  resources :vtubers do
    patch :add_tag
  end
  # resources :lists do
  #  resources :vtuber_markers, only: [:new, :create, :destroy]
  # end
  resources :lists
  resources :vtuber_markers
  resources :agencies

  # resources :vtuber_markers
  resources :list_markers
  resources :tags

end
