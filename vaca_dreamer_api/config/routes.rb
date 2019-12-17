Rails.application.routes.draw do
  resources :stays, only: [:index, :show, :create, :destroy]
  resources :activities, only: [:index, :show, :create, :destroy]
  resources :vacations, only: [:index, :show, :create, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
