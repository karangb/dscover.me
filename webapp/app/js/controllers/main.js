'use strict';


angular.module('dscover.me')
.controller('MainCtrl', function ($scope, $http, audio, $compile, mp3Resource, fetchUsername)  {

		$scope.title = 'dscover.me';
    
     /* Retun tracks with a promise
    fetchTracks.success(function(response)
    { $scope.tracks = response.tracks; });
    */
    // Set player variables
    $scope.current = 0;
    $scope.playing = false;
    $scope.paused = false;
    $scope.muted = false;

    // Get username entered

    $scope.username = function() {
      var username = $scope.userInput;
      console.log(username);
      /*  fetchUsername(username).success( function(response) {
          $scope.tracks = response.tracks;
                console.log($scope.tracks);
        }) */
    }

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


      $scope.loader = true;
      // Fetch hypemId
      var hypemId = $scope.tracks[$scope.current].hypemId;

      // If player is paused, then play is clicked, resume current song.
      if($scope.paused === true) {
        $scope.loader = false;
        audio.play();
        console.log("im resuming")
        $scope.playing = true;
      } else {

      // Else play the song from the beggining
      mp3Resource(hypemId).success(function(response) { 
      var mp3url = eval(response);
      audio.src = mp3url;
        audio.play();
        console.log("im playing")
        $scope.playing = true;
        $scope.loader = false;
       });
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
      audio.pause();
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
      audio.pause();
      if($scope.playing) $scope.play();
      }
    }

    // Mute Button
    $scope.muteVolume = function() {
      if($scope.muted === true) {
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
      if($scope.volumes.default === 0) {
        $scope.muted = true
      } else {
      audio.volume = $scope.volumes.default;
      }
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

/* Fetch some tracks
.factory('fetchTracks', function($http, fetchUsername) {
 return $http.get(fetchUsername);
}) */

.factory('mp3Resource', function($http) {
 return function(hypemId){return $http.get('http://gijwi.com:3001/mp3?hypemId=' + hypemId)};
})




