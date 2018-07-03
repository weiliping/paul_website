jQuery.fn.isChildOrSelf = function (obj) {
  return (this.closest(obj).length > 0)
}

var heights = [];
$(document).ready(function () {
  set_section_height();
  portfolio_html();
  get_skills_content();
  get_blog_content();
  get_current_year();
  get_origin_bg();
  get_heights();
  $(window).on('scroll', function () {
    var scroll_top = $(this).scrollTop();
    var win_h = heights[0];
    var min_blue_top = heights[1] + heights[2];
    var max_blue_top = min_blue_top + heights[3];
    var scroll_win_top = win_h + scroll_top - 60;
    if (scroll_win_top >= min_blue_top && scroll_win_top <= max_blue_top) {
      if (!$(".redirect_to_header").hasClass("white")) {
        $(".redirect_to_header").addClass("white");
      }
    } else {
      if ($(".redirect_to_header").hasClass("white")) {
        $(".redirect_to_header").removeClass("white");
      }
    }
  });
});
$(document).on('click', '#main_menu_id a', function (e) {
  close_menu();
});

function close_menu() {
  if ($('#hamburger-menu').hasClass('open')) {
    $('#hamburger-menu').removeClass('open');
    $('#main_menu_id').hide();
    $('#main_menu_id').css({
      left: 'auto',
      opacity: 0,
      top: 'auto'
    });
  }
}

$(document).keyup(function (e) {
  if (e.keyCode == 27) {
    if (!$("#blog_content_id").is(":hidden")) {
      hideBlogWindow();
    }
  }
});

$(document).on('click', '#hamburger-menu', function (e) {
  if (!$(this).hasClass('open')) {
    show_menu($(this))
  } else {
    hide_menu($(this))
  }
});

$(document).on('click', '#blog_close_id', function (e) {
  e.preventDefault();
  hideBlogWindow();
});

$(document).on('click', '.blog_link', function (e) {
  e.preventDefault();
  showBlogWindow();
});

function hideBlogWindow() {
  $("#blog_content_id").hide();
  $('body').css("overflow", "");
  $('body').css({
    "overflow": "auto",
    "width": "100%"
  });
  $('#main_menu_id').show();
}

function showBlogWindow() {
  $("#blog_content_id").show();
  $('#main_menu_id').hide();
  $('body').css({
    "overflow": "hidden",
    "width": "calc(100% - 15px)"
  });
}

function showBlogDetails(event, blog_id) {
  event.preventDefault();
  showBlogWindow();
}

$(document).click(function (event) {
  if ($('#hamburger-menu').hasClass('open')) {
    if (!$(event.target).isChildOrSelf('#main_menu_id') && !$(event.target).isChildOrSelf('#hamburger-menu')) {
      hide_menu($('#hamburger-menu'));
    }
  }

  if (!$("#blog_content_id").is(":hidden")) {
    if (!$(event.target).isChildOrSelf('.blog_link') && !$(event.target).isChildOrSelf('#blog_sub_content_id')) {
      hideBlogWindow();
    }
  }
});

function get_current_year() {
  $('#year').html(new Date().getFullYear());
}

function hide_menu($obj) {
  $obj.removeClass('open');
  $('#main_menu_id').css({
    left: '0px',
    opacity: 1
  }).animate({
    left: -320,
    opacity: 0
  }, 350, function () {
    $('#main_menu_id').hide();
    $('#main_menu_id').css({
      left: '',
      opacity: 0
    });
  });
}

function show_menu($obj) {
  $obj.addClass('open');
  $('#main_menu_id').show();
  $('#main_menu_id').css({
    left: '-320px',
    opacity: 0
  }).animate({
    left: 0,
    opacity: 1
  }, 350, function () {
    $('#main_menu_id').css({
      left: '0px',
      opacity: 1
    });
  });
}

function set_section_height() {
  var win_h = $(window).height();
  $('.header-content').height(win_h);
}

function get_skills_content() {
  $.get("json/skills.json", {}, function (data) {
    $('#skills-table-id').html(get_html(data));
  });
}

function get_html(data_obj) {
  var origin_html = '';
  $.each(data_obj, function (index, obj_item) {
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

function get_sub_items(data_array) {
  var items_html = '';
  $.each(data_array, function (index, obj) {
    items_html += '<li>'
    if (obj.link != '') {
      items_html += '<a class="skill-label" href="' + obj.link + '">' + obj.name + '</a>'
    } else {
      items_html += '<span class="skill-label">' + obj.name + '</span>';
    }
    items_html += get_stars(obj.star);
    items_html += '</li>'
  });
  return items_html;
}

function get_stars(star_num) {
  var star_html = '<span class="skill-star">';
  var star_nums = star_num.split(".")
  var total_star = parseInt(star_nums[0], 10);
  for (var i = 0; i < total_star; i++) {
    star_html += '<span class="icon-star-full"></span>';
  }
  if (star_nums[1] == '5') {
    star_html += '<span class="icon-star-half"></span>';
    total_star += 1;
  }
  for (var i = 0; i < 5 - total_star; i++) {
    star_html += '<span class="icon-star-empty"></span>';
  }
  star_html += '</span>';
  return star_html;
}

function get_blog_content() {
  $.get("json/blog.json", {}, function (data) {
    $('#blog-table-id').html(get_blog_html(data));
  });
}

function get_blog_html(data_items) {
  var origin_html = '';
  $.each(data_items, function (index, obj_item) {
    origin_html += '<div class="blog-card">';
    origin_html += '<div class="img-container">';
    origin_html += '<a href="#" class="blog_link img_link" data-id="' + obj_item.id + '">';
    origin_html += '<img src="' + obj_item.image + '"/>';
    origin_html += '</a>';
    origin_html += '</div>';
    origin_html += '<div class="txt_link txt-container" data-id="' + obj_item.id + '">';
    origin_html += '<h6>' + obj_item.title + '</h6>';
    origin_html += '<p>' + obj_item.sub_title + '</p>';
    origin_html += '</div>';
    origin_html += '</div>';
  });
  return origin_html;
}

$(document).on('focus', '.element', function (event) {
  var $obj = $(this);
  if ($obj.hasClass('error') && $.trim($obj.val()) == '') {
    $obj.removeClass('error');
  }
});

$(document).on('keyup', '.element', function (event) {
  if ($obj.hasClass('error') && $.trim($obj.val()) != '') {
    $obj.removeClass('error');
  }
});

$(document).on('click', '#contact-form-btn-id', function (event) {
  event.preventDefault;
  if (is_empty($('#name_id')) || is_empty($('#email_id')) || is_empty($('#msg_id'))) {
    return false;
  } else {
    var $form = $(this).closest("form");
    show_spinner();
    $.post($form.attr('action'), $form.serialize(), function (data) {
      hide_spinner();
    }, 'json');
    return false;
  }
});

function show_spinner() {
  $('#spinner-id').show();
}

function hide_spinner() {
  $('#spinner-id').hide();
}

function is_empty($obj) {
  if ($.trim($obj.val()) == '') {
    add_error_class($obj);
    return true;
  } else {
    remove_error_class($obj);
    return false;
  }
}

function add_error_class($obj) {
  if (!$obj.hasClass('error')) {
    $obj.addClass('error');
  }
}

function remove_error_class($obj) {
  if ($obj.hasClass('error')) {
    $obj.removeClass('error');
  }
}

function get_heights() {
  var win_h = $(window).height();
  var header_h = $('#header-page-id').innerHeight();
  var profile_h = $('#profile').innerHeight() + 168;
  var portfolio_h = $('#portfolio').parent().innerHeight();
  heights = [win_h, header_h, profile_h, portfolio_h];
  return heights;
}
$(function () {
  $(window).on('resize', function () {
    set_section_height();
  });
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > ($('#header-page-id').innerHeight() - 40)) {
      show_top_menu();
      $('#redirect_to_header').show();
    } else {
      hide_top_menu();
      $('#redirect_to_header').hide();
    }
  });
});

function show_top_menu() {
  if (!$('#main_menu_id').hasClass("pin-header")) {
    if ($('#hamburger-menu').hasClass('open')) {
      $('#hamburger-menu').removeClass('open');
      $('#main_menu_id').hide();
      setTimeout(function () {
        show_top_header_menu();
      }, 300);
    } else {
      show_top_header_menu();
    }
  }
}

function show_top_header_menu() {
  $('#main_menu_id').addClass("pin-header");
  $('#main_menu_id').css({
    top: '-32px',
    opacity: 0,
    display: 'block'
  }).animate({
    top: '0px',
    opacity: 1
  }, 200, function () {
    $('#main_menu_id').css({
      left: '',
      top: '0px',
      opacity: 1
    });
  });
}

function hide_top_menu() {
  if ($('#main_menu_id').hasClass("pin-header")) {
    $('#main_menu_id').removeClass("pin-header");
    $('#main_menu_id').css({
      top: '',
      opacity: 0,
      display: 'none'
    });
  }
}

function get_origin_bg() {
  var image = new Image();
  image.onload = function () {
    $('#header-bg-id').css({
      'background-image': 'url(images/bg.jpg)'
    });
  }
  image.onerror = function () {
    console.error("Cannot load image");
  }
  image.src = "images/bg.jpg";
}

function portfolio_html() {
  $.get("json/portfolio.json", {}, function (data) {
    var all_html = '';
    $.each(data, function (index, port_obj) {
      all_html += get_portfolio_html(port_obj)
    });
    $('#portfolio-table-id').html(all_html);
    get_heights();
  });
}

function get_portfolio_html(p_obj) {
  var html = '<div class="sub-slider">';
  html += '<span class="' + p_obj.class_name + '"></span>';
  html += '<h1>' + p_obj.name + '</h1>';
  html += '<p>' + p_obj.content + '</p>';
  html += '<a href=""><span>SHOW MORE</span><i class="icon-chevron-thin-right"></i></a>';
  html += '<div class="tech-hover">';
  html += '<img src="' + p_obj.image + '">';
  html += '<div class="inner-main">';
  html += '<div class="inner-brd">';
  html += '<h4>' + p_obj.sub_name + '</h4>';
  html += '<h6>' + p_obj.sub_title + '</h6>';
  html += get_techniques_html(p_obj.techniques);
  html += '<span>' + p_obj.job_title + '</span>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  return html;
}

function get_techniques_html(tech_array) {
  var tech_html = '<ul>';
  $.each(tech_array, function (index, tech_str) {
    tech_html += '<li>' + tech_str + '</li>';
  });
  tech_html += '</ul>';
  return tech_html;
}