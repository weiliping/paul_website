jQuery.fn.isChildOrSelf = function(obj) {
  return (this.closest(obj).length > 0)  
}

$(document).ready(function(){
  set_section_height();
  get_skills_content();
  get_current_year();
});


$(document).on('click', '#main_menu_id a', function(e){
  hide_menu($('#hamburger-menu'));
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

function get_current_year(){
  $('#year').html(new Date().getFullYear());
}

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
}

function get_skills_content(){
  $.get("json/skills.json",{}, function(data){
    $('#skills-table-id').html(get_html(data));
  });
}

function get_html(data_obj){
  var origin_html = '';
  $.each(data_obj, function(index, obj_item){
    origin_html += '<hr>';
    origin_html += '<div class="sub-skills">';
      origin_html += '<h6>' + obj_item.title + '</h6>';
      origin_html += '<div class="section-content">';
        origin_html += '<div class="section-row">';
          origin_html += '<ul class="language">';
          origin_html += get_sub_items(obj_item.data);
          origin_html += '</ul>';
          origin_html += '<div style="clear:both;"></div>';
        origin_html += '</div>';
      origin_html += '</div>';
    origin_html += '</div>';
  });
  return origin_html;                
}

function get_sub_items(data_array){
  var items_html = '';
  $.each(data_array, function(index, obj){
    items_html += '<li>'
    if(obj.link != ''){
      items_html += '<a class="skill-label" href="' + obj.link + '">'+ obj.name +'</a>'  
    }else{
      items_html += '<span class="skill-label">' + obj.name + '</span>';
    }
    items_html += get_stars(obj.star);
    items_html += '</li>'
  });
  return items_html;  
}
function get_stars(star_num){
  var star_html = '<span class="skill-star">';
  var star_nums = star_num.split(".")
  var total_star = parseInt(star_nums[0], 10);
  for(var i=0; i < total_star; i++){
    star_html += '<span class="icon-star-full"></span>';
  }
  if(star_nums[1] == '5'){
    star_html += '<span class="icon-star-half"></span>';
    total_star += 1;
  }
  for(var i=0; i < 5-total_star; i++){
    star_html += '<span class="icon-star-empty"></span>';
  }
  star_html += '</span>';
  return star_html;
}
