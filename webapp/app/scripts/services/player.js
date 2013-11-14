'use strict';

angular.module('dscover.me')
  .factory('player', function ($rootScope, $http, audio, fetchTracks, $compile) {

    var player,
        loader,
        paused = false,
        current = 0;

    // Public API here
    player = {

      player:player,
      playing: false,
      loader: loader,
      current: current,

      play: function() {
        player.loader = true;
        var hypemId = $rootScope.tracks[player.current].hypemId;
        if(paused === true) {
          player.loader = false;
          audio.play();
          player.playing = true;

        } else {
          fetchTracks.mp3(hypemId).success(function(response) { 
          var mp3url = eval(response);
          audio.src = mp3url;
          audio.play();
          player.playing = true;
          player.loader = false;
          });
        }          
      },
      pause: function() {
        if(player.playing) {
          audio.pause();
          player.playing = false
          paused = true
        }
      },
      next: function() {
        paused = false;
        if ($rootScope.tracks.length > (player.current + 1)) {
          player.current++;
          audio.pause();
        } 
        else {
          player.current = 0;
        }
         if(player.playing) player.play();     
      },  
      prev: function() {
        paused = false;
        if (player.current > 0) {
        player.current--;
        audio.pause();
        if(player.playing) player.play();
        }
      }
    };

   audio.addEventListener('ended', function() {
      $rootScope.$apply(player.next);
    })

     // Keep us updated on time
    audio.addEventListener("timeupdate", function(){    
      var duration = document.getElementById('duration');
      var s = parseInt(audio.currentTime % 60);
      var total = audio.duration;
      var totalAmount = s / total * 100;

      $(".progress").html($compile("<div class='progress-bar' style='width:" + totalAmount + "%'><span class='sr-only'>60% Complete</span></div>")($rootScope));
    }, false); 

    return player
  });
