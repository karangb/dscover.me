'use strict';


angular.module('dscover.me')
.controller('MainCtrl', function ($scope, $http, audio, $compile)  {

		$scope.title = 'dscover.me';
    $http.get('tracks.json', { cache: true}).success(function(response) {
      $scope.tracks = response;
    });

    // Set player variables
    $scope.current = 0;
    $scope.playing = false;
    $scope.paused = false;
    $scope.muted = false;

    // Play Button
    $scope.play = function() {
        if (!$scope.tracks.length) return;
        if(!$scope.paused) audio.src = $scope.tracks[$scope.current].url;
        audio.play();
        $scope.playing = true;
    }

    // Pause Button
    $scope.pause = function() {
      if($scope.playing) {
        audio.pause();
        $scope.playing = false
        $scope.paused = true
      }
    }

    // Next Button
    $scope.next = function() {
      $scope.paused = false;
      if ($scope.tracks.length > ($scope.current + 1)) {
      $scope.current++;
      $scope.play();
      }
    }
    // Previous Button
    $scope.prev = function() {
      $scope.paused = false;
      if ($scope.current > 0) {
      $scope.current--;
      $scope.play();
      }
    }

    $scope.volumeUp = function() {
      audio.volume += 0.1;
    }
    $scope.volumeDown = function() {
      if(audio.volume <= 1) {
        return false;
      } else {
      audio.volume -+ 1;
     }
  }

  $scope.muteVolume = function() {
    if($scope.muted == true) {
      audio.volume = 1;
      $scope.muted = false;
    } else {
      audio.volume = 0;
      $scope.muted = true;
    }
  }

    audio.addEventListener('ended', function() {
      $scope.next();
    })
    audio.addEventListener("timeupdate", function(){    
      var duration = document.getElementById('duration');
      var s = parseInt(audio.currentTime % 60);
      var total = audio.duration;
      var totalAmount = s / total * 100;
      alert(totalAmount);

      $(".progress").html($compile("<div class='progress-bar' style='width:" + totalAmount + "%'><span class='sr-only'>60% Complete</span></div>")($scope));
    }, false);

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
