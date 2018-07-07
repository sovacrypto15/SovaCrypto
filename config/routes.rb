Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'crypto#homepage'
  get '/landing', to: 'crypto#landing'
  get '/dashboard', to: 'crypto#dashboard'
  get '/contact_us', to: 'crypto#contact_us'
  get '/whitepaper', to: 'crypto#white_paper'
  
  
end
