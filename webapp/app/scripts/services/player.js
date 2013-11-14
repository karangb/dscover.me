'use strict';

angular.module('dscover.me')
  .factory('player', function ($rootScope, $http, audio, fetchTracks) {

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
    return player
  });
