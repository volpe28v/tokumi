require "spec_helper"

describe UnitpricesController do
  describe "routing" do

    it "routes to #index" do
      get("/unitprices").should route_to("unitprices#index")
    end

    it "routes to #new" do
      get("/unitprices/new").should route_to("unitprices#new")
    end

    it "routes to #show" do
      get("/unitprices/1").should route_to("unitprices#show", :id => "1")
    end

    it "routes to #edit" do
      get("/unitprices/1/edit").should route_to("unitprices#edit", :id => "1")
    end

    it "routes to #create" do
      post("/unitprices").should route_to("unitprices#create")
    end

    it "routes to #update" do
      put("/unitprices/1").should route_to("unitprices#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/unitprices/1").should route_to("unitprices#destroy", :id => "1")
    end

  end
end
