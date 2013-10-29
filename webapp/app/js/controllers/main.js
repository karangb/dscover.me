'use strict';

angular.module('dscover.me')
.controller('MainCtrl', function ($scope, $http, audio)  {

		$scope.title = 'dscover.me';
      $http.get('albums.json').success(function(data) {
        $scope.albums = data;
      });

      var playing = false,
          paused = false,
          play = $scope.play,
          pause = $scope.pause;

      $scope.play = function() {
          var music = $scope.albums,
            current = {
              album: 0,
              track: 0
            };
          audio.src = music[current.album].tracks[current.track].url;
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



