'use strict';

angular.module('dscover.me')
.controller('MainCtrl', function ($scope, $http, audio)  {

		$scope.title = 'dscover.me';

      $http.get('tracks.json').success(function(data) {
        $scope.tracks = data;
      });

      var playing = false,
          paused = false,
          play = $scope.play,
          pause = $scope.pause;

      $scope.play = function() {
          var tracks = $scope.tracks;
          audio.src = tracks[0].url;
          audio.play();
          playing = true
      }
      $scope.pause = function() {
          paused = true;
          playing = false;
          audio.pause();
      }

})

  // extract the audio for making the player easier to test
.factory('audio', function($document) {
    var audio = $document[0].createElement('audio');
    return audio;
});



