var UnitPrice = Backbone.Model.extend({
  initialize: function(){

  }
});

var UnitPrices = Backbone.Collection.extend({
  model: UnitPrice
});

var ProductView = Backbone.View.extend({
  el: "#product_page",
  events: {
    "click #add_button": "addUnitPrice",
    "click #clear_button": "clearUnitPrices",
    "swiperight li": "removeUnitPrice"
  },
  initialize: function(){
    this.collection = new UnitPrices();
    this.collection.bind("add", this.render, this);
  },
  render: function(unitprice){
    var $unitprice_el = this.template(unitprice);

    var before_count = $('#unit_list li').size();
    $('#unit_list li').each(function(){
      if ( parseFloat($(this).data('unitprice')) > parseFloat(unitprice.get("value")) ){
        $unitprice_el.insertBefore($(this));
        if ( $(this).hasClass("ui-btn-up-e") ){
          $(this).removeClass("ui-btn-up-e");
          $(this).addClass("ui-btn-up-c");
          $unitprice_el.data('theme',"e");
        }
        return false;
      }
    });

    if ( before_count == $('#unit_list li').size() ){
      $('#unit_list').append($unitprice_el);
      if ( before_count == 0 ){ $unitprice_el.data('theme',"e"); }
    }

    $unitprice_el.fadeIn('fast');
    $('#unit_list').listview('refresh');

    $('#add_price').val("");
    $('#add_amount').val("");
    $('#add_group').val("");
  },
  render_clear: function(unitprice){
    console.log("render_clear");
    console.log(unitprice);

  },
  addUnitPrice: function(){
    var price = $('#add_price').val();
    var amount = $('#add_amount').val();
    var group = $('#add_group').val();
    var rate = $('#add_amount').data('rate');

    if ( price == "" || isNaN(price) ){ price = $('#add_price').data('default'); }
    if ( amount == "" || isNaN(amount) ){ amount = $('#add_amount').data('default'); }
    if ( group == "" || isNaN(group) ){ group = $('#add_group').data('default'); }

    var unitprice_value = ((price / (amount * group)) * rate).toFixed(2);

    var unitprice = new UnitPrice({
      value: unitprice_value,
      price: price,
      amount: amount,
      group: group
    });

    this.collection.add(unitprice);
  },
  removeUnitPrice: function(e){
    //TODO: UnitPriceを削除する.どうやって対象liを取得するか？
  },
  clearUnitPrices: function(){
    console.log("clearUnitPrices");
    //TODO: backbone化する
    $('#unit_list li').fadeOut("normal",function(){
      $('#unit_list').empty();
    });
  },
  template: function(unitprice){
    var rate = $('#add_amount').data('rate');
    var amount_unit = $('#add_amount').data('unit');
    var group_unit = $('#add_group').data('unit');

    return $('<li/>')
      .attr("data-unitprice",unitprice.get("value"))
      .css('display', 'none')
      .data('theme',"c")
      .append($('<span/>')
        .addClass("unit")
        .html(unitprice.get("value") + "円 (" + rate + amount_unit + "あたりの単価)"))
      .append($('<p/>')
        .addClass("unit-body")
        .html(unitprice.get("price") + "円 " + unitprice.get("amount") + amount_unit + " " + unitprice.get("group") + group_unit));
  }
});