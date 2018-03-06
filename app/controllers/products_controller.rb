class ProductsController < ApplicationController
  before_action :set_product, only:[:show, :update, :destroy]
  
  def index
    @products = Product.all

  end

  def show
    render partial: 'product', locals: {product: @product}
  end

  def form
    @product = params[:id] ? Product.find(params[:id]) : Product.new
  end

  def create
    @product = Product.new(product_params)
      if @product.save
        render json: @product
      else
        render_error(@product)
      end
  end

  def update
    if @product.update(product_params)
      render json: @product
    else
      render_error(@product)
    end
  end

  def destroy
    @product.destroy
    render json: {message: 'Product removed' }, status: :ok
  end

  private 

  def product_params
    params.require(:product).permit(:name, :base_price, :description,
     :quantity_on_hand, :color, :weight, :other_attributes )

  def set_product 
    @product = Product.find(params[:id])
  end
  end
end
