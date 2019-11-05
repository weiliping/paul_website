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