'use strict';


angular.module('dscover.me')
.controller('MainCtrl', function ($scope, $http, audio, $compile, fetchMp3, getTracks)  {

		$scope.title = 'dscover.me';
    
    // Set player variables
    $scope.current = 0;
    $scope.playing = false;
    $scope.paused = false;
    $scope.muted = false;
    $scope.tracks = getTracks;



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
      fetchMp3(hypemId).success(function(response) { 
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
      } 
      else {
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

.factory('fetchMp3', function($http) {
 return function(hypemId){return $http.get('http://gijwi.com:3001/mp3?hypemId=' + hypemId)};
})
.factory('fetchRecommendations', function($http) {
  return function(hypemUser) { return $http.get('http://gijwi.com:8080/recommendations?username=' + hypemUser)};
})


