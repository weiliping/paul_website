$(document).on('click', '#qr-code-generate-btn-id', function (event) {
    event.preventDefault;
    var $form = $(this).closest("form");
    show_spinner();
    $.post($form.attr('action'), $form.serialize(), function (data) {
      var $img_html = '<img src="'+ data["file_name"] + '" class="qr-img"/>';
      $('#qr-img-container-id').html($img_html);      
      hide_spinner();
    }, 'json');
    return false;
});

function show_spinner() {
  $('#spinner-id').show();
}
  
function hide_spinner() {
  $('#spinner-id').hide();
}

$(document).on('click', '#hamburger-menu', function (e) {
  if (!$(this).hasClass('open')) {
    show_menu($(this))
  } else {
    hide_menu($(this))
  }
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
}