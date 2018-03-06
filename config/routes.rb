Rails.application.routes.draw do

  root 'products#index'
  get "json-server.devpointlabs.com/api/v1/products", to: '/products/index'
#missing controller key on routes definition
#I think 'GET'ing the products from the json-server
#would either originate from here or from products.js
#from the js file nothing happens- nothing displays.

  get  'products/index', to: 'products#index'
#get from url?? 
  get 'products_form', to: 'products#form'
 

  resources :products 
end
