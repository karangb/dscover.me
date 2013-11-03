'use strict';


angular.module('dscover.me')
.controller('MainCtrl', function ($scope, $http, audio, $compile, fetchTracks, mp3Resource)  {

		$scope.title = 'dscover.me';
    
     // Retun tracks with a promise
    fetchTracks.success(function(response)
    { $scope.tracks = response.tracks; });

    // Set player variables
    $scope.current = 0;
    $scope.playing = false;
    $scope.paused = false;
    $scope.muted = false;

    // Set volume variables
    $scope.volumes = {
      default: 0.5,
      options: {
        orientation: 'vertical',
        min: 0.00,
        max: 1.00,
        step: 0.1,
        range: 'min',
        change: setVolume,  
        slide: setVolume
      }
    };
    // Play Button
    $scope.play = function() {

      if (!$scope.tracks.length) return;

      // Fetch hypemId
      var hypemId = $scope.tracks[$scope.current].hypemId;

      // Pull in json data
      mp3Resource(hypemId).success(function(response) { 
      var mp3url = eval(response);
      $scope.loader = true;
      audio.src = mp3url;
      audio.play();
      $scope.loader = false;
       });
      // If track is paused...
      if($scope.pause) {
        audio.play();
        $scope.playing = true;
      }     
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
      } else {
        $scope.current = 0;
      }
       if($scope.playing) $scope.play();
    }

    // Previous Button
    $scope.prev = function() {
      $scope.paused = false;
      if ($scope.current > 0) {
      $scope.current--;
      $scope.play();
      }
    }

    // Mute Button
    $scope.muteVolume = function() {
      if($scope.muted == true) {
        $scope.muted = false;
        $scope.volumes.default = 0.5;
      } else {
        audio.volume = 0;
        $scope.volumes.default = 0.00;
        $scope.muted = true;
      }
    }

     // Listen for Volume
    function setVolume () {
      if($scope.volumes.default == 0) {
        $scope.$apply($scope.muted = true);
      } else {
      audio.volume = $scope.volumes.default;
      }
    }
    $scope.checkHypemId = function() {
      return $scope.tracks[$scope.current].hypemId;
    }

    audio.addEventListener('ended', function() {
      $scope.$apply($scope.next);
    })

     // Keep us updated on time
    audio.addEventListener("timeupdate", function(){    
      var duration = document.getElementById('duration');
      var s = parseInt(audio.currentTime % 60);
      var total = audio.duration;
      var totalAmount = s / total * 100;

      $(".progress").html($compile("<div class='progress-bar' style='width:" + totalAmount + "%'><span class='sr-only'>60% Complete</span></div>")($scope));
    }, false);
})

// Create audio element
.factory('audio', function($document) {
    var audio = $document[0].createElement('audio');
    return audio;
})

// Fetch some tracks
.factory('fetchTracks', function($http) {
 return $http.get("http://gijwi.com:8080/recommendations?username=karan");
})

.factory('mp3Resource', function($http, $rootScope) {
 return function(hypemId){return $http.get('http://gijwi.com:3001/mp3?hypemId=' + hypemId)};
});


