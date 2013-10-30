'use strict';


angular.module('dscover.me')
.controller('MainCtrl', function ($scope, $http, audio, $rootScope)  {

		$scope.title = 'dscover.me';
    $http.get('tracks.json').success(function(response) {
      $scope.tracks = response;
    });
    $scope.current = {
      track:0
    }
    $scope.play = function() {
        audio.src = $scope.tracks[$scope.current.track].url;
        audio.play();
        $scope.playing = true;  

    }
    $scope.pause = function() {
      audio.pause();
    }
    $scope.next = function() {
      if ($scope.tracks.length > ($scope.current.track + 1)) {
      $scope.current.track++;
      $scope.play();
      }

    }
    $scope.prev = function() {
      $scope.current.track = 1;
      if ($scope.current.track > 0) {
      $scope.current.track--;
      $scope.play();
      }
    }


})


// Fetch the tracks
/* .factory('tracksFactory', function( $rootScope, $http ) {
return {
    getTracks : function() {
        return $http({
            url: 'tracks.json',
            method: 'GET'
        })
    }
 }
/*        var tracks = [];
        $http.get('tracks.json').success(function(response) {
          tracks = response;
        });
        return tracks; 
})*/

// Create the player
/*.factory('player', function(audio, $rootScope, tracksFactory) {
      var player,
          paused = false;

      player = {
        playing: false,
        play : function() {
          alert(tracks);
          audio.src = tracks[0].url;
          audio.play();
          player.playing = true;
        },
        pause : function() {
          if(player.playing) {
            audio.pause();
            player.playing = false;
            playing = true;
          }
        }
      }
    return player;
})
*/
  // extract the audio for making the player easier to test
.factory('audio', function($document) {
    var audio = $document[0].createElement('audio');
    return audio;
});


 /*    var player,
          playing = false,
          paused = false,
          play = $scope.play,
          pause = $scope.pause;

      $scope.play = function(playing) {
          var tracks = $scope.tracks;
          audio.src = tracks[0].url;
          audio.play();
          playing = true;
      }
      $scope.pause = function() {
          audio.pause();
          paused = true;
          playing = false;
      }
*/
