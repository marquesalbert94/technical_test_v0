Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'contacts/index'
      post 'contacts/create', to: 'contacts#create'
      delete 'contacts/:id', to: 'contacts#destroy'
      put 'contacts/:id', to: 'contacts#update'
      patch 'contacts/:id', to: 'contacts#update'
      get 'contacts/:id/auditory', to: 'contacts#auditory'
    end
  end

  root 'contacts#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end