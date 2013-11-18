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
        offset: '85%'
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
      offset: '50%'
    });

    $(".feature-3").waypoint({
      handler: function(direction) {
        $(this).addClass("fade-in");
      },
      offset: '50%'
    });
}