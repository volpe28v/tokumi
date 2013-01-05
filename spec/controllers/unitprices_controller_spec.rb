require 'spec_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to specify the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator.  If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails.  There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.
#
# Compared to earlier versions of this generator, there is very limited use of
# stubs and message expectations in this spec.  Stubs are only used when there
# is no simpler way to get a handle on the object needed for the example.
# Message expectations are only used when there is no simpler way to specify
# that an instance is receiving a specific message.

describe UnitpricesController do

  # This should return the minimal set of attributes required to create a valid
  # Unitprice. As you add validations to Unitprice, be sure to
  # update the return value of this method accordingly.
  def valid_attributes
    { "price" => "1" }
  end

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # UnitpricesController. Be sure to keep this updated too.
  def valid_session
    {}
  end

  describe "GET index" do
    it "assigns all unitprices as @unitprices" do
      unitprice = Unitprice.create! valid_attributes
      get :index, {}, valid_session
      assigns(:unitprices).should eq([unitprice])
    end
  end

  describe "GET show" do
    it "assigns the requested unitprice as @unitprice" do
      unitprice = Unitprice.create! valid_attributes
      get :show, {:id => unitprice.to_param}, valid_session
      assigns(:unitprice).should eq(unitprice)
    end
  end

  describe "GET new" do
    it "assigns a new unitprice as @unitprice" do
      get :new, {}, valid_session
      assigns(:unitprice).should be_a_new(Unitprice)
    end
  end

  describe "GET edit" do
    it "assigns the requested unitprice as @unitprice" do
      unitprice = Unitprice.create! valid_attributes
      get :edit, {:id => unitprice.to_param}, valid_session
      assigns(:unitprice).should eq(unitprice)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      it "creates a new Unitprice" do
        expect {
          post :create, {:unitprice => valid_attributes}, valid_session
        }.to change(Unitprice, :count).by(1)
      end

      it "assigns a newly created unitprice as @unitprice" do
        post :create, {:unitprice => valid_attributes}, valid_session
        assigns(:unitprice).should be_a(Unitprice)
        assigns(:unitprice).should be_persisted
      end

      it "redirects to the created unitprice" do
        post :create, {:unitprice => valid_attributes}, valid_session
        response.should redirect_to(Unitprice.last)
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved unitprice as @unitprice" do
        # Trigger the behavior that occurs when invalid params are submitted
        Unitprice.any_instance.stub(:save).and_return(false)
        post :create, {:unitprice => { "price" => "invalid value" }}, valid_session
        assigns(:unitprice).should be_a_new(Unitprice)
      end

      it "re-renders the 'new' template" do
        # Trigger the behavior that occurs when invalid params are submitted
        Unitprice.any_instance.stub(:save).and_return(false)
        post :create, {:unitprice => { "price" => "invalid value" }}, valid_session
        response.should render_template("new")
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested unitprice" do
        unitprice = Unitprice.create! valid_attributes
        # Assuming there are no other unitprices in the database, this
        # specifies that the Unitprice created on the previous line
        # receives the :update_attributes message with whatever params are
        # submitted in the request.
        Unitprice.any_instance.should_receive(:update_attributes).with({ "price" => "1" })
        put :update, {:id => unitprice.to_param, :unitprice => { "price" => "1" }}, valid_session
      end

      it "assigns the requested unitprice as @unitprice" do
        unitprice = Unitprice.create! valid_attributes
        put :update, {:id => unitprice.to_param, :unitprice => valid_attributes}, valid_session
        assigns(:unitprice).should eq(unitprice)
      end

      it "redirects to the unitprice" do
        unitprice = Unitprice.create! valid_attributes
        put :update, {:id => unitprice.to_param, :unitprice => valid_attributes}, valid_session
        response.should redirect_to(unitprice)
      end
    end

    describe "with invalid params" do
      it "assigns the unitprice as @unitprice" do
        unitprice = Unitprice.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        Unitprice.any_instance.stub(:save).and_return(false)
        put :update, {:id => unitprice.to_param, :unitprice => { "price" => "invalid value" }}, valid_session
        assigns(:unitprice).should eq(unitprice)
      end

      it "re-renders the 'edit' template" do
        unitprice = Unitprice.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        Unitprice.any_instance.stub(:save).and_return(false)
        put :update, {:id => unitprice.to_param, :unitprice => { "price" => "invalid value" }}, valid_session
        response.should render_template("edit")
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested unitprice" do
      unitprice = Unitprice.create! valid_attributes
      expect {
        delete :destroy, {:id => unitprice.to_param}, valid_session
      }.to change(Unitprice, :count).by(-1)
    end

    it "redirects to the unitprices list" do
      unitprice = Unitprice.create! valid_attributes
      delete :destroy, {:id => unitprice.to_param}, valid_session
      response.should redirect_to(unitprices_url)
    end
  end

end
