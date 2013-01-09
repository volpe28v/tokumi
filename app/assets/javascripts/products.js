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
  initialize: function(){
    this.model.on('destroy',this.remove,this);
    this.render();
  },
  render: function(){
    var unitpriceHtml = this.template(this.model);
    this.$el.html(unitpriceHtml)
      .attr("data-unitprice",this.model.get("value"))
      .css('display', 'none')
      .data('theme',"c");
  },
  template: function(unitprice){
    var rate = $('#add_amount').data('rate');
    var amount_unit = $('#add_amount').data('unit');
    var group_unit = $('#add_group').data('unit');

    return $('<span/>')
      .append($('<span/>')
        .addClass("unit")
        .html(unitprice.get("value") + "円 (" + rate + amount_unit + "あたりの単価)"))
      .append($('<p/>')
        .addClass("unit-body")
        .html(unitprice.get("price") + "円 " + unitprice.get("amount") + amount_unit + " " + unitprice.get("group") + group_unit));
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
    var unitpriceView = new UnitPriceView({model: unitprice});
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
  },
  clearAll: function(){
    $('#unit_list li').fadeOut("normal",function(){
      $('#unit_list').empty();
    });
  },
  addUnitPrice: function(){
    var price = $('#add_price').val();
    var amount = $('#add_amount').val();
    var group = $('#add_group').val();
    var rate = $('#add_amount').data('rate');

    $('#add_price').val("");
    $('#add_amount').val("");
    $('#add_group').val("");

    if ( price == "" || isNaN(price) ){ price = $('#add_price').data('default'); }
    if ( amount == "" || isNaN(amount) ){ amount = $('#add_amount').data('default'); }
    if ( group == "" || isNaN(group) ){ group = $('#add_group').data('default'); }

    var unitprice = new UnitPrice({
      price: price,
      amount: amount,
      group: group,
      rate: rate
    });

    this.collection.add(unitprice);
  },
  clearUnitPriceList: function(){
    this.collection.reset();
  }
});
