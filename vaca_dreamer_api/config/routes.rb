Rails.application.routes.draw do
  resources :stays
  resources :activities
  resources :vacations
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
