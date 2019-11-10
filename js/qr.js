jQuery.fn.isChildOrSelf = function (obj) {
  return (this.closest(obj).length > 0)
}

$(document).on('click', '#qr-code-generate-btn-id', function (event) {
  event.preventDefault;
  var $form = $(this).closest("form");
  show_spinner();
  $('#cover_page_id').show();
  $('#qr-img-container-id').html('');
  remove_inside_form();
  hide_img_cover();
  $.post($form.attr('action'), $form.serialize(), function (data) {
    var $img_html = '<a href="' + data["file_name"] + '" class="qr-img-link" download>';
      $img_html += '<img src="' + data["file_name"] + '" class="qr-img"/>';
      $img_html += '</a>';
    $('#qr-img-container-id').html($img_html);
    check_img_position();
    hide_spinner();
    $('#cover_page_id').hide();
  }, 'json');
  return false;
});

function check_img_position(){
  if ( $('#qr-form-id').height() > 556) {
    add_inside_form();  
  } else {
    remove_inside_form();
    show_img_cover();
  }
}

function show_spinner() {
  $('#spinner-id').show();
}

function hide_spinner() {
  $('#spinner-id').hide();
}

$(document).on('change', '#qr_str_id', function (e) {
  e.preventDefault;
  if ($.trim($(this).val()) == '') {
    $('#qr-img-container-id').html('');
    hide_img_cover();
  }
});

function show_img_cover() {
  if(!$('#img_cover_container_id').hasClass('open')) {
    $('#img_cover_container_id').addClass('open')
  }
}

function hide_img_cover() {
  if($('#img_cover_container_id').hasClass('open')) {
    $('#img_cover_container_id').removeClass('open')
  }
}

function add_inside_form() {
  if(!$('#qr-img-container-id').hasClass('inside-form')) {
    $('#qr-img-container-id').addClass('inside-form')
  }
}

function remove_inside_form() {
  if($('#qr-img-container-id').hasClass('inside-form')) {
    $('#qr-img-container-id').removeClass('inside-form')
  }
}

$(document).on('click', '#hamburger-menu', function (e) {
  if (!$(this).hasClass('open')) {
    show_menu($(this));
    $('#cover_page_id').show();
  } else {
    hide_menu($(this));
    $('#cover_page_id').hide();
  }
});

$(document).on('click', '.visit_home', function (e) {
  e.preventDefault;
  window.location.href = getBaseUrl();
});

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
  $('#cover_page_id').show();
}

$(document).on('click', 'a.home', function (e) {
  e.preventDefault;
  var url = getBaseUrl();
  var href = $(this).attr('href');
  window.location.href = url + href;
});

function getBaseUrl() {
  var url = window.location.href;
  url = url.substring(0, url.lastIndexOf("/"));
  return url.substring(0, url.lastIndexOf("/") + 1);
}

$(document).click(function (event) {
  if ($('#hamburger-menu').hasClass('open')) {
    if (!$(event.target).isChildOrSelf('#main_menu_id') && !$(event.target).isChildOrSelf('#hamburger-menu')) {
      if ($(this).hasClass('open')) {
        hide_menu($('#hamburger-menu'));
        $('#cover_page_id').hide();
      }
    }
  }
});

$(document).on('click', '#cover_page_id', function (e) {
  var $menu = $('#hamburger-menu')
  if ($menu.hasClass('open')){
    hide_menu($menu);
    $(this).hide();
  }
});