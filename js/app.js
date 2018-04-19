jQuery.fn.isChildOrSelf = function(obj) {
  return (this.closest(obj).length > 0)  
}

$(document).ready(function(){
  // $(".regular").slick({
  //   dots: false,
  //   infinite: true,
  //   slidesToShow: 2,
  //   slidesToScroll: 2
  // });
  set_section_height();
});

$(document).on('click', '#hamburger-menu', function(e){
  if(!$(this).hasClass('open')){
    show_menu($(this))
  }else{
    hide_menu($(this))  
  }
});

$(document).click(function(event){
  if($('#hamburger-menu').hasClass('open')){
    if(!$(event.target).isChildOrSelf('#main_menu_id') && !$(event.target).isChildOrSelf('#hamburger-menu')){
      hide_menu($('#hamburger-menu'));
    }
  }
});

function hide_menu($obj){
  $obj.removeClass('open');
  $('#main_menu_id').css('left', '0px').animate({left: -320}, 350, function(){
      $('#main_menu_id').hide();    
      $('#main_menu_id').css('left', '');
  });    
}

function show_menu($obj){
  $obj.addClass('open');
  $('#main_menu_id').show();
  $('#main_menu_id').css('left', '-320px').animate({left: 0}, 350);  
}

function set_section_height(){
  var win_h = $(window).height();
  $('.header-content').height(win_h);
  //$('.main-content .sub-section .profile').height(win_h);
}
