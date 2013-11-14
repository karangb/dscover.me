'use strict';

angular.module('dscover.me')
  .factory('player', function ($http, audio, fetchTracks) {

    var player,
        loader,
        paused = false,
        playing = false,
        current = 0;

    // Public API here
    return {
        play: function() {
          loader = true;
          var hypemId = $scope.tracks[current].hypemId;
          if(paused === true) {
            loader = false;
            audio.play();
            playing = true;
          } else {
            fetchTracks.mp3(hypemId).success(function(response) { 
            var mp3url = eval(response);
            audio.src = mp3url;
            audio.play();
            playing = true;
            loader = false;
            });
          }          
        }
    };
  });
