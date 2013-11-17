console.log('\'Allo \'Allo!');

$(window).scroll(function() {
  $('.feature-1 .featured-image').each(function(){
  var imagePos = $(this).offset().top;

  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+500) {
      $(this).addClass("slideUp");
    }
  });
  $('.feature-2 .featured-image').each(function(){
  var imagePos = $(this).offset().top;

  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+500) {
      $(this).addClass("pulse");
    }
  });
  $('.feature-4 .featured-image, .feature-2 .feature-description').each(function(){
  var imagePos = $(this).offset().top;

  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+500) {
      $(this).addClass("slideLeft");
    }
  });
  $('.feature-4 .feature-description, .feature-1 .feature-description').each(function(){
  var imagePos = $(this).offset().top;

  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+500) {
      $(this).addClass("slideRight");
    }
  });
  $('.signup-leader').each(function(){
  var imagePos = $(this).offset().top;

  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+500) {
      $(this).addClass("fadeIn");
    }
  });
  $('.learn-more').click( function() {
    $('#features').ScrollTo({
    });
  });


});