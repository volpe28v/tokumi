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
    if ( price == ""){ price = 250; }
    if ( amount == ""){ amount = 27.5; }
    if ( group == ""){ group = 12 }

    var unit = (price / (amount * group)).toFixed(3)
    var $unit = $('<li/>').attr("data-unit",unit).data('theme',"c").html('<span class="unit">' + unit + "円/m </span>" + price + "円 " + amount + "m " + group + "ロール");
    $unit.hide();

    var before_count = $('#unit_list li').size();
    $('#unit_list li').each(function(){
      console.log($(this).data('unit'));
      if ( $(this).data('unit') > unit ){
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

    $unit.fadeIn();
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
}

