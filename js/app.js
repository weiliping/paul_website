$(document).ready(function(){
  set_section_height();
});

$(document).on('click', '#hamburger-menu', function(e){
  if($(this).hasClass('open')){
    $(this).removeClass('open');
  }else{
    $(this).addClass('open');
  }
});

function set_section_height(){
  var win_h = $(window).height();
  $('.header-content').height(win_h);
  $('.main-content .sub-section').height(win_h);
}
