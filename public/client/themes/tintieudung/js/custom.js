$(function() {
  $("#keysearch").keyup(function(event) {
    if (event.keyCode === 13) {
      jsSearch();
    }
  });

  $(window).bind('scroll', function () {
    if ($(window).scrollTop() > 160) {
        $('.main-menu').addClass('fixed');
    } else {
        $('.main-menu').removeClass('fixed');
    }
  });
})

function jsSearch() {
  var keysearch = $('#keysearch').val()
  if (!keysearch.trim()) {
    return;
  }
  window.location.href = '/search?keysearch='+keysearch
}


