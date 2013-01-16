class UnitpricesController < ApplicationController
  # GET /unitprices
  # GET /unitprices.json
  def index
    product = Product.find(params[:product_id])
    @unitprices = product.unitprices

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @unitprices }
    end
  end

  # GET /unitprices/1
  # GET /unitprices/1.json
  def show
    @unitprice = Unitprice.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @unitprice }
    end
  end

  # GET /unitprices/new
  # GET /unitprices/new.json
  def new
    @unitprice = Unitprice.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @unitprice }
    end
  end

  # GET /unitprices/1/edit
  def edit
    @unitprice = Unitprice.find(params[:id])
  end

  # POST /unitprices
  # POST /unitprices.json
  def create
    @unitprice = Unitprice.new(params[:unitprice])

    respond_to do |format|
      if @unitprice.save
        format.html { redirect_to @unitprice, notice: 'Unitprice was successfully created.' }
        format.json { render json: @unitprice, status: :created, location: @unitprice }
      else
        format.html { render action: "new" }
        format.json { render json: @unitprice.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /unitprices/1
  # PUT /unitprices/1.json
  def update
    @unitprice = Unitprice.find(params[:id])

    respond_to do |format|
      if @unitprice.update_attributes(params[:unitprice])
        format.html { redirect_to @unitprice, notice: 'Unitprice was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @unitprice.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /unitprices/1
  # DELETE /unitprices/1.json
  def destroy
    @unitprice = Unitprice.find(params[:id])
    @unitprice.destroy

    respond_to do |format|
      format.html { redirect_to unitprices_url }
      format.json { head :no_content }
    end
  end
end
