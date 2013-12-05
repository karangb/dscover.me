$(document).ready( function() { 

console.log('\'Allo \'Allo!');
$('.get-notified').each( function() {
    $(this).ajaxChimp({
      callback: callbackFunction,
      url: 'http://uncovr.us3.list-manage1.com/subscribe/post?u=cac5b743872425783d77adbed&id=4ea6a7a327'
    });
});
$('.get-notified #send').click( function() {
  $(this).text("Loading..");
});
function callbackFunction (resp) {
    if (resp.result === 'success') {
        $('#spread').modal('show');
        $('.get-notified #send').text("Send");
    } else if(resp.result === 'error') {
        $('.get-notified #send').text("Send");
        alert("Invalid email address");
    }
}

// Hide Scroll
$('.scroll-down').on('click', function(e) {
  e.preventDefault();
})

$('#features').waypoint({
  offset: '100%', // Apply "stuck" when element 30px from top
  handler: function() {
    $('.scroll-down').hide();
  }
});
$('#features').waypoint({
  offset: '100%', // Apply "stuck" when element 30px from top
  handler: function() {
    $('.scroll-down').hide();
  }
});

if ($(window).height() >= 980) {
    $(".feature, #hero").waypoint({
        triggerOnce: true,
        handler: function(direction)
        {
            if (direction == 'down')
            {
                var $this = $(this);
                $this.addClass("animate");
            }
        },
        offset: '75%'
    });
} else {
    $(".feature, #hero").waypoint({
        triggerOnce: true,
        handler: function(direction)
        {
            if (direction == 'down')
            {
                var $this = $(this);
                $this.addClass("animate");

            }
        },
        offset: '50%'
    });
    // $("#signup").waypoint({
    //   handler: function(direction) {
    //     $(this).find('.signup-leader').addClass('fade-in');
    //   },
    //   offset: '75%'
    // });

    $(".feature-3").waypoint({
      handler: function(direction) {
        $(this).addClass("fade-in");
      },
      offset: '50%'
    });
}

  if (window.devicePixelRatio == 2) {

          var images = $("img");

          // loop through the images and make them hi-res
          for(var i = 0; i < images.length; i++) {

            // create new image name
            var imageType = images[i].src.substr(-4);
            var imageName = images[i].src.substr(0, images[i].src.length - 4);
            imageName += "@2x" + imageType;

            //rename image
            images[i].src = imageName;
          }
     }

$('.facebook,.twitter').click(function(event) {
var width  = 575,
    height = 400,
    left   = ($(window).width()  - width)  / 2,
    top    = ($(window).height() - height) / 2,
    url    = this.href,
    opts   = 'status=1' +
             ',width='  + width  +
             ',height=' + height +
             ',top='    + top    +
             ',left='   + left;

window.open(url, 'twitter', opts);

return false;
});
});