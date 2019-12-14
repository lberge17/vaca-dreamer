Rails.application.routes.draw do
  resources :stays, only: [:index, :show, :create]
  resources :activities, only: [:index, :show, :create]
  resources :vacations, only: [:index, :show, :create]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
