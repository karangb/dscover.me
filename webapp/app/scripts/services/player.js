'use strict';

angular.module('dscover.me')
  .factory('player', function ($http, audio, fetchTracks) {

    var player,
        loader,
        paused = false,
        current = 0;

    // Public API here
    player = {

      player:player,
      playing: false,
      loader: loader,

        play: function() {
          loader = true;
          var hypemId = $scope.tracks[current].hypemId;
          if(paused === true) {
            loader = false;
            audio.play();
            player.playing = true;

          } else {
            fetchTracks.mp3(hypemId).success(function(response) { 
            var mp3url = eval(response);
            audio.src = mp3url;
            audio.play();
            player.playing = true;
            loader = false;
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
    };
    return player
  });
