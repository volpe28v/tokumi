// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery.mobile

$( '#unitprices_page' ).live( 'pageinit',function(event){
  unitprices_page_init();
});

function unitprices_page_init(){
  $('#add_button').click(function(){
    var price = $('#add_price').val();
    var amount = $('#add_amount').val();
    var group = $('#add_group').val();
    var rate = $('#add_amount').data('rate');
    var amount_unit = $('#add_amount').data('unit');
    var group_unit = $('#add_group').data('unit');

    if ( price == ""){ price = 250; }
    if ( amount == ""){ amount = 27.5; }
    if ( group == ""){ group = 12 }

    var unitprice = ((price / (amount * group)) * rate).toFixed(3)
    var $unit = $('<li/>')
      .attr("data-unitprice",unitprice)
      .css('display', 'none')
      .data('theme',"c")
      .append($('<span/>')
        .addClass("unit")
        .html(rate + amount_unit + "あたりの単価 " + unitprice + "円"))
      .append($('<p/>')
        .addClass("unit-body")
        .html(price + "円 " + amount + amount_unit + " " + group + group_unit));

    var before_count = $('#unit_list li').size();
    $('#unit_list li').each(function(){
      if ( $(this).data('unitprice') > unitprice ){
        $unit.insertBefore($(this));
        if ( $(this).hasClass("ui-btn-up-e") ){
          $(this).removeClass("ui-btn-up-e");
          $(this).addClass("ui-btn-up-c");
          $unit.data('theme',"e");
        }
        return false;
      }
    });

    if ( before_count == $('#unit_list li').size() ){
      $('#unit_list').append($unit);
      if ( before_count == 0 ){ $unit.data('theme',"e"); }
    }

    $unit.fadeIn('fast');
    $('#unit_list').listview('refresh');

    $('#add_price').val("");
    $('#add_amount').val("");
    $('#add_group').val("");
  });

  $('#clear_button').click(function(){
    $('#unit_list li').fadeOut("normal",function(){
      $('#unit_list').empty();
    });
  });

  $('#unitprices_page').delegate('li','swiperight',function(){
    var $li = $(this);
    if ( $li.hasClass("ui-btn-up-e") ){
      var $next_li = $li.next('li');
      $next_li.removeClass("ui-btn-up-c");
      $next_li.addClass("ui-btn-up-e");
    }
    $li.remove();
    $('#unit_list').listview('refresh');
  });
}

