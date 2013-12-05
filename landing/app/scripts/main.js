console.log('\'Allo \'Allo!');



if ($(window).height() >= 980) {
    $(".feature").waypoint({
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
    $(".feature").waypoint({
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
    $("#signup").waypoint({
      handler: function(direction) {
        $(this).find('.signup-leader').addClass('fade-in');
      },
      offset: '75%'
    });

    $(".feature-3").waypoint({
      handler: function(direction) {
        $(this).addClass("fade-in");
      },
      offset: '50%'
    });
}
// Remove scroll down

$("#features").waypoint(function() {
    $('.scroll-down').hide();
  });

$(function () {

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

});