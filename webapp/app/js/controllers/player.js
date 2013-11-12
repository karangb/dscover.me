'use strict';
angular.module('dscover.me')
.controller('PlayerCtrl', function ($scope, $http, audio, $compile, fetchTracks) {

     fetchTracks.recommendations('karan').success(function(response)
      { $scope.tracks = response.tracks; alert($scope.tracks)});

    $scope.current = 0;
    $scope.playing = false;
    $scope.paused = false;


    $scope.play = function() {

      $scope.loader = true;
      var hypemId = $scope.tracks[$scope.current].hypemId;

      if($scope.paused === true) {
        $scope.loader = false;
        audio.play();
        console.log("im resuming")
        $scope.playing = true;
      } else {
        fetchTracks.mp3(hypemId).success(function(response) { 
        var mp3url = eval(response);
        audio.src = mp3url;
        audio.play();
        console.log("im playing")
        $scope.playing = true;
        $scope.loader = false;
        });
    }
  }

    $scope.pause = function() {
      if($scope.playing) {
        audio.pause();
        $scope.playing = false
        $scope.paused = true
      }
    }

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