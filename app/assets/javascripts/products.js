var Product = Backbone.Model.extend({
  initialize: function(){
  },
  get_price: function(price){
    return this.get_valid_value(price,"price");
  },
  get_amount: function(amount){
    return this.get_valid_value(amount,"amount");
  },
  get_group: function(group){
    return this.get_valid_value(group,"group");
  },
  get_valid_value: function(value, type){
    if ( value == "" || isNaN(value) ){ 
      value = this.get("default_" + type); 
    }
    return value;
  }
});

var UnitPrice = Backbone.Model.extend({
  initialize: function(data){
    this.set({value: ((data.price / (data.amount * data.group)) * data.rate).toFixed(2)});
  }
});

var UnitPriceList = Backbone.Collection.extend({
  model: UnitPrice
});

var UnitPriceView = Backbone.View.extend({
  tagName: 'li',
  events: {
    "swiperight": function() { this.model.destroy(); }
  },
  initialize: function(data){
    this.model.on('destroy',this.remove,this);
    this.product = data.product;
    this.render();
  },
  render: function(){
    var unitpriceHtml = this.template(this.model);
    this.$el.html(unitpriceHtml)
      .attr("data-unitprice",this.model.get("value"))
      .css('display', 'none')
  },
  template: function(unitprice){
    var rate = this.product.get("rate");
    var amount_unit = this.product.get("amount_unit");
    var group_unit = this.product.get("group_unit");

    return $('<span/>')
      .append($('<span/>')
        .addClass("unit")
        .html(unitprice.get("value") + "円 (" + rate + amount_unit + "あたりの単価)"))
      .append($('<p/>')
        .addClass("unit-body")
        .append($('<span/>')
          .html(unitprice.get("price") + "円"))
        .append($('<span/>')
          .html(unitprice.get("amount") + amount_unit))
        .append($('<span/>')
          .html(unitprice.get("group") + group_unit)));
  }
});

var AddFormView = Backbone.View.extend({
  el: "#add_form",
  initialize: function(data){
    this.product = data.product;
    
    this.$price = $('#add_price');
    this.$amount= $('#add_amount');
    this.$group= $('#add_group');

    this.product.on("change", this.render, this);
    this.render();
  },
  render: function(){
    this.$price.attr('placeholder', this.product.get("default_price") + "円");
    this.$amount.attr('placeholder', this.product.get("default_amount") + this.product.get("amount_unit"));
    this.$group.attr('placeholder', this.product.get("default_group") + this.product.get("group_unit"));
  }
});

var CountView = Backbone.View.extend({
  el: "#count",
  initialize: function(data){
    this.collection = data.collection;

    this.collection.on("all", this.render, this);
    this.render();
  },
  render: function(){
    var count =  this.collection.length;
    if ( count != 0 ){
      this.$el.html( " (" + this.collection.length + ")" );
    }else{
      this.$el.html("");
    }
  }
});

var ClearButtonView = Backbone.View.extend({
  el: "#clear_button",
  initialize: function(data){
    this.collection = data.collection;

    this.collection.on("all", this.render, this);
    this.render();
  },
  render: function(){
    var count =  this.collection.length;
    if ( count != 0 ){
      this.$el.fadeIn();
    }else{
      this.$el.fadeOut();
    }
  }
});


var ProductView = Backbone.View.extend({
  el: "#product_page",
  events: {
    "click #add_button": "addUnitPrice",
    "click #clear_button": "clearUnitPriceList"
  },
  initialize: function(){
    this.collection = new UnitPriceList();
    this.model = new Product({
      rate: $('#add_amount').data('rate'),
      amount_unit: $('#add_amount').data('unit'),
      group_unit: $('#add_group').data('unit'),
      default_price: $('#add_price').data('default'),
      default_amount: $('#add_amount').data('default'),
      default_group: $('#add_group').data('default')
    });
    this.addFormView = new AddFormView({
      product: this.model
    });
    this.countView = new CountView({
      collection: this.collection
    });
    this.clearButtonView = new ClearButtonView({
      collection: this.collection
    });
 
    this.collection.on("add", this.addOne, this);
    this.collection.on("reset", this.clearAll, this);
    this.collection.on("all", this.render, this);
  },
  render: function(){
    $('#unit_list li').each(function(i){
      if ( i == 0 ){
        $(this).removeClass("ui-btn-up-c");
        $(this).addClass("ui-btn-up-e");
      }else{
        $(this).removeClass("ui-btn-up-e");
        $(this).addClass("ui-btn-up-c");
      }
    });
    $('#unit_list').listview('refresh');
  },
  addOne: function(unitprice){
    var unitpriceView = new UnitPriceView({
      model: unitprice,
      product: this.model
    });
    var $unitprice_el = unitpriceView.$el;

    var before_count = $('#unit_list li').size();
    $('#unit_list li').each(function(){
      if ( parseFloat($(this).data('unitprice')) > parseFloat(unitprice.get("value")) ){
        $unitprice_el.insertBefore($(this));
        return false;
      }
    });

    if ( before_count == $('#unit_list li').size() ){
      $('#unit_list').append($unitprice_el);
    }

    $unitprice_el.fadeIn('fast');

    this.model.set("default_price", unitprice.get("price"));
    this.model.set("default_amount", unitprice.get("amount"));
    this.model.set("default_group", unitprice.get("group"));
  },
  clearAll: function(){
    $('#unit_list li').fadeOut("normal",function(){
      $('#unit_list').empty();
    });
  },
  addUnitPrice: function(){
    var price = this.model.get_price($('#add_price').val());
    var amount = this.model.get_amount($('#add_amount').val());
    var group = this.model.get_group($('#add_group').val());

    $('#add_price').val("");
    $('#add_amount').val("");
    $('#add_group').val("");

    var unitprice = new UnitPrice({
      price: price,
      amount: amount,
      group: group,
      rate: this.model.get("rate")
    });

    this.collection.add(unitprice);
  },
  clearUnitPriceList: function(){
    this.collection.reset();
  }
});
